import React from "react";
import Nav from "@/components/Nav";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  CircleEllipsis,
  Lock,
  LockIcon,
  Plus,
  SquareCheck,
  Wallet,
} from "lucide-react";
import Link from "next/link";

type StatusType = "HELD" | "RELEASED" | "COMPLETED";

const statusConfig: Record<
  StatusType,
  {
    icon: React.ElementType;
    bg: string;
    border: string;
    text: string;
  }
> = {
  HELD: {
    icon: LockIcon,
    bg: "bg-red-200",
    text: "text-red-600",
    border: "border border-red-300",
  },
  RELEASED: {
    icon: CircleEllipsis,
    bg: "bg-yellow-200",
    text: "text-yellow-600",
    border: "border border-yellow-300",
  },
  COMPLETED: {
    icon: SquareCheck,
    bg: "bg-green-200",
    text: "text-green-600",
    border: "border border-green-300",
  },
};

type StatusItem = {
  icon: React.ElementType;
  stat: StatusType;
};

type TransactionProps = {
  name: string;
  status: StatusItem[];
  amount: string;
  purchase: string;
  date: string;
};

const transactionsCard: TransactionProps[] = [
  {
    name: "Adewale Graphics",
    status: [
      {
        icon: LockIcon,
        stat: "HELD",
      },
    ],
    amount: "₦125,000",
    purchase: "Logo Design",
    date: "2 days ago",
  },
  {
    name: "TechHub Ltd",
    status: [
      {
        icon: CircleEllipsis,
        stat: "RELEASED",
      },
    ],
    amount: "₦125,000",
    purchase: "Logo Design",
    date: "2 days ago",
  },
  {
    name: "Adewale Graphics",
    status: [
      {
        icon: LockIcon,
        stat: "HELD",
      },
    ],
    amount: "₦125,000",
    purchase: "Logo Design",
    date: "2 days ago",
  },
  {
    name: "Adewale Graphics",
    status: [
      {
        icon: SquareCheck,
        stat: "COMPLETED",
      },
    ],
    amount: "₦125,000",
    purchase: "Logo Design",
    date: "2 days ago",
  },
];

const Dashboard = () => {
  return (
    <div>
      <Nav />
      <div className="mt-20 max-w-7xl mx-auto px-2 pt-4">
        <div className="flex flex-col md:flex-row gap-4 ">
          <Card className="bg-[#132c51] w-full flex-1 text-white px-4 py-6">
            <CardHeader>
              <CardTitle className="text-gray-300 text-lg">
                Available Balance
              </CardTitle>
              <CardAction>
                <Wallet />
              </CardAction>
            </CardHeader>
            <CardContent className="">
              <p className="text-3xl">₦1,245,000</p>
              <Link href="/dashboard/withdraw">
                <button className="bg-white hover:border-2 hover:border-blue-400 rounded-xl px-4 py-2 text-black font-semibold mt-5 cursor-pointer">
                  Withdraw
                </button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-[#ea8e09] w-full flex-1 text-white px-4 py-6">
            <CardHeader className="flex items-center gap-2 text-white">
              <Lock className="text-white w-4.5 h-4.5" />
              <CardTitle className="text-gray-100 text-lg">
                Locked Funds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">₦200,500</p>
              <p className="mt-5">Funds held in 2 active transactions</p>
            </CardContent>
          </Card>
        </div>

        <Link
          href="new-transaction"
          className="my-6 w-fit bg-[#1e51da] px-6 py-4 rounded-xl flex items-center gap-2 text-white cursor-pointer hover:shadow-xl"
        >
          <Plus />
          Start New Transaction
        </Link>
      </div>

      <div className="w-full flex flex-col max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between gap-2 my-5">
          <h1 className="font-semibold text-xl">Recent Transactions</h1>
          <Link
            href="#"
            className="text-sm hover:underline underline-offset-1 text-[#3473ee]"
          >
            View All
          </Link>
        </div>
        <div className="flex flex-col">
          {transactionsCard.map((card, index) => {
            return (
              <Link
                href="review-funds"
                key={index}
                className="cursor-pointer my-2"
              >
                <Card className="w-full flex-1 text-white px-4 py-6 hover:shadow-lg">
                  <CardHeader className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-white">
                      <CardTitle className="text-black text-lg">
                        {card.name}
                      </CardTitle>
                      <div className="">
                        {card.status.map((item, index) => {
                          const config = statusConfig[item.stat];
                          const Icon = item.icon;

                          return (
                            <div
                              key={index}
                              className={`flex items-center gap-2 py-2 px-4 rounded-full ${config.text} ${config.border} ${config.bg}`}
                            >
                              <Icon className="w-4 h-4" />
                              <p className="">{item.stat}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="text-black">
                      <p className="text-xl">{card.amount}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-start justify-between gap-2">
                    <div className="text-left">
                      <p className="text-gray-500">{card.purchase}</p>
                      <span className="text-gray-400 text-xs p-0 ">
                        {card.date}
                      </span>
                    </div>
                    <ArrowRight className="text-gray-400 w-4 h-4" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
          <Card className="col-span-1 text-center hover:shadow-xl cursor-pointer">
            <CardHeader className="p-0">
              <CardTitle className="flex flex-col items-center justify-center gap-3 text-lg font-semibold">
                <div className="bg-[#dbeafe] text-[#2966eb] p-3 rounded-full">
                  <Wallet className="w-6 h-6 " />
                </div>
                Wallet
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-500">
              Manage your funds
            </CardContent>
          </Card>
          <Card className="col-span-1 text-center hover:shadow-xl cursor-pointer">
            <CardHeader className="p-0">
              <CardTitle className="flex flex-col items-center justify-center gap-3 text-lg font-semibold">
                <div className="bg-[#fef3c6] text-[#f7b032] p-3 rounded-full">
                  <Lock className="w-6 h-6 " />
                </div>
                Active Escrows
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-500">
              View locked transactions
            </CardContent>
          </Card>
          <Card className="col-span-1 text-center hover:shadow-xl cursor-pointer">
            <CardHeader className="p-0">
              <CardTitle className="flex flex-col items-center justify-center gap-3 text-lg font-semibold">
                <div className="bg-[#f3e8ff] text-[#e53679] p-3 rounded-full">
                  <ChartNoAxesColumnIncreasing className="w-6 h-6 " />
                </div>
                Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-500">
              Transaction history
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
