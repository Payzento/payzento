"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSignupForm } from "@/context/SignupFormContext";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

type Step3Props = {
  onNext: () => void;
};

const stepSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type Step3Data = z.infer<typeof stepSchema>;

// ─── Requirement definitions ────────────────────────────────────────────────
const requirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter (A-Z)", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number (0-9)", test: (p: string) => /[0-9]/.test(p) },
  {
    label: "One special character (!@#$…)",
    test: (p: string) => /[^A-Za-z0-9]/.test(p),
  },
];

function getStrength(password: string): { score: number; label: string; color: string } {
  const passed = requirements.filter((r) => r.test(password)).length;
  if (password.length === 0) return { score: 0, label: "", color: "bg-gray-200" };
  if (passed === 1) return { score: 25, label: "Weak", color: "bg-red-500" };
  if (passed === 2) return { score: 50, label: "Fair", color: "bg-amber-400" };
  if (passed === 3) return { score: 75, label: "Good", color: "bg-blue-500" };
  return { score: 100, label: "Strong", color: "bg-green-500" };
}

export const Step3 = ({ onNext }: Step3Props) => {
  const { formData, updateFormData } = useSignupForm();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Step3Data>({
    resolver: zodResolver(stepSchema),
    mode: "onChange",
    defaultValues: {
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    },
  });

  const watchedPassword = watch("password") ?? "";
  const strength = getStrength(watchedPassword);

  const onSubmit = (data: Step3Data) => {
    updateFormData(data);
    onNext();
  };

  return (
    <div className="bg-card text-foreground rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md border border-border transition-colors duration-300">
      <div className="text-left mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight mb-2">
          Security Setup
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Choose a strong password to protect your escrow transactions and payouts.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Password field */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full text-foreground bg-card border border-border p-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 font-semibold leading-normal">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* ─── Strength Bar ─────────────────────────────────────────────── */}
        {watchedPassword.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-semibold text-muted-foreground">
                Password strength
              </span>
              <span
                className={`text-xs font-bold ${
                  strength.score === 100
                    ? "text-green-500"
                    : strength.score >= 75
                    ? "text-blue-500"
                    : strength.score >= 50
                    ? "text-amber-500"
                    : "text-red-500"
                }`}
              >
                {strength.label}
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
              <motion.div
                className={`h-1.5 rounded-full ${strength.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${strength.score}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* ─── Requirements Checklist ───────────────────────────────── */}
            <ul className="space-y-1 pt-1">
              {requirements.map((req) => {
                const passed = req.test(watchedPassword);
                return (
                  <li
                    key={req.label}
                    className={`flex items-center gap-2 text-xs transition-colors duration-200 ${
                      passed
                        ? "text-green-600 dark:text-green-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    {passed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 flex-shrink-0 text-gray-300 dark:text-gray-600" />
                    )}
                    {req.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="w-full text-foreground bg-card border border-border p-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1 font-semibold leading-normal">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={!isValid}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl mt-4 cursor-pointer font-semibold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-200"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          Continue
        </motion.button>
      </form>
    </div>
  );
};
