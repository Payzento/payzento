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
    <div className="w-full bg-white border rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Sellers</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="sellerEmail" className="text-sm font-semibold mb-2">
            Seller Email or Username
          </label>
          <input
            id="sellerEmail"
            type="email"
            placeholder="seller@example.com"
            className="h-12 p-4 border focus:outline-2 focus:outline-blue-400 rounded-xl"
            {...register("sellerEmail")}
          />
          {errors.sellerEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.sellerEmail.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2 bg-[#fffbeb] border border-[#fee994] p-4 rounded-xl">
          <LockKeyhole className="w-3.5" />
          <p className="text-sm "> The seller will be notified but cannot access funds until you release payment </p>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="flex items-center justify-center hover:shadow-xl gap-2 bg-[#2057e0] text-white font-semibold p-3.5 rounded-xl mt-5 cursor-pointer disabled:bg-[#8fa9ee] disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="w-4" />
        </button>
      </form>
    </div>
  );
};

export default AddSellersStep;
