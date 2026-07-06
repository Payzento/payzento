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
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Activity,
  User,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { fadeUp, staggerContainer, staggerItem, scaleIn } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";
import { getOrCreateWallet } from "@/lib/services/wallet.service";
import { getUserTransactions } from "@/lib/services/transactions.service";
import { createClient } from "@/lib/supabase/client";

type StatusType = "pending" | "active" | "completed" | "disputed" | "cancelled";

const statusConfig: Record<StatusType, { icon: React.ElementType; bg: string; border: string; text: string; dot: string }> = {
  pending: { icon: CircleEllipsis, bg: "bg-amber-500/10", text: "text-amber-500", border: "border border-amber-500/20", dot: "bg-amber-500" },
  active: { icon: LockIcon, bg: "bg-blue-500/10", text: "text-blue-500", border: "border border-blue-500/20", dot: "bg-blue-500" },
  completed: { icon: SquareCheck, bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border border-emerald-500/20", dot: "bg-emerald-500" },
  disputed: { icon: LockIcon, bg: "bg-red-500/10", text: "text-red-500", border: "border border-red-500/20", dot: "bg-red-500" },
  cancelled: { icon: CircleEllipsis, bg: "bg-slate-500/10", text: "text-slate-500", border: "border border-slate-500/20", dot: "bg-slate-500" },
};

const Dashboard = () => {
  const { user, userProfile } = useAuth();
  const [wallet, setWallet] = useState<{ available_balance: number; locked_balance: number } | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

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

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Good morning";
    if (hr < 17) return "Good afternoon";
    return "Good evening";
  };

  // Filter logic
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.seller_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" ||
      tx.status?.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

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
      <div className="bg-background text-foreground min-h-screen transition-colors duration-300 pb-16">
        <Nav />

        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-8">
          {/* Welcome Header */}
          <motion.div
            className="w-full bg-gradient-to-r from-blue-600/10 via-indigo-600/5 to-transparent border border-blue-500/10 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
            initial="hidden"
            animate="visible"
            variants={scaleIn}
          >
            <div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date().toLocaleDateString("en-NG", { weekday: 'long', month: 'short', day: 'numeric' })}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                {getGreeting()}, {userProfile?.firstName || "User"} 👋
              </h1>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                Welcome to your secure buyer panel. Track payments, release milestone funds, or resolve disputes safely.
              </p>
            </div>
            
            <Link href="/new-transaction">
              <motion.button
                className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-primary/10 cursor-pointer text-sm shrink-0 border border-primary/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                Start New Transaction
              </motion.button>
            </Link>
          </motion.div>

          {/* Balance Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Available Balance */}
            <motion.div className="w-full" variants={staggerItem}>
              <div className="bg-gradient-to-br from-[#0c152b] to-[#070f20] text-white border border-[#1e2d52] p-8 rounded-3xl shadow-xl relative overflow-hidden group hover:border-blue-500/40 transition-colors duration-300">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-300" />
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-blue-200/60 text-xs font-bold uppercase tracking-widest">Available Balance</p>
                    <h2 className="text-4xl font-black tracking-tight mt-1.5">
                      {formatCurrency(wallet?.available_balance || 0)}
                    </h2>
                  </div>
                  <div className="p-3.5 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20">
                    <Wallet className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#1a2860] pt-6 mt-6">
                  <p className="text-xs text-blue-200/50 leading-relaxed max-w-[200px]">
                    Instantly withdraw available funds directly to your verified bank account.
                  </p>
                  <Link href="/dashboard/withdraw">
                    <motion.button
                      className="bg-white hover:bg-slate-50 text-slate-900 rounded-xl px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Withdraw
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Locked Funds */}
            <motion.div className="w-full" variants={staggerItem}>
              <div className="bg-card border border-border p-8 rounded-3xl shadow-md relative overflow-hidden group hover:border-amber-500/30 transition-colors duration-300">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition-all duration-300" />

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Locked Escrow Funds</p>
                    <h2 className="text-4xl font-black tracking-tight text-amber-500 mt-1.5">
                      {formatCurrency(wallet?.locked_balance || 0)}
                    </h2>
                  </div>
                  <div className="p-3.5 bg-amber-500/10 rounded-2xl text-amber-500 border border-amber-500/20">
                    <Lock className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-6 mt-6">
                  <p className="text-xs text-muted-foreground/80 leading-relaxed max-w-[240px]">
                    Held securely in <span className="font-bold text-foreground">{countHeldAgreements()} active</span> escrow agreements.
                  </p>
                  <span className="text-[10px] uppercase font-black tracking-widest text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 py-1 px-3 rounded-full">
                    Protected
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Search, Filter & Recent Transactions */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-black text-xl sm:text-2xl tracking-tight text-foreground">Recent Transactions</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Filter, search, or click a transaction row to view escrow details.</p>
              </div>

              {/* SEARCH & FILTERS CONTAINER */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:max-w-xl">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search seller email or desc..."
                    className="w-full pl-10 pr-4 py-2.5 border border-border bg-card text-foreground rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                {/* Status Dropdown/Selector */}
                <div className="relative shrink-0">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="appearance-none w-full sm:w-44 pl-3.5 pr-8 py-2.5 border border-border bg-card text-foreground rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="active">Funds Locked</option>
                    <option value="completed">Completed</option>
                    <option value="disputed">Disputed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Transactions Rows */}
            <motion.div
              className="flex flex-col gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-border rounded-3xl bg-card">
                  <Lock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground font-semibold">No transactions found</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">Try resetting your filter or search query.</p>
                </div>
              ) : (
                filteredTransactions.map((tx, index) => {
                  const statusStr = (tx.status === "funds_locked" ? "active" : tx.status || "pending") as StatusType;
                  const config = statusConfig[statusStr] || statusConfig.pending;
                  const Icon = config.icon;

                  return (
                    <motion.div key={tx.id || index} variants={staggerItem}>
                      <Link href={`/review-funds?transactionId=${tx.id}`} className="cursor-pointer block">
                        <motion.div
                          whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.02)" }}
                          transition={{ duration: 0.2 }}
                          className="border border-border/80 bg-card rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/25 flex flex-col gap-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-blue-500/5 border border-border flex items-center justify-center font-mono text-xs font-bold text-muted-foreground uppercase">
                                #{tx.id ? tx.id.slice(0, 4) : "TX"}
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-base font-bold text-foreground truncate">{tx.seller_email}</h3>
                                <p className="text-xs text-muted-foreground mt-0.5 truncate">{tx.description}</p>
                              </div>
                            </div>

                            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                              <span className="text-xl font-black text-foreground">{formatCurrency(tx.amount || 0)}</span>
                              
                              <div className="flex items-center gap-2">
                                <div className={`flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-semibold ${config.text} ${config.border} ${config.bg}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
                                  <span className="uppercase text-[10px] tracking-wider">
                                    {tx.status === "funds_locked" ? "FUNDS LOCKED" : statusStr}
                                  </span>
                                </div>
                                <ArrowRight className="text-muted-foreground w-4 h-4 hidden sm:block" />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-border/40 text-xs text-muted-foreground/60">
                            <span className="font-medium">
                              Payment Method: <span className="text-muted-foreground font-semibold">{tx.payment_method?.replace("_", " ")}</span>
                            </span>
                            <span>
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
          </div>

          {/* Quick Tools Redesign */}
          <div className="pt-6">
            <h2 className="font-black text-xl tracking-tight text-foreground mb-6">Quick Tools</h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { icon: <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />, bg: "bg-blue-500/10 border border-blue-500/20 shadow-blue-500/5", title: "Wallet Control", desc: "View detailed account balance audits, link bank accounts and request express payouts." },
                { icon: <Lock className="w-6 h-6 text-amber-500" />, bg: "bg-amber-500/10 border border-amber-500/20 shadow-amber-500/5", title: "Escrow Engine", desc: "Track transactions where funds are currently held in escrow. Access release sign-offs." },
                { icon: <ChartNoAxesColumnIncreasing className="w-6 h-6 text-pink-500" />, bg: "bg-pink-500/10 border border-pink-500/20 shadow-pink-500/5", title: "Reports & Statement", desc: "Generate secure statements, transaction logs, and export spreadsheet documentation." },
              ].map((item, i) => (
                <motion.div key={i} variants={staggerItem}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 16px 36px rgba(0,0,0,0.03)" }}
                    transition={{ duration: 0.2 }}
                    className="bg-card border border-border rounded-3xl p-6 text-center hover:shadow-xl cursor-pointer transition-colors duration-300"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className={`p-3.5 rounded-2xl ${item.bg} shadow-md`}>{item.icon}</div>
                      <h3 className="text-base font-bold text-foreground mt-2">{item.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mt-1">{item.desc}</p>
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
