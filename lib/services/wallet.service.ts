"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getOrCreateWallet(userId: string) {
  const supabase = await createServerSupabaseClient();
  const { data: wallet, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (wallet) return wallet;

  // Insert wallet using admin client to bypass RLS initially if needed
  const { data: newWallet, error: insertError } = await supabaseAdmin
    .from("wallets")
    .insert({ user_id: userId, available_balance: 0, locked_balance: 0 })
    .select()
    .single();

  if (insertError) {
    console.error("Error creating wallet:", insertError);
    throw insertError;
  }
  return newWallet;
}

export async function updateWalletBalance(userId: string, available: number, locked: number) {
  const { data, error } = await supabaseAdmin
    .from("wallets")
    .upsert({
      user_id: userId,
      available_balance: available,
      locked_balance: locked,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error("Error updating wallet balance:", error);
    throw error;
  }
  return data;
}

export async function addTestFunds(userId: string, amountKobo: number) {
  const currentWallet = await getOrCreateWallet(userId);
  const newAvailable = Number(currentWallet.available_balance || 0) + amountKobo;
  const newLocked = Number(currentWallet.locked_balance || 0);

  return updateWalletBalance(userId, newAvailable, newLocked);
}
