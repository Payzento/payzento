import { CircleCheckBig } from "lucide-react";
import React from "react";

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
            // <>
              <div key={index} className="flex-1 last:flex-none group relative">
                <div
                  // key={index}
                  className={`flex items-center justify-center text-white ${className2} ${
                    isHighlighted ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  {renderIndicator({ index, isCompleted, isActive })}
                </div>
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
            // </>
          );
        })}
      </div>

      {/* Card */}
      <CurrentSteps onNext={next} />

      {/* Sign in */}
      {footer && <div className="mt-6">{footer}</div>}
    </div>
  );
};

export default Stepper;
