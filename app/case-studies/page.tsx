"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { ArrowRight, TrendingUp, Quote, CheckCircle2, BarChart3 } from "lucide-react";

const cases = [
  {
    company: "TradeBridge Africa",
    industry: "B2B Marketplace · Lagos, Nigeria",
    logo: "TB",
    accentFrom: "from-blue-500",
    accentTo: "to-indigo-600",
    borderColor: "border-blue-500/25",
    bgColor: "bg-blue-500/5",
    metricColor: "text-blue-500",
    result: "68% reduction in payment disputes",
    tagline: "Eliminating the trust gap between SME buyers and suppliers across West Africa",
    challenge: "TradeBridge operated a B2B marketplace connecting over 3,000 SME buyers with 800 verified suppliers across Nigeria, Ghana, and Senegal. Payment disputes were the single largest cost centre — consuming 12% of GMV in manual refunds, banking reversal fees, and a full-time dispute management team of 6 people. The core problem: buyers were sending money via bank transfer and trusting sellers to deliver. Sellers were shipping goods and trusting buyers to pay. Neither side had a systemic guarantee.",
    solution: "TradeBridge embedded Payzento's escrow API directly into their existing order management system in 11 days using our Node.js SDK. When a buyer confirms an order, funds are automatically swept from their account into a Payzento escrow vault. The seller sees a \"Payment Secured\" confirmation and can proceed to fulfil. Upon delivery confirmation, funds release within 2 seconds — automatically, without any human intervention.",
    impact: "Dispute rates dropped from 14% to 4.2% within the first 60 days. The 6-person dispute team was redeployed to merchant success. Settlement speed improved from an average of 11 days (manual chase) to 2 seconds (automated release). Seller satisfaction NPS increased from 34 to 71.",
    metrics: [
      { v: "68%", l: "Fewer Disputes" },
      { v: "$1.2M", l: "GMV Protected" },
      { v: "3.1×", l: "Seller NPS" },
      { v: "2s", l: "Release Time" },
    ],
    quote: "We went from spending 20 hours a week on dispute calls to less than 2. Our sellers trust the platform now because they know the money is real and locked before they ship. Payzento just handles it.",
    author: "Emeka Okonkwo",
    title: "Chief Operating Officer, TradeBridge Africa",
  },
  {
    company: "FreelanceNG",
    industry: "Freelance Platform · Pan-Africa",
    logo: "FN",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-600",
    borderColor: "border-emerald-500/25",
    bgColor: "bg-emerald-500/5",
    metricColor: "text-emerald-500",
    result: "4.2× increase in platform GMV in 6 months",
    tagline: "Breaking the classic freelancer-client trust deadlock with neutral escrow",
    challenge: "FreelanceNG had a well-known trust problem — the same one plaguing every freelance marketplace globally. Clients refused to pay in advance because they feared non-delivery. Freelancers refused to start work without payment because they feared non-payment. The result was a stalemate that suppressed transaction volume by an estimated 60%.",
    solution: "Payzento introduced a milestone-based escrow layer. Clients deposit the full project value at the point of agreement. Freelancers see the locked funds and start work with confidence. As each milestone is delivered and confirmed, that portion of the escrow is released. If the client goes dark for 7 days after milestone submission, funds auto-release to the freelancer.",
    impact: "Within 6 months of launch, total GMV grew 4.2× without any change to FreelanceNG's marketing spend. The platform's repeat client rate jumped from 28% to 72%, driven entirely by the trust signal that escrow provides. Zero freelancers reported unpaid jobs in the first 18 months post-integration.",
    metrics: [
      { v: "4.2×", l: "GMV Growth" },
      { v: "94%", l: "Repeat Client Rate" },
      { v: "0", l: "Unpaid Jobs (18mo)" },
      { v: "72%", l: "Client Retention" },
    ],
    quote: "Our freelancers used to chase payments for weeks — sending WhatsApp messages, calling clients, writing formal emails. Now they start work the same day the project is posted because they can see the money is locked. It has fundamentally changed how trust works on our platform.",
    author: "Temi Adeyinka",
    title: "CEO, FreelanceNG",
  },
  {
    company: "SupplyCo Industrial",
    industry: "Supply Chain Finance · Nigeria & UK",
    logo: "SC",
    accentFrom: "from-amber-500",
    accentTo: "to-orange-600",
    borderColor: "border-amber-500/25",
    bgColor: "bg-amber-500/5",
    metricColor: "text-amber-500",
    result: "Zero payment defaults across $3.4M in transactions",
    tagline: "Replacing risky net-30 trade credit with pre-funded escrow",
    challenge: "SupplyCo processed large industrial equipment orders for Nigerian manufacturers, often on 30–60 day credit terms. As global interest rates rose and economic conditions tightened in 2024, buyer default rates climbed to 7.3% of receivables. Credit insurance was expensive, slow to pay out, and covered only 70% of invoice value. SupplyCo needed a way to eliminate default risk without requiring buyers to pay entirely in advance.",
    solution: "Payzento provided a pre-funded escrow model. Buyers lock the full order value into escrow at order confirmation — but do not lose liquidity immediately because the funds earn settlement-rate interest in the trust account. Suppliers see confirmed, locked funds before committing to manufacturing and shipment. Funds release incrementally as delivery milestones are met: 30% on production confirmation, 50% on dispatch, 20% on delivery sign-off.",
    impact: "Over 18 months, SupplyCo processed $3.4M through Payzento escrow with zero defaults. Average order fulfilment speed improved by 22% because suppliers began production immediately on fund lock confirmation. SupplyCo's CFO reported that trade credit insurance costs dropped by 90% as the portfolio risk was effectively eliminated.",
    metrics: [
      { v: "0", l: "Defaults (18 months)" },
      { v: "22%", l: "Faster Fulfilment" },
      { v: "$3.4M", l: "Risk Eliminated" },
      { v: "90%", l: "Insurance Cost Drop" },
    ],
    quote: "Our credit risk exposure dropped to virtually zero. That is something our CFO said would never happen without a major change to our terms. Payzento made it happen without changing how buyers experience the ordering process.",
    author: "Kola Bello",
    title: "Chief Financial Officer, SupplyCo Industrial",
  },
];

export default function CaseStudiesPage() {
  return (
    <PageWrapper>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">

        {/* Hero */}
        <div className="relative pt-40 pb-24 px-6 text-center border-b border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.06),transparent_60%)] pointer-events-none" />
          <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-500 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full mb-6">
              Customer Stories
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">Real results from real businesses</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">See how companies across Africa and beyond use Payzento to unlock commerce, eliminate payment risk, and build lasting trust with their customers.</p>
          </motion.div>
        </div>

        {/* Summary stats */}
        <div className="py-12 px-6 bg-card/40 border-b border-border/40">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[{ v: "$4.6M+", l: "Total Value Protected" }, { v: "68%", l: "Avg Dispute Reduction" }, { v: "3.1×", l: "Avg GMV Growth" }, { v: "0", l: "Combined Defaults" }].map((s) => (
              <div key={s.l}>
                <p className="text-3xl font-black text-foreground">{s.v}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Case studies */}
        <div className="py-20 px-6">
          <div className="max-w-5xl mx-auto space-y-20">
            {cases.map((c, i) => (
              <motion.div key={c.company} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="rounded-3xl border border-border bg-card overflow-hidden shadow-xl shadow-black/5">

                {/* Header banner */}
                <div className={`p-8 md:p-10 ${c.bgColor} border-b border-border/50`}>
                  <div className="flex items-start gap-5">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${c.accentFrom} ${c.accentTo} flex items-center justify-center text-3xl font-black text-white flex-shrink-0 shadow-lg`}>{c.logo}</div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{c.industry}</p>
                      <h2 className="text-2xl font-extrabold text-foreground mt-1">{c.company}</h2>
                      <p className="text-sm text-muted-foreground mt-1 italic">{c.tagline}</p>
                      <div className="flex items-center gap-1.5 mt-3">
                        <TrendingUp className={`w-4 h-4 ${c.metricColor}`} />
                        <span className={`text-sm font-bold ${c.metricColor}`}>{c.result}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 grid md:grid-cols-2 gap-10">
                  <div className="space-y-7">
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">The Challenge</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">The Solution</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.solution}</p>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">The Impact</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.impact}</p>
                    </div>
                    <blockquote className={`border-l-2 ${c.borderColor} pl-5`}>
                      <Quote className="w-5 h-5 text-muted-foreground/30 mb-2" />
                      <p className="text-sm text-foreground italic leading-relaxed mb-3">{c.quote}</p>
                      <div>
                        <p className="text-xs font-bold text-foreground">— {c.author}</p>
                        <p className="text-[10px] text-muted-foreground">{c.title}</p>
                      </div>
                    </blockquote>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                      {c.metrics.map((m) => (
                        <div key={m.l} className="p-5 rounded-2xl bg-background border border-border text-center">
                          <p className={`text-3xl font-black ${c.metricColor}`}>{m.v}</p>
                          <p className="text-[10px] font-semibold text-muted-foreground mt-1 uppercase tracking-wider leading-tight">{m.l}</p>
                        </div>
                      ))}
                    </div>
                    <div className={`p-5 rounded-2xl ${c.bgColor} border ${c.borderColor}`}>
                      <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2"><BarChart3 className="w-3.5 h-3.5" />Key Outcomes</h4>
                      <ul className="space-y-2">
                        {c.metrics.map((m) => (
                          <li key={m.l} className="flex items-center gap-2 text-xs text-foreground">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span className={`font-black ${c.metricColor}`}>{m.v}</span> {m.l.toLowerCase()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="py-20 px-6 bg-[#060b18] border-t border-white/5 text-center">
          <motion.div className="max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-extrabold text-white mb-4">Ready to write your own success story?</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">Join thousands of merchants using Payzento to protect transactions, reduce disputes, and build trust with their customers.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/getting-started" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg shadow-blue-500/20">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-2xl transition-colors">
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
      <Footer />
    </PageWrapper>
  );
}
