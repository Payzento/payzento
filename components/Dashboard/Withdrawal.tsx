"use client";

import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import Link from "next/link";
import { ArrowDownToLine, ArrowLeft, ArrowUpFromLine, Lock, Wallet, Shield } from "lucide-react";
import TransactionList from "./TransactionHistory";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { scaleIn, staggerContainer, staggerItem } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";
import { getOrCreateWallet, addTestFunds } from "@/lib/services/wallet.service";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

const Withdrawal = () => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<{ available_balance: number; locked_balance: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFunding, setIsFunding] = useState(false);
  const [fundSuccess, setFundSuccess] = useState(false);

  const handleAddTestFunds = async () => {
    if (!user) return;
    setIsFunding(true);
    try {
      // Add ₦50,000 (5,000,000 kobo)
      await addTestFunds(user.id, 5000000);
      setFundSuccess(true);
      setTimeout(() => setFundSuccess(false), 2000);
    } catch (err) {
      console.error("Error adding test funds:", err);
    } finally {
      setIsFunding(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    const loadWallet = async () => {
      try {
        const w = await getOrCreateWallet(user.id);
        setWallet(w);
      } catch (err) {
        console.error("Error loading wallet:", err);
      } finally {
        setLoading(false);
      }
    };

    loadWallet();

    const clientSupabase = createClient();
    const walletChannel = clientSupabase
      .channel(`wallet-withdraw-page-${user.id}`)
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

    return () => {
      clientSupabase.removeChannel(walletChannel);
    };
  }, [user]);

  const formatCurrency = (amountKobo: number) => {
    return (amountKobo / 100).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    });
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

        <div className="mt-24 max-w-3xl mx-auto px-4 pt-4 space-y-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-foreground">Wallet Vault</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Withdraw funds securely or deposit to complete active escrows.</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 py-1.5 px-3.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>Secured</span>
            </div>
          </div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col gap-6">
            
            {/* Available Balance Card */}
            <motion.section
              className="w-full bg-gradient-to-br from-[#0c152b] to-[#070f20] border border-[#1e2d52] rounded-3xl p-8 shadow-xl relative overflow-hidden"
              variants={scaleIn}
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="w-full relative z-10">
                <div className="flex items-center justify-between gap-2 text-blue-200/80">
                  <p className="text-xs font-bold tracking-widest uppercase">Available Balance</p>
                  <Wallet className="w-5 h-5 text-blue-400" />
                </div>
                <h1 className="text-white text-4xl font-black tracking-tight my-6">
                  {formatCurrency(wallet?.available_balance || 0)}
                </h1>
                
                <div className="w-full flex flex-col sm:flex-row items-center gap-3 border-t border-[#1a2860] pt-6 mt-6">
                  <motion.button
                    className="bg-white hover:bg-slate-50 text-slate-900 flex flex-1 w-full items-center justify-center text-xs font-bold gap-2 rounded-xl p-3 shadow cursor-pointer transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ArrowUpFromLine className="w-4 h-4" />
                    Withdraw to Bank
                  </motion.button>
                  <motion.button
                    onClick={handleAddTestFunds}
                    disabled={isFunding}
                    className="bg-slate-800/80 border border-slate-700/60 hover:bg-slate-800 text-white flex flex-1 w-full items-center justify-center text-xs font-bold gap-2 rounded-xl p-3 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isFunding ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowDownToLine className="w-4 h-4" />
                    )}
                    {fundSuccess ? "Funds Added!" : "Deposit Funds (Faucet)"}
                  </motion.button>
                </div>
              </div>
            </motion.section>

            {/* Pending Escrow Balance Card */}
            <motion.section
              className="w-full bg-card border border-border rounded-3xl p-6 shadow-sm transition-colors duration-300 relative overflow-hidden group hover:border-amber-500/20"
              variants={staggerItem}
            >
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="w-full">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="w-4 h-4 text-amber-500" />
                  <p className="text-xs font-bold tracking-widest uppercase">Pending Escrow Locks</p>
                </div>
                <h1 className="text-amber-500 text-3xl font-black tracking-tight my-4">
                  {formatCurrency(wallet?.locked_balance || 0)}
                </h1>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  These funds are secured in active escrow transactions and cannot be withdrawn until milestone sign-off is completed.
                </p>
              </div>
            </motion.section>
          </motion.div>

          {/* History Header */}
          <div className="w-full flex items-center justify-between pt-6">
            <h2 className="text-lg font-black tracking-tight text-foreground uppercase tracking-widest text-muted-foreground text-xs">Transaction History</h2>
            <button className="text-xs font-bold hover:underline text-blue-600 dark:text-blue-400 uppercase tracking-wider">Filter Logs</button>
          </div>

          <div className="w-full">
            <TransactionList />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Withdrawal;
