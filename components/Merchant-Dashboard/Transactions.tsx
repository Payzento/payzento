import React from "react";
import Nav from "../Nav";
import Link from "next/link";
import { ArrowLeftIcon, Lock, MessageSquare } from "lucide-react";
import { FcLock } from "react-icons/fc";
import { BsHourglassSplit } from "react-icons/bs";
import TransactionProgress from "../TransactionProgress";

type TransactionProps = {
  id: number;
  // amount: string;
  amount2: number;
  // seller: string;
  seller2: string;
  // product: string;
  product2: string;
  // desc: string;
  desc2: string;
  // escrowFee: string;
  escrowFee2: number;
  // total: string;
  total2: number;
};

const transactioDetails: TransactionProps[] = [
  {
    id: 1,
    // amount: "Amount",
    amount2: 125000,
    // seller: "Seller",
    seller2: "Adewale Graphics",
    // product: "Product",
    product2: "Premium web design",
    // desc: "Description",
    desc2: "Professional website design service",
    // escrowFee: "Escrow Fee(2%)",
    escrowFee2: 2500,
    // total: "Total Paid",
    total2: 127500,
  },
];

const Transactions = () => {
  return (
    <div>
      <Nav />

      <div className="max-w-6xl mx-auto mt-25  px-4">
        <Link href="/merchants-dashboard">
          <button className="flex items-center gap-2 text-gray-500 hover:text-black mb-7">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Dashboard
          </button>
        </Link>

        <p className="w-fit text-[#7F85EF] bg-[#E0E7FF] py-2 px-3 mb-5 text-sm rounded-2xl">
          You are the Buyer
        </p>

        <div className="w-full flex flex-col items-center justify-center bg-[#FFFDF4] py-10 mb-5 border-2 border-[#FEE685] rounded-2xl">
          <div className="bg-[#E08107] p-6 rounded-full scale-3d animate-pulse mb-4">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <div className="flex items-center gap-2 bg-[#FEF3C7] py-2 px-6 rounded-full mb-4">
            <Lock className="w-4 h-4 text-[#E08107]" />
            <p className="text-[#E08107] text-sm">FUNDS HELD</p>
          </div>

          <p className="text-gray-400 text-sm">
            Your money is safe and locked until you release it
          </p>
        </div>

        {/* TRANSACTION PROGRESS */}
        <div className="">
          <TransactionProgress />
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-4 my-5">
          {/* TRANSACTIONS DETAILS */}
          <div className="w-full flex flex-1 flex-col items-center justify-between gap-4">
            <div className="w-full p-6 border rounded-2xl bg-white shadow-md">
              <h1 className="text-xl font-medium">Transaction Details</h1>
              {transactioDetails.map((txn) => (
                <div key={txn.id} className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b pb-2 my-5">
                    <p className="text-gray-500 text-[15px]">Amount</p>
                    <p className="text-[15px]">
                      ₦{txn.amount2.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-b pb-2 my-5">
                    <p className="text-gray-500 text-[15px]">Seller</p>
                    <p className="text-[15px]">{txn.seller2}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-b pb-2 my-5">
                    <p className="text-gray-500 text-[15px]">Product</p>
                    <p className="text-[15px]">{txn.product2}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-b pb-2 my-5">
                    <p className="text-gray-500 text-[15px]">Description</p>
                    <p className="text-[15px]">{txn.desc2}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-b pb-2 my-5">
                    <p className="text-gray-500 text-[15px]">Escrow Fee(2%)</p>
                    <p className="text-[15px]">
                      ₦{txn.escrowFee2.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-b pb-2 my-5">
                    <p className="text-gray-500 text-[15px]">Total Paid</p>
                    <p className="text-[15px]">
                      ₦{txn.total2.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-b pb-2 my-5">
                    <p className="text-gray-500 text-[15px]">Transaction ID</p>
                    <p className="text-[15px]">{txn.id}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full p-6 border rounded-2xl bg-white shadow-md">
              <div className="flex items-center gap-2 mb-5">
                <MessageSquare className="text-blue-500" />
                <h1 className="text-xl font-medium">Communication</h1>
              </div>
              <p className="text-gray-500 mb-3">
                Stay in touch with your transaction partner
              </p>
              <button className="w-full p-2 flex items-center justify-center gap-2 border hover:outline hover:outline-blue-500 rounded-2xl">
                <MessageSquare className="w-4" />
                Send Message
              </button>
            </div>
          </div>

          {/* BUYER ACTIONS */}
          <div className="w-full flex flex-1 flex-col items-center justify-between gap-4">
            <div className="w-full p-6 border rounded-2xl bg-white shadow-md">
              <h1 className="text-xl font-medium mb-5">Buyer Actions</h1>
              <p className="text-sm text-gray-500">
                Once you&apos;ve received and are satisfied with the delivery
              </p>

              <div className="w-full bg-[#FFFBEB] p-4 border-2 border-[#FFF3C2] rounded-2xl my-4">
                <p className="flex items-center gap-2 font-medium text-[15px]">
                  <FcLock className="w-5" />
                  Your money is protected
                </p>
                <p className="text-gray-500 text-[15px] font-light">
                  Funds will not be released until you confirm. You&apos;re in
                  complete control.
                </p>
              </div>

              <div className="w-full flex flex-col items-center justify-center bg-[#EFF6FF] p-4 border-2 border-[#DFEDFF] rounded-2xl my-4">
                <p className="flex items-center gap-2 font-medium text-[15px]">
                  <BsHourglassSplit className="w-5" />
                  Waiting for delivery
                </p>
                <p className="text-gray-500 text-sm font-light">
                  Seller will mark as delivered when ready
                </p>
              </div>

              <Link
                href={"/dispute-resolution"}
                className="flex items-center justify-center hover:bg-gray-100 p-3 rounded-xl"
              >
                Open Dispute
              </Link>
            </div>

            <div className="w-full p-6 bg-[#EFF6FF] border-3 border-[#DFEDFF] rounded-2xl shadow-md">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-11 h-11 text-white bg-blue-600 rounded-full p-3">
                  <Lock className="w-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold">
                    Payzento ensures a fair transaction
                  </p>
                  <span className="text-gray-500 text-xs">
                    We protect both the buyer and the seller. Payments are
                    processed via licensed partners.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
