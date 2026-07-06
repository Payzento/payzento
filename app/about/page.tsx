"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import {
  Shield, Users, Globe, TrendingUp, Award, Heart,
  ArrowRight, CheckCircle2, Building2, Zap, Target, Lightbulb
} from "lucide-react";

const stats = [
  { value: "150+", label: "Countries Supported", sub: "Global payout reach" },
  { value: "$2M+", label: "Funds Secured", sub: "In escrow since launch" },
  { value: "99.97%", label: "Platform Uptime", sub: "Rolling 12-month SLA" },
  { value: "10,000+", label: "Active Merchants", sub: "Across 12 industries" },
];

const milestones = [
  { year: "Q1 2023", title: "Company Founded", desc: "Payzento incorporated in Lagos, Nigeria by Amara Osei and Tunde Adeyemi. Initial MVP built in 8 weeks covering basic escrow for freelancers." },
  { year: "Q3 2023", title: "Flutterwave Integration", desc: "Successfully integrated with Flutterwave, leveraging their CBN-licensed payment gateway and compliance infrastructure to secure all Payzento escrow wallets." },
  { year: "Q4 2023", title: "Seed Round Closed", desc: "Raised $3M seed from TLcom Capital, Ventures Platform, and Founder One. Used to expand engineering team and launch the Merchant Dashboard." },
  { year: "Q1 2024", title: "API Platform Launched", desc: "Released public REST API and SDK libraries enabling marketplace operators and SaaS platforms to embed escrow directly into their transaction flows." },
  { year: "Q2 2024", title: "London Office Opens", desc: "Established UK entity and opened the London office to serve European enterprise clients and comply with FCA cross-border payment requirements." },
  { year: "Q1 2025", title: "$2M Milestone", desc: "Crossed $2M in total transaction value held in escrow. TradeBridge Africa and FreelanceNG became anchor enterprise customers." },
  { year: "Q3 2025", title: "ISO 27001 Certified", desc: "Achieved ISO/IEC 27001 certification following a six-month audit by BSI Group. Third-party SOC 2 Type II audit completed simultaneously." },
  { year: "2026", title: "Dubai Expansion", desc: "Opened DIFC-registered entity in Dubai to serve Gulf Cooperation Council (GCC) markets and facilitate cross-border trade finance transactions." },
];

const team = [
  {
    name: "Amara Osei",
    role: "CEO & Co-Founder",
    bg: "from-blue-500/20 to-indigo-500/10",
    border: "border-blue-500/20",
    initial: "A",
    iColor: "text-blue-500",
    bio: "Amara spent 8 years at Flutterwave building the payment infrastructure that powers thousands of African businesses. She led the Africa expansion of their escrow and disbursement products before founding Payzento.",
    prev: ["Flutterwave", "Interswitch", "PWC Nigeria"],
  },
  {
    name: "Tunde Adeyemi",
    role: "CTO & Co-Founder",
    bg: "from-indigo-500/20 to-violet-500/10",
    border: "border-indigo-500/20",
    initial: "T",
    iColor: "text-indigo-500",
    bio: "Tunde is a distributed systems engineer who built high-throughput financial reconciliation systems at Google and Stripe. He designed Payzento's core escrow engine to process 10,000+ concurrent transactions without race conditions.",
    prev: ["Google", "Stripe", "Carbon (OneFi)"],
  },
  {
    name: "Chidinma Eze",
    role: "Chief Compliance Officer",
    bg: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
    initial: "C",
    iColor: "text-emerald-500",
    bio: "Chidinma is a licensed barrister and compliance specialist with deep expertise in Nigerian and UK financial regulation. She structured Payzento's compliance logic and integration frameworks with regulated custodians from scratch.",
    prev: ["Stanbic IBTC", "Andersen Tax (Nigeria)", "Dentons Law"],
  },
  {
    name: "Kwame Asante",
    role: "VP of Growth",
    bg: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/20",
    initial: "K",
    iColor: "text-amber-500",
    bio: "Kwame has scaled B2B SaaS revenue from zero to $4M ARR across two companies in West Africa and Europe. He built Payzento's channel partner programme and enterprise sales motion from the ground up.",
    prev: ["Paystack", "Sendchamp", "Wave"],
  },
];

const values = [
  { icon: <Shield className="w-6 h-6 text-blue-500" />, title: "Security First", desc: "Every architecture decision starts from a threat model, not a feature list. Our security posture is PCI-DSS Level 1, and we run penetration tests quarterly.", bg: "bg-blue-500/8 border-blue-500/20" },
  { icon: <Users className="w-6 h-6 text-indigo-500" />, title: "Trust by Design", desc: "The escrow mechanism is structurally neutral. Neither buyers nor sellers have an advantage — the platform enforces agreed conditions mechanically, without human bias.", bg: "bg-indigo-500/8 border-indigo-500/20" },
  { icon: <Globe className="w-6 h-6 text-teal-500" />, title: "Global Reach", desc: "Commerce does not stop at borders. We support payouts in 150+ countries with real-time FX conversion through our banking partners, including USD, GBP, EUR, and NGN corridors.", bg: "bg-teal-500/8 border-teal-500/20" },
  { icon: <TrendingUp className="w-6 h-6 text-amber-500" />, title: "Built for Scale", desc: "Our infrastructure is designed around eventual consistency, idempotent transaction records, and distributed ledger reconciliation — handling surge loads without degradation.", bg: "bg-amber-500/8 border-amber-500/20" },
  { icon: <Award className="w-6 h-6 text-emerald-500" />, title: "Compliance Ready", desc: "We do not treat compliance as a checkbox. Regulatory-grade audit trails, real-time AML screening, KYB/KYC, and NDPR/GDPR data practices are built into every user journey.", bg: "bg-emerald-500/8 border-emerald-500/20" },
  { icon: <Heart className="w-6 h-6 text-rose-500" />, title: "Merchant Obsession", desc: "Every product decision goes through the lens of merchant success. We measure ourselves by merchant dispute rates, settlement speed, and net promoter scores — not just revenue.", bg: "bg-rose-500/8 border-rose-500/20" },
];

const investors = [
  { name: "TLcom Capital", type: "Lead Investor", desc: "Africa-focused technology growth fund." },
  { name: "Ventures Platform", type: "Co-Investor", desc: "Pan-African pre-seed and seed fund." },
  { name: "Founder One", type: "Co-Investor", desc: "Operator-led angel network across fintech." },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">

        {/* Hero */}
        <div className="relative pt-40 pb-28 px-6 overflow-hidden border-b border-border/50">
          <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-indigo-500/6 rounded-full blur-3xl pointer-events-none" />
          <motion.div className="max-w-4xl mx-auto text-center" initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full mb-6">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              We exist to make digital{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
                trade trustworthy
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Payzento was founded in 2023 by a team of payment engineers and compliance experts who were tired of watching legitimate commerce collapse because of bad actors and broken trust. We built the escrow infrastructure that fixes that — permanently, at scale.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/getting-started" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg shadow-blue-500/20">
                Start Using Payzento <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-border hover:bg-muted text-foreground font-bold px-8 py-4 rounded-2xl transition-colors">
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="py-16 px-6 bg-card/50 border-b border-border/40">
          <motion.div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {stats.map((s) => (
              <motion.div key={s.label} variants={staggerItem} className="text-center">
                <p className="text-4xl md:text-5xl font-black text-foreground">{s.value}</p>
                <p className="text-sm font-bold text-foreground mt-2">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mission */}
        <div className="py-24 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Our Mission</span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-3 mb-6">A safer infrastructure for every transaction</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Commerce should be based on trust, not hope. Every year, billions of dollars are lost to fraud, payment disputes, ghost sellers, and counterparty defaults — not because the parties are criminals, but because the infrastructure connecting them is inadequate.</p>
                <p>Payzento creates a neutral, automated escrow control logic layer that secures transaction funds in Flutterwave's regulated custodial infrastructure until both sides confirm the terms of the transaction have been met. No more sending money and hoping for the best. No more delivering work without payment guarantee.</p>
                <p>We provide the intelligent transaction coordinator and trust architecture that B2B commerce runs on. By building on top of Flutterwave's robust infrastructure and licensed coverage, we offer a developer-friendly escrow logic engine built to work at the speed of modern business — across any industry, country, or transaction size.</p>
              </div>
              <div className="mt-8 space-y-3">
                {["Zero counterparty risk on every transaction", "Instant releases when conditions are met", "Neutral dispute resolution within 72 hours", "Works for any industry, any deal size"].map((pt) => (
                  <div key={pt} className="flex items-center gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {pt}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 gap-4">
              {values.map((v) => (
                <motion.div key={v.title} variants={staggerItem} className={`p-5 rounded-2xl border ${v.bg} hover:scale-[1.02] transition-all duration-200`}>
                  <div className="mb-3 p-2 rounded-xl bg-background/50 w-fit border border-white/5">{v.icon}</div>
                  <h3 className="font-bold text-sm text-foreground mb-2">{v.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Timeline */}
        <div className="py-24 px-6 bg-card/30 border-y border-border/40">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-500">Our Journey</span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-3">From idea to infrastructure</h2>
            </motion.div>
            <div className="relative">
              <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-indigo-500/30 to-transparent" />
              <div className="space-y-10">
                {milestones.map((m, i) => (
                  <motion.div key={m.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex gap-6 items-start">
                    <div className="w-11 h-11 rounded-full bg-card border-2 border-blue-500/40 flex items-center justify-center flex-shrink-0 relative z-10">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">{m.year}</span>
                        <h3 className="font-extrabold text-foreground">{m.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-xs font-bold uppercase tracking-widest text-violet-500">Leadership</span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-3">The team behind the platform</h2>
              <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm leading-relaxed">We are engineers, lawyers, operators, and product thinkers who have all felt the pain of broken payments infrastructure first-hand.</p>
            </motion.div>
            <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              {team.map((m) => (
                <motion.div key={m.name} variants={staggerItem}
                  className="p-6 rounded-2xl bg-card border border-border hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/20 transition-all duration-300 group flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.bg} border ${m.border} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                    <span className={`text-2xl font-black ${m.iColor}`}>{m.initial}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm">{m.name}</h3>
                  <p className={`text-xs font-bold mt-0.5 mb-3 ${m.iColor}`}>{m.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{m.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {m.prev.map((p) => (
                      <span key={p} className="text-[9px] font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{p}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Investors */}
        <div className="py-16 px-6 bg-card/30 border-y border-border/40">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">Backed by</p>
            <div className="grid sm:grid-cols-3 gap-5">
              {investors.map((inv) => (
                <div key={inv.name} className="p-5 rounded-2xl bg-card border border-border text-center">
                  <h3 className="font-extrabold text-foreground text-lg">{inv.name}</h3>
                  <p className="text-xs font-bold text-blue-500 mt-0.5 mb-2">{inv.type}</p>
                  <p className="text-xs text-muted-foreground">{inv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-24 px-6 bg-[#060b18] border-t border-white/5">
          <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Target className="w-10 h-10 text-blue-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to make your transactions safer?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">Join 10,000+ merchants and buyers who have eliminated payment risk from their business with Payzento's escrow infrastructure.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/getting-started" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg shadow-blue-500/20">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/case-studies" className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-2xl transition-colors">
                Read Case Studies
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
      <Footer />
    </PageWrapper>
  );
}
