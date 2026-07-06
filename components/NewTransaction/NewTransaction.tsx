"use client";

import React from "react";
import Nav from "../Nav";
import { ArrowLeft } from "lucide-react";
import Stepper from "../Stepper";
import TransactionDetailsStep from "./TransactionDetailsStep";
import AddSellersStep from "./AddSellersStep";
import PaymentMethodStep from "./PaymentMethodStep";
import ConfirmTransactions from "./ConfirmTransactions";
import { motion, AnimatePresence } from "framer-motion";
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
      <div>
        <Nav />
        <div className="w-full bg-gray-50 overflow-hidden min-h-[70%]">
          <div className="w-full max-w-2xl mx-auto pt-20 overflow-hidden">
            <motion.button
              className="w-full flex items-center gap-2 text-left my-8"
              onClick={handleGoBack}
              whileHover={{ opacity: 0.75 }}
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
              className=""
              className2="h-1 flex-1 rounded-full"
              renderStepIndicator={({ isCompleted }) => (isCompleted ? null : null)}
              stepSlideVariant={slideVariant}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NewTransaction;
