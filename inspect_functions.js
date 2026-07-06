const fs = require("fs");
const path = require("path");

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
const key = env.SUPABASE_SERVICE_ROLE_KEY;

const swaggerUrl = `${url}/rest/v1/?apikey=${key}`;

async function run() {
  try {
    const response = await fetch(swaggerUrl);
    const data = await response.json();
    
    if (data.paths) {
      const rpcPaths = Object.keys(data.paths).filter(p => p.startsWith("/rpc/"));
      console.log("RPC Functions found:", rpcPaths);
    } else {
      console.log("No paths found");
    }
  } catch (err) {
    console.error("Failed:", err);
  }
}

run();
