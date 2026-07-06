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
    <div className="w-full bg-white border rounded-lg shadow-md p-6 relative">
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

      <h1 className="text-xl font-bold m-5 text-gray-900">Confirm Transaction</h1>

      <div className="w-full flex flex-col gap-2 mb-5">
        <div className="flex items-center justify-between border-b py-4">
          <h1 className="text-gray-500">Amount</h1>
          <p className="text-sm font-semibold text-gray-900">₦{baseAmount.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between border-b py-4">
          <h1 className="text-gray-500">Recipient</h1>
          <p className="text-sm font-semibold text-gray-900">{formData.sellerEmail || "N/A"}</p>
        </div>
        <div className="flex items-center justify-between border-b py-4">
          <h1 className="text-gray-500">Description</h1>
          <p className="text-sm font-semibold text-gray-900">{formData.description || "N/A"}</p>
        </div>

        {formData.milestones.length > 0 && (
          <div className="border-b py-4 flex flex-col gap-2">
            <h1 className="text-gray-500">Milestones</h1>
            <div className="space-y-1">
              {formData.milestones.map((m, idx) => (
                <div key={idx} className="flex justify-between text-xs text-gray-600 pl-2">
                  <span>• {m.title}</span>
                  <span>₦{m.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-b py-4">
          <h1 className="text-gray-500">Transaction Fee (2%)</h1>
          <p className="text-sm font-semibold text-gray-900">₦{fee.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <h1 className="font-bold text-gray-900">Total</h1>
          <p className="text-lg font-bold text-gray-900">₦{total.toLocaleString()}</p>
        </div>

        <div className="w-full bg-[#fffbeb] border-2 border-[#ffd230] rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 text-amber-900">
            <LockKeyhole className="w-4 h-4 shrink-0" />
            <p className="text-sm font-bold">
              Your money will be LOCKED until you release it
            </p>
          </div>
          <p className="text-sm text-center text-amber-800 mt-1">
            The seller cannot access these funds without your approval
          </p>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        disabled={isSubmitting || success}
        className="w-full bg-[#1f54dd] hover:bg-[#1a47be] text-white p-3.5 rounded-xl hover:shadow-2xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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
