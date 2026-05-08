import React from "react";
import Nav from "../Nav";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowUpFromLine,
  Lock,
  Wallet,
} from "lucide-react";
import TransactionHistory from "./TransactionHistory";
import TransactionList from "./TransactionHistory";

// type TransactionProps = {
//   id: number;
//   type: string;
//   title: string;
//   amount: string;
//   timestamp: string;
//   locked: boolean;
// };

// const transactionsData = [
//   {
//     id: 1,
//     type: "received",
//     title: "Payment received from TechHub Ltd",
//     amount: "+₦450,000",
//     timestamp: "5 days ago",
//     locked: false,
//   },
//   {
//     id: 2,
//     type: "sent",
//     title: "Payment to TechHub Ltd",
//     amount: "+₦450,000",
//     timestamp: "5 days ago",
//     locked: true,
//   },
// ];

const Withdrawal = () => {
  return (
    <div>
      <Nav />

      <div className="mt-20 max-w-3xl mx-auto px-2 pt-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-2xl font-semibold my-7">Wallet</h1>

        <section className="w-full bg-[#11294e] rounded-2xl p-6 mb-5">
          <div className="w-full">
            <div className="flex items-center justify-between gap-2 text-[#abb4c2]">
              <p className="text-[16px]">Available Balance</p>
              <Wallet />
            </div>
            <h1 className="text-white text-4xl my-8">₦1,245,000</h1>
            <div className="w-full flex items-center justify-between gap-4">
              <button className="bg-white flex flex-1 items-center justify-center text-black textlg gap-2 rounded-2xl p-2 border-2 hover:border-blue-400 cursor-pointer">
                <ArrowUpFromLine className="w-4 h-4" />
                Withdraw
              </button>
              <button className="bg-white flex flex-1 items-center justify-center text-black textlg gap-2 rounded-2xl p-2 border-2 hover:border-blue-400 cursor-pointer">
                <ArrowDownToLine className="w-4 h-4" />
                Add Funds
              </button>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#e98e08] rounded-2xl p-6">
          <div className="w-full">
            <div className="flex items-center gap-2 text-white">
              <Lock className="w-4.5 h-4.5" />
              <p className="text-[16px]">Pending Balance</p>
            </div>
            <h1 className="text-white text-4xl my-5">₦245,000</h1>
            <p className="text-gray-200 text-sm">
              Locked in 2 active transactions
            </p>
          </div>
        </section>

        <div className="w-full flex items-center justify-between my-5">
          <h1 className="text-lg font-semibold">Transaction History</h1>
          <p className="text-sm text-blue-300">Filter</p>
        </div>

        <div className="w-full ">
         <TransactionList />
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
