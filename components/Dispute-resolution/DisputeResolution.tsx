"use client";

import React from "react";
import Nav from "../Nav";
import { MoveLeft, Search, TriangleAlert } from "lucide-react";
import FileUploader from "../FileUploader";
import Link from "next/link";
import DisputeChat from "./DisputeChat";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { scaleIn, staggerContainer, staggerItem } from "@/lib/animations";

const DisputeResolution = () => {
  return (
    <PageWrapper>
      <div className="bg-background text-foreground min-h-screen transition-colors duration-300 pb-12">
        <Nav />

        <motion.section
          className="max-w-3xl mx-auto px-4 mt-24 space-y-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <Link href="/review-funds" className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors mb-4">
            <MoveLeft className="w-4 h-4" />
            Back to Transaction
          </Link>

          <p className="text-2xl font-bold tracking-tight text-foreground">Dispute Resolution</p>

          <motion.section
            className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex flex-col items-start"
            variants={scaleIn}
          >
            <div className="rounded-full text-red-500 py-1 px-3 bg-red-500/15 border border-red-500/20 flex items-center gap-1.5 mb-3 text-xs font-semibold uppercase tracking-wider">
              <TriangleAlert className="w-3.5 h-3.5" />
              <span>Dispute Open</span>
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              Transaction #1234 - Logo Design (₦125,000)
            </p>
          </motion.section>

          <motion.section
            className="bg-card border border-border p-6 rounded-2xl shadow-sm transition-colors duration-300"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <p className="font-bold text-lg text-foreground">Dispute Information</p>

            <motion.div className="my-4" variants={staggerItem}>
              <p className="text-muted-foreground text-sm font-semibold mb-2">
                Reason for Dispute
              </p>
              <textarea
                name=""
                id=""
                placeholder="Explain why you're opening this dispute..."
                className="w-full border border-border bg-background text-foreground focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 p-4 rounded-xl transition-all duration-200"
              ></textarea>
            </motion.div>

            <motion.div variants={staggerItem}>
              <p className="text-muted-foreground text-sm font-semibold mb-2">
                Upload Evidence
              </p>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={scaleIn}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <FileUploader />
              </motion.div>
            </motion.div>
          </motion.section>

          <section>
            <DisputeChat />
          </section>

          <motion.section
            className="w-full flex flex-col items-center justify-center border border-blue-500/20 bg-blue-500/5 p-6 rounded-2xl text-center"
            variants={staggerItem}
          >
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Search className="w-4 h-4" />
              <p className="text-sm font-bold uppercase tracking-wider">Under Review</p>
            </div>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed max-w-md">
              Our support team is currently reviewing this dispute. Funds will remain locked securely in escrow until resolved.
            </p>
          </motion.section>
        </motion.section>
      </div>
    </PageWrapper>
  );
};

export default DisputeResolution;
