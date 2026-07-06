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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<Step1Data>({ resolver: zodResolver(stepSchema) as any, mode: "onChange", defaultValues: { amount: formData.amount ?? undefined, description: formData.description } });

  const onSubmit = (data: Step1Data) => {
    updateFormData(data);
    onNext();
  };

  return (
    <div className="w-full bg-white border rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Transaction Details</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col mb-4">
          <label htmlFor="amount" className="text-sm font-semibold mb-2">
            Amount
          </label>
          <input
            id="amount"
            type="text"
            placeholder="₦ 0.00"
            className="h-12 p-4 border focus:outline-2 focus:outline-blue-400 rounded-xl transition-all duration-200"
            {...register("amount")}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="text-sm font-semibold mb-2">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="What is this payment for?"
            className="h-12 p-4 border focus:outline-2 focus:outline-blue-400 rounded-xl transition-all duration-200"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2 bg-[#eff6ff] border border-[#8fa9ee] rounded-xl p-4">
          <Lightbulb className="w-4" />
          <p className="text-sm">
            <span className="font-bold">Your money is safe:</span> Payment will
            be locked until you approve its release
          </p>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="flex items-center justify-center gap-2 bg-[#2057e0] hover:shadow-2xl text-white font-semibold p-3.5 rounded-xl mt-5 cursor-pointer disabled:bg-[#8fa9ee] disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="w-4" />
        </button>
      </form>
    </div>
  );
};

export default TransactionDetailsStep;
