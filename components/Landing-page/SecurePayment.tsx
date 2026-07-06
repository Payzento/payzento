import { CircleCheckBig, TrendingUp } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const SecurePaymentSection = () => {
  return (
    <div className="w-full bg-background border-t border-border transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto py-24 px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="w-full lg:flex-1 flex flex-col items-start">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-4">
              DEVELOPER & API INTEGRATION
            </div>
            <h1 className="text-2xl md:text-[36px] font-bold tracking-tight text-foreground leading-tight mb-5">
              Accept Secure Payments on Your Platform
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-lg mb-8">
              Easily add Payzento checkout to your website or platform using our robust JavaScript integration. 
              Protect your business and offer customer confidence in just a few lines of code.
            </p>
            <div className="flex flex-col items-start gap-4 mb-8 w-full max-w-md">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <CircleCheckBig className="text-emerald-500 w-4 h-4" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-foreground">
                    Payment secured first
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    No risk of fraud, fake alerts, or sudden chargebacks.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <CircleCheckBig className="text-emerald-500 w-4 h-4" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-foreground">
                    Guaranteed seller payouts
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Funds are secure in escrow, ready to release upon milestone delivery.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <CircleCheckBig className="text-emerald-500 w-4 h-4" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-foreground">
                    Plug-and-play SDK
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Drop-in checkout buttons, secure webhooks, and sandbox testing support.
                  </p>
                </div>
              </div>
            </div>
            <Button className="bg-[#1e50da] hover:bg-[#1a44bb] hover:shadow-lg rounded-xl py-6 px-8 text-[15px] text-white font-semibold shadow-md shadow-blue-500/10 cursor-pointer">
              Start Accepting Payments
            </Button>
          </div>
          
          {/* Glassmorphic Mockup Dashboard */}
          <div className="flex w-full lg:flex-1 bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden transition-colors duration-300">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative w-full flex flex-col gap-6 z-10">
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <div>
                  <p className="text-muted-foreground text-xs tracking-wider uppercase font-semibold">Merchant Dashboard</p>
                  <h1 className="text-3xl font-bold text-foreground mt-2">
                    ₦2,850,000
                  </h1>
                  <p className="text-muted-foreground/80 text-xs mt-1">
                    Total Volume Completed
                  </p>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background border border-border rounded-xl p-4 transition-colors duration-300">
                  <p className="text-muted-foreground text-xs">Pending Escrow</p>
                  <p className="text-amber-500 font-semibold text-lg mt-1">
                    ₦200,000
                  </p>
                </div>
                <div className="bg-background border border-border rounded-xl p-4 transition-colors duration-300">
                  <p className="text-muted-foreground text-xs">Available Balance</p>
                  <p className="text-emerald-500 font-semibold text-lg mt-1">
                    ₦1,245,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 border-t border-border/80 pt-16">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-500">₦2.5B+</h1>
            <p className="text-muted-foreground text-sm font-medium">Secured Transactions</p>
          </div>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-500">50,000+</h1>
            <p className="text-muted-foreground text-sm font-medium">Verified Active Accounts</p>
          </div>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-500">99.9%</h1>
            <p className="text-muted-foreground text-sm font-medium">Conflict Resolution Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurePaymentSection;
