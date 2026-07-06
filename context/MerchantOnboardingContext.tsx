"use client";

import React, { createContext, useContext, useState } from "react";

export type MerchantOnboardingData = {
  businessName: string;
  businessType: string;
  rcNumber: string;
  industry: string;

  contactName: string;
  contactEmail: string;
  contactPhone: string;
  businessAddress: string;

  bankName: string;
  accountNumber: string;
  accountName: string;

  cacDocument: File | null;
  idDocument: File | null;
};

type MerchantOnboardingContextType = {
  formData: MerchantOnboardingData;
  updateFormData: (data: Partial<MerchantOnboardingData>) => void;
  resetFormData: () => void;
};

const defaultData: MerchantOnboardingData = {
  businessName: "",
  businessType: "",
  rcNumber: "",
  industry: "",

  contactName: "",
  contactEmail: "",
  contactPhone: "",
  businessAddress: "",

  bankName: "",
  accountNumber: "",
  accountName: "",

  cacDocument: null,
  idDocument: null,
};

const MerchantOnboardingContext = createContext<MerchantOnboardingContextType | undefined>(undefined);

export const MerchantOnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<MerchantOnboardingData>(defaultData);

  const updateFormData = (data: Partial<MerchantOnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetFormData = () => {
    setFormData(defaultData);
  };

  return (
    <MerchantOnboardingContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </MerchantOnboardingContext.Provider>
  );
};

export const useMerchantOnboarding = () => {
  const context = useContext(MerchantOnboardingContext);
  if (!context) {
    throw new Error("useMerchantOnboarding must be used within a MerchantOnboardingProvider");
  }
  return context;
};
