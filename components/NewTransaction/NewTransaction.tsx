"use client";

import React, { useState } from "react";
import Nav from "../Nav";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Stepper from "../Stepper";
import TransactionDetailsStep from "./TransactionDetailsStep";
import AddSellersStep from "./AddSellersStep";
import PaymentMethodStep from "./PaymentMethodStep";


const NewTransaction = () => {
  const [firstStep, setFirstStep] = useState(0);

  return (
    <div>
      <Nav />

      <div className="w-full bg-gray-50">
        <div className="w-full max-w-2xl mx-auto pt-20 ">
          <Link
            href="dashboard"
            className="w-full flex items-center gap-2 text-left my-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <Stepper
            steps={[
              TransactionDetailsStep,
              AddSellersStep,
              PaymentMethodStep,
              PaymentMethodStep,
            ]}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default NewTransaction;
