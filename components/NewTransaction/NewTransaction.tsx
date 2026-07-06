"use client";

import React from "react";
import Nav from "../Nav";
import { ArrowLeft } from "lucide-react";
import Stepper from "../Stepper";
import TransactionDetailsStep from "./TransactionDetailsStep";
import AddSellersStep from "./AddSellersStep";
import PaymentMethodStep from "./PaymentMethodStep";
import ConfirmTransactions from "./ConfirmTransactions";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { slideInRight, slideInLeft } from "@/lib/animations";
import { useRef, useState } from "react";

const NewTransaction = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const prevStep = useRef(0);

  const handleGoBack = () => {
    if (currentStep > 0) {
      prevStep.current = currentStep;
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    } else {
      window.location.href = "/dashboard";
    }
  };

  const handleSetStep = (updater: React.SetStateAction<number>) => {
    prevStep.current = currentStep;
    setCurrentStep(updater);
  };

  const isGoingForward = currentStep >= prevStep.current;
  const slideVariant = isGoingForward ? slideInRight : slideInLeft;

  return (
    <PageWrapper>
      <div className="bg-background text-foreground min-h-screen pb-16 transition-colors duration-300">
        <Nav />
        <div className="w-full">
          <div className="w-full max-w-xl mx-auto pt-24 px-4 sm:px-6">
            <motion.button
              className="flex items-center gap-2 text-sm font-semibold hover:text-primary cursor-pointer mb-6"
              onClick={handleGoBack}
              whileHover={{ x: -2 }}
              transition={{ duration: 0.15 }}
            >
              <ArrowLeft className="w-4 h-4" />
              {currentStep > 0 ? "Back" : "Back to Dashboard"}
            </motion.button>

            <Stepper
              steps={[
                TransactionDetailsStep,
                AddSellersStep,
                PaymentMethodStep,
                ConfirmTransactions,
              ]}
              currentStep={currentStep}
              setCurrentStep={handleSetStep}
              className="w-full flex items-center justify-between relative gap-4"
              className2="w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-bold z-10 border border-border shadow-sm"
              className3="absolute top-[19px] left-10 right-0 h-[2px] -z-10"
              stepLabels={["Details", "Seller", "Escrow", "Confirm"]}
              stepSlideVariant={slideVariant}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NewTransaction;
