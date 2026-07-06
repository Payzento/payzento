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

type DbStatusType = "pending" | "active" | "completed" | "disputed" | "cancelled";
type UIStatusType = "HELD" | "RELEASED" | "DISPUTED" | "CANCELLED";

const statusConfig: Record<UIStatusType, { bg: string; text: string; border: string }> = {
  HELD: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border border-amber-500/20" },
  RELEASED: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border border-emerald-500/20" },
  DISPUTED: { bg: "bg-red-500/10", text: "text-red-500", border: "border border-red-500/20" },
  CANCELLED: { bg: "bg-slate-500/10", text: "text-slate-500", border: "border border-slate-500/20" },
};

interface MerchantTableProps {
  transactions: any[];
}

const MerchantTable = ({ transactions }: MerchantTableProps) => {
  const formatCurrency = (amountKobo: number) => {
    return (amountKobo / 100).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    });
  };

  const mapStatus = (dbStatus: DbStatusType): UIStatusType => {
    if (dbStatus === "completed") return "RELEASED";
    if (dbStatus === "disputed") return "DISPUTED";
    if (dbStatus === "cancelled") return "CANCELLED";
    return "HELD";
  };

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
      
      {transactions.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm py-8">No recent transactions found.</p>
      ) : (
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
            {transactions.map((tx) => {
              const uiStatus = mapStatus(tx.status || "pending");
              const config = statusConfig[uiStatus] || statusConfig.HELD;
              const dateStr = tx.created_at
                ? new Date(tx.created_at).toLocaleDateString("en-NG", { dateStyle: "medium" })
                : "N/A";

              return (
                <motion.tr
                  key={tx.id}
                  className="border-b border-border/60 transition-colors hover:bg-muted/30"
                  variants={staggerItem}
                >
                  <TableCell className="font-semibold text-foreground py-4">
                    #{tx.id ? tx.id.slice(0, 8) : "N/A"}
                  </TableCell>
                  <TableCell className="text-foreground">
                    Buyer #{tx.buyer_id ? tx.buyer_id.slice(0, 6) : "N/A"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.description}</TableCell>
                  <TableCell className="text-foreground font-bold">
                    {formatCurrency(tx.amount || 0)}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center py-1 px-3 rounded-full text-xs font-semibold ${config.text} ${config.border} ${config.bg}`}>
                      {uiStatus}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{dateStr}</TableCell>
                  <TableCell className="cursor-pointer">
                    <Link href={`/review-funds?transactionId=${tx.id}`} className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
                      View
                    </Link>
                  </TableCell>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </Table>
      )}
    </div>
  );
};

export default MerchantTable;
