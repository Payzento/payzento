"use";

import { LockKeyhole } from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/router";
import React from "react";

const ConfirmTransactions = () => {
  //   const router = useRouter();

  //   const handleConfirm = () => {
  //     // Handle the confirmation logic here (e.g., API call to process payment)
  //     router.push("/review-funds");
  //   }
  return (
    <div className="w-full bg-white border rounded-lg shadow-md p-6">
      <h1 className="text-xl font-bold m-5">Confirm Transactions</h1>

      <div className="w-full flex flex-col gap-2 mb-5">
        <div className="flex items-center justify-between border-b py-4">
          <h1 className="text-gray-500">Amount</h1>
          <p className="text-sm">₦125,000</p>
        </div>
        <div className="flex items-center justify-between border-b py-4">
          <h1 className="text-gray-500">Recipient</h1>
          <p className="">seller@email.com</p>
        </div>
        <div className="flex items-center justify-between border-b py-4">
          <h1 className="text-gray-500">Description</h1>
          <p className="text-sm">Logo Design</p>
        </div>
        <div className="flex items-center justify-between border-b py-4">
          <h1 className="text-gray-500">Transaction</h1>
          <p className="text-sm">₦2,500 (2%)</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <h1 className="">Total</h1>
          <p className="text-lg">₦127,000</p>
        </div>

        <div className="w-full bg-[#fffbeb] border-2 border-[#ffd230] rounded-lg p-4">
          <div className="flex items-center justify-center gap-2">
            <LockKeyhole className="w-4" />
            <p className="text-sm font-bold">
              Your money will be LOCKED until you release it
            </p>
          </div>
          <p className="text-sm text-center text-gray-400 mt-1">
            The seller cannot access these funds without your approval
          </p>
        </div>
      </div>

      <button className="w-full bg-[#1f54dd] text-white p-3 rounded-xl hover:shadow-2xl">
        <Link
          href="/review-funds"
          className=""
        >
          Confirm & Pay
        </Link>
      </button>
    </div>
  );
};

export default ConfirmTransactions;
