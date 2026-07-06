"use client";

import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import { ChevronsLeftRight, Link2, Lock, Eye, EyeOff } from "lucide-react";
import MerchantTable from "./MerchantTable";
import MerchantCards from "./MerchantCards";
import Link from "next/link";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
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
      <div className="bg-background text-foreground min-h-screen transition-colors duration-300 pb-12">
        <Nav />

        <div className="w-full mt-24 mb-10">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-4">
            <motion.div
              className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem}>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                  {profile?.business_name || "Merchant Dashboard"}
                </h1>
                <p className="text-muted-foreground mt-1.5 flex items-center gap-2">
                  <span>API Key:</span>
                  <span className="font-mono text-sm bg-muted px-2.5 py-1 rounded-md border border-border">
                    {showApiKey ? profile?.api_key : maskApiKey(profile?.api_key)}
                  </span>
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="p-1 hover:bg-muted rounded text-muted-foreground transition-colors cursor-pointer"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </p>
              </motion.div>
              <motion.div className="flex flex-wrap items-center gap-4" variants={staggerItem}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/merchants-dashboard/payment-link"
                    className="flex items-center gap-2 py-3 px-5 border border-border rounded-xl bg-card hover:bg-muted text-foreground transition-colors shadow-sm text-sm font-semibold"
                  >
                    <Link2 className="w-4 h-4 text-blue-500" />
                    Create Payment Link
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/merchants-dashboard/integrate-payzento"
                    className="flex items-center gap-2 py-3 px-5 text-primary-foreground bg-primary hover:bg-primary/95 rounded-xl transition-colors shadow-sm text-sm font-semibold"
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

            <motion.div
              className="w-full bg-blue-500/5 border border-blue-500/20 p-6 rounded-2xl my-10 transition-colors duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex items-center justify-center bg-blue-600 w-12 h-12 rounded-xl p-3 shadow-md shadow-blue-600/10">
                  <Lock className="w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Payzento ensures fair and secure transactions
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-3xl">
                    We protect both the buyer and the seller. Payment is secured
                    before you deliver. No risk of fake payment alerts. Funds are
                    guaranteed once conditions are met.
                  </p>
                </div>
              </div>
            </motion.div>

            <MerchantTable transactions={transactions} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MerchantDashboard;
