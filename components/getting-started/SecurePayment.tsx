import { CircleCheckBig } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

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
          <div className="flex flex-1 bg-purple-100 rounded-2xl p-6 shadow-sm">
            <div className="w-full flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Merchant Dashboard</p>
                  <h1 className="text-3xl font-medium text-gray-900 mt-2">
                    ₦2,850,000
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    Total Sales This Month
                  </p>
                </div>

                {/* Icon */}
                <div className="text-green-500 text-xl">↗</div>
              </div>

              {/* Bottom Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Pending */}
                <div className="bg-white/60 rounded-xl p-4">
                  <p className="text-gray-600 text-sm">Pending</p>
                  <p className="text-yellow-500 font-medium text-lg mt-1">
                    ₦200K
                  </p>
                </div>

                {/* Available */}
                <div className="bg-white/60 rounded-xl p-4">
                  <p className="text-gray-600 text-sm">Available</p>
                  <p className="text-green-500 font-medium text-lg mt-1">
                    ₦1.2M
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

         <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 my-10">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl text-blue-500">#2.5B+</h1>
          <p>Secured safely</p>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl text-blue-500">50,000+</h1>
          <p>Successful Transactions</p>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl text-blue-500">99.9%</h1>
          <p>Satisfaction Rate</p>
        </div>
      </div>
      </div>

     
    </div>
  );
};

export default SecurePaymentSection;
