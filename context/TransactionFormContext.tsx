"use client";

import React, { createContext, useContext, useState } from "react";

export type Milestone = {
  title: string;
  amount: number;
  dueDate: string;
};

export type TransactionFormData = {
  amount: number | null;
  description: string;
  sellerEmail: string;
  milestones: Milestone[];
  paymentMethod: string;
};

type TransactionFormContextType = {
  formData: TransactionFormData;
  updateFormData: (data: Partial<TransactionFormData>) => void;
  resetFormData: () => void;
};

const defaultData: TransactionFormData = {
  amount: null,
  description: "",
  sellerEmail: "",
  milestones: [],
  paymentMethod: "",
};

const TransactionFormContext = createContext<TransactionFormContextType | undefined>(undefined);

export const TransactionFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<TransactionFormData>(defaultData);

  const updateFormData = (data: Partial<TransactionFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetFormData = () => {
    setFormData(defaultData);
  };

  return (
    <TransactionFormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </TransactionFormContext.Provider>
  );
};

export const useTransactionForm = () => {
  const context = useContext(TransactionFormContext);
  if (!context) {
    throw new Error("useTransactionForm must be used within a TransactionFormProvider");
  }
  return context;
};
