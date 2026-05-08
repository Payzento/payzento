import Nav from "@/components/Nav";
import ReusableSections from "@/components/ReusableSections";
import FAQSection from "@/components/Landing-page/FaqSection";
import SecurePaymentSection from "@/components/Landing-page/SecurePayment";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Lock,
  LockKeyhole,
  MoveRight,
  Shield,
  Users,
  CircleCheckBig,
  TrendingUp,
  FileCheck,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Nav />
      <div className=" bg-gray-100">
        <div className="flex items-center flex-col px-4 mt-30 mb-10">
          <h1 className="text-[30px] md:text-[40px] font-bold text-center">
            Send Money With Guarantee
          </h1>
          <p className="text:sm md:text-lg text-gray-500 text-center">
            Your payment is locked until you confirm delivery. Complete control,
            zero risk.
          </p>
          <div className="flex items-center gap-2 md:gap-4 my-4 px-2">
            <Link href="/getting-started">
              <Button className="bg-[#1e50d9] hover:shadow-lg text-white rounded-xl p-7 cursor-pointer font-semibold">
                Start Secure Transaction
              </Button>
            </Link>

            <Link href="/getting-started">
              <Button className="bg-white border-2 border-gray-300 hover:border-[#1e50d9]  text-black rounded-xl p-7 cursor-pointer font-semibold">
                Create Free Account
              </Button>
            </Link>
          </div>
          <div className="w-full flex items-center justify-center mt-10">
            <Card className="bg-gray-100 w-full max-w-4xl py-10">
              <CardContent className="flex items-center justify-between rounded-lg px-4 py-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-full bg-blue-200/20 w-20 h-20 flex flex-col items-center justify-center">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <p>Buyer</p>
                </div>

                <div className="flex gap-2">
                  <div className="w-10 h-0.5 bg-blue-400 " />
                  <MoveRight className="w-3 h-3" />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-full bg-orange-400 w-18 h-18 flex flex-col items-center justify-center scale-3d animate-pulse">
                    <Lock className="w-8 h-8 text-white scale-75" />
                  </div>
                  <p>Payzento</p>
                </div>

                <div className="flex gap-2">
                  <MoveRight className="w-3 h-3" />
                  <div className="w-10 h-0.5 bg-green-400 " />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-full bg-green-200/20 w-20 h-20 flex flex-col items-center justify-center">
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                  <p>Seller</p>
                </div>
              </CardContent>
              <div className="flex items-center justify-center gap-2 -mt-10 text-orange-400">
                {" "}
                <LockKeyhole className="w-3.5 h-3.5" />
                <p className="">LOCKED</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="w-full max-w-7xl mx-auto py-10 px-4">
          <ReusableSections
            header="How It Works"
            description=""
            // className="border border-gray-300 bg-gray-200/20"
            cards={[
              {
                cardIcon: <Shield className="w-6 h-6 text-blue-500" />,
                cardTitle: "1. Create Transactiont",
                cardDescription:
                  "Enter the amount and add the seller. Your money is safe from the start.",
                className: "bg-blue-300/20",
              },
              {
                cardIcon: <Lock className="w-6 h-6 text-orange-500" />,
                cardTitle: "2. Funds Held Securely",
                cardDescription:
                  "Payment is locked in escrow. Seller can't access it until you approve.",
                className: "bg-yellow-300/20",
              },
              {
                cardIcon: <CircleCheckBig className="w-6 h-6 text-green-500" />,
                cardTitle: "3. You Control Release",
                cardDescription:
                  "Once you confirm delivery, payment is released. You're always in control.",
                className: "bg-green-300/20",
              },
            ]}
          />
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="w-full max-w-7xl mx-auto py-10 px-4">
          <ReusableSections
            header="Perfect For Every Transaction"
            description="Whether you're hiring freelancers, buying from vendors, or selling services"
            cards={[
              {
                cardIcon: <Users className="w-7 h-7 text-blue-500" />,
                cardTitle: "Freelancers & Buyers",
                cardDescription: "Pay for work only when satisfied.",
                className1: "bg-white",
              },
              {
                cardIcon: <TrendingUp className="w-7 h-7 text-blue-500" />,
                cardTitle: "Online Vendors",
                cardDescription: "Sell safely with guaranteed payment",
                className1: "bg-white",
              },
              {
                cardIcon: <FileCheck className="w-7 h-7 text-blue-500" />,
                cardTitle: "Service Providers",
                cardDescription: "Secure payments for both parties",
                className1: "bg-white",
              },
            ]}
          />
        </div>
      </div>
      <SecurePaymentSection />
      <FAQSection />

      <div className="bg-[#1f54de] flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center ">
          <h1 className="text-3xl font-semibold text-white mb-3">
            Ready to Send Money Safely
          </h1>
          <p className="text-gray-300">
            Join thousands of users who trust Payzento for secure transactions
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-white hover:shadow-lg  hover:border hover:border-[#1f54de] text-[15px] text-black rounded-xl p-7 cursor-pointer font-semibold mt-4">
              Get Started as Buyer
            </Button>
            <Button className="bg-blue-500/50 text-white hover:shadow-lg text-[15px] border border-gray-400 rounded-xl p-7 cursor-pointer font-semibold mt-4">
              Start as Merchant
            </Button>
          </div>
        </div>
      </div>

      <footer>
        <div className="bg-gray-800 text-white py-10 px-4">
          <div className="w-full max-w-7xl mx-auto">
            <p className="text-center">© 2023 Payzento. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
