import { ArrowRight } from "lucide-react";
import React from "react";

type ContactStepProps = {
  onNext: () => void;
};

const ContactDetails = ({ onNext }: ContactStepProps) => {
  return (
    <div className="w-full flex flex-col gap-4 bg-white p-6 border border-gray-200 shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold">Contact Details</h1>
      <form action="" className="flex flex-col">
        <div className="flex flex-col mb-4">
          <label htmlFor="" className="text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="business@example.com"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm font-semibold mb-2">
            Phone Number
          </label>
          <input
            type="number"
            placeholder="+ 234 xxx xxx xxxx"
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

export default ContactDetails;
