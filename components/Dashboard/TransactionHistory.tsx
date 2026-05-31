import React from "react";
import { ArrowDownToLine, ArrowUpFromLine, LockKeyhole } from "lucide-react";

type TransactionProps = {
  id: number;
  type: string;
  title: string;
  amount: string;
  timestamp: string;
  locked: boolean;
};

const transactionsData: TransactionProps[] = [
  {
    id: 1,
    type: "received",
    title: "Payment received from TechHub Ltd",
    amount: "+₦450,000",
    timestamp: "5 days ago",
    locked: false,
  },
  {
    id: 2,
    type: "sent",
    title: "Payment to TechHub Ltd",
    amount: "+₦450,000",
    timestamp: "5 days ago",
    locked: true,
  },
];

const TransactionHistory = ({
  type,
  title,
  amount,
  timestamp,
  locked,
}: TransactionProps) => {
  const isReceived = type === "received";

  return (
    <div className="flex items-center justify-between gap-2 bg-white p-6 rounded-xl border border-gray-300 shadow-2 shadow-lg mb-4">
      <div className="flex items-center gap-2">
        <div
          className={`rounded-full p-2 ${isReceived ? "bg-[#dbfce7] text-[#38d095]" : "bg-[#dbeafe] text-[#316cec]"}`}
        >
          {isReceived ? (
            <ArrowDownToLine className="w-4.5 h-4.5" />
          ) : (
            <ArrowUpFromLine className="w-4.5 h-4.5" />
          )}
        </div>
        <div className="">
          <p className="text-black mb-1">{title}</p>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-xs">{timestamp}</span>
            {locked && (
              <span className="flex items-center gap-2 bg-[#fef3c7] text-[#dc8621] text-sm py-2 px-4 rounded-full">
                <LockKeyhole className="w-3 h-3" />
                Locked
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="">
        <p
          className={`text-black ${isReceived ? "text-green-300" : "text-black"}`}
        >
          {amount}
        </p>
      </div>
    </div>
  );
};

const TransactionList = () => {
  return (
    <div className="">
      {transactionsData.map((transaction) => (
        <TransactionHistory key={transaction.id} {...transaction} />
      ))}
    </div>
  );
};

export default TransactionList;
