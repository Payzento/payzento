"use client";

import React, { useState } from "react";

type StepComponent = React.ComponentType<{
  onNext: () => void;
}>;

type StepperProps = {
  steps: StepComponent[];
  footer?: React.ReactNode;
  className: React.ReactNode
};

const Stepper = ({ steps, footer, className }: StepperProps) => {
  const [step, setStep] = useState(0);

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));

  const CurrentSteps = steps[step];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start px-4">
      {/* Progress bar */}
      <div className={`flex gap-3 mb-8 w-full ${className}`}>
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
      <CurrentSteps onNext={next} />

      {/* Sign in */}
      {footer && <div className="mt-6">{footer}</div>}
    </div>
  );
};

export default Stepper;
