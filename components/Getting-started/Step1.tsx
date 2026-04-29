// Step1.tsx
import { Shield } from "lucide-react";

type Step1Props = {
    onNext: () => void
}

export const Step1 = ({ onNext }: Step1Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center border border-gray-300">
      <div className="flex justify-center mb-6">
        <div className="bg-blue-600 p-4 rounded-full">
          <Shield className="text-white w-6 h-6" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3 font-inter">
        Welcome to Safe Payments
      </h2>

      <p className="text-gray-500 text-sm mb-6 font-inter">
        Experience the peace of mind that comes with escrow-protected transactions
      </p>

      <button
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-3 rounded-xl cursor-pointer hover:shadow-xl font-serif"
      >
        Get Started →
      </button>
    </div>
  );
};