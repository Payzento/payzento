"use client";

import React from "react";
import Nav from "../Nav";
import Link from "next/link";
import { ArrowDownToLine, ArrowLeft, ArrowUpFromLine, Lock, Wallet } from "lucide-react";
import TransactionList from "./TransactionHistory";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { scaleIn, staggerContainer, staggerItem } from "@/lib/animations";

const Withdrawal = () => {
  return (
    <PageWrapper>
      <div className="bg-background text-foreground min-h-screen transition-colors duration-300 pb-12">
        <Nav />

        <div className="mt-24 max-w-3xl mx-auto px-4 pt-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-foreground my-6">Wallet</h1>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col gap-6">
            <motion.section
              className="w-full bg-gradient-to-br from-[#0c152b] to-[#070f20] border border-[#1a2860] rounded-2xl p-6 shadow-xl relative overflow-hidden"
              variants={scaleIn}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="w-full relative z-10">
                <div className="flex items-center justify-between gap-2 text-blue-200/80">
                  <p className="text-sm font-semibold tracking-wider uppercase">Available Balance</p>
                  <Wallet className="w-5 h-5 text-blue-400" />
                </div>
                <h1 className="text-white text-4xl font-extrabold tracking-tight my-8">₦1,245,000</h1>
                <div className="w-full flex flex-col sm:flex-row items-center gap-3">
                  <motion.button
                    className="bg-white hover:bg-slate-50 text-slate-900 flex flex-1 w-full items-center justify-center text-sm font-semibold gap-2 rounded-xl p-3 shadow-md shadow-black/10 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ArrowUpFromLine className="w-4 h-4" />
                    Withdraw
                  </motion.button>
                  <motion.button
                    className="bg-slate-800/80 border border-slate-700/60 hover:bg-slate-800 text-white flex flex-1 w-full items-center justify-center text-sm font-semibold gap-2 rounded-xl p-3 shadow-md cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ArrowDownToLine className="w-4 h-4" />
                    Add Funds
                  </motion.button>
                </div>
              </div>
            </motion.section>

            <motion.section
              className="w-full bg-card border border-border rounded-2xl p-6 shadow-lg transition-colors duration-300"
              variants={staggerItem}
            >
              <div className="w-full">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="w-4 h-4 text-amber-500" />
                  <p className="text-sm font-semibold tracking-wider uppercase">Pending Balance</p>
                </div>
                <h1 className="text-amber-500 text-4xl font-extrabold tracking-tight my-5">₦245,000</h1>
                <p className="text-muted-foreground text-sm">Locked in 2 active escrow transactions</p>
              </div>
            </motion.section>
          </motion.div>

          <div className="w-full flex items-center justify-between my-8">
            <h1 className="text-xl font-bold tracking-tight text-foreground">Transaction History</h1>
            <button className="text-sm font-semibold hover:underline text-blue-600 dark:text-blue-400">Filter</button>
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
