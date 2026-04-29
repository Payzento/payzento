"use client";

import React, { useState } from "react";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import Link from "next/link";

const GettingStarted = () => {
//   const router = useRouter()
  const [step, setStep] = useState(0);

  const next = () => setStep((prev) => prev + 1);

  const steps = [Step1, Step2, Step3, Step4];

  const CurrentSteps = steps[step];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Progress bar */}
      <div className="flex gap-3 mb-8 w-full max-w-md">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full ${
              index <= step ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Card */}
      <CurrentSteps onNext={next}/>

      {/* Sign in */}
      <p className="text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link href={"/sign-in"}
          //   onClick={handleSignIn}
          className="text-blue-600 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default GettingStarted;
