import { CircleCheckBig } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const SecurePaymentSection = () => {
  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-7xl mx-auto py-15 px-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col items-start flex-1">
            <h1 className="text-xl md:text-3xl font-semibold mb-5">
              Accept Secure Payments on Your Platform
            </h1>
            <p className="text-sm md:text-lg text-gray-500">
              Add Payzento checkout to your website and start receiving secure
              escrow payments. Protect both you and your customers.
            </p>
            <div className="flex flex-col items-start gap-2 my-6">
              <div className="flex items-center gap-2">
                <CircleCheckBig className="text-green-300 w-5 h-5" />
                <p className="text-lg font-bold">
                  Payment is secured before you deliver{" "}
                  <span className="text-gray-400 font-normal">
                    — No risk of fake payment alerts
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className="text-green-300 w-5 h-5" />
                <p className="text-lg font-bold">
                  Funds are guaranteed{" "}
                  <span className="text-gray-400 font-normal">
                    — Once delivery is confirmed, payment is yours
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className="text-green-300 w-5 h-5" />
                <p className="text-lg font-bold">
                  Easy integration — Add to your site in minutes{" "}
                  <span className="text-gray-400 font-normal">
                    — Add to your site in minutes
                  </span>
                </p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:shadow-2xl rounded-xl py-6 px-8 text-lg text-white font-semibold">
              Start Accepting Payment
            </Button>
          </div>
          <div className="flex flex-1 bg-purple-100 rounded-md p-6"></div>
        </div>
      </div>
    </div>
  );
};

export default SecurePaymentSection;
