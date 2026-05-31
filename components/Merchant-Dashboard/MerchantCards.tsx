import { DollarSign, Lock, MoveUp, TrendingUp, TriangleAlert } from "lucide-react";
import React from "react";

const MerchantCards = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 items-start justify-between gap-4">
      {/* TOTAL SALES */}
      <div className="w-full border bg-white shadow-md p-5 rounded-xl">
        <div className="w-full flex items-center justify-between gap-1 mb-3">
          <p className="font-light text-gray-500">Total Sales</p>
          <TrendingUp className="text-[#2acc8f]" />
        </div>
        <h1 className="text-2xl">₦2,850,000</h1>
        <p className="flex items-center gap-0.5 text-[#4dcd8b] text-xs">
          <MoveUp className="w-2.5" />
          23% from last month
        </p>
      </div>

      {/* PENDING LOCK */}
      <div className="w-full border border-[#fef1b8] bg-[#fffdf6] shadow-md p-6 rounded-xl">
        <div className="w-full flex items-center justify-between gap-1 mb-3">
          <p className="flex items-center gap-1 font-light text-gray-500">
            <Lock className="w-4" />
            Pending(Locked)
          </p>
        </div>
        <h1 className="text-2xl">₦200,000</h1>
        <p className="flex items-center gap-1 text-gray-400 text-xs">
          2 transactions held
        </p>
      </div>

      {/* AVAILABLE BALANCE */}
      <div className="w-full border border-[#d6e8ff] bg-[#f5faff] shadow-md p-6 rounded-xl">
        <div className="w-full flex items-center justify-between gap-1 mb-3">
          <p className="font-light text-gray-500">Available Balance</p>
          <DollarSign className="text-[#5989f0]" />
        </div>
        <h1 className="text-2xl mb-2">₦1,245,000</h1>
        <p className="flex items-center gap-1 text-lg">
          Withdraw
        </p>
      </div>

      {/* DISPUTE */}
      <div className="w-full border bg-white shadow-md p-6 rounded-xl">
        <div className="w-full flex items-center justify-between gap-1 mb-3">
          <p className="font-light text-gray-500">Disputes</p>
          <TriangleAlert className="text-[#f04d4d]" />
        </div>
        <h1 className="text-2xl">1</h1>
        <p className="flex items-center gap-1 text-gray-500 text-xs">
          Active dispute
        </p>
      </div>
    </div>
  );
};

export default MerchantCards;
