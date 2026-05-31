import { ArrowRight, CircleCheckBig } from "lucide-react";
import Link from "next/link";
import React from "react";

// type Verifi

const Verification = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 bg-white p-6 border border-gray-200 shadow-lg rounded-lg">
      <div className="flex items-center justify-center bg-[#dbfce7] text-[#22ca8a] w-20 h-20 p-4 rounded-full">
        <CircleCheckBig className="w-10 h-10" />
      </div>
      <div className="text-center max-w-120 mb-3">
        <h1 className="text-2xl font-semibold mb-2">You&apos;re All Set</h1>

        <p className="text-gray-400 text-sm ">
          Your merchant account is ready. Start accepting secure escrow payments
          today.
        </p>
      </div>

      <div className="w-full bg-[#eff6ff] p-4 text-center border border-blue-400 rounded-xl mb-10">
        <p className="text-sm font-semibold">Payment is secured before you deliver</p>
        <p className="text-gray-500 text-sm">No risk of fake payment alerts. Funds are guaranteed once conditions are met.</p>
      </div>
      <Link href={"/merchants-dashboard"}
        // onClick={onNext}
        className="w-full flex items-center justify-center gap-2 text-white bg-blue-600 p-3 rounded-lg hover:shadow-xl"
      >
        Go to Dashboard <ArrowRight />
      </Link>
    </div>
  );
};

export default Verification;
