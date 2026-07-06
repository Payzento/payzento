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
  const transactionId = searchParams.get("transactionId");
  const { user } = useAuth();

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

  useEffect(() => {
    if (!transactionId) {
      setLoading(false);
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
        <>
          <Nav />
          <div className="max-w-3xl mx-auto px-4 mt-25 text-center py-20">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Transaction Not Found</h2>
            <p className="text-muted-foreground mt-2">The requested transaction does not exist or you do not have permission to view it.</p>
            <Link href="/dashboard" className="inline-block mt-6 text-blue-600 font-bold hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </>
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
      <>
        <Nav />
        <div className="max-w-3xl mx-auto px-4 mt-25 space-y-4 my-2 text-foreground">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-[#6b7ea0] hover:text-black cursor-pointer my-5 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          {message && (
            <div className={`p-4 rounded-xl border flex items-start gap-2.5 text-sm font-semibold ${
              message.type === "success" 
                ? "bg-green-50 text-green-600 border-green-200" 
                : "bg-red-50 text-red-600 border-red-200"
            }`}>
              {message.type === "success" ? <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
              <span>{message.text}</span>
            </div>
          )}

          <motion.div
            className="w-full bg-[#fffcf0] dark:bg-amber-950/20 rounded-xl px-2 py-10 border-2 border-[#fee685] dark:border-amber-500/20 flex flex-col items-center justify-center text-center"
            initial="hidden"
            animate="visible"
            variants={scaleIn}
          >
            <div className="bg-[#df7f07] p-4 rounded-full text-white">
              <Lock className="w-8 h-8" />
            </div>
            <motion.div
              className={`rounded-full flex items-center justify-center gap-2 px-4 py-2 my-4 text-xs font-bold uppercase tracking-wider ${
                transaction.status === "completed" 
                  ? "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400 border border-green-200 dark:border-green-500/20"
                  : transaction.status === "disputed"
                  ? "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-500/20"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20"
              }`}
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              transition={{ delay: 0.15 }}
            >
              <LockKeyhole className="w-4 h-4" />
              <p>FUNDS {transaction.status || "HELD"}</p>
            </motion.div>
            <p className="text-gray-500 text-sm my-2">
              {transaction.status === "completed" 
                ? "Funds have been successfully released to the seller." 
                : transaction.status === "disputed"
                ? "This transaction is currently in dispute. Support is reviewing."
                : "Your money is safe and locked in escrow until milestones are approved."}
            </p>
          </motion.div>

          <TransactionProgress />

          {/* Milestones Section */}
          {milestones.length > 0 && (
            <motion.section
              className="border border-border bg-card p-6 rounded-xl transition-colors duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h3 className="font-bold text-lg mb-4 text-foreground">Transaction Milestones</h3>
              <div className="divide-y divide-border/60">
                {milestones.map((m, index) => (
                  <motion.div key={m.id || index} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4" variants={staggerItem}>
                    <div>
                      <p className="font-bold text-foreground text-base">{m.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Due: {new Date(m.due_date).toLocaleDateString("en-NG", { dateStyle: "medium" })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 justify-between sm:justify-end">
                      <span className="text-lg font-bold text-foreground mr-2">
                        {formatCurrency(m.amount || 0)}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${
                        m.status === "completed"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {m.status || "pending"}
                      </span>
                      {isBuyer && m.status === "pending" && transaction.status !== "completed" && (
                        <button
                          onClick={() => handleReleaseMilestone(m.id)}
                          disabled={actionLoading !== null}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-xs font-bold py-2 px-3.5 rounded-xl cursor-pointer transition-colors"
                        >
                          {actionLoading === m.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Release"}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Transaction Details */}
          <motion.section
            className="border border-border bg-card p-6 rounded-xl transition-colors duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <p className="font-bold text-lg mb-4 text-foreground">Transaction Details</p>
            <div>
              {transactionDetails.map((details, index) => (
                <motion.div key={index} className="my-4" variants={staggerItem}>
                  <div className="flex items-center justify-between my-2">
                    <p className="text-gray-500 text-sm">{details.details1}</p>
                    <p className="font-semibold text-sm">{details.details2}</p>
                  </div>
                  <div className="w-full h-[0.5px] bg-border/60" />
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
            {isBuyer && transaction.status !== "completed" && (
              <motion.section
                className="border border-green-500/20 bg-green-500/5 p-6 rounded-xl"
                variants={fadeUp}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-xl text-green-600">
                    <CircleCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h6 className="font-semibold text-foreground">Ready to Release All Payments?</h6>
                    <p className="text-muted-foreground text-sm mt-0.5">
                      If the full job/order is finished and verified, you can release all remaining escrow funds.
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={handleReleaseAll}
                  disabled={actionLoading !== null}
                  className="w-full bg-[#1f55de] hover:bg-[#1642ad] text-white rounded-xl flex items-center justify-center gap-2 p-3.5 mt-4 hover:shadow-xl font-bold cursor-pointer transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {actionLoading === "all" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <CircleCheck className="w-5 h-5" />
                      Release All Funds
                    </>
                  )}
                </motion.button>
              </motion.section>
            )}

            <motion.section
              className="border border-border bg-card rounded-xl p-6 hover:shadow-xl transition-all duration-300"
              variants={fadeUp}
            >
              <button
                onClick={() => window.open(`mailto:${transaction.seller_email}`)}
                className="w-full flex items-center justify-between gap-2 cursor-pointer"
              >
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <MessageSquare className="text-blue-500 w-5 h-5" />
                  <p>Message Seller ({transaction.seller_email})</p>
                </div>
                <MoveRight className="w-4 h-4 text-gray-400" />
              </button>
            </motion.section>

            {isBuyer && transaction.status !== "completed" && transaction.status !== "disputed" && (
              <motion.section className="hover:bg-red-500/5 rounded-xl p-4 text-center transition-colors" variants={fadeUp}>
                <button
                  onClick={() => setIsDisputeOpen(true)}
                  className="flex items-center justify-center gap-2 text-[#f04444] font-bold w-full cursor-pointer"
                >
                  <TriangleAlert className="w-4 h-4" />
                  <p>Open Dispute</p>
                </button>
              </motion.section>
            )}
          </motion.div>
        </div>

        {/* Dispute Modal */}
        <AnimatePresence>
          {isDisputeOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card text-foreground rounded-2xl shadow-xl max-w-md w-full border border-border p-6 relative"
              >
                <h3 className="font-bold text-xl mb-4 text-foreground flex items-center gap-2 text-red-600">
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
      </>
    </PageWrapper>
  );
};

export default ReviewFunds;
