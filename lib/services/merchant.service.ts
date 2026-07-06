"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function createMerchantProfile(userId: string, data: any) {
  const supabase = await createServerSupabaseClient();
  const apiKey = 'sk_live_' + crypto.randomUUID().replace(/-/g,'');
  
  const { data: profile, error } = await supabase
    .from("merchant_profiles")
    .insert({
      id: userId,
      business_name: data.businessName,
      business_type: data.businessType,
      rc_number: data.rcNumber || null,
      industry: data.industry,
      contact_name: data.contactName,
      contact_email: data.contactEmail,
      contact_phone: data.contactPhone,
      business_address: data.businessAddress,
      bank_name: data.bankName,
      account_number: data.accountNumber,
      account_name: data.accountName,
      verification_status: "pending",
      api_key: apiKey,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating merchant profile:", error);
    throw error;
  }
  return profile;
}

export async function getMerchantProfile(userId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("merchant_profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching merchant profile:", error);
    throw error;
  }
  return data;
}
