import React from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTransactionForm } from "@/context/TransactionFormContext";

type AddSellersProps = {
  onNext: () => void;
};

const stepSchema = z.object({
  sellerEmail: z.string().email("Please enter a valid email address"),
});

type Step2Data = z.infer<typeof stepSchema>;

const AddSellersStep = ({ onNext }: AddSellersProps) => {
  const { formData, updateFormData } = useTransactionForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step2Data>({
    resolver: zodResolver(stepSchema),
    mode: "onChange",
    defaultValues: {
      sellerEmail: formData.sellerEmail,
    },
  });

  const onSubmit = (data: Step2Data) => {
    updateFormData(data);
    onNext();
  };

  return (
    <div className="w-full bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">Add Seller</h2>
      <p className="text-xs text-muted-foreground mb-6">Specify the recipient seller by their email to associate with this transaction.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-col">
          <label htmlFor="sellerEmail" className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Seller Email Address
          </label>
          <input
            id="sellerEmail"
            type="email"
            placeholder="seller@example.com"
            className="h-12 px-4 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl transition-all duration-200 text-sm font-semibold"
            {...register("sellerEmail")}
          />
          {errors.sellerEmail && (
            <p className="text-red-500 text-xs mt-1 font-semibold">{errors.sellerEmail.message}</p>
          )}
        </div>

        <div className="flex items-start gap-2.5 bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl">
          <LockKeyhole className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            The seller will receive a secure notification link to register and check terms, but they <span className="font-bold text-foreground">cannot access funds</span> until you explicitly release them.
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

export default AddSellersStep;
