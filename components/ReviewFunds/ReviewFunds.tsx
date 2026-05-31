import React from "react";
import Nav from "../Nav";
import {
  ArrowLeft,
  Check,
  CircleCheck,
  Lock,
  LockKeyhole,
  MessageSquare,
  MoveRight,
  Package,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import TransactionProgress from "../TransactionProgress";

type DetailsProps = {
  details1: string;
  details2: string;
};

const transactionDetails: DetailsProps[] = [
  {
    details1: "Amount",
    details2: "₦125,000",
  },
  {
    details1: "Seller",
    details2: "Adewale Graphics",
  },
  {
    details1: "Description",
    details2: "Logo Design",
  },
  {
    details1: "Transaction Fee",
    details2: "₦2,500",
  },
  {
    details1: "Net to Seller",
    details2: "₦122,500",
  },
  {
    details1: "Date Created",
    details2: "March 29, 2026",
  },
];

const ReviewFunds = () => {
  return (
    <>
      <Nav />
      <div className="max-w-3xl mx-auto px-4 mt-25 space-y-4 my-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-[#6b7ea0] hover:text-black cursor-pointer my-5"
        >
          <ArrowLeft />
          Back to Dashboard
        </Link>

        <div className="w-full bg-[#fffcf0] rounded-xl px-2 py-10 border-2 border-[#fee685] flex flex-col items-center justify-center">
          <div className="bg-[#df7f07] p-4 rounded-full text-white">
            <Lock className="w-8 h-8" />
          </div>

          <div className="bg-red-200 text-red-600 rounded-full flex items-center justify-center gap-2 px-4 py-2 my-4">
            <LockKeyhole className="w-4 h-4" />
            <p className="text-sm">FUNDS HELD</p>
          </div>
          <p className="text-gray-400 text-sm text-center my-2">
            Your money is safe and locked until you release it
          </p>
        </div>

        {/* FUNDS PROGRESS */}

        <TransactionProgress />
        {/* <section className="border border-gray-300 p-6 rounded-xl ">
          <p className="font-medium">Transaction Progress</p>

          <div className="mt-12 -mb-7 w-full">
            <div className="w-full">
              <div className="w-full relative h-1 left-0 bottom-2 bg-gray-200" />
              <div className="relative -top-8  flex items-center justify-between">
                <div className="w-[85%] mx-auto flex  justify-between">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-600 text-white rounded-full p-3 mb-2">
                      <Check className="w-5 h-5" />
                    </div>
                    <span className="text-center text-gray-500 text-sm">
                      Payment <br /> Received
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-600 text-white rounded-full p-3 mb-2">
                      <Lock className="w-5 h-5" />
                    </div>
                    <span className="text-center  text-gray-500 text-sm">
                      Funds Held
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white border border-gray-300 text-gray-400 rounded-full p-3 mb-2">
                      <Package className="w-5 h-5" />
                    </div>
                    <span className="text-center text-gray-500 text-sm">
                      Delivery <br /> Confirmed
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white border border-gray-300 text-gray-400 rounded-full p-3 mb-2">
                      <CircleCheck className="w-5 h-5" />
                    </div>
                    <span className="text-center text-gray-500 text-sm">
                      Payment <br /> Released
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* TRANSACTION DETAILS */}

        <section className="border border-gray-300 p-6 rounded-xl mb-5">
          <p className="font-semibold">Transaction Details</p>
          <div className="">
            {transactionDetails.map((details, index) => (
              <div key={index} className="my-5">
                <div className="flex items-center justify-between my-2">
                  <p className="text-gray-400">{details.details1}</p>
                  <p className="">{details.details2}</p>
                </div>
                <div className="w-full h-[0.5px] bg-gray-300" />
              </div>
            ))}
          </div>
        </section>

        {/* RELEASE PAYMENT */}
        <section className="border border-green-400 p-6 rounded-xl ">
          <div className="flex items-start gap-2">
            <div className="">
              <CircleCheck className="text-green-400" />
            </div>
            <div className="">
              {" "}
              <h6 className="font-semibold mb-1">Ready to Release Payment?</h6>
              <p className="text-gray-400 text-sm">
                If you&apos;ve received the delivery and are satisfied, you can
                release payment to the seller
              </p>
            </div>
          </div>
          <button className="w-full bg-[#1f55de] rounded-xl flex items-center justify-center gap-2 p-3 text-white mt-4 hover:shadow-xl">
            <CircleCheck />
            Release Payment
          </button>
        </section>

        <section className="border border-gray-300 rounded-xl p-6 hover:shadow-xl">
          <button className="w-full flex items-center justify-between gap-2 cursor-pointer">
            <div className="flex items-center gap-2">
              <MessageSquare className="text-blue-500" />
              <p className="">Message Seller</p>
            </div>
            <MoveRight className="w-3 h-3 text-gray-400" />
          </button>
        </section>

        <section className="hover:bg-red-50 rounded-xl p-4">
          <Link
            href="/dispute-resolution"
            className="flex items-center justify-center gap-2 text-[#f04444]"
          >
            <TriangleAlert className="w-4 h-4" />
            <p className="">Open Dispute</p>
          </Link>
        </section>
      </div>
    </>
  );
};

export default ReviewFunds;
