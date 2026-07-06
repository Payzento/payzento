"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSignupForm } from "@/context/SignupFormContext";
import { motion } from "framer-motion";

type Step2Props = {
  onNext: () => void;
};

const stepSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(
    /^(070|080|081|090|091)\d{8}$/,
    "Must be a valid 11-digit Nigerian mobile number starting with 070/080/081/090/091"
  ),
});

type Step2Data = z.infer<typeof stepSchema>;

export const Step2 = ({ onNext }: Step2Props) => {
  const { formData, updateFormData } = useSignupForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step2Data>({
    resolver: zodResolver(stepSchema),
    mode: "onChange",
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    },
  });

  const onSubmit = (data: Step2Data) => {
    updateFormData(data);
    onNext();
  };

  return (
    <div className="bg-card text-foreground rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md border border-border transition-colors duration-300">
      <div className="text-left mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight mb-2">Personal Info</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Tell us who you are. This information will be used for onboarding and support.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              className="w-full text-foreground bg-card border border-border p-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1 font-semibold">{errors.firstName.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Doe"
              className="w-full text-foreground bg-card border border-border p-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1 font-semibold">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            className="w-full text-foreground bg-card border border-border p-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            placeholder="08012345678"
            className="w-full text-foreground bg-card border border-border p-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone.message}</p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={!isValid}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl mt-4 cursor-pointer font-semibold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-200"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          Continue
        </motion.button>
      </form>
    </div>
  );
};
