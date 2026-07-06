import { ArrowRight } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMerchantOnboarding } from "@/context/MerchantOnboardingContext";

type BusinessStepProps = {
  onNext: () => void;
};

const stepSchema = z.object({
  businessName: z.string().min(1, "Business Name is required"),
  businessType: z.string().min(1, "Business Type is required"),
  rcNumber: z.string().optional(),
  industry: z.string().min(1, "Industry is required"),
});

type Step1Data = z.infer<typeof stepSchema>;

const BusinessInfo = ({ onNext }: BusinessStepProps) => {
  const { formData, updateFormData } = useMerchantOnboarding();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step1Data>({
    resolver: zodResolver(stepSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    mode: "onChange",
    defaultValues: {
      businessName: formData.businessName,
      businessType: formData.businessType,
      rcNumber: formData.rcNumber ?? "",
      industry: formData.industry,
    },
  });

  const onSubmit = (data: Step1Data) => {
    updateFormData(data);
    onNext();
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-white p-6 border border-gray-200 shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold">Business Information</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="businessName" className="text-sm font-semibold mb-2">
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            placeholder="Your Business Name"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
            {...register("businessName")}
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="businessType" className="text-sm font-semibold mb-2">
            Business Type
          </label>
          <input
            id="businessType"
            type="text"
            placeholder="E.g., E-commerce, Services, Freelance"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
            {...register("businessType")}
          />
          {errors.businessType && (
            <p className="text-red-500 text-sm mt-1">{errors.businessType.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="rcNumber" className="text-sm font-semibold mb-2">
            RC Number (Optional)
          </label>
          <input
            id="rcNumber"
            type="text"
            placeholder="RC123456"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
            {...register("rcNumber")}
          />
          {errors.rcNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.rcNumber.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="industry" className="text-sm font-semibold mb-2">
            Industry
          </label>
          <input
            id="industry"
            type="text"
            placeholder="E.g., Technology, Retail, Finance"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
            {...register("industry")}
          />
          {errors.industry && (
            <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>
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
  );
};

export default BusinessInfo;
