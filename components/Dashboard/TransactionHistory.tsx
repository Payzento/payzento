"use client";

import React, { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, LockKeyhole, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getUserTransactions } from "@/lib/services/transactions.service";

interface TransactionRowProps {
  id: string;
  seller_email: string;
  buyer_id: string;
  amount: number;
  status: string;
  description: string;
  created_at: string;
}

const TransactionRow = ({ tx, currentUserId }: { tx: TransactionRowProps; currentUserId: string }) => {
  const isBuyer = currentUserId === tx.buyer_id;
  const isReceived = !isBuyer;

  const formatCurrency = (amountKobo: number) => {
    return (amountKobo / 100).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    });
  };

  const statusColors = {
    pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    funds_locked: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    active: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    disputed: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
    cancelled: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20",
  }[tx.status] || "bg-slate-500/10 text-slate-600 border border-slate-500/20";

  return (
    <div className="flex items-center justify-between gap-4 bg-card p-5 rounded-2xl border border-border/80 hover:border-blue-500/20 transition-all duration-300 mb-4 shadow-sm group">
      <div className="flex items-center gap-3">
        <div
          className={`rounded-xl p-2.5 shrink-0 ${isReceived ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"}`}
        >
          {isReceived ? (
            <ArrowDownToLine className="w-5 h-5" />
          ) : (
            <ArrowUpFromLine className="w-5 h-5" />
          )}
        </div>
        
        <div className="min-w-0">
          <p className="font-bold text-foreground text-sm truncate">
            {isReceived ? `Escrow from Buyer #${tx.buyer_id.slice(0, 6)}` : `Escrow Payment to ${tx.seller_email}`}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{tx.description}</p>
          
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="text-[10px] text-muted-foreground/80 flex items-center gap-1 font-semibold">
              <Calendar className="w-3 h-3" />
              {new Date(tx.created_at).toLocaleDateString("en-NG", { dateStyle: "medium" })}
            </span>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${statusColors}`}>
              {tx.status === "funds_locked" ? "FUNDS LOCKED" : tx.status}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className={`text-base font-black ${isReceived ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
          {isReceived ? "+" : "-"}{formatCurrency(tx.amount || 0)}
        </p>
      </div>
    </div>
  );
};

const TransactionList = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchHistory = async () => {
      try {
        const txs = await getUserTransactions(user.id);
        setTransactions(txs);
      } catch (err) {
        console.error("Error loading history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed border-border rounded-3xl bg-card">
        <p className="text-muted-foreground text-sm font-semibold">No transactions logged</p>
        <p className="text-muted-foreground/60 text-xs mt-1">Start a payment to fund your first wallet escrow.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {transactions.map((tx) => (
        <TransactionRow key={tx.id} tx={tx} currentUserId={user!.id} />
      ))}
    </div>
  );
};

export default TransactionList;
