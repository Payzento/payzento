import { ArrowRight, Lightbulb } from "lucide-react";
import React, { useState } from "react";

type TransactionProps = {
  onNext: () => void;
};

const TransactionDetailsStep = ({ onNext }: TransactionProps) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const isInvalid = !amount || !description;

  return (
    <div className="w-full bg-white border rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Transaction Details</h1>

      <form action="" className="flex flex-col gap-2">
        <div className="flex flex-col mb-4">
          {" "}
          <label htmlFor="" className="text-sm font-semibold mb-2">
            Amount
          </label>
          <input
            type="text"
            placeholder="₦ 0.00"
            className="h-12 p-4 border focus:outline-2 focus:outline-blue-400 rounded-xl"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="" className="text-sm font-semibold mb-2">
            Description
          </label>
          <input
            type="text"
            placeholder="What is this payment for?"
            className="h-12 p-4 border focus:outline-2 focus:outline-blue-400 rounded-xl"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 bg-[#eff6ff] border border-[#8fa9ee] rounded-xl p-4">
          <Lightbulb className="w-4" />
          <p className="text-sm">
            <span className="font-bold">Your money is safe:</span> Payment will
            be locked until you approve its release
          </p>
        </div>

        <button
          onClick={onNext}
          disabled={isInvalid}
          className="flex items-center justify-center gap-2 bg-[#2057e0] hover:shadow-2xl text-white font-semibold p-3.5 rounded-xl mt-5 cursor-pointer disabled:bg-[#8fa9ee] disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="w-4" />
        </button>
      </form>
    </div>
  );
};

export default TransactionDetailsStep;
