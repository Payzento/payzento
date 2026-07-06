"use client";

import { CircleCheckBig } from "lucide-react";
import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { scaleIn } from "@/lib/animations";

type StepComponent = React.ComponentType<{
  onNext: () => void;
}>;

type StepIndicatorProps = {
  index: number;
  isActive: boolean;
  isCompleted: boolean;
};

type StepperProps = {
  steps: StepComponent[];
  footer?: React.ReactNode;
  className: string;
  className2?: string;
  className3?: string;
  currentStep: number;
  stepLabels?: string[];
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  renderStepIndicator?: (props: StepIndicatorProps) => React.ReactNode;
  stepSlideVariant?: Variants;
};

const DefaultStepIndicator = ({ index, isCompleted }: StepIndicatorProps) => {
  if (isCompleted) return <CircleCheckBig className="w-4" />;
  return <span>{index + 1}</span>;
};

const Stepper = ({
  steps,
  footer,
  className,
  className2,
  className3,
  currentStep,
  stepLabels,
  setCurrentStep,
  renderStepIndicator,
  stepSlideVariant,
}: StepperProps) => {
  const next = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const getStepState = (index: number) => ({
    isCompleted: index < currentStep,
    isActive: index === currentStep,
  });

  const CurrentSteps = steps[currentStep];
  const renderIndicator = renderStepIndicator ?? DefaultStepIndicator;

  // Default slide variant if none provided
  const slideVariant: Variants = stepSlideVariant ?? {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4">
      {/* Progress bar */}
      <div
        className={`flex items-center justify-between gap-3 mb-8 w-full ${className}`}
      >
        {steps.map((_, index) => {
          const { isCompleted, isActive } = getStepState(index);
          const isHighlighted = isCompleted || isActive;

          return (
            <div key={index} className="flex-1 last:flex-none group relative">
              <motion.div
                className={`flex items-center justify-center text-white ${className2} ${
                  isHighlighted ? "bg-blue-600" : "bg-gray-300"
                }`}
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {renderIndicator({ index, isCompleted, isActive })}
              </motion.div>
              <div
                className={`absolute group-last:hidden ${className3} ${isHighlighted ? "bg-blue-600" : "bg-gray-300"}`}
              />
              {stepLabels && (
                <span
                  key={index}
                  className={`text-xs -translate-x-7 ${isHighlighted ? "text-black" : "text-gray-400"}`}
                >
                  {stepLabels[index] ?? `Step ${index + 1}`}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Animated step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          variants={slideVariant}
          className="w-full"
        >
          <CurrentSteps onNext={next} />
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      {footer && <div className="mt-6">{footer}</div>}
    </div>
  );
};

export default Stepper;
