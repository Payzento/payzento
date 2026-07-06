"use client";

import React from "react";
import Nav from "../Nav";
import {
  ArrowLeft,
  CircleCheck,
  Lock,
  LockKeyhole,
  MessageSquare,
  MoveRight,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import TransactionProgress from "../TransactionProgress";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { fadeUp, staggerContainer, staggerItem, scaleIn } from "@/lib/animations";

type DetailsProps = { details1: string; details2: string };

const transactionDetails: DetailsProps[] = [
  { details1: "Amount", details2: "₦125,000" },
  { details1: "Seller", details2: "Adewale Graphics" },
  { details1: "Description", details2: "Logo Design" },
  { details1: "Transaction Fee", details2: "₦2,500" },
  { details1: "Net to Seller", details2: "₦122,500" },
  { details1: "Date Created", details2: "March 29, 2026" },
];

const ReviewFunds = () => {
  return (
    <PageWrapper>
      <>
        <Nav />
        <div className="max-w-3xl mx-auto px-4 mt-25 space-y-4 my-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-[#6b7ea0] hover:text-black cursor-pointer my-5"
          >
            <ArrowLeft />
            Back to Dashboard
          </Link>

          <motion.div
            className="w-full bg-[#fffcf0] rounded-xl px-2 py-10 border-2 border-[#fee685] flex flex-col items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={scaleIn}
          >
            <div className="bg-[#df7f07] p-4 rounded-full text-white">
              <Lock className="w-8 h-8" />
            </div>
            <motion.div
              className="bg-red-200 text-red-600 rounded-full flex items-center justify-center gap-2 px-4 py-2 my-4"
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              transition={{ delay: 0.15 }}
            >
              <LockKeyhole className="w-4 h-4" />
              <p className="text-sm">FUNDS HELD</p>
            </motion.div>
            <p className="text-gray-400 text-sm text-center my-2">
              Your money is safe and locked until you release it
            </p>
          </motion.div>

          <TransactionProgress />

          {/* Transaction Details */}
          <motion.section
            className="border border-gray-300 p-6 rounded-xl mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <p className="font-semibold">Transaction Details</p>
            <div>
              {transactionDetails.map((details, index) => (
                <motion.div key={index} className="my-5" variants={staggerItem}>
                  <div className="flex items-center justify-between my-2">
                    <p className="text-gray-400">{details.details1}</p>
                    <p className="">{details.details2}</p>
                  </div>
                  <div className="w-full h-[0.5px] bg-gray-300" />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Action buttons — staggered */}
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.section
              className="border border-green-400 p-6 rounded-xl"
              variants={fadeUp}
            >
              <div className="flex items-start gap-2">
                <div>
                  <CircleCheck className="text-green-400" />
                </div>
                <div>
                  {" "}
                  <h6 className="font-semibold mb-1">Ready to Release Payment?</h6>
                  <p className="text-gray-400 text-sm">
                    If you&apos;ve received the delivery and are satisfied, you can release payment to the seller
                  </p>
                </div>
              </div>
              <motion.button
                className="w-full bg-[#1f55de] rounded-xl flex items-center justify-center gap-2 p-3 text-white mt-4 hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <CircleCheck />
                Release Payment
              </motion.button>
            </motion.section>

            <motion.section
              className="border border-gray-300 rounded-xl p-6 hover:shadow-xl"
              variants={fadeUp}
            >
              <motion.button
                className="w-full flex items-center justify-between gap-2 cursor-pointer"
                whileHover={{ scale: 1.01, opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="text-blue-500" />
                  <p>Message Seller</p>
                </div>
                <MoveRight className="w-3 h-3 text-gray-400" />
              </motion.button>
            </motion.section>

            <motion.section className="hover:bg-red-50 rounded-xl p-4" variants={fadeUp}>
              <Link
                href="/dispute-resolution"
                className="flex items-center justify-center gap-2 text-[#f04444]"
              >
                <TriangleAlert className="w-4 h-4" />
                <p>Open Dispute</p>
              </Link>
            </motion.section>
          </motion.div>
        </div>
      </>
    </PageWrapper>
  );
};

export default ReviewFunds;
