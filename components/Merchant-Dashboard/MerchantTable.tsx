import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";

type StatusType = "HELD" | "REALEASED" | "DISPUTED";

const statusConfig: Record<StatusType, { bg: string; text: string }> = {
  HELD: {
    bg: "bg-yellow-200",
    text: "text-yellow-600",
  },
  REALEASED: {
    bg: "bg-green-200",
    text: "text-green-600",
  },
  DISPUTED: {
    bg: "bg-red-200",
    text: "text-red-600",
  },
};

type StatusItem = {
  stats: StatusType;
};

type MerchantProps = {
  taxID: string;
  buyer: string;
  product: string;
  amount: string;
  status: StatusItem[];
  date: string;
  action: string;
};

const merchantTable: MerchantProps[] = [
  {
    taxID: "TXN001",
    buyer: "john@example.com",
    product: "Premium Package",
    amount: "₦125,000",
    status: [
      {
        stats: "HELD",
      },
    ],
    date: "2 hours ago",
    action: "View",
  },
  {
    taxID: "TXN002",
    buyer: "john@example.com",
    product: "Premium Package",
    amount: "₦125,000",
    status: [{ stats: "REALEASED" }],
    date: "2 hours ago",
    action: "View",
  },
  {
    taxID: "TXN003",
    buyer: "john@example.com",
    product: "Premium Package",
    amount: "₦125,000",
    status: [{ stats: "HELD" }],
    date: "2 hours ago",
    action: "View",
  },
  {
    taxID: "TXN004",
    buyer: "john@example.com",
    product: "Premium Package",
    amount: "₦125,000",
    status: [{ stats: "DISPUTED" }],
    date: "2 hours ago",
    action: "View",
  },
];

const MerchantTable = () => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-4">
      <div className="flex items-center justify-between gap-2 mb-4">
        <h1 className="text-xl font-semibold">Recent Transactions</h1>
        <button className="text-sm font-semibold py-2 px-4 rounded-2xl hover:bg-gray-100">
          View All
        </button>
      </div>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-gray-500">
              Transaction ID
            </TableHead>
            <TableHead className="font-bold text-gray-500">Buyer</TableHead>
            <TableHead className="font-bold text-gray-500">Product</TableHead>
            <TableHead className="font-bold text-gray-500">Amount</TableHead>
            <TableHead className="font-bold text-gray-500">Status</TableHead>
            <TableHead className="font-bold text-gray-500">Date</TableHead>
            <TableHead className="font-bold text-gray-500">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {merchantTable.map((merchant) => (
            <TableRow key={merchant.taxID} className="gap-5">
              <TableCell className="font-medium py-4">
                {merchant.taxID}
              </TableCell>
              <TableCell className=" mb-4">{merchant.buyer}</TableCell>
              <TableCell className=" mb-4">{merchant.product}</TableCell>
              <TableCell className=" mb-4">{merchant.amount}</TableCell>
              <TableCell className=" mb-4">
                {merchant.status.map((stat, index) => {
                  const config = statusConfig[stat.stats];
                  return (
                    <span
                      key={index}
                      className={`py-2 px-3 rounded-2xl ${config.text} ${config.bg}`}
                    >
                      {stat.stats}
                    </span>
                  );
                })}
              </TableCell>
              <TableCell className=" mb-4">{merchant.date}</TableCell>
              <TableCell className=" mb-4 cursor-pointer">
                <Link href={`/merchants-dashboard/transactions/${merchant.taxID}`}>
                  {merchant.action}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MerchantTable;
