"use client";

import React from "react";
import Nav from "../Nav";
import { ChevronsLeftRight, Link2, Lock } from "lucide-react";
import MerchantTable from "./MerchantTable";
import MerchantCards from "./MerchantCards";
import Link from "next/link";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const MerchantDashboard = () => {
  return (
    <PageWrapper>
      <div className="bg-background text-foreground min-h-screen transition-colors duration-300 pb-12">
        <Nav />

        <div className="w-full mt-24 mb-10">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-4">
            <motion.div
              className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem}>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Merchant Dashboard</h1>
                <p className="text-muted-foreground mt-1.5">Manage your payments and developer integrations</p>
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
              <MerchantCards />
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

            <MerchantTable />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MerchantDashboard;
