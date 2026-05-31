import { Check, CircleCheck, Package, Lock } from "lucide-react";
import React from "react";

const TransactionProgress = () => {
  return (
    <section className="border border-gray-300 p-6 rounded-xl ">
      <p className="font-medium">Transaction Progress</p>

      <div className="mt-12 -mb-7 w-full">
        <div className="w-full">
          <div className="w-full relative h-1 left-0 bottom-2 bg-gray-200" />
          <div className="relative -top-8  flex items-center justify-between">
            <div className="w-[85%] mx-auto flex  justify-between">
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 text-white rounded-full p-3 mb-2">
                  <Check className="w-5 h-5" />
                </div>
                <span className="text-center text-gray-500 text-xs">
                  Payment <br /> Received
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 text-white rounded-full p-3 mb-2">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="text-center  text-gray-500 text-xs">
                  Funds Held
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white border border-gray-300 text-gray-400 rounded-full p-3 mb-2">
                  <Package className="w-5 h-5" />
                </div>
                <span className="text-center text-gray-500 text-xs">
                  Delivery <br /> Confirmed
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white border border-gray-300 text-gray-400 rounded-full p-3 mb-2">
                  <CircleCheck className="w-5 h-5" />
                </div>
                <span className="text-center text-gray-500 text-xs">
                  Payment <br /> Released
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionProgress;
