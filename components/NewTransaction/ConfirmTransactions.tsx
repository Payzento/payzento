"use client";

import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useTransactionForm } from "@/context/TransactionFormContext";

const ConfirmTransactions = () => {
  const { formData } = useTransactionForm();

  const baseAmount = formData.amount ?? 0;
  const fee = baseAmount * 0.02;
  const total = baseAmount + fee;

  return (
    <div className="w-full bg-white border rounded-lg shadow-md p-6">
      <h1 className="text-xl font-bold m-5">Confirm Transaction</h1>

      <div className="w-full flex flex-col gap-2 mb-5">
        <div className="flex items-center justify-between border-b py-4">
          <h1 className="text-gray-500">Amount</h1>
          <p className="text-sm font-semibold">₦{baseAmount.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between border-b py-4">
          <h1 className="text-gray-500">Recipient</h1>
          <p className="text-sm font-semibold">{formData.sellerEmail || "N/A"}</p>
        </div>
        <div className="flex items-center justify-between border-b py-4">
          <h1 className="text-gray-500">Description</h1>
          <p className="text-sm font-semibold">{formData.description || "N/A"}</p>
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
          <p className="text-sm font-semibold">₦{fee.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <h1 className="font-bold">Total</h1>
          <p className="text-lg font-bold">₦{total.toLocaleString()}</p>
        </div>

        <div className="w-full bg-[#fffbeb] border-2 border-[#ffd230] rounded-lg p-4">
          <div className="flex items-center justify-center gap-2">
            <LockKeyhole className="w-4" />
            <p className="text-sm font-bold">
              Your money will be LOCKED until you release it
            </p>
          </div>
          <p className="text-sm text-center text-gray-400 mt-1">
            The seller cannot access these funds without your approval
          </p>
        </div>
      </div>

      <button className="w-full bg-[#1f54dd] text-white p-3 rounded-xl hover:shadow-2xl font-semibold cursor-pointer">
        <Link href="/review-funds" className="block w-full text-center">
          Confirm & Pay
        </Link>
      </button>
    </div>
  );
};

export default ConfirmTransactions;
