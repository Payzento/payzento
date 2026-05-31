"use client";

import React, { useState } from "react";
import Nav from "../Nav";
import Stepper from "../Stepper";
import BusinessInfo from "./BusinessInfo";
import ContactDetails from "./ContactDetails";
import BankDetails from "./BankDetails";
import Verification from "./Verification";
import { CircleCheckBig } from "lucide-react";

const Merchants = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div>
      <Nav />
      <div className="mt-30 mb-10 w-full">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-2">
              Welcome to Payzento for Business
            </h1>
            <p className="text-lg text-gray-500 font-normal">
              Receive payments with confidence. Funds are complete until
              delivery is complete
            </p>
          </div>

          <Stepper
            steps={[BusinessInfo, ContactDetails, BankDetails, Verification]}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className="mt-10 w-full"
            className2="h-10 w-10 rounded-full flex justify-between"
            className3="w-8 md:w-30 h-1 bottom-10 left-15 md:left-15"
            stepLabels={["Business Info", "Contact Details", "Bank Details", "Verification"]}
            renderStepIndicator={({index, isCompleted}) => (
              <div>
                {isCompleted ? <CircleCheckBig className="w-4" /> : <span>{index + 1}</span> }
              </div>
            )}
          />
          {/* <p className="">Business Info</p> */}
        </div>
      </div>
    </div>
  );
};

export default Merchants;
