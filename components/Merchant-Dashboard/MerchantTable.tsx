"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

type StatusType = "HELD" | "REALEASED" | "DISPUTED";

const statusConfig: Record<StatusType, { bg: string; text: string; border: string }> = {
  HELD: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border border-amber-500/20" },
  REALEASED: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border border-emerald-500/20" },
  DISPUTED: { bg: "bg-red-500/10", text: "text-red-500", border: "border border-red-500/20" },
};

type StatusItem = { stats: StatusType };
type MerchantProps = {
  taxID: string;
  buyer: string;
  product: string;
  amount: string;
  status: StatusItem[];
  date: string;
  action: string;
};

const merchantTable: MerchantProps[] = [
  { taxID: "TXN001", buyer: "john@example.com", product: "Premium Package", amount: "₦125,000", status: [{ stats: "HELD" }], date: "2 hours ago", action: "View" },
  { taxID: "TXN002", buyer: "john@example.com", product: "Premium Package", amount: "₦125,000", status: [{ stats: "REALEASED" }], date: "2 hours ago", action: "View" },
  { taxID: "TXN003", buyer: "john@example.com", product: "Premium Package", amount: "₦125,000", status: [{ stats: "HELD" }], date: "2 hours ago", action: "View" },
  { taxID: "TXN004", buyer: "john@example.com", product: "Premium Package", amount: "₦125,000", status: [{ stats: "DISPUTED" }], date: "2 hours ago", action: "View" },
];

const MerchantTable = () => {
  return (
    <div className="w-full bg-card border border-border rounded-2xl p-6 transition-colors duration-300">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-xl font-bold tracking-tight text-foreground">Recent Transactions</h1>
        <motion.button
          className="text-sm font-semibold py-2 px-4 rounded-xl hover:bg-muted text-foreground transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          View All
        </motion.button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border">
            <TableHead className="font-bold text-muted-foreground">Transaction ID</TableHead>
            <TableHead className="font-bold text-muted-foreground">Buyer</TableHead>
            <TableHead className="font-bold text-muted-foreground">Product</TableHead>
            <TableHead className="font-bold text-muted-foreground">Amount</TableHead>
            <TableHead className="font-bold text-muted-foreground">Status</TableHead>
            <TableHead className="font-bold text-muted-foreground">Date</TableHead>
            <TableHead className="font-bold text-muted-foreground">Action</TableHead>
          </TableRow>
        </TableHeader>
        <motion.tbody
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {merchantTable.map((merchant) => (
            <motion.tr
              key={merchant.taxID}
              className="border-b border-border/60 transition-colors hover:bg-muted/30"
              variants={staggerItem}
            >
              <TableCell className="font-semibold text-foreground py-4">{merchant.taxID}</TableCell>
              <TableCell className="text-foreground">{merchant.buyer}</TableCell>
              <TableCell className="text-muted-foreground">{merchant.product}</TableCell>
              <TableCell className="text-foreground font-bold">{merchant.amount}</TableCell>
              <TableCell>
                {merchant.status.map((stat, index) => {
                  const config = statusConfig[stat.stats];
                  return (
                    <span key={index} className={`inline-flex items-center py-1 px-3 rounded-full text-xs font-semibold ${config.text} ${config.border} ${config.bg}`}>
                      {stat.stats}
                    </span>
                  );
                })}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">{merchant.date}</TableCell>
              <TableCell className="cursor-pointer">
                <Link href={`/merchants-dashboard/transactions/${merchant.taxID}`} className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  {merchant.action}
                </Link>
              </TableCell>
            </motion.tr>
          ))}
        </motion.tbody>
      </Table>
    </div>
  );
};

export default MerchantTable;
