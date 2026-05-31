import React, { useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";


type AddSellersProps = {
  onNext: () => void;
};

const AddSellersStep = ({ onNext }: AddSellersProps) => {
  const [sellerEmail, setSellerEmail] = useState("");

  const isInvalid = !sellerEmail;

  return (
    <div className="w-full bg-white border rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Sellers</h1>

      <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm font-semibold mb-2">
            Seller Email or Username
          </label>
          <input
            type="email"
            placeholder="seller@example.com"
            className="h-12 p-4 border focus:outline-2 focus:outline-blue-400 rounded-xl"
            value={sellerEmail}
            onChange={(e) => setSellerEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 bg-[#fffbeb] border border-[#fee994] p-4 rounded-xl">
          <LockKeyhole className="w-3.5" />
          <p className="text-sm "> The seller will be notified but cannot access funds until you release payment </p>
        </div>

        <button disabled={isInvalid} onClick={onNext} className="flex items-center justify-center hover:shadow-xl gap-2 bg-[#2057e0]  text-white font-semibold p-3.5 rounded-xl mt-5 cursor-pointer disabled:bg-[#8fa9ee] disabled:cursor-not-allowed">
          Continue
          <ArrowRight className="w-4" />
        </button>
      </form>
    </div>
  );
};

export default AddSellersStep;
