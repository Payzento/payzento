"use client";

import React, { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  CircleEllipsis,
  Lock,
  LockIcon,
  Plus,
  SquareCheck,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";
import { getOrCreateWallet } from "@/lib/services/wallet.service";
import { getUserTransactions } from "@/lib/services/transactions.service";
import { createClient } from "@/lib/supabase/client";

type StatusType = "pending" | "active" | "completed" | "disputed" | "cancelled";

const statusConfig: Record<StatusType, { icon: React.ElementType; bg: string; border: string; text: string }> = {
  pending: { icon: CircleEllipsis, bg: "bg-amber-500/10", text: "text-amber-500", border: "border border-amber-500/20" },
  active: { icon: LockIcon, bg: "bg-blue-500/10", text: "text-blue-500", border: "border border-blue-500/20" },
  completed: { icon: SquareCheck, bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border border-emerald-500/20" },
  disputed: { icon: LockIcon, bg: "bg-red-500/10", text: "text-red-500", border: "border border-red-500/20" },
  cancelled: { icon: CircleEllipsis, bg: "bg-slate-500/10", text: "text-slate-500", border: "border border-slate-500/20" },
};

const Dashboard = () => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<{ available_balance: number; locked_balance: number } | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadInitialData = async () => {
      try {
        const w = await getOrCreateWallet(user.id);
        setWallet(w);
        const txs = await getUserTransactions(user.id);
        setTransactions(txs);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoadingDashboard(false);
      }
    };

    loadInitialData();

    const clientSupabase = createClient();
    
    // Subscribe to wallets changes
    const walletChannel = clientSupabase
      .channel(`wallet-updates-${user.id}`)
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
    const txChannel = clientSupabase
      .channel(`tx-updates-${user.id}`)
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
      clientSupabase.removeChannel(walletChannel);
      clientSupabase.removeChannel(txChannel);
    };
  }, [user]);

  const formatCurrency = (amountKobo: number) => {
    return (amountKobo / 100).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    });
  };

  const countHeldAgreements = () => {
    return transactions.filter(t => t.status === "active" || t.status === "pending").length;
  };

  if (loadingDashboard) {
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
        <div className="mt-24 max-w-7xl mx-auto px-4 pt-4">
          {/* Balance Cards */}
          <motion.div
            className="flex flex-col md:flex-row gap-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="flex-1" variants={staggerItem}>
              <Card className="bg-gradient-to-br from-[#0c152b] to-[#070f20] w-full text-white border border-[#1a2860] px-6 py-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-blue-200/80 text-sm font-semibold tracking-wider uppercase">Available Balance</CardTitle>
                  <CardAction className="text-blue-400"><Wallet className="w-5 h-5" /></CardAction>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-4xl font-extrabold tracking-tight">
                    {formatCurrency(wallet?.available_balance || 0)}
                  </p>
                  <Link href="/dashboard/withdraw">
                    <motion.button
                      className="bg-white hover:bg-slate-50 text-slate-900 rounded-xl px-5 py-2.5 text-sm font-semibold mt-6 cursor-pointer shadow-md shadow-black/10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Withdraw
                    </motion.button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div className="flex-1" variants={staggerItem}>
              <Card className="bg-card w-full text-foreground border border-border px-6 py-6 shadow-xl relative overflow-hidden transition-colors duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="text-amber-500 w-4 h-4" />
                    <CardTitle className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">Locked Funds</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-4xl font-extrabold tracking-tight text-amber-500">
                    {formatCurrency(wallet?.locked_balance || 0)}
                  </p>
                  <p className="text-muted-foreground text-sm mt-6">Held securely in {countHeldAgreements()} active escrow agreements</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.25 }}>
            <Link
              href="new-transaction"
              className="my-8 w-fit bg-primary text-primary-foreground hover:bg-primary/95 px-6 py-4 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/5"
            >
              <motion.span
                className="flex items-center gap-2 font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Plus className="w-5 h-5" />
                Start New Transaction
              </motion.span>
            </Link>
          </motion.div>
        </div>

        <div className="w-full flex flex-col max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-2 mb-6">
            <h1 className="font-bold text-2xl tracking-tight text-foreground">Recent Transactions</h1>
            <Link href="#" className="text-sm font-semibold hover:underline underline-offset-2 text-blue-600 dark:text-blue-400">
              View All
            </Link>
          </div>

          {/* Transaction rows with stagger */}
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {transactions.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
                <Lock className="w-12 h-12 text-muted-foreground/45 mx-auto mb-3" />
                <p className="text-muted-foreground font-semibold">No transactions found</p>
                <p className="text-muted-foreground/60 text-sm mt-1">Start a new transaction to fund your first escrow agreement.</p>
              </div>
            ) : (
              transactions.map((tx, index) => {
                const statusStr = (tx.status || "pending") as StatusType;
                const config = statusConfig[statusStr] || statusConfig.pending;
                const Icon = config.icon;

                return (
                  <motion.div key={tx.id || index} variants={staggerItem}>
                    <Link href={`/review-funds?transactionId=${tx.id}`} className="cursor-pointer block">
                      <motion.div
                        whileHover={{ y: -2, boxShadow: "0 12px 30px rgba(0,0,0,0.02)" }}
                        transition={{ duration: 0.2 }}
                        className="border border-border/80 bg-card rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/30"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <h2 className="text-lg font-bold text-foreground">{tx.seller_email}</h2>
                            <div className="flex gap-2">
                              <div
                                className={`flex items-center gap-1.5 py-1 px-3.5 rounded-full text-xs font-semibold ${config.text} ${config.border} ${config.bg}`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                <span className="uppercase">{statusStr}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-4">
                            <span className="text-xl font-bold text-foreground">{formatCurrency(tx.amount || 0)}</span>
                            <ArrowRight className="text-muted-foreground w-4 h-4" />
                          </div>
                        </div>
                        <div className="flex flex-col mt-4 pt-4 border-t border-border/40 text-left">
                          <span className="text-muted-foreground text-sm font-medium">{tx.description}</span>
                          <span className="text-muted-foreground/60 text-xs mt-1">
                            {tx.created_at ? new Date(tx.created_at).toLocaleDateString("en-NG", { dateStyle: "medium" }) : "N/A"}
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })
            )}
          </motion.div>

          {/* Quick action cards */}
          <div className="mt-12">
            <h2 className="font-bold text-xl tracking-tight text-foreground mb-6">Quick Tools</h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { icon: <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />, bg: "bg-blue-500/10 border border-blue-500/20", title: "Wallet Control", desc: "Manage your withdrawals and bank cards" },
                { icon: <Lock className="w-6 h-6 text-amber-500" />, bg: "bg-amber-500/10 border border-amber-500/20", title: "Active Escrows", desc: "Track payments pending milestone sign-offs" },
                { icon: <ChartNoAxesColumnIncreasing className="w-6 h-6 text-pink-500" />, bg: "bg-pink-500/10 border border-pink-500/20", title: "Reports & Audits", desc: "Export statements and history documents" },
              ].map((item, i) => (
                <motion.div key={i} variants={staggerItem}>
                  <motion.div
                    whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.03)" }}
                    transition={{ duration: 0.2 }}
                    className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl cursor-pointer transition-colors duration-300"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className={`p-3.5 rounded-2xl ${item.bg}`}>{item.icon}</div>
                      <h3 className="text-lg font-bold text-foreground mt-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
