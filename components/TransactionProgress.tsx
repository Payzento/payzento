"use client";

import { Check, Lock, Package, CircleCheck, AlertTriangle } from "lucide-react";
import React from "react";

interface TransactionProgressProps {
  status: "pending" | "funds_locked" | "active" | "completed" | "disputed" | "cancelled";
}

const TransactionProgress = ({ status }: TransactionProgressProps) => {
  // Determine active step index:
  // 0: Pending/Created
  // 1: Funds Locked/Secured
  // 2: Under Review / In progress / Disputed
  // 3: Completed / Released
  let activeIndex = 0;
  if (status === "funds_locked" || status === "active") {
    activeIndex = 1;
  } else if (status === "disputed") {
    activeIndex = 2; // custom step or state
  } else if (status === "completed") {
    activeIndex = 3;
  } else if (status === "cancelled") {
    activeIndex = -1; // cancelled state
  }

  const steps = [
    {
      label: "Transaction Started",
      desc: "Terms agreed",
      icon: Check,
    },
    {
      label: "Funds Secured",
      desc: "Held in escrow",
      icon: Lock,
    },
    {
      label: status === "disputed" ? "Dispute Review" : "In Progress",
      desc: status === "disputed" ? "Arbitration active" : "Deliverables",
      icon: status === "disputed" ? AlertTriangle : Package,
    },
    {
      label: "Payment Released",
      desc: "Seller paid",
      icon: CircleCheck,
    },
  ];

  if (status === "cancelled") {
    return (
      <section className="border border-red-500/20 bg-red-500/5 p-6 rounded-3xl text-center">
        <p className="text-red-500 font-bold text-sm uppercase tracking-wider">Transaction Cancelled</p>
        <p className="text-muted-foreground text-xs mt-1">This escrow agreement has been cancelled. Funds have been returned according to cancellation policy.</p>
      </section>
    );
  }

  return (
    <section className="border border-border bg-card p-6 rounded-3xl transition-colors duration-300">
      <p className="font-bold text-sm text-foreground mb-6 uppercase tracking-wider text-muted-foreground">Transaction Progress</p>

      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0 mt-2">
        {/* Horizontal Line for Desktop */}
        <div className="absolute left-[35px] right-[35px] top-[22px] h-[2px] bg-border hidden md:block z-0" />
        
        {/* Progress Fill Line */}
        {activeIndex > 0 && (
          <div
            className="absolute left-[35px] top-[22px] h-[2px] bg-blue-600 hidden md:block z-0 transition-all duration-500"
            style={{ width: `${(activeIndex / (steps.length - 1)) * 90}%` }}
          />
        )}

        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isDone = idx < activeIndex;
          const isActive = idx === activeIndex;
          const isPending = idx > activeIndex;

          let iconBg = "bg-muted border border-border text-muted-foreground";
          if (isDone) {
            iconBg = "bg-blue-600 text-white border border-blue-600 shadow-md shadow-blue-500/20";
          } else if (isActive) {
            if (status === "disputed") {
              iconBg = "bg-red-500 text-white border border-red-500 shadow-md shadow-red-500/20";
            } else {
              iconBg = "bg-amber-500 text-white border border-amber-500 shadow-md shadow-amber-500/20";
            }
          }

          return (
            <div
              key={idx}
              className="flex md:flex-col items-center gap-4 md:gap-2.5 md:text-center flex-1 z-10 w-full"
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${iconBg}`}>
                <StepIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col md:items-center">
                <span className={`text-xs font-bold transition-colors ${isActive ? "text-foreground" : isDone ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"}`}>
                  {step.label}
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">{step.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TransactionProgress;
