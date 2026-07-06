"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSignupForm } from "@/context/SignupFormContext";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export const Step4 = () => {
  const router = useRouter();
  const { formData, updateFormData } = useSignupForm();
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) return;

    setIsSubmitting(true);

    // Log complete form data as required by spec
    console.log("SignupFormData:", {
      accountType: formData.accountType,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      agreedToTerms: formData.agreedToTerms,
    });

    setShowToast(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    router.push("/dashboard");
  };

  return (
    <div className="bg-card text-foreground rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md border border-border relative transition-colors duration-300">
      {showToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-semibold animate-bounce z-50 flex items-center gap-1.5 border border-green-600">
          <ShieldCheck className="w-4.5 h-4.5" /> Account created successfully!
        </div>
      )}

      <div className="text-left mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight mb-2">
          Review &amp; Confirm
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Double check your details before activating your account.
        </p>
      </div>

      {/* Summary panel — renders real context values */}
      <div className="space-y-3.5 mb-6 bg-muted/40 p-5 rounded-2xl border border-border/80 text-sm text-foreground">
        <div className="flex justify-between items-center py-0.5">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            Account Type
          </span>
          <span
            className={`font-bold capitalize text-xs px-2.5 py-1 rounded-full ${
              formData.accountType === "merchant"
                ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/15"
                : "bg-blue-500/10 text-blue-500 border border-blue-500/15"
            }`}
          >
            {formData.accountType ?? "buyer"}
          </span>
        </div>

        <div className="flex justify-between items-center border-t border-border/60 pt-3">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            Full Name
          </span>
          <span className="font-semibold text-sm">
            {formData.firstName} {formData.lastName}
          </span>
        </div>

        <div className="flex justify-between items-center border-t border-border/60 pt-3">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            Email Address
          </span>
          <span className="font-semibold text-sm truncate max-w-[55%] text-right">
            {formData.email}
          </span>
        </div>

        <div className="flex justify-between items-center border-t border-border/60 pt-3">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            Phone
          </span>
          <span className="font-semibold text-sm">{formData.phone}</span>
        </div>

        <div className="flex justify-between items-center border-t border-border/60 pt-3">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            Password
          </span>
          <span className="font-semibold text-sm tracking-widest">
            {"•".repeat(Math.min(formData.password.length, 10))}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Terms checkbox — must be checked to enable submit */}
        <div className="flex items-start gap-3 p-3.5 bg-muted/20 border border-border rounded-xl cursor-pointer">
          <input
            id="agreedToTerms"
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={(e) => updateFormData({ agreedToTerms: e.target.checked })}
            className="w-4 h-4 mt-0.5 text-blue-600 border-border rounded focus:ring-blue-500 cursor-pointer"
          />
          <label
            htmlFor="agreedToTerms"
            className="text-xs text-muted-foreground leading-normal select-none cursor-pointer"
          >
            I agree to the Payzento{" "}
            <a href="/terms" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            .
          </label>
        </div>

        {!formData.agreedToTerms && (
          <p className="text-red-500 text-xs font-semibold text-center">
            You must agree to the Terms &amp; Privacy Policy to continue.
          </p>
        )}

        <motion.button
          type="submit"
          disabled={!formData.agreedToTerms || isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl mt-4 cursor-pointer font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-200"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {isSubmitting ? "Creating Account..." : "Confirm & Sign Up"}
        </motion.button>
      </form>
    </div>
  );
};
