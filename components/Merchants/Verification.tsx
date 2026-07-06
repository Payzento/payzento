"use client";

import { ArrowRight, CircleCheckBig, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useMerchantOnboarding } from "@/context/MerchantOnboardingContext";

const Verification = () => {
  const router = useRouter();
  const { formData, updateFormData } = useMerchantOnboarding();

  const handleCacChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      updateFormData({ cacDocument: e.target.files[0] });
    }
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      updateFormData({ idDocument: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("MerchantOnboardingData:", formData);
    router.push("/merchants-dashboard");
  };

  const isSubmitEnabled = !!formData.cacDocument;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 bg-white p-6 border border-gray-200 shadow-lg rounded-lg">
      <div className="flex items-center justify-center bg-[#dbfce7] text-[#22ca8a] w-20 h-20 p-4 rounded-full">
        <CircleCheckBig className="w-10 h-10" />
      </div>
      <div className="text-center max-w-120 mb-3">
        <h1 className="text-2xl font-semibold mb-2">Upload Verification Documents</h1>
        <p className="text-gray-400 text-sm">
          Please upload your business registration documents to verify your merchant account.
        </p>
      </div>

      <div className="w-full flex flex-col gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            CAC Document (Required)
          </label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-500 transition-colors">
            <input
              type="file"
              id="cac-upload"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleCacChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center gap-1 text-gray-500">
              <Upload className="w-6 h-6 text-gray-400" />
              <p className="text-sm font-medium">
                {formData.cacDocument ? formData.cacDocument.name : "Click or drag to upload CAC Certificate"}
              </p>
              <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
            </div>
          </div>
          {!formData.cacDocument && (
            <p className="text-red-500 text-sm mt-1">CAC document is required</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Director's ID Document (Optional)
          </label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-500 transition-colors">
            <input
              type="file"
              id="id-upload"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleIdChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center gap-1 text-gray-500">
              <Upload className="w-6 h-6 text-gray-400" />
              <p className="text-sm font-medium">
                {formData.idDocument ? formData.idDocument.name : "Click or drag to upload National ID, Passport, or DL"}
              </p>
              <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isSubmitEnabled}
        className="w-full flex items-center justify-center gap-2 text-white bg-blue-600 p-3 rounded-lg hover:shadow-xl cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed font-semibold text-center"
      >
        Complete Registration <ArrowRight />
      </button>
    </div>
  );
};

export default Verification;
