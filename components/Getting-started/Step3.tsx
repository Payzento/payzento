// Step3.tsx

type Step3Props = {
  onNext: () => void;
};
export const Step3 = ({ onNext }: Step3Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-300">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        How Escrow Works{" "}
      </h2>

      {/* <p className="text-gray-500 mb-6">Your account is ready to go</p> */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="relative bg-blue-100 rounded-full p-5 flex items-center justify-center">
            <span className="absolute text-blue-400">1</span>
          </div>
          <div className="">
            <h1 className="text-md font-semibold">Payment is Locked</h1>
            <p className="text-xs text-gray-400">
              Your money is held securely by Payzento, not the seller
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative bg-orange-100 rounded-full p-5 flex items-center justify-center">
            <span className="absolute text-orange-400">2</span>
          </div>
          <div className="">
            <h1 className="text-md font-semibold">Seller Delivers</h1>
            <p className="text-xs text-gray-400">
              The seller completes the work or ships the product
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative bg-green-100 rounded-full p-5 flex items-center justify-center">
            <span className="absolute text-green-400">3</span>
          </div>
          <div className="">
            <h1 className="text-md font-semibold">You Approve</h1>
            <p className="text-xs text-gray-400">
              Once satisfied, you release payment to the seller
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-3 rounded-xl mt-6 cursor-pointer "
      >
        I understand →
      </button>
    </div>
  );
};
