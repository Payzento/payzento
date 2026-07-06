"use client";

import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import { ChevronsLeftRight, Link2, Lock, Eye, EyeOff, Clipboard, Check, ShieldAlert } from "lucide-react";
import MerchantTable from "./MerchantTable";
import MerchantCards from "./MerchantCards";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { fadeUp, staggerContainer, staggerItem, scaleIn } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";
import { getMerchantProfile } from "@/lib/services/merchant.service";
import { getOrCreateWallet } from "@/lib/services/wallet.service";
import { getUserTransactions } from "@/lib/services/transactions.service";
import { createClient } from "@/lib/supabase/client";

const MerchantDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const p = await getMerchantProfile(user.id);
        setProfile(p);
        const w = await getOrCreateWallet(user.id);
        setWallet(w);
        const txs = await getUserTransactions(user.id);
        setTransactions(txs);
      } catch (err) {
        console.error("Error loading merchant dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    const clientSupabase = createClient();
    
    // Subscribe to merchant profiles changes
    const profileSub = clientSupabase
      .channel(`merchant-profile-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "merchant_profiles",
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new) {
            setProfile(payload.new);
          }
        }
      )
      .subscribe();

    // Subscribe to wallets changes
    const walletSub = clientSupabase
      .channel(`merchant-wallet-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "wallets",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new) {
            setWallet(payload.new as any);
          }
        }
      )
      .subscribe();

    // Subscribe to transactions changes
    const txSub = clientSupabase
      .channel(`merchant-tx-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
        },
        async () => {
          try {
            const txs = await getUserTransactions(user.id);
            setTransactions(txs);
          } catch (err) {
            console.error("Error updating transactions:", err);
          }
        }
      )
      .subscribe();

    return () => {
      clientSupabase.removeChannel(profileSub);
      clientSupabase.removeChannel(walletSub);
      clientSupabase.removeChannel(txSub);
    };
  }, [user]);

  const maskApiKey = (key: string) => {
    if (!key) return "N/A";
    return `•••••••••••••••••••••${key.slice(-6)}`;
  };

  const handleCopyKey = () => {
    if (!profile?.api_key) return;
    navigator.clipboard.writeText(profile.api_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060b18] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="text-3xl font-black tracking-wider animate-pulse">
            PAYZENTO
          </div>
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="bg-background text-foreground min-h-screen transition-colors duration-300 pb-16">
        <Nav />

        <div className="w-full mt-24 mb-10">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-4 sm:px-6">
            
            {/* Top Welcome & API Details Panel */}
            <motion.div
              className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 bg-gradient-to-r from-indigo-500/5 via-blue-500/5 to-transparent border border-border p-6 sm:p-8 rounded-3xl"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem} className="space-y-3.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 py-1 px-3 rounded-full">
                    Live Mode Active
                  </span>
                </div>
                
                <h1 className="text-3xl font-black tracking-tight text-foreground">
                  {profile?.business_name || "Merchant Dashboard"}
                </h1>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Generate secure transaction links, view incoming funds locked in escrow, or configure custom Webhook notification handlers.
                </p>

                {profile?.api_key && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-muted-foreground/80 font-bold">API Key:</span>
                    <div className="flex items-center gap-2 bg-muted/60 border border-border px-3 py-1.5 rounded-xl">
                      <span className="font-mono text-xs text-foreground tracking-wider">
                        {showApiKey ? profile?.api_key : maskApiKey(profile?.api_key)}
                      </span>
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground rounded transition-colors cursor-pointer"
                        title={showApiKey ? "Hide Key" : "Show Key"}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={handleCopyKey}
                        className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground rounded transition-colors cursor-pointer"
                        title="Copy Key"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500 animate-scale-in" /> : <Clipboard className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.div className="flex flex-wrap items-center gap-4 shrink-0" variants={staggerItem}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/merchants-dashboard/payment-link"
                    className="flex items-center gap-2 py-3.5 px-5 border border-border rounded-2xl bg-card hover:bg-muted text-foreground transition-colors shadow-sm text-xs font-bold"
                  >
                    <Link2 className="w-4 h-4 text-blue-500" />
                    Create Payment Link
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/merchants-dashboard/integrate-payzento"
                    className="flex items-center gap-2 py-3.5 px-5 text-primary-foreground bg-primary hover:bg-primary/95 rounded-2xl transition-colors shadow-lg shadow-primary/10 text-xs font-bold border border-primary/20"
                  >
                    <ChevronsLeftRight className="w-4 h-4" />
                    Integrate Payzento
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* MERCHANT CARDS */}
            <div className="w-full">
              <MerchantCards wallet={wallet} transactions={transactions} />
            </div>

            {/* Escrow Rules Info Banner */}
            <motion.div
              className="w-full bg-blue-500/5 border border-blue-500/15 p-6 rounded-3xl my-8 transition-colors duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex items-center justify-center bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 w-12 h-12 rounded-2xl p-3 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    Payzento Escrow Security Shield
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-4xl">
                    Buyer funds are held in secure, milestone-based lock vaults before deliveries begin. This guarantees you will receive complete payouts on successful conditions without risk of chargebacks or fraudulent transfer alerts.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* MERCHANTS TRANSACTIONS TABLE */}
            <div className="w-full">
              <MerchantTable transactions={transactions} />
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MerchantDashboard;
