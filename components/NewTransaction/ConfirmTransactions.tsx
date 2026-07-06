"use client";

import { LockKeyhole, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { useTransactionForm } from "@/context/TransactionFormContext";
import { useAuth } from "@/context/AuthContext";
import { createTransaction } from "@/lib/services/transactions.service";
import { useRouter } from "next/navigation";

const ConfirmTransactions = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { formData, resetFormData } = useTransactionForm();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const baseAmount = formData.amount ?? 0;
  const fee = baseAmount * 0.02;
  const total = baseAmount + fee;

  const handleConfirm = async () => {
    if (!user) {
      setError("You must be logged in to create a transaction.");
      return;
    }
    
    setError("");
    setIsSubmitting(true);

    try {
      await createTransaction(formData, user.id);
      setSuccess(true);
      resetFormData();
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to create escrow transaction. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm relative">
      {success && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2.5 rounded-xl shadow-lg text-sm font-semibold animate-bounce z-50 flex items-center gap-1.5 border border-green-600">
          <ShieldCheck className="w-4.5 h-4.5" /> Escrow funds locked successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-50 text-red-600 border border-red-200 rounded-xl p-3.5 flex items-start gap-2.5 text-sm font-semibold">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">Confirm Transaction</h2>
      <p className="text-xs text-muted-foreground mb-6">Verify transaction specifics before secure vault lock.</p>

      <div className="w-full flex flex-col gap-2 mb-5">
        <div className="flex items-center justify-between border-b border-border/60 py-4 text-sm">
          <span className="text-muted-foreground">Amount</span>
          <p className="font-bold text-foreground">₦{baseAmount.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between border-b border-border/60 py-4 text-sm">
          <span className="text-muted-foreground">Recipient</span>
          <p className="font-bold text-foreground">{formData.sellerEmail || "N/A"}</p>
        </div>
        <div className="flex items-center justify-between border-b border-border/60 py-4 text-sm">
          <span className="text-muted-foreground">Description</span>
          <p className="font-bold text-foreground max-w-[200px] text-right truncate">{formData.description || "N/A"}</p>
        </div>

        {formData.milestones.length > 0 && (
          <div className="border-b border-border/60 py-4 flex flex-col gap-2 text-sm">
            <span className="text-muted-foreground">Milestones</span>
            <div className="space-y-1">
              {formData.milestones.map((m, idx) => (
                <div key={idx} className="flex justify-between text-xs text-muted-foreground pl-2 font-medium">
                  <span>• {m.title}</span>
                  <span className="font-semibold text-foreground">₦{m.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-b border-border/60 py-4 text-sm">
          <span className="text-muted-foreground">Transaction Fee (2%)</span>
          <p className="font-bold text-foreground">₦{fee.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between py-4 text-sm">
          <span className="font-bold text-foreground">Total Paid</span>
          <p className="text-lg font-black text-foreground">₦{total.toLocaleString()}</p>
        </div>

        <div className="w-full bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4">
          <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-500">
            <LockKeyhole className="w-4 h-4 shrink-0" />
            <p className="text-xs font-bold uppercase tracking-wider">
              Payments are Secured
            </p>
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-1 leading-relaxed">
            Funds will remain safely locked in escrow and cannot be accessed by the seller without your explicit milestone approvals.
          </p>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        disabled={isSubmitting || success}
        className="w-full bg-[#1f54dd] hover:bg-[#1a47be] text-white p-3.5 rounded-2xl hover:shadow-lg font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-xs uppercase tracking-wider border border-blue-500/20 shadow-sm"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Locking Funds...
          </>
        ) : (
          "Lock Funds in Escrow"
        )}
      </button>
    </div>
  );
};

export default ConfirmTransactions;
