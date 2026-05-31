"use client";

import React, { useState } from "react";
import Nav from "../Nav";
import { ArrowLeft } from "lucide-react";
import Stepper from "../Stepper";
import TransactionDetailsStep from "./TransactionDetailsStep";
import AddSellersStep from "./AddSellersStep";
import PaymentMethodStep from "./PaymentMethodStep";
import ConfirmTransactions from "./ConfirmTransactions";

const NewTransaction = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleGoBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="">
      <Nav />
      <div className="w-full bg-gray-50 overflow-hidden min-h-[70%]">
        <div className="w-full max-w-2xl mx-auto pt-20 overflow-hidden">
          <button
            className="w-full flex items-center gap-2 text-left my-8"
            onClick={handleGoBack}
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep > 0 ? "Back" : "Back to Dashboard"}
          </button>
          <Stepper
            steps={[
              TransactionDetailsStep,
              AddSellersStep,
              PaymentMethodStep,
              ConfirmTransactions,
            ]}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className=""
            className2="h-1 flex-1 rounded-full "
            renderStepIndicator={({isCompleted}) => (isCompleted ? null : null)}
          />
        </div>
      </div>
    </div>
  );
};

export default NewTransaction;
