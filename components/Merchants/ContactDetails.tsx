import { ArrowRight } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMerchantOnboarding } from "@/context/MerchantOnboardingContext";

type ContactStepProps = {
  onNext: () => void;
};

const stepSchema = z.object({
  contactName: z.string().min(1, "Contact Name is required"),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().regex(
    /^(070|080|081|090|091)\d{8}$/,
    "Must be a valid 11-digit Nigerian mobile number starting with 070/080/081/090/091"
  ),
  businessAddress: z.string().min(1, "Business Address is required"),
});

type Step2Data = z.infer<typeof stepSchema>;

const ContactDetails = ({ onNext }: ContactStepProps) => {
  const { formData, updateFormData } = useMerchantOnboarding();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step2Data>({
    resolver: zodResolver(stepSchema),
    mode: "onChange",
    defaultValues: {
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      businessAddress: formData.businessAddress,
    },
  });

  const onSubmit = (data: Step2Data) => {
    updateFormData(data);
    onNext();
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-white p-6 border border-gray-200 shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold">Contact Details</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="contactName" className="text-sm font-semibold mb-2">
            Contact Name
          </label>
          <input
            id="contactName"
            type="text"
            placeholder="John Doe"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
            {...register("contactName")}
          />
          {errors.contactName && (
            <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="contactEmail" className="text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            id="contactEmail"
            type="email"
            placeholder="business@example.com"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
            {...register("contactEmail")}
          />
          {errors.contactEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="contactPhone" className="text-sm font-semibold mb-2">
            Phone Number
          </label>
          <input
            id="contactPhone"
            type="text"
            placeholder="08012345678"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
            {...register("contactPhone")}
          />
          {errors.contactPhone && (
            <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="businessAddress" className="text-sm font-semibold mb-2">
            Business Address
          </label>
          <input
            id="businessAddress"
            type="text"
            placeholder="123 Business Rd, Lagos"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
            {...register("businessAddress")}
          />
          {errors.businessAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.businessAddress.message}</p>
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

export default ContactDetails;
