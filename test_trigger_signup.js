const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const envPath = path.join(__dirname, ".env.local");
const envContent = fs.readFileSync(envPath, "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const parts = line.split("=");
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const value = parts.slice(1).join("=").trim();
    env[key] = value;
  }
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(url, serviceKey);

async function run() {
  console.log("--- Testing handle_new_user Database Trigger ---");
  
  const testEmail = `trigger_test_${Date.now()}@example.com`;
  
  console.log(`Creating auth user: ${testEmail}`);
  const { data: { user }, error: createErr } = await supabaseAdmin.auth.admin.createUser({
    email: testEmail,
    password: "password123",
    email_confirm: true,
    user_metadata: {
      first_name: "Trigger",
      last_name: "Test",
      phone: "+1234567890",
      account_type: "buyer"
    }
  });

  if (createErr) {
    console.error("❌ Failed to create auth user:", createErr.message);
    return;
  }

  console.log(`✅ Auth user created successfully. ID: ${user.id}`);
  
  // Wait 1 second for trigger execution
  await new Promise(r => setTimeout(r, 1000));

  // Check if user_profile exists
  const { data: profile, error: profileErr } = await supabaseAdmin
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (profileErr) {
    console.error("❌ Error checking user_profile:", profileErr.message);
  } else if (profile) {
    console.log("✅ TRIGGER SUCCESS: user_profile was automatically created!", profile);
  } else {
    console.log("❌ TRIGGER FAILURE: user_profile was NOT created.");
  }

  // Check if wallet exists
  const { data: wallet, error: walletErr } = await supabaseAdmin
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (walletErr) {
    console.error("❌ Error checking wallet:", walletErr.message);
  } else if (wallet) {
    console.log("✅ TRIGGER SUCCESS: wallet was automatically created!", wallet);
  } else {
    console.log("❌ TRIGGER FAILURE: wallet was NOT created.");
  }

  // Cleanup
  console.log("Cleaning up test user...");
  await supabaseAdmin.auth.admin.deleteUser(user.id);
}

run();
