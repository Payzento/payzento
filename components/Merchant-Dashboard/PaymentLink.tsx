"use client";

import React, { useState } from "react";
import Nav from "../Nav";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BiSolidShoppingBags } from "react-icons/bi";
import { CiLock } from "react-icons/ci";

const PaymentLink = () => {
  const [values, setValues] = useState({
    product: "",
    amount: "",
    description: "",
  });

  function handleTextChange(
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setValues((prev) => ({ ...prev, [id]: e.target.value }));
  }

  return (
    <div>
      <Nav />

      <div className="mt-20 mb-10 max-w-5xl mx-auto px-4">
        <Link
          href={"/merchants-dashboard"}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        <h1 className="text-3xl font-semibold mb-2">Create Payment Link</h1>
        <p className="text-gray-500 mb-5">
          Generate a shareable payment link for your product or service
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex col-span-1 flex-col p-6 bg-white border-2 rounded-xl">
            <h1 className="text-xl font-semibold mb-5">Payment Details</h1>

            <form action="" className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-medium">
                  Product/Service Name
                </label>
                <input
                  type="text"
                  value={values.product}
                  onChange={(e) => handleTextChange("product", e)}
                  placeholder="E.g, Premium Web Design"
                  className="w-full border p-4 outline-2 focus:outline-blue-600 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-medium">
                  Amount
                </label>
                <input
                  type="number"
                  value={values.amount}
                  onChange={(e) => handleTextChange("amount", e)}
                  placeholder="₦0.00"
                  className="w-full border p-4 outline-2 focus:outline-blue-600 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  value={values.description}
                  onChange={(e) => handleTextChange("description", e)}
                  placeholder="Describe what the buyer will receive"
                  className="w-full h-30 border p-4 outline-2 focus:outline-blue-600 rounded-xl"
                />
              </div>

              <button className="w-full border text-white p-3 bg-blue-600 rounded-xl">
                Generate Payment Link
              </button>
            </form>
          </div>

          <div className="flex col-span-1 flex-col p-6 bg-white border-2 rounded-xl">
            <h1 className="text-xl font-semibold mb-5">Checkout Preview</h1>
            <div className="flex flex-col items-center justify-center gap-4 border overflow-hidden p-4 rounded-xl">
              <div className="bg-blue-500 p-3 rounded-xl text-white">
                <BiSolidShoppingBags className="w-7 h-7" />
              </div>
              <p
                className="text-center text-xl font-medium"
                id="output-product"
              >
                {values.product || "Product Name"}
              </p>
              <p className="text-3xl" id="output-amount">
                {values.amount && !isNaN(Number(values.amount))
                  ? `₦${Number(values.amount).toFixed(2)}`
                  : "₦0.00"}
              </p>
              <div className="overflow-hidden">
                <p
                  className="text-gray-500 text-center overflow-hidden text-ellipsis whitespace-nowrap"
                  id="output-description"
                >
                  {values.description || "Product description will appear here"}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center bg-[#eff6ff] p-4 border border-[#d8e9ff] rounded-xl">
                <p className="flex items-center gap-2 font-semibold text-sm text-center ">
                  <CiLock />
                  Your payment will be held securely
                </p>
                <span className="text-gray-500 text-sm text-center">
                  Funds will only be released when you confirm delivery
                </span>
              </div>

              <button className="w-full border text-white p-3 bg-blue-600 rounded-xl">
                Pay Securely
              </button>

              <span className="text-gray-500 text-xs">Powered by Payzento</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLink;
