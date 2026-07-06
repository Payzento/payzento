"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createUserProfileAndWallet(profileData: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountType: string;
}) {
  // 1. Upsert user profile using admin client to bypass RLS
  const { error: profileError } = await supabaseAdmin.from("user_profiles").upsert({
    id: profileData.id,
    first_name: profileData.firstName,
    last_name: profileData.lastName,
    email: profileData.email,
    phone: profileData.phone,
    account_type: profileData.accountType,
    kyc_status: "pending",
  });

  if (profileError) {
    console.error("Error creating profile via Admin:", profileError);
    throw profileError;
  }

  // 2. Ensure wallet is initialized
  const { data: wallet, error: checkError } = await supabaseAdmin
    .from("wallets")
    .select("*")
    .eq("user_id", profileData.id)
    .maybeSingle();

  if (checkError) {
    console.error("Error checking wallet via Admin:", checkError);
  }

  if (!wallet) {
    const { error: walletError } = await supabaseAdmin.from("wallets").insert({
      user_id: profileData.id,
      available_balance: 0,
      locked_balance: 0,
      currency: "NGN",
    });
    
    if (walletError) {
      console.error("Error creating wallet via Admin:", walletError);
      throw walletError;
    }
  }
}
