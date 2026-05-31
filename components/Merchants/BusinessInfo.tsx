import { ArrowRight } from "lucide-react";
import React from "react";

type BusinessStepProps = {
  onNext: () => void;
};

const BusinessInfo = ({ onNext }: BusinessStepProps) => {
  return (
    <div className="w-full flex flex-col gap-4 bg-white p-6 border border-gray-200 shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold">Business Information</h1>
      <form action="" className="flex flex-col">
        <div className="flex flex-col mb-4">
          <label htmlFor="" className="text-sm font-semibold mb-2">
            Business Name
          </label>
          <input
            type="text"
            placeholder="Your Business Name"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm font-semibold mb-2">
            Business Type
          </label>
          <input
            type="text"
            placeholder="E.g., E-commerce, Services, Freelance"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
          />
        </div>
      </form>

      <button
        onClick={onNext}
        className="flex items-center justify-center gap-2 text-white bg-blue-600 p-3 rounded-lg hover:shadow-xl"
      >
        Continue <ArrowRight />
      </button>
    </div>
  );
};

export default BusinessInfo;
