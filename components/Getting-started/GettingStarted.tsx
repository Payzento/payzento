"use client";

import React, { useState, useRef } from "react";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import Link from "next/link";
import Stepper from "../Stepper";
import PageWrapper from "@/components/PageWrapper";
import { slideInRight, slideInLeft } from "@/lib/animations";
import { Variants, motion } from "framer-motion";
import { CheckCircle2, Circle, ChevronLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const stepDetails = [
  { title: "Account Type", desc: "Select your primary transaction model" },
  { title: "Personal Details", desc: "Provide your basic contact information" },
  { title: "Security setup", desc: "Create a highly secure access password" },
  { title: "Review & Confirm", desc: "Confirm details and activate account" }
];

const GettingStarted = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const prevStep = useRef(0);

  const handleSetStep = (updater: React.SetStateAction<number>) => {
    prevStep.current = currentStep;
    setCurrentStep(updater);
  };

  const isGoingForward = currentStep >= prevStep.current;
  const slideVariant: Variants = isGoingForward ? slideInRight : slideInLeft;

  return (
    <PageWrapper>
      <div className="w-full min-h-screen flex flex-col md:flex-row bg-background text-foreground transition-colors duration-300">
        
        {/* LEFT COLUMN: ONBOARDING PROGRESS (Desktop only) */}
        <div className="hidden md:flex md:w-[40%] lg:w-[35%] bg-[#060b18] relative overflow-hidden flex-col justify-between p-12 text-white border-r border-[#152347]">
          {/* Ambient glowing radial effects */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

          {/* Logo */}
          <div className="relative z-10">
            <Link href="/" className="text-2xl font-black tracking-wider text-white">
              PAYZENTO
            </Link>
          </div>

          {/* Onboarding Steps Visual Tracker */}
          <div className="relative z-10 space-y-8 my-auto">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Onboarding</span>
              <h2 className="text-2xl font-extrabold tracking-tight mt-1">Get Started in Minutes</h2>
              <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">
                Complete these simple steps to activate your locked escrow account.
              </p>
            </div>

            <div className="space-y-4">
              {stepDetails.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-3.5 rounded-2xl border transition-all duration-300 ${
                      isActive 
                        ? "bg-white/5 border-blue-500/30 text-white" 
                        : "border-transparent text-slate-400"
                    }`}
                  >
                    <div className="mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500/10" />
                      ) : isActive ? (
                        <Circle className="w-5 h-5 text-blue-400 fill-blue-400/20 animate-pulse" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600" />
                      )}
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold ${isActive ? "text-white" : isCompleted ? "text-slate-300 line-through decoration-slate-500" : "text-slate-400"}`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Left Column Footer */}
          <div className="relative z-10 text-xs text-slate-500">
            &copy; 2026 Payzento. Fully encrypted & secured.
          </div>
        </div>

        {/* RIGHT COLUMN: STEPPER MODULE */}
        <div className="flex-grow flex flex-col justify-center items-center p-6 md:p-12 lg:p-20 relative bg-background">
          
          {/* Header Actions for Right Column */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <Link 
              href="/sign-in" 
              className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Log in
            </Link>
            <ThemeToggle />
          </div>

          <div className="w-full max-w-md mt-16 md:mt-0 flex flex-col items-center">
            {/* Stepper with steps */}
            <Stepper
              steps={[Step1, Step2, Step3, Step4]}
              currentStep={currentStep}
              setCurrentStep={handleSetStep}
              className="w-full max-w-sm mb-6"
              className2="h-1 flex-1 rounded-full"
              renderStepIndicator={({ isCompleted }) => (isCompleted ? null : null)}
              stepSlideVariant={slideVariant}
              footer={
                <p className="text-sm text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link
                    href={"/sign-in"}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              }
            />
          </div>
        </div>

      </div>
    </PageWrapper>
  );
};

export default GettingStarted;
