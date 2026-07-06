"use client";

import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import {
  ArrowLeft,
  CircleCheck,
  Lock,
  LockKeyhole,
  MessageSquare,
  MoveRight,
  TriangleAlert,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Calendar,
  DollarSign,
  User,
  Plus,
} from "lucide-react";
import Link from "next/link";
import TransactionProgress from "../TransactionProgress";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { fadeUp, staggerContainer, staggerItem, scaleIn } from "@/lib/animations";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getTransactionById, updateMilestoneStatus, releaseAllFunds } from "@/lib/services/transactions.service";
import { createDispute } from "@/lib/services/dispute.service";
import { createClient } from "@/lib/supabase/client";

const ReviewFunds = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<any>(null);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Dispute Modal state
  const [isDisputeOpen, setIsDisputeOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState("Item not received");
  const [disputeDesc, setDisputeDesc] = useState("");
  const [disputeSubmitting, setDisputeSubmitting] = useState(false);

  // Detect transactionId from query string or URL path segments
  useEffect(() => {
    let id = searchParams.get("transactionId");
    if (!id && typeof window !== "undefined") {
      const parts = window.location.pathname.split("/");
      const lastPart = parts[parts.length - 1];
      if (lastPart && lastPart !== "transactions" && lastPart !== "review-funds") {
        id = lastPart;
      }
    }
    setTransactionId(id);
  }, [searchParams]);

  useEffect(() => {
    if (!transactionId) {
      if (loading) setLoading(false);
      return;
    }

    const loadTransaction = async () => {
      try {
        const data = await getTransactionById(transactionId);
        if (data) {
          setTransaction(data);
          setMilestones(data.milestones || []);
        }
      } catch (err) {
        console.error("Error loading transaction:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTransaction();

    const clientSupabase = createClient();
    
    // Subscribe to transaction changes
    const txSub = clientSupabase
      .channel(`review-tx-${transactionId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
          filter: `id=eq.${transactionId}`,
        },
        async () => {
          const data = await getTransactionById(transactionId);
          if (data) {
            setTransaction(data);
          }
        }
      )
      .subscribe();

    // Subscribe to milestones changes
    const milestoneSub = clientSupabase
      .channel(`review-milestones-${transactionId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "milestones",
          filter: `transaction_id=eq.${transactionId}`,
        },
        async () => {
          const data = await getTransactionById(transactionId);
          if (data) {
            setMilestones(data.milestones || []);
          }
        }
      )
      .subscribe();

    return () => {
      clientSupabase.removeChannel(txSub);
      clientSupabase.removeChannel(milestoneSub);
    };
  }, [transactionId]);

  const formatCurrency = (amountKobo: number) => {
    return (amountKobo / 100).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    });
  };

  const isBuyer = user?.id === transaction?.buyer_id;

  const handleReleaseMilestone = async (milestoneId: string) => {
    setActionLoading(milestoneId);
    setMessage(null);
    try {
      await updateMilestoneStatus(milestoneId, "completed");
      setMessage({ type: "success", text: "Milestone status updated to completed!" });
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: err?.message || "Failed to update milestone status." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReleaseAll = async () => {
    if (!transaction) return;
    setActionLoading("all");
    setMessage(null);
    try {
      await releaseAllFunds(transaction.id);
      setMessage({ type: "success", text: "All funds have been successfully released to the seller!" });
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: err?.message || "Failed to release funds." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleOpenDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction || !user) return;
    setDisputeSubmitting(true);
    setMessage(null);

    try {
      await createDispute({
        transactionId: transaction.id,
        buyerId: user.id,
        sellerId: transaction.seller_id,
        reason: disputeReason,
        description: disputeDesc,
      });

      setIsDisputeOpen(false);
      router.push(`/dispute-resolution?transactionId=${transaction.id}`);
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: err?.message || "Failed to open dispute." });
      setDisputeSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060b18] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="text-3xl font-black tracking-wider animate-pulse">
            PAYZENTO
          </div>
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <PageWrapper>
        <div className="bg-background text-foreground min-h-screen pb-12">
          <Nav />
          <div className="max-w-3xl mx-auto px-4 mt-25 text-center py-20">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Transaction Not Found</h2>
            <p className="text-muted-foreground mt-2">The requested transaction does not exist or you do not have permission to view it.</p>
            <Link href="/dashboard" className="inline-block mt-6 text-blue-600 font-bold hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const baseAmount = transaction.amount || 0;
  const fee = baseAmount * 0.02;
  const netAmount = baseAmount; // Net to seller

  const transactionDetails = [
    { details1: "Amount", details2: formatCurrency(baseAmount) },
    { details1: "Seller Email", details2: transaction.seller_email },
    { details1: "Description", details2: transaction.description },
    { details1: "Transaction Fee (2%)", details2: formatCurrency(fee) },
    { details1: "Net to Seller", details2: formatCurrency(netAmount) },
    { details1: "Date Created", details2: new Date(transaction.created_at).toLocaleDateString("en-NG", { dateStyle: "medium" }) },
  ];

  return (
    <PageWrapper>
      <div className="bg-background text-foreground min-h-screen pb-16">
        <Nav />
        <div className="max-w-3xl mx-auto px-4 mt-24 space-y-6">
          
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          {message && (
            <div className={`p-4 rounded-2xl border flex items-start gap-2.5 text-sm font-semibold ${
              message.type === "success" 
                ? "bg-green-50 text-green-700 border-green-200" 
                : "bg-red-50 text-red-700 border-red-200"
            }`}>
              {message.type === "success" ? <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
              <span>{message.text}</span>
            </div>
          )}

          {/* Locked Status Banner */}
          <motion.div
            className="w-full bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/10 p-8 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={scaleIn}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-amber-600 dark:text-amber-500 mb-4">
              <Lock className="w-7 h-7" />
            </div>

            <div className={`rounded-full flex items-center justify-center gap-2 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${
              transaction.status === "completed" 
                ? "bg-green-50 text-green-700 border border-green-200"
                : transaction.status === "disputed"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}>
              <LockKeyhole className="w-3.5 h-3.5" />
              <span>Vault Status: {transaction.status === "funds_locked" ? "FUNDS LOCKED" : (transaction.status || "HELD")}</span>
            </div>

            <p className="text-muted-foreground text-xs mt-3 max-w-md leading-relaxed">
              {transaction.status === "completed" 
                ? "Funds have been successfully released to the seller." 
                : transaction.status === "disputed"
                ? "This transaction is currently in dispute. Our support team is actively reviewing evidence."
                : "Escrow secures these funds. Payment is only released as milestones are completed."}
            </p>
          </motion.div>

          {/* Dynamic Progress Component */}
          <TransactionProgress status={transaction.status} />

          {/* Milestones Section */}
          {milestones.length > 0 && (
            <motion.section
              className="border border-border bg-card p-6 rounded-3xl transition-colors duration-300 shadow-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h3 className="font-bold text-sm text-foreground uppercase tracking-wider text-muted-foreground mb-4">Milestone Tracker</h3>
              <div className="divide-y divide-border/60">
                {milestones.map((m, index) => (
                  <motion.div key={m.id || index} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4" variants={staggerItem}>
                    <div>
                      <p className="font-bold text-foreground text-sm">{m.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Due: {new Date(m.due_date).toLocaleDateString("en-NG", { dateStyle: "medium" })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 justify-between sm:justify-end">
                      <span className="text-base font-black text-foreground mr-2">
                        {formatCurrency(m.amount || 0)}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${
                        m.status === "completed"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {m.status || "pending"}
                      </span>
                      {isBuyer && m.status === "pending" && transaction.status !== "completed" && (
                        <motion.button
                          onClick={() => handleReleaseMilestone(m.id)}
                          disabled={actionLoading !== null}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-[10px] font-bold py-1.5 px-3.5 rounded-xl cursor-pointer transition-colors shadow-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {actionLoading === m.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Release"}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Transaction Details */}
          <motion.section
            className="border border-border bg-card p-6 rounded-3xl transition-colors duration-300 shadow-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <h3 className="font-bold text-sm text-foreground uppercase tracking-wider text-muted-foreground mb-4">Transaction Details</h3>
            <div className="space-y-4">
              {transactionDetails.map((details, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <div className="flex items-center justify-between text-xs py-1">
                    <p className="text-muted-foreground">{details.details1}</p>
                    <p className="font-bold text-foreground text-right max-w-[240px] truncate">{details.details2}</p>
                  </div>
                  <div className="w-full h-[1px] bg-border/40 mt-3" />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {isBuyer && transaction.status !== "completed" && (
              <motion.section
                className="border border-green-500/15 bg-green-500/5 p-6 rounded-3xl"
                variants={fadeUp}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-green-500/10 p-2.5 rounded-xl text-green-600 border border-green-500/20">
                    <CircleCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h6 className="font-bold text-sm text-foreground">Ready to Release All Payments?</h6>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      If the full job/order is finished and verified, you can release all remaining escrow funds.
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={handleReleaseAll}
                  disabled={actionLoading !== null}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-2 py-3.5 mt-4 hover:shadow-lg font-bold cursor-pointer transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-xs border border-blue-500/20"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {actionLoading === "all" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <CircleCheck className="w-4 h-4" />
                      Release All Funds
                    </>
                  )}
                </motion.button>
              </motion.section>
            )}

            <motion.section
              className="border border-border bg-card rounded-3xl p-6 hover:shadow-md transition-all duration-300 group"
              variants={fadeUp}
            >
              <button
                onClick={() => window.open(`mailto:${transaction.seller_email}`)}
                className="w-full flex items-center justify-between gap-2 cursor-pointer"
              >
                <div className="flex items-center gap-2.5 text-foreground font-bold text-xs uppercase tracking-wider">
                  <MessageSquare className="text-blue-500 w-5 h-5" />
                  <span>Message Partner ({transaction.seller_email})</span>
                </div>
                <MoveRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.section>

            {isBuyer && transaction.status !== "completed" && transaction.status !== "disputed" && (
              <motion.section className="hover:bg-red-500/5 rounded-2xl p-4 text-center transition-colors" variants={fadeUp}>
                <button
                  onClick={() => setIsDisputeOpen(true)}
                  className="flex items-center justify-center gap-2 text-red-500 font-bold w-full cursor-pointer text-xs uppercase tracking-wider"
                >
                  <TriangleAlert className="w-4 h-4" />
                  <span>File/Open Dispute</span>
                </button>
              </motion.section>
            )}
            
            {transaction.status === "disputed" && (
              <motion.section className="hover:bg-red-500/5 rounded-2xl p-4 text-center transition-colors" variants={fadeUp}>
                <Link
                  href={`/dispute-resolution?transactionId=${transaction.id}`}
                  className="flex items-center justify-center gap-2 text-red-500 font-bold w-full cursor-pointer text-xs uppercase tracking-wider animate-pulse"
                >
                  <TriangleAlert className="w-4 h-4" />
                  <span>Go to Dispute resolution board</span>
                </Link>
              </motion.section>
            )}
          </motion.div>
        </div>

        {/* Dispute Modal */}
        <AnimatePresence>
          {isDisputeOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card text-foreground rounded-3xl shadow-xl max-w-md w-full border border-border p-6 relative"
              >
                <h3 className="font-bold text-lg mb-4 text-red-600 flex items-center gap-2">
                  <TriangleAlert className="w-5 h-5" /> Open Dispute
                </h3>
                <form onSubmit={handleOpenDispute} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Reason for Dispute
                    </label>
                    <select
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                      className="w-full border border-border bg-background text-foreground rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    >
                      <option value="Item not received">Item not received</option>
                      <option value="Item not as described">Item not as described</option>
                      <option value="Seller unresponsive">Seller unresponsive</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Explain the issue
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={disputeDesc}
                      onChange={(e) => setDisputeDesc(e.target.value)}
                      placeholder="Please provide full details about this dispute. Be clear and thorough so arbitrator can review."
                      className="w-full border border-border bg-background text-foreground rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setIsDisputeOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-border hover:bg-muted text-sm font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={disputeSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold flex items-center gap-1.5 cursor-pointer disabled:bg-gray-400"
                    >
                      {disputeSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Open Dispute"
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
};

export default ReviewFunds;
