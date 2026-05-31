import { ArrowRight } from 'lucide-react'
import React from 'react'

type BankDetailsProps = {
  onNext: () => void
}

const BankDetails = ({onNext}: BankDetailsProps) => {
  return (
       <div className="w-full flex flex-col gap-4 bg-white p-6 border border-gray-200 shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold">Bank Account Details</h1>
      <p className="text-xs text-gray-400">This is where you&apos;ll receieve your payouts</p>
      <form action="" className="flex flex-col">
        <div className="flex flex-col mb-4">
          <label htmlFor="" className="text-sm font-semibold mb-2">
            Bank Name
          </label>
          <input
            type="text"
            placeholder="Select your bank"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="" className="text-sm font-semibold mb-2">
            Account Number
          </label>
          <input
            type="number"
            placeholder="0123456789"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm font-semibold mb-2">
            Account Name
          </label>
          <input
            type="text"
            placeholder="Account name"
            className="p-3 rounded-xl border focus:outline-2 focus:outline-blue-500"
          />
        </div>
      </form>

      <button
        onClick={onNext}
        className="flex items-center justify-center gap-2 text-white bg-blue-600 p-3 rounded-lg hover:shadow-xl"
      >
        Continue <ArrowRight />
      </button>
    </div>
  )
}

export default BankDetails
