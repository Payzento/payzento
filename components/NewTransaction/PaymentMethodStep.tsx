import { CreditCard, House, Plus, Trash2, AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { useTransactionForm, Milestone } from "@/context/TransactionFormContext";

type PaymentMethodProps = {
  onNext: () => void;
};

const PaymentMethodStep = ({ onNext }: PaymentMethodProps) => {
  const { formData, updateFormData } = useTransactionForm();

  // Milestone local form state
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [milestoneError, setMilestoneError] = useState("");

  const transactionAmount = formData.amount ?? 0;

  const milestoneTotal = formData.milestones.reduce(
    (sum, m) => sum + m.amount,
    0
  );

  const remaining = transactionAmount - milestoneTotal;

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    setMilestoneError("");

    if (!title.trim()) {
      setMilestoneError("Milestone title is required");
      return;
    }
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setMilestoneError("Milestone amount must be a number greater than 0");
      return;
    }
    if (transactionAmount > 0 && milestoneTotal + numAmount > transactionAmount) {
      setMilestoneError(
        `Adding ₦${numAmount.toLocaleString()} would exceed the transaction amount of ₦${transactionAmount.toLocaleString()}. Remaining: ₦${remaining.toLocaleString()}`
      );
      return;
    }

    const newMilestone: Milestone = {
      title: title.trim(),
      amount: numAmount,
      dueDate: dueDate || new Date().toISOString().split("T")[0],
    };

    updateFormData({
      milestones: [...formData.milestones, newMilestone],
    });

    setTitle("");
    setAmount("");
    setDueDate("");
  };

  const handleRemoveMilestone = (index: number) => {
    const updated = formData.milestones.filter((_, i) => i !== index);
    updateFormData({ milestones: updated });
  };

  const handleSelectPaymentMethod = (method: string) => {
    updateFormData({ paymentMethod: method });
  };

  // Validation: at least one milestone AND milestones sum exactly equals transaction amount
  const sumError =
    formData.milestones.length > 0 &&
    transactionAmount > 0 &&
    milestoneTotal !== transactionAmount
      ? `Milestone total (₦${milestoneTotal.toLocaleString()}) must equal transaction amount (₦${transactionAmount.toLocaleString()}). Difference: ₦${Math.abs(remaining).toLocaleString()} ${remaining > 0 ? "remaining" : "over"}.`
      : "";

  const isFormValid =
    formData.milestones.length > 0 &&
    formData.paymentMethod !== "" &&
    !sumError &&
    (transactionAmount === 0 || milestoneTotal === transactionAmount);

  return (
    <div className="w-full bg-white border rounded-lg p-6 shadow-md flex flex-col gap-6">
      {/* Milestone Section */}
      <div>
        <h2 className="text-xl font-bold mb-1">Escrow Milestones</h2>
        <p className="text-sm text-gray-500 mb-4">
          Add at least one milestone. Milestone amounts must sum exactly to the
          transaction amount (₦{transactionAmount.toLocaleString()}).
        </p>

        {/* Progress bar */}
        {transactionAmount > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Allocated: ₦{milestoneTotal.toLocaleString()}</span>
              <span
                className={
                  milestoneTotal === transactionAmount
                    ? "text-green-600 font-bold"
                    : remaining < 0
                    ? "text-red-500 font-bold"
                    : "text-blue-600 font-bold"
                }
              >
                {milestoneTotal === transactionAmount
                  ? "✓ Fully allocated"
                  : remaining > 0
                  ? `₦${remaining.toLocaleString()} remaining`
                  : `₦${Math.abs(remaining).toLocaleString()} over budget`}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  milestoneTotal > transactionAmount
                    ? "bg-red-500"
                    : milestoneTotal === transactionAmount
                    ? "bg-green-500"
                    : "bg-blue-500"
                }`}
                style={{
                  width: `${Math.min(
                    (milestoneTotal / transactionAmount) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Add Milestone Form */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-600 mb-1">
                Milestone Title
              </label>
              <input
                type="text"
                placeholder="E.g., Initial Draft"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border rounded-lg text-sm bg-white focus:outline-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-600 mb-1">
                Amount (₦)
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 border rounded-lg text-sm bg-white focus:outline-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-600 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="p-2 border rounded-lg text-sm bg-white focus:outline-blue-500"
              />
            </div>
          </div>
          {milestoneError && (
            <p className="text-red-500 text-xs mb-3 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              {milestoneError}
            </p>
          )}
          <button
            type="button"
            onClick={handleAddMilestone}
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Milestone
          </button>
        </div>

        {/* Milestone List */}
        {formData.milestones.length > 0 ? (
          <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
            {formData.milestones.map((milestone, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 border rounded-xl bg-white text-sm"
              >
                <div>
                  <p className="font-semibold">{milestone.title}</p>
                  <p className="text-xs text-gray-500">Due: {milestone.dueDate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-blue-600">
                    ₦{milestone.amount.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMilestone(idx)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-sm mb-4">
            At least one milestone is required to proceed.
          </p>
        )}

        {/* Sum validation error */}
        {sumError && (
          <p className="text-red-500 text-xs flex items-start gap-1 mb-2">
            <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
            {sumError}
          </p>
        )}
      </div>

      {/* Payment Method Section */}
      <div>
        <h2 className="text-xl font-bold mb-3">Payment Method</h2>
        <p className="text-sm text-gray-500 mb-4">
          Select how you want to fund this escrow transaction.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSelectPaymentMethod("card")}
            className={`w-full text-left border-2 rounded-xl transition-all cursor-pointer ${
              formData.paymentMethod === "card"
                ? "border-blue-600 bg-blue-50/10 shadow-sm"
                : "border-gray-200 hover:border-blue-500"
            }`}
          >
            <div className="flex items-center gap-4 p-4">
              <div className="bg-[#dbeafe] p-3 rounded-full">
                <CreditCard className="text-blue-600" />
              </div>
              <div className="flex flex-col items-start">
                <h4 className="text-[16px] font-semibold text-black">
                  Debit/Credit Card
                </h4>
                <p className="text-xs text-gray-600">Pay instantly with your card</p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectPaymentMethod("bank")}
            className={`w-full text-left border-2 rounded-xl transition-all cursor-pointer ${
              formData.paymentMethod === "bank"
                ? "border-blue-600 bg-blue-50/10 shadow-sm"
                : "border-gray-200 hover:border-blue-500"
            }`}
          >
            <div className="flex items-center gap-4 p-4">
              <div className="bg-[#dbeafe] p-3 rounded-full">
                <House className="text-blue-600" />
              </div>
              <div className="flex flex-col items-start">
                <h4 className="text-[16px] font-semibold text-black">
                  Bank Transfer
                </h4>
                <p className="text-xs text-gray-600">Transfer to virtual account</p>
              </div>
            </div>
          </button>
        </div>

        {!formData.paymentMethod && formData.milestones.length > 0 && (
          <p className="text-red-500 text-xs mt-3 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            Please select a payment method to proceed.
          </p>
        )}
      </div>

      {/* Continue Button */}
      <button
        type="button"
        disabled={!isFormValid}
        onClick={onNext}
        className="w-full bg-[#1f54dd] text-white p-3.5 rounded-xl font-semibold hover:shadow-2xl cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed text-center"
      >
        Continue
      </button>
    </div>
  );
};

export default PaymentMethodStep;
