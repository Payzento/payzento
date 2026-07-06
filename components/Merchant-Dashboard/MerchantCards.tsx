"use client";

import { DollarSign, Lock, MoveUp, TrendingUp, TriangleAlert } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

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
        className="w-full border border-border bg-card shadow-sm p-6 rounded-2xl transition-colors duration-300"
        variants={staggerItem}
        whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.03)" }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full flex items-center justify-between gap-1 mb-3">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Sales</p>
          <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          {formatCurrency(totalSalesKobo)}
        </h1>
        <p className="flex items-center gap-0.5 text-emerald-500 text-xs font-semibold mt-2">
          <MoveUp className="w-3 h-3" />
          Tracked from completed orders
        </p>
      </motion.div>

      {/* PENDING LOCK */}
      <motion.div
        className="w-full border border-amber-500/20 bg-amber-500/5 shadow-sm p-6 rounded-2xl transition-colors duration-300"
        variants={staggerItem}
        whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.03)" }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full flex items-center justify-between gap-1 mb-3">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            Pending (Locked)
          </p>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-amber-500">
          {formatCurrency(pendingPayoutsKobo)}
        </h1>
        <p className="text-muted-foreground/80 text-xs font-medium mt-2">
          {transactions.filter(t => t.status === "active" || t.status === "pending").length} active escrows
        </p>
      </motion.div>

      {/* AVAILABLE BALANCE */}
      <motion.div
        className="w-full border border-blue-500/20 bg-blue-500/5 shadow-sm p-6 rounded-2xl transition-colors duration-300"
        variants={staggerItem}
        whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.03)" }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full flex items-center justify-between gap-1 mb-3">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Available Balance</p>
          <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          {formatCurrency(availableBalanceKobo)}
        </h1>
        <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">
          Withdraw Funds
        </button>
      </motion.div>

      {/* DISPUTE */}
      <motion.div
        className="w-full border border-border bg-card shadow-sm p-6 rounded-2xl transition-colors duration-300"
        variants={staggerItem}
        whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.03)" }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full flex items-center justify-between gap-1 mb-3">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Disputes</p>
          <div className="p-1.5 bg-red-500/10 rounded-lg text-red-500">
            <TriangleAlert className="w-4 h-4" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          {disputeCount}
        </h1>
        <p className={`${disputeCount > 0 ? "text-red-500" : "text-muted-foreground/60"} text-xs font-semibold mt-2`}>
          {disputeCount > 0 ? `${disputeCount} active dispute open` : "No active disputes"}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MerchantCards;
