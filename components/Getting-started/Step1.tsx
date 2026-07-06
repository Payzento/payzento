"use client";

import { CreditCard, User } from "lucide-react";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useSignupForm } from "@/context/SignupFormContext";
import { motion } from "framer-motion";

type Step1Props = {
  onNext: () => void;
};

export const Step1 = ({ onNext }: Step1Props) => {
  const { formData, updateFormData } = useSignupForm();

  const handleSelect = (type: "buyer" | "merchant") => {
    updateFormData({ accountType: type });
    onNext();
  };

  return (
    <div className="bg-card text-foreground rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md border border-border transition-colors duration-300">
      <div className="text-left mb-8">
        <h2 className="text-2xl font-extrabold tracking-tight mb-2">What brings you here?</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Select your primary transaction model to customize your workspace.
        </p>
      </div>

      <div className="space-y-4">
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Card
            onClick={() => handleSelect("buyer")}
            className={`border cursor-pointer transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/5 ${
              formData.accountType === "buyer" 
                ? "border-blue-500 bg-blue-500/10 dark:bg-blue-500/10 shadow-sm" 
                : "border-border bg-card"
            }`}
          >
            <CardHeader className="flex flex-row items-start gap-4 p-5">
              <div className="bg-blue-500/15 p-3.5 rounded-2xl border border-blue-500/20 text-blue-500 flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base font-bold text-foreground mb-1">I want to pay safely</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  Buy services, goods, or digital products with full escrow refund protection.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Card
            onClick={() => handleSelect("merchant")}
            className={`border cursor-pointer transition-all duration-200 hover:border-indigo-500/50 hover:bg-indigo-500/5 ${
              formData.accountType === "merchant" 
                ? "border-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/10 shadow-sm" 
                : "border-border bg-card"
            }`}
          >
            <CardHeader className="flex flex-row items-start gap-4 p-5">
              <div className="bg-indigo-500/15 p-3.5 rounded-2xl border border-indigo-500/20 text-indigo-500 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base font-bold text-foreground mb-1">I want to receive payments</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  Sell products or services, request milestone releases, and build developer integrations.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </div>

      {!formData.accountType && (
        <p className="text-red-500 text-xs font-semibold text-center mt-6">
          Please select an account type to proceed
        </p>
      )}
    </div>
  );
};