import React from "react";
import Nav from "../Nav";
import { ChevronsLeftRight, Link2, Lock } from "lucide-react";
import MerchantTable from "./MerchantTable";
import MerchantCards from "./MerchantCards";
import Link from "next/link";

const MerchantDashboard = () => {
  return (
    <div>
      <Nav />

      <div className="w-full mt-20 mb-10">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-4">
          <div className="w-full flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="">
              <h1 className="text-3xl font-semibold mb-3">
                Merchant Dashboard
              </h1>
              <p className="text-[#6d788a] ">
                Manage your payments and transactions
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={'/merchants-dashboard/payment-link'} className="flex items-center gap-2 py-4 px-6 border rounded-2xl bg-white hover:border-[#2460e8] shadow">
                <Link2 />
                Create Payment Link
              </Link>
              <Link href={'/merchants-dashboard/integrate-payzento'} className="flex items-center gap-2 py-4 px-6 text-white bg-[#2460e8] rounded-2xl shadow">
                <ChevronsLeftRight />
                Integrate Payzento
              </Link>
            </div>
          </div>

          {/* MERCHANT DASHBOARD */}
          <div className="w-full">
            <MerchantCards />
          </div>

          <div className="w-full bg-[#f4f9fe] p-4 border-2 border-[#e0ebf9] rounded-xl my-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center bg-blue-600 w-13 h-13 rounded-full p-4">
                <Lock className="w-6 text-white" />
              </div>
              <div className="">
                <h1 className="text-lg font-semibold mb-2">
                  Payzento ensures fair and secure transactions
                </h1>
                <p className="text-sm text-gray-500">
                  We protect both the buyer and the seller. Payment is secured
                  before you deliver. No risk of fake payment alerts. Funds are
                  guaranteed once conditions are met.
                </p>
              </div>
            </div>
          </div>

          <MerchantTable />
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
