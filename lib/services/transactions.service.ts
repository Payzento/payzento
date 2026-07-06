"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createTransaction(data: any, buyerId: string) {
  const supabase = await createServerSupabaseClient();
  const koboAmount = Math.round((data.amount || 0) * 100);

  // 1. Check buyer wallet has enough available balance
  const { data: wallet, error: walletError } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", buyerId)
    .maybeSingle();

  const available = wallet ? Number(wallet.available_balance) : 0;
  const locked = wallet ? Number(wallet.locked_balance) : 0;

  if (available < koboAmount) {
    throw new Error("Insufficient wallet balance to fund this transaction.");
  }

  // 2. Insert transaction
  const { data: tx, error: txError } = await supabase
    .from("transactions")
    .insert({
      buyer_id: buyerId,
      seller_email: data.sellerEmail,
      amount: koboAmount,
      description: data.description,
      status: "pending",
      payment_method: data.paymentMethod,
    })
    .select()
    .single();

  if (txError) {
    console.error("Error inserting transaction:", txError);
    throw txError;
  }

  // 3. Insert milestones
  if (data.milestones && data.milestones.length > 0) {
    const milestonesToInsert = data.milestones.map((m: any) => ({
      transaction_id: tx.id,
      title: m.title,
      amount: Math.round(Number(m.amount) * 100),
      due_date: m.dueDate,
      status: "pending",
    }));

    const { error: milestoneError } = await supabase
      .from("milestones")
      .insert(milestonesToInsert);

    if (milestoneError) {
      console.error("Error inserting milestones:", milestoneError);
      throw milestoneError;
    }
  }

  // 4. Update buyer wallet using admin client to bypass RLS
  const { error: updateError } = await supabaseAdmin
    .from("wallets")
    .update({
      available_balance: available - koboAmount,
      locked_balance: locked + koboAmount,
      updated_at: new Date().toISOString()
    })
    .eq("user_id", buyerId);

  if (updateError) {
    console.error("Error updating buyer wallet:", updateError);
    throw updateError;
  }

  return tx;
}

export async function getTransactionById(id: string) {
  const supabase = await createServerSupabaseClient();
  const { data: transaction, error: txError } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (txError) throw txError;
  if (!transaction) return null;

  const { data: milestones, error: mError } = await supabase
    .from("milestones")
    .select("*")
    .eq("transaction_id", id);

  if (mError) throw mError;

  return {
    ...transaction,
    milestones: milestones || [],
  };
}

export async function getUserTransactions(userId: string) {
  const supabase = await createServerSupabaseClient();
  // Fetch transaction where buyer_id is userId OR seller_id is userId OR seller_email matches user's email
  const { data: user } = await supabase.auth.getUser();
  const email = user?.user?.email;

  let query = supabase.from("transactions").select("*");
  
  if (email) {
    query = query.or(`buyer_id.eq.${userId},seller_id.eq.${userId},seller_email.eq.${email}`);
  } else {
    query = query.or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    console.error("Error getting user transactions:", error);
    throw error;
  }
  return data || [];
}

export async function updateMilestoneStatus(milestoneId: string, status: "pending" | "completed") {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("milestones")
    .update({ status })
    .eq("id", milestoneId)
    .select()
    .single();

  if (error) {
    console.error("Error updating milestone status:", error);
    throw error;
  }
  return data;
}

export async function releaseAllFunds(transactionId: string) {
  const supabase = await createServerSupabaseClient();
  
  // 1. Fetch transaction details
  const { data: tx, error: txError } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", transactionId)
    .single();

  if (txError) throw txError;
  if (tx.status === "completed") return tx;

  // 2. Fetch buyer wallet
  const { data: buyerWallet, error: bWalletErr } = await supabaseAdmin
    .from("wallets")
    .select("*")
    .eq("user_id", tx.buyer_id)
    .single();

  if (bWalletErr) throw bWalletErr;

  // 3. Find seller id
  let sellerId = tx.seller_id;
  if (!sellerId) {
    // Look up seller by email in user_profiles
    const { data: profile } = await supabaseAdmin
      .from("user_profiles")
      .select("id")
      .eq("email", tx.seller_email)
      .maybeSingle();

    if (profile) {
      sellerId = profile.id;
      // Update transaction with seller_id
      await supabaseAdmin
        .from("transactions")
        .update({ seller_id: sellerId })
        .eq("id", transactionId);
    }
  }

  if (!sellerId) {
    throw new Error("Seller must register an account on Payzento before funds can be released.");
  }

  // 4. Fetch seller wallet
  const { data: sellerWallet, error: sWalletErr } = await supabaseAdmin
    .from("wallets")
    .select("*")
    .eq("user_id", sellerId)
    .maybeSingle();

  const sellerAvailable = sellerWallet ? Number(sellerWallet.available_balance) : 0;
  const sellerLocked = sellerWallet ? Number(sellerWallet.locked_balance) : 0;

  // 5. Update transaction status
  await supabaseAdmin
    .from("transactions")
    .update({ status: "completed", seller_id: sellerId })
    .eq("id", transactionId);

  // 6. Update buyer wallet: deduct tx.amount from buyer locked_balance
  const buyerLocked = Number(buyerWallet.locked_balance);
  await supabaseAdmin
    .from("wallets")
    .update({
      locked_balance: buyerLocked - Number(tx.amount),
      updated_at: new Date().toISOString()
    })
    .eq("user_id", tx.buyer_id);

  // 7. Update seller wallet: add tx.amount to seller available_balance
  await supabaseAdmin
    .from("wallets")
    .upsert({
      user_id: sellerId,
      available_balance: sellerAvailable + Number(tx.amount),
      locked_balance: sellerLocked,
      updated_at: new Date().toISOString()
    });

  // 8. Update all milestone statuses to completed
  await supabaseAdmin
    .from("milestones")
    .update({ status: "completed" })
    .eq("transaction_id", transactionId);

  return { success: true };
}
