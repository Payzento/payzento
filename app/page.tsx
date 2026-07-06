"use client";

import Nav from "@/components/Nav";
import ReusableSections from "@/components/ReusableSections";
import FAQSection from "@/components/Landing-page/FaqSection";
import SecurePaymentSection from "@/components/Landing-page/SecurePayment";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import {
  Lock,
  LockKeyhole,
  Shield,
  Users,
  CircleCheckBig,
  TrendingUp,
  FileCheck,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { fadeUp, scaleIn } from "@/lib/animations";

import InteractiveGlobe from "@/components/InteractiveGlobe";

export default function Home() {
  return (
    <PageWrapper>
      <Nav />
      {/* Premium Hero Section with theme-adaptive mesh gradients */}
      <div className="relative bg-background overflow-hidden pt-10 transition-colors duration-300">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6 mt-32 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: HERO TEXT */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-6 shadow-sm"
              >
                <Shield className="w-3.5 h-3.5" /> Secure B2B Escrow Payments
              </motion.div>

              <motion.h1
                className="text-[34px] md:text-[56px] font-extrabold tracking-tight text-foreground leading-tight max-w-4xl"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                Send Money With{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-500 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400">
                  Guarantee
                </span>
              </motion.h1>
              <motion.p
                className="text-base md:text-xl text-muted-foreground max-w-2xl mt-6 leading-relaxed"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: 0.15 }}
              >
                Your payment is locked securely in escrow until you confirm delivery. 
                Complete control, zero seller risk.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row items-center gap-4 mt-8 px-2"
                initial="hidden"
                animate="visible"
                variants={scaleIn}
                transition={{ delay: 0.3 }}
              >
                <Link href="/getting-started">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-7 px-8 cursor-pointer font-semibold shadow-lg shadow-blue-500/10">
                      Start Secure Transaction
                    </Button>
                  </motion.div>
                </Link>

                <Link href="/getting-started">
                  <motion.div whileHover={{ scale: 1.01, opacity: 0.95 }} whileTap={{ scale: 0.98 }}>
                    <Button className="bg-secondary hover:bg-muted border border-border text-foreground rounded-xl py-7 px-8 cursor-pointer font-semibold shadow-sm">
                      Create Free Account
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: ROTATING GLOBE — hidden on mobile */}
            <div className="lg:col-span-5 hidden md:flex items-center justify-center">
              <InteractiveGlobe />
            </div>

          </div>

          {/* Interactive Escrow Diagram — premium animated */}
          <motion.div
            className="w-full mt-20 max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.4 }}
          >
            {/* Section label */}
            <div className="flex items-center justify-center mb-10 gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/60" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3">
                How Escrow Works
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/60" />
            </div>

            {/* Main diagram card */}
            <div className="relative rounded-3xl border border-border/60 bg-card/40 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/20 p-8 md:p-12">

              {/* Subtle mesh background */}
              <div className="absolute inset-0 opacity-30 pointer-events-none"
                   style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(52,211,153,0.06) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(245,158,11,0.07) 0%, transparent 40%)" }} />

              {/* Three nodes + animated SVG connectors */}
              <div className="relative flex items-center justify-between gap-4 md:gap-8">

                {/* ── BUYER NODE ── */}
                <motion.div
                  className="flex flex-col items-center gap-4 z-10"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55, duration: 0.6, ease: [0.22,1,0.36,1] }}
                >
                  <div className="relative">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-lg scale-125 animate-pulse" />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/10">
                      <Users className="w-9 h-9 md:w-10 md:h-10 text-blue-400" />
                    </div>
                    {/* Live pulse dot */}
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 border-2 border-card" />
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground text-sm">Buyer</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Initiates payment</p>
                  </div>
                </motion.div>

                {/* ── CONNECTOR 1: Buyer → Escrow ── */}
                <div className="flex-1 relative flex items-center min-w-0 h-16">
                  <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="conn1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    {/* Base dashed track */}
                    <line x1="0" y1="50%" x2="100%" y2="50%"
                          stroke="url(#conn1)" strokeWidth="1.5"
                          strokeDasharray="6 5" opacity="0.4" />
                    {/* Animated flowing particle */}
                    <circle r="4" fill="#60a5fa" opacity="0.9"
                            style={{ filter: "drop-shadow(0 0 4px #3b82f6)" }}>
                      <animateMotion dur="2s" repeatCount="indefinite"
                        path="M 0,0 L 100%,0" />
                    </circle>
                    <circle r="3" fill="#93c5fd" opacity="0.6">
                      <animateMotion dur="2s" begin="0.7s" repeatCount="indefinite"
                        path="M 0,0 L 100%,0" />
                    </circle>
                  </svg>
                  {/* Step label */}
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-widest text-blue-400/70 whitespace-nowrap">
                    Funds locked
                  </span>
                </div>

                {/* ── ESCROW VAULT NODE (centre) ── */}
                <motion.div
                  className="flex flex-col items-center gap-4 z-10"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.6, ease: [0.22,1,0.36,1] }}
                >
                  {/* ESCROW badge */}
                  <div className="absolute -translate-y-16 bg-amber-500/90 text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-amber-500/30 border border-amber-400/50">
                    ESCROW VAULT
                  </div>
                  <div className="relative">
                    {/* Multi-layer glow */}
                    <div className="absolute inset-0 rounded-3xl bg-amber-500/30 blur-xl scale-150 animate-pulse" />
                    <div className="absolute inset-0 rounded-3xl bg-amber-500/15 blur-md scale-125" />
                    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 border border-amber-300/50 flex items-center justify-center shadow-xl shadow-amber-500/30">
                      <Lock className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
                    </div>
                    {/* Rotating ring around vault */}
                    <div className="absolute inset-[-8px] rounded-[28px] border-2 border-dashed border-amber-400/30"
                         style={{ animation: "spin 8s linear infinite" }} />
                  </div>
                  <div className="text-center">
                    <p className="font-extrabold text-amber-500 dark:text-amber-400 text-sm">Payzento</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Holds until verified</p>
                  </div>
                </motion.div>

                {/* ── CONNECTOR 2: Escrow → Seller ── */}
                <div className="flex-1 relative flex items-center min-w-0 h-16">
                  <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="conn2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="50%" x2="100%" y2="50%"
                          stroke="url(#conn2)" strokeWidth="1.5"
                          strokeDasharray="6 5" opacity="0.4" />
                    <circle r="4" fill="#34d399" opacity="0.9"
                            style={{ filter: "drop-shadow(0 0 4px #10b981)" }}>
                      <animateMotion dur="2.4s" repeatCount="indefinite"
                        path="M 0,0 L 100%,0" />
                    </circle>
                    <circle r="3" fill="#6ee7b7" opacity="0.6">
                      <animateMotion dur="2.4s" begin="0.9s" repeatCount="indefinite"
                        path="M 0,0 L 100%,0" />
                    </circle>
                  </svg>
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-widest text-emerald-400/70 whitespace-nowrap">
                    Released
                  </span>
                </div>

                {/* ── SELLER NODE ── */}
                <motion.div
                  className="flex flex-col items-center gap-4 z-10"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55, duration: 0.6, ease: [0.22,1,0.36,1] }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-3xl bg-emerald-500/20 blur-lg scale-125 animate-pulse" />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                      <Users className="w-9 h-9 md:w-10 md:h-10 text-emerald-400" />
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-card" />
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground text-sm">Seller</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Receives on confirm</p>
                  </div>
                </motion.div>

              </div>

              {/* ── Stats row ── */}
              <motion.div
                className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-border/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                {[
                  { value: "$2M+",  label: "Funds Secured",   color: "text-blue-400",    dot: "bg-blue-500" },
                  { value: "100%",  label: "Dispute Coverage", color: "text-amber-400",   dot: "bg-amber-500" },
                  { value: "< 2s",  label: "Release Speed",   color: "text-emerald-400", dot: "bg-emerald-500" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-1.5 text-center">
                    <div className={`flex items-center gap-1.5`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${stat.dot} animate-pulse`} />
                      <span className={`text-xl md:text-2xl font-black ${stat.color}`}>{stat.value}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* ── Security status bar ── */}
              <motion.div
                className="mt-6 flex items-center justify-center gap-2.5 py-3 px-5 rounded-2xl bg-amber-500/8 border border-amber-500/15"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <LockKeyhole className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-xs font-bold text-amber-500 dark:text-amber-400 uppercase tracking-[0.18em]">
                  Funds held securely · 256-bit encrypted · Zero counterparty risk
                </span>
                <span className="flex h-2 w-2 ml-1">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-amber-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-card border-y border-border/60 transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto py-20 px-4">
          <ReusableSections
            header="How It Works"
            description="Simple, safe, and automated escrow system."
            cards={[
              {
                cardIcon: <Shield className="w-6 h-6 text-blue-500" />,
                cardTitle: "1. Create Transaction",
                cardDescription:
                  "Enter transaction amount and details. Payment is locked securely from the start.",
                className: "bg-blue-500/10 border border-blue-500/20",
              },
              {
                cardIcon: <Lock className="w-6 h-6 text-amber-500" />,
                cardTitle: "2. Funds Held Securely",
                cardDescription:
                  "Payment is locked in Payzento escrow. Seller cannot access it until you confirm delivery.",
                className: "bg-amber-505/10 border border-amber-500/20",
              },
              {
                cardIcon: <CircleCheckBig className="w-6 h-6 text-emerald-500" />,
                cardTitle: "3. You Release Funds",
                cardDescription:
                  "Once you confirm delivery of goods/services, funds release instantly to the seller.",
                className: "bg-emerald-500/10 border border-emerald-500/20",
              },
            ]}
          />
        </div>
      </div>

      <div className="bg-background transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto py-20 px-4">
          <ReusableSections
            header="Perfect For Every Transaction"
            description="Protecting businesses, online sellers, and individual service providers."
            cards={[
              {
                cardIcon: <Users className="w-7 h-7 text-blue-500" />,
                cardTitle: "Freelancers & Buyers",
                cardDescription: "Pay for deliverables only when you are 100% satisfied.",
                className: "bg-blue-500/10",
              },
              {
                cardIcon: <TrendingUp className="w-7 h-7 text-blue-500" />,
                cardTitle: "Online Vendors",
                cardDescription: "Sell safely without risk of chargebacks or payment alerts.",
                className: "bg-blue-500/10",
              },
              {
                cardIcon: <FileCheck className="w-7 h-7 text-blue-500" />,
                cardTitle: "Service Providers",
                cardDescription: "Secure client budgets up front before committing resources.",
                className: "bg-blue-500/10",
              },
            ]}
          />
        </div>
      </div>

      <SecurePaymentSection />
      <FAQSection />

      {/* Footer Banner */}
      <div className="bg-slate-950 flex flex-col items-center justify-center py-24 px-4 relative overflow-hidden border-t border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.06),transparent_40%)]" />
        <motion.div
          className="text-center relative z-10 max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">
            Ready to Send Money Safely?
          </h1>
          <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm md:text-base">
            Join thousands of modern businesses who protect their transactions with Payzento.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/getting-started">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button className="bg-white hover:bg-slate-50 text-slate-900 rounded-xl py-6 px-8 cursor-pointer font-semibold shadow-lg shadow-white/5">
                  Get Started as Buyer
                </Button>
              </motion.div>
            </Link>

            <Link href="/merchant-page">
              <motion.div whileHover={{ scale: 1.01, opacity: 0.9 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-xl py-6 px-8 cursor-pointer font-semibold">
                  Start as Merchant
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </PageWrapper>
  );
}
