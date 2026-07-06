import { ArrowRight, Lightbulb } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTransactionForm } from "@/context/TransactionFormContext";

type TransactionProps = {
  onNext: () => void;
};

const stepSchema = z.object({
  amount: z.coerce.number({ message: "Amount must be a number" }).positive("Amount must be greater than 0"),
  description: z.string().min(1, "Description is required"),
});

type Step1Data = z.infer<typeof stepSchema>;

const TransactionDetailsStep = ({ onNext }: TransactionProps) => {
  const { formData, updateFormData } = useTransactionForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step1Data>({
    resolver: zodResolver(stepSchema) as any,
    mode: "onChange",
    defaultValues: {
      amount: formData.amount ?? undefined,
      description: formData.description,
    },
  });

  const onSubmit = (data: Step1Data) => {
    updateFormData(data);
    onNext();
  };

  return (
    <div className="w-full bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">Transaction Details</h2>
      <p className="text-xs text-muted-foreground mb-6">Enter the amount to lock in escrow and describe your transaction.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Amount (NGN)
          </label>
          <input
            id="amount"
            type="text"
            placeholder="₦ 0.00"
            className="h-12 px-4 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl transition-all duration-200 text-sm font-semibold"
            {...register("amount")}
          />
          {errors.amount && (
            <p className="text-red-500 text-xs mt-1 font-semibold">{errors.amount.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Description / Deliverable Terms
          </label>
          <input
            id="description"
            type="text"
            placeholder="What is this payment for?"
            className="h-12 px-4 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl transition-all duration-200 text-sm font-semibold"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1 font-semibold">{errors.description.message}</p>
          )}
        </div>

        <div className="flex items-start gap-2.5 bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4">
          <Lightbulb className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-bold text-foreground">Your money is safe:</span> Payment will be locked securely in escrow until you verify work and approve its release.
          </p>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full flex items-center justify-center gap-2 bg-[#2057e0] hover:bg-[#1642ad] text-white font-bold p-3.5 rounded-2xl mt-6 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-xs uppercase tracking-wider border border-blue-500/20 shadow-sm"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default TransactionDetailsStep;
