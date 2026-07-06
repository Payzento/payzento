"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Search, BookOpen, Video, MessageCircle, ArrowRight, Zap, Lock, CreditCard, AlertCircle, FileText, Users, ChevronRight } from "lucide-react";

const categories = [
  { icon: <Zap className="w-5 h-5 text-amber-500" />, title: "Getting Started", count: 12, desc: "Account setup, KYC verification, and creating your first escrow transaction step by step.", topics: ["Creating an account", "KYC document requirements", "First transaction guide", "Dashboard overview"], color: "border-amber-500/20 bg-amber-500/5" },
  { icon: <Lock className="w-5 h-5 text-blue-500" />, title: "Escrow & Transactions", count: 24, desc: "Everything about how escrow works, creating transactions, setting milestones, and releasing funds.", topics: ["How escrow works", "Creating a transaction", "Milestone setup", "Auto-release timer"], color: "border-blue-500/20 bg-blue-500/5" },
  { icon: <CreditCard className="w-5 h-5 text-indigo-500" />, title: "Payouts & Settlements", count: 18, desc: "Bank transfers, FX rates, settlement schedules, and understanding payout timelines.", topics: ["Adding a bank account", "Payout schedules", "FX rates explained", "Settlement timelines"], color: "border-indigo-500/20 bg-indigo-500/5" },
  { icon: <AlertCircle className="w-5 h-5 text-rose-500" />, title: "Disputes", count: 9, desc: "How to raise a dispute, submit evidence, understand outcomes, and appeal a resolution decision.", topics: ["How to raise a dispute", "Evidence requirements", "Resolution timeline", "Understanding outcomes"], color: "border-rose-500/20 bg-rose-500/5" },
  { icon: <BookOpen className="w-5 h-5 text-emerald-500" />, title: "API & Integrations", count: 31, desc: "REST API reference, webhook configuration, SDK integration guides, and code samples.", topics: ["API authentication", "Webhook setup", "SDK quickstarts", "Error code reference"], color: "border-emerald-500/20 bg-emerald-500/5" },
  { icon: <FileText className="w-5 h-5 text-violet-500" />, title: "Account & Security", count: 15, desc: "Two-factor authentication, API key rotation, team member management, and account settings.", topics: ["Enabling 2FA", "API key management", "Team access control", "Account deletion"], color: "border-violet-500/20 bg-violet-500/5" },
];

const popular = [
  { q: "How do I start my first escrow transaction?", cat: "Getting Started" },
  { q: "When are funds automatically released to the seller?", cat: "Escrow" },
  { q: "How long does KYC verification take?", cat: "Getting Started" },
  { q: "How do I dispute a transaction?", cat: "Disputes" },
  { q: "What currencies does Payzento support?", cat: "Payouts" },
  { q: "How do I generate and rotate API keys?", cat: "API" },
  { q: "What happens if a seller doesn't deliver?", cat: "Disputes" },
  { q: "Can I set up partial milestone releases?", cat: "Escrow" },
];

const guides = [
  { icon: "🚀", title: "Quickstart Guide", desc: "Get from signup to your first secured transaction in under 10 minutes.", time: "10 min read", href: "/support" },
  { icon: "🔗", title: "API Integration Guide", desc: "Embed Payzento escrow into your platform using our REST API and SDKs.", time: "20 min read", href: "/merchants-dashboard/integrate-payzento" },
  { icon: "🏦", title: "Merchant Onboarding", desc: "Complete your merchant KYB, connect a bank account, and go live.", time: "15 min read", href: "/merchant-page" },
  { icon: "⚖️", title: "Dispute Resolution Handbook", desc: "Understand your rights, evidence requirements, and how decisions are made.", time: "8 min read", href: "/support" },
];

export default function SupportPage() {
  return (
    <PageWrapper>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">

        {/* Hero */}
        <div className="relative pt-40 pb-28 px-6 text-center border-b border-border/50 overflow-hidden bg-card/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />
          <motion.div className="max-w-2xl mx-auto" initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full mb-6">
              Support Center
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">How can we help you?</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">Search our knowledge base, browse guides by category, or connect with a real support agent.</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:outline-none focus:border-blue-500 transition-colors text-foreground shadow-sm text-sm" placeholder="Search guides, FAQs, API docs..." />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">Search</button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Popular: <span className="text-blue-500 cursor-pointer hover:underline">First transaction</span> · <span className="text-blue-500 cursor-pointer hover:underline">KYC verification</span> · <span className="text-blue-500 cursor-pointer hover:underline">API keys</span> · <span className="text-blue-500 cursor-pointer hover:underline">Disputes</span></p>
          </motion.div>
        </div>

        {/* Quick links */}
        <div className="py-10 px-6 bg-card/30 border-b border-border/40">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
            {[
              { label: "API Status", href: "/api-status", dot: "bg-emerald-500" },
              { label: "API Documentation", href: "/merchants-dashboard/integrate-payzento" },
              { label: "Contact Support", href: "/contact" },
              { label: "Merchant Onboarding", href: "/merchant-page" },
              { label: "Security Policy", href: "/security" },
              { label: "Report a Bug", href: "/contact" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-background border border-border hover:border-blue-500/30 text-xs font-bold text-muted-foreground hover:text-foreground transition-all">
                {l.dot && <span className={`w-2 h-2 rounded-full ${l.dot} animate-pulse`} />}
                {l.label} <ChevronRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight mb-8">Browse by Category</h2>
            <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              {categories.map((c) => (
                <motion.div key={c.title} variants={staggerItem}
                  className={`p-6 rounded-2xl border ${c.color} hover:shadow-lg hover:shadow-black/5 transition-all cursor-pointer group`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-background/50 rounded-xl border border-white/5 group-hover:scale-105 transition-transform">{c.icon}</div>
                    <span className="text-[10px] font-bold bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full">{c.count} articles</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.desc}</p>
                  <ul className="space-y-1.5">
                    {c.topics.map((t) => (
                      <li key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                        <ChevronRight className="w-3 h-3 text-muted-foreground/50" /> {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Featured guides */}
        <div className="py-16 px-6 bg-card/30 border-y border-border/40">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-extrabold tracking-tight mb-6">Featured Guides</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {guides.map((g) => (
                <Link key={g.title} href={g.href} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-blue-500/25 transition-all group">
                  <span className="text-3xl">{g.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-sm group-hover:text-blue-500 transition-colors">{g.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{g.desc}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 font-semibold">{g.time}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Popular + Contact */}
        <div className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight mb-6">Most Asked Questions</h2>
              <div className="space-y-2.5">
                {popular.map((p) => (
                  <div key={p.q} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-blue-500/20 cursor-pointer group transition-all">
                    <BookOpen className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{p.q}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{p.cat}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-extrabold tracking-tight mb-6">Still need help?</h2>
              {[
                { icon: <MessageCircle className="w-5 h-5 text-blue-500" />, title: "Live Chat", desc: "Get an instant response from our support team. Average wait: under 2 minutes during business hours.", tag: "Fastest", tagColor: "bg-blue-500/10 text-blue-500 border-blue-500/20", href: "/contact" },
                { icon: <Video className="w-5 h-5 text-indigo-500" />, title: "Schedule a Call", desc: "Book a 30-minute call with our merchant success team to walk through your integration or account setup.", tag: "Growth+", tagColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20", href: "/contact" },
                { icon: <Users className="w-5 h-5 text-emerald-500" />, title: "Submit a Ticket", desc: "For non-urgent issues, submit a support ticket and we will respond within 24 hours with a full resolution.", tag: "All Plans", tagColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", href: "/contact" },
              ].map((opt) => (
                <Link key={opt.title} href={opt.href} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-blue-500/20 cursor-pointer group transition-all">
                  <div className="p-3 bg-background rounded-xl border border-border flex-shrink-0">{opt.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground text-sm">{opt.title}</h3>
                      <span className={`text-[9px] font-black uppercase tracking-wider border px-2 py-0.5 rounded-full ${opt.tagColor}`}>{opt.tag}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{opt.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </Link>
              ))}
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 mt-6">
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">🔒 For account security issues</p>
                <p className="text-xs text-muted-foreground leading-relaxed">If you suspect unauthorised access to your account, email <span className="text-blue-500 font-semibold">security@payzento.com</span> immediately. Security issues are escalated to our SOC team and handled within 1 hour.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </PageWrapper>
  );
}
