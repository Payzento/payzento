"use client";

import React, { createContext, useContext, useState } from "react";

export type SignupFormData = {
  accountType: 'buyer' | 'merchant' | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
};

type SignupFormContextType = {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
  resetFormData: () => void;
};

const defaultData: SignupFormData = {
  accountType: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreedToTerms: false,
};

const SignupFormContext = createContext<SignupFormContextType | undefined>(undefined);

export const SignupFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<SignupFormData>(defaultData);

  const updateFormData = (data: Partial<SignupFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetFormData = () => {
    setFormData(defaultData);
  };

  return (
    <SignupFormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </SignupFormContext.Provider>
  );
};

export const useSignupForm = () => {
  const context = useContext(SignupFormContext);
  if (!context) {
    throw new Error("useSignupForm must be used within a SignupFormProvider");
  }
  return context;
};
