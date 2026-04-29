// Step2.tsx

import { CreditCard, User } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type Step2Props = {
  onNext: () => void;
};

export const Step2 = ({ onNext }: Step2Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-300">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold mb-2">What brings you here?</h2>
        <p className="text-gray-400">Select your primary use case</p>
      </div>

      <Card onClick={onNext} className="mb-4 hover:border hover:border-blue-400 cursor-pointer">
        <CardHeader className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <CreditCard className="text-blue-500" />
          </div>
          <div className="">
            <CardTitle className="mb-2">I want to pay safely</CardTitle>
            <CardDescription>
              Buy products or service with protection
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      {/* <button> */}
        <Card onClick={onNext} className="mb-4 hover:border hover:border-blue-400 cursor-pointer">
          <CardHeader className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <User className="text-green-500" />
            </div>
            <div className="">
              <CardTitle className="mb-2">I want to receive payments</CardTitle>
              <CardDescription>
               Sell products or services with confidence
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      {/* </button> */}

      {/* <button
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-3 rounded-xl"
      >
        I understand 
      </button> */}
    </div>
  );
};
