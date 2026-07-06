"use client";

import { DollarSign, Lock, MoveUp, TrendingUp, TriangleAlert, ArrowUpRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import Link from "next/link";

interface MerchantCardsProps {
  wallet: any;
  transactions: any[];
}

const MerchantCards = ({ wallet, transactions }: MerchantCardsProps) => {
  const formatCurrency = (amountKobo: number) => {
    return (amountKobo / 100).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    });
  };

  // Calculations
  const totalSalesKobo = transactions
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const pendingPayoutsKobo = transactions
    .filter(t => t.status === "active" || t.status === "pending")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const disputeCount = transactions.filter(t => t.status === "disputed").length;

  const availableBalanceKobo = wallet?.available_balance || 0;

  return (
    <motion.div
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start justify-between gap-6"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* TOTAL SALES */}
      <motion.div
        className="w-full border border-border bg-card shadow-sm p-6 rounded-3xl transition-all hover:border-emerald-500/20 group cursor-pointer"
        variants={staggerItem}
        whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.02)" }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full flex items-center justify-between gap-1 mb-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Sales</p>
          <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          {formatCurrency(totalSalesKobo)}
        </h1>
        <p className="flex items-center gap-0.5 text-emerald-500 text-[10px] font-bold mt-2.5 uppercase tracking-wider">
          <MoveUp className="w-3.5 h-3.5" />
          Tracked completed orders
        </p>
      </motion.div>

      {/* PENDING LOCK */}
      <motion.div
        className="w-full border border-amber-500/20 bg-amber-500/5 shadow-sm p-6 rounded-3xl transition-all hover:border-amber-500/40 group cursor-pointer"
        variants={staggerItem}
        whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.02)" }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full flex items-center justify-between gap-1 mb-3">
          <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Pending (Escrow)</p>
          <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
            <Lock className="w-4 h-4" />
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-amber-500">
          {formatCurrency(pendingPayoutsKobo)}
        </h1>
        <p className="text-muted-foreground/80 text-[10px] font-bold mt-2.5 uppercase tracking-wider">
          {transactions.filter(t => t.status === "active" || t.status === "pending").length} active vault locks
        </p>
      </motion.div>

      {/* AVAILABLE BALANCE */}
      <motion.div
        className="w-full border border-blue-500/20 bg-blue-500/5 shadow-sm p-6 rounded-3xl transition-all hover:border-blue-500/40 group cursor-pointer"
        variants={staggerItem}
        whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.02)" }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full flex items-center justify-between gap-1 mb-3">
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Available Balance</p>
          <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-blue-600 dark:text-blue-400">
          {formatCurrency(availableBalanceKobo)}
        </h1>
        <Link href="/dashboard/withdraw" className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline mt-2.5 flex items-center gap-0.5 uppercase tracking-wider">
          Withdraw Funds
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </motion.div>

      {/* DISPUTE */}
      <motion.div
        className="w-full border border-border bg-card shadow-sm p-6 rounded-3xl transition-all hover:border-red-500/20 group cursor-pointer"
        variants={staggerItem}
        whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.02)" }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full flex items-center justify-between gap-1 mb-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Disputes</p>
          <div className="p-2.5 bg-red-500/10 rounded-xl text-red-500 border border-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
            <TriangleAlert className="w-4 h-4" />
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          {disputeCount}
        </h1>
        <p className={`${disputeCount > 0 ? "text-red-500" : "text-muted-foreground/60"} text-[10px] font-bold mt-2.5 uppercase tracking-wider`}>
          {disputeCount > 0 ? `${disputeCount} active dispute open` : "No active disputes"}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MerchantCards;
