"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { Search, Filter, ArrowRight } from "lucide-react";

type DbStatusType = "pending" | "active" | "completed" | "disputed" | "cancelled";
type UIStatusType = "HELD" | "RELEASED" | "DISPUTED" | "CANCELLED";

const statusConfig: Record<UIStatusType, { bg: string; text: string; border: string; dot: string }> = {
  HELD: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border border-amber-500/20", dot: "bg-amber-500" },
  RELEASED: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border border-emerald-500/20", dot: "bg-emerald-500" },
  DISPUTED: { bg: "bg-red-500/10", text: "text-red-500", border: "border border-red-500/20", dot: "bg-red-500" },
  CANCELLED: { bg: "bg-slate-500/10", text: "text-slate-500", border: "border border-slate-500/20", dot: "bg-slate-500" },
};

interface MerchantTableProps {
  transactions: any[];
}

const MerchantTable = ({ transactions }: MerchantTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

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

  // Filter transactions
  const filtered = transactions.filter((tx) => {
    const buyerStr = `buyer #${tx.buyer_id ? tx.buyer_id.slice(0, 6) : "N/A"}`;
    const matchesSearch =
      tx.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyerStr.toLowerCase().includes(searchTerm.toLowerCase());

    const uiStatus = mapStatus(tx.status || "pending");
    const matchesStatus =
      selectedStatus === "all" ||
      uiStatus.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full bg-card border border-border rounded-3xl p-6 transition-all duration-300">
      
      {/* Table Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Recent Transactions</h2>
          <p className="text-xs text-muted-foreground mt-0.5">View and manage payouts or client disputes.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:max-w-xl">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ID, desc or buyer..."
              className="w-full pl-10 pr-4 py-2.5 border border-border bg-background text-foreground rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* Status selector */}
          <div className="relative shrink-0">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none w-full sm:w-40 pl-3.5 pr-8 py-2.5 border border-border bg-background text-foreground rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="held">Held</option>
              <option value="released">Released</option>
              <option value="disputed">Disputed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>
      
      {filtered.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card/50">
          <p className="text-muted-foreground text-sm font-semibold">No transactions found</p>
          <p className="text-muted-foreground/60 text-xs mt-1">Try relaxing your search terms or filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/80">
                <TableHead className="font-bold text-muted-foreground text-xs uppercase tracking-wider py-4">Transaction ID</TableHead>
                <TableHead className="font-bold text-muted-foreground text-xs uppercase tracking-wider py-4">Buyer</TableHead>
                <TableHead className="font-bold text-muted-foreground text-xs uppercase tracking-wider py-4">Product</TableHead>
                <TableHead className="font-bold text-muted-foreground text-xs uppercase tracking-wider py-4">Amount</TableHead>
                <TableHead className="font-bold text-muted-foreground text-xs uppercase tracking-wider py-4">Status</TableHead>
                <TableHead className="font-bold text-muted-foreground text-xs uppercase tracking-wider py-4">Date</TableHead>
                <TableHead className="font-bold text-muted-foreground text-xs uppercase tracking-wider py-4 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((tx) => {
                const uiStatus = mapStatus(tx.status || "pending");
                const config = statusConfig[uiStatus] || statusConfig.HELD;
                const dateStr = tx.created_at
                  ? new Date(tx.created_at).toLocaleDateString("en-NG", { dateStyle: "medium" })
                  : "N/A";

                return (
                  <TableRow
                    key={tx.id}
                    className="border-b border-border/60 transition-colors hover:bg-muted/40"
                  >
                    <TableCell className="font-mono text-xs font-bold text-foreground py-4">
                      #{tx.id ? tx.id.slice(0, 8) : "N/A"}
                    </TableCell>
                    <TableCell className="text-xs font-bold text-foreground">
                      Buyer #{tx.buyer_id ? tx.buyer_id.slice(0, 6) : "N/A"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                      {tx.description}
                    </TableCell>
                    <TableCell className="text-sm text-foreground font-black">
                      {formatCurrency(tx.amount || 0)}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-[10px] font-bold ${config.text} ${config.border} ${config.bg} tracking-wider`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
                        {uiStatus}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">{dateStr}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/review-funds?transactionId=${tx.id}`}>
                        <motion.button
                          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline flex items-center gap-0.5 ml-auto cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View
                          <ArrowRight className="w-3.5 h-3.5" />
                        </motion.button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MerchantTable;
