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
    <div className="w-full bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
      {/* Milestone Section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">Escrow Milestones</h2>
        <p className="text-xs text-muted-foreground mb-6">
          Add at least one milestone. Milestone amounts must sum exactly to the transaction amount (₦{transactionAmount.toLocaleString()}).
        </p>

        {/* Progress bar */}
        {transactionAmount > 0 && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span className="font-semibold">Allocated: ₦{milestoneTotal.toLocaleString()}</span>
              <span
                className={
                  milestoneTotal === transactionAmount
                    ? "text-emerald-500 font-bold"
                    : remaining < 0
                    ? "text-red-500 font-bold"
                    : "text-blue-500 font-bold"
                }
              >
                {milestoneTotal === transactionAmount
                  ? "✓ Fully allocated"
                  : remaining > 0
                  ? `₦${remaining.toLocaleString()} remaining`
                  : `₦${Math.abs(remaining).toLocaleString()} over budget`}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-350 ${
                  milestoneTotal > transactionAmount
                    ? "bg-red-500"
                    : milestoneTotal === transactionAmount
                    ? "bg-emerald-500"
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
        <div className="bg-background border border-border/80 p-5 rounded-2xl mb-4">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Milestone Title
              </label>
              <input
                type="text"
                placeholder="E.g., Initial Draft"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-3 border border-border bg-card text-foreground rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Amount (₦)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="p-3 border border-border bg-card text-foreground rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="p-3 border border-border bg-card text-foreground rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
            </div>
          </div>
          {milestoneError && (
            <p className="text-red-500 text-xs mb-3 flex items-center gap-1.5 font-semibold">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {milestoneError}
            </p>
          )}
          <button
            type="button"
            onClick={handleAddMilestone}
            className="flex items-center justify-center gap-1.5 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 cursor-pointer shadow-sm transition-colors border border-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            Add Milestone
          </button>
        </div>

        {/* Milestone List */}
        {formData.milestones.length > 0 ? (
          <div className="space-y-3 max-h-48 overflow-y-auto mb-4 pr-1">
            {formData.milestones.map((milestone, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border border-border/80 bg-background rounded-2xl text-sm transition-all"
              >
                <div>
                  <p className="font-bold text-foreground">{milestone.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Due: {milestone.dueDate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-blue-600 dark:text-blue-400">
                    ₦{milestone.amount.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMilestone(idx)}
                    className="text-red-500 hover:text-red-700 cursor-pointer p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-xs font-semibold mb-4 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> At least one milestone is required to proceed.
          </p>
        )}

        {/* Sum validation error */}
        {sumError && (
          <p className="text-red-500 text-xs flex items-start gap-1 mb-2 font-semibold">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            {sumError}
          </p>
        )}
      </div>

      {/* Payment Method Section */}
      <div className="border-t border-border pt-6">
        <h2 className="text-lg font-bold tracking-tight text-foreground mb-1">Funding Source</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Select how you want to fund this escrow transaction.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleSelectPaymentMethod("card")}
            className={`text-left border rounded-2xl transition-all cursor-pointer bg-background relative overflow-hidden group ${
              formData.paymentMethod === "card"
                ? "border-blue-600 ring-2 ring-blue-500/20 shadow-sm"
                : "border-border hover:border-blue-500"
            }`}
          >
            <div className="flex items-center gap-3.5 p-4">
              <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 text-blue-500">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="flex flex-col items-start">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Debit Card
                </h4>
                <p className="text-[10px] text-muted-foreground mt-0.5">Pay instantly with Card</p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectPaymentMethod("bank")}
            className={`text-left border rounded-2xl transition-all cursor-pointer bg-background relative overflow-hidden group ${
              formData.paymentMethod === "bank"
                ? "border-blue-600 ring-2 ring-blue-500/20 shadow-sm"
                : "border-border hover:border-blue-500"
            }`}
          >
            <div className="flex items-center gap-3.5 p-4">
              <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 text-blue-500">
                <House className="w-5 h-5" />
              </div>
              <div className="flex flex-col items-start">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Bank Transfer
                </h4>
                <p className="text-[10px] text-muted-foreground mt-0.5">Direct virtual transfer</p>
              </div>
            </div>
          </button>
        </div>

        {!formData.paymentMethod && formData.milestones.length > 0 && (
          <p className="text-red-500 text-xs mt-3 flex items-center gap-1 font-semibold">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            Please select a payment method to proceed.
          </p>
        )}
      </div>

      {/* Continue Button */}
      <button
        type="button"
        disabled={!isFormValid}
        onClick={onNext}
        className="w-full bg-[#1f54dd] hover:bg-[#1642ad] text-white p-3.5 rounded-2xl font-bold cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-center text-xs uppercase tracking-wider border border-blue-500/20 shadow-sm"
      >
        Continue
      </button>
    </div>
  );
};

export default PaymentMethodStep;
