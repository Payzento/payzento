import { CreditCard, House } from "lucide-react";
import React from "react";

type PaymentMethodProps = {
  onNext: () => void;
};

const PaymentMethodStep = ({ onNext }: PaymentMethodProps) => {
  return (
    <div className="w-full bg-white border rounded-lg p-6 shadow-md">
      <h1 className="text-xl font-bold mb-4">Payment Method</h1>

      <button onClick={onNext} className="w-full border-2 rounded-xl hover:border-blue-500 mb-4">
        <div className="flex items-center gap-4 p-4">
          <div className="bg-[#dbeafe] p-3 rounded-full">
            <CreditCard />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-[16px] font-semibold ">Debit/Credit Card</h4>
            <p className="text-xs text-gray-600">Pay instantly with your card</p>
          </div>
        </div>
      </button>

      <button onClick={onNext} className="w-full border-2 rounded-xl hover:border-blue-500">
        <div className="flex items-center gap-4 p-4">
          <div className="bg-[#dbeafe] p-3 rounded-full">
            <House />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-[16px] font-semibold ">Bank Transfer</h4>
            <p className="text-xs text-gray-600">Transfer to virtual account</p>
          </div>
        </div>
      </button>

     
    </div>
  );
};

export default PaymentMethodStep;
