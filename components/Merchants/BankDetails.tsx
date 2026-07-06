import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useMerchantOnboarding } from '@/context/MerchantOnboardingContext'

type BankDetailsProps = {
  onNext: () => void
}

const stepSchema = z.object({
  bankName: z.string().min(1, "Bank Name is required"),
  accountNumber: z.string().regex(/^\d{10}$/, "Account Number must be exactly 10 digits"),
  accountName: z.string().min(1, "Account Name is required"),
});

type Step3Data = z.infer<typeof stepSchema>;

const BankDetails = ({onNext}: BankDetailsProps) => {
  const { formData, updateFormData } = useMerchantOnboarding();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step3Data>({
    resolver: zodResolver(stepSchema),
    mode: "onChange",
    defaultValues: {
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      accountName: formData.accountName,
    },
  });

  const onSubmit = (data: Step3Data) => {
    updateFormData(data);
    onNext();
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-white p-6 border border-gray-200 shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold">Bank Account Details</h1>
      <p className="text-xs text-gray-400">This is where you&apos;ll receieve your payouts</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="bankName" className="text-sm font-semibold mb-2">
            Bank Name
          </label>
          <input
            id="bankName"
            type="text"
            placeholder="Select your bank"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
            {...register("bankName")}
          />
          {errors.bankName && (
            <p className="text-red-500 text-sm mt-1">{errors.bankName.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="accountNumber" className="text-sm font-semibold mb-2">
            Account Number
          </label>
          <input
            id="accountNumber"
            type="text"
            placeholder="0123456789"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
            {...register("accountNumber")}
          />
          {errors.accountNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.accountNumber.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="accountName" className="text-sm font-semibold mb-2">
            Account Name
          </label>
          <input
            id="accountName"
            type="text"
            placeholder="Account name"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
            {...register("accountName")}
          />
          {errors.accountName && (
            <p className="text-red-500 text-sm mt-1">{errors.accountName.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="flex items-center justify-center gap-2 text-white bg-blue-600 p-3 rounded-lg hover:shadow-xl cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Continue <ArrowRight />
        </button>
      </form>
    </div>
  )
}

export default BankDetails
