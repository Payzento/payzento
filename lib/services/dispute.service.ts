"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function createDispute(data: {
  transactionId: string;
  buyerId: string;
  sellerId?: string | null;
  reason: string;
  description: string;
}) {
  const supabase = await createServerSupabaseClient();
  
  // 1. Insert dispute row
  const { data: dispute, error } = await supabase
    .from("disputes")
    .insert({
      transaction_id: data.transactionId,
      buyer_id: data.buyerId,
      seller_id: data.sellerId || null,
      reason: data.reason,
      description: data.description,
      status: "open",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating dispute:", error);
    throw error;
  }

  // 2. Update transaction status to disputed
  const { error: txError } = await supabase
    .from("transactions")
    .update({ status: "disputed" })
    .eq("id", data.transactionId);

  if (txError) {
    console.error("Error updating transaction status to disputed:", txError);
    throw txError;
  }

  return dispute;
}

export async function getDisputeByTransactionId(transactionId: string) {
  const supabase = await createServerSupabaseClient();
  const { data: dispute, error: dErr } = await supabase
    .from("disputes")
    .select("*")
    .eq("transaction_id", transactionId)
    .maybeSingle();

  if (dErr) throw dErr;
  if (!dispute) return null;

  const { data: messages, error: mErr } = await supabase
    .from("dispute_messages")
    .select("*")
    .eq("dispute_id", dispute.id)
    .order("created_at", { ascending: true });

  if (mErr) throw mErr;

  return {
    ...dispute,
    messages: messages || [],
  };
}

export async function sendDisputeMessage(disputeId: string, senderId: string, role: string, content: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("dispute_messages")
    .insert({
      dispute_id: disputeId,
      sender_id: senderId,
      sender_role: role,
      content,
    })
    .select()
    .single();

  if (error) {
    console.error("Error sending dispute message:", error);
    throw error;
  }
  return data;
}
