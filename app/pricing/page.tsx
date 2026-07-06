"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Check, Zap, Shield, Headphones, Building2, ArrowRight, Info, X } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "For individuals, freelancers, and small teams making occasional escrow transactions. No card required to get started.",
    color: "border-border",
    highlight: false,
    badge: null,
    features: [
      { text: "Up to 10 transactions per month", included: true },
      { text: "Escrow protection on every deal", included: true },
      { text: "Manual payment confirmation", included: true },
      { text: "Standard dispute resolution (5 business days)", included: true },
      { text: "Email notifications", included: true },
      { text: "Bank transfer payouts (NGN/USD)", included: true },
      { text: "Milestone-based release", included: false },
      { text: "Webhook integrations", included: false },
      { text: "Dedicated account manager", included: false },
      { text: "Custom payout schedules", included: false },
    ],
    cta: "Get Started Free",
    href: "/getting-started",
    ctaClass: "border border-border hover:bg-muted text-foreground",
  },
  {
    name: "Growth",
    price: "2.9%",
    period: "per transaction",
    desc: "For growing businesses that need reliable, automated escrow at scale with full API access and analytics.",
    color: "border-blue-500",
    highlight: true,
    badge: "Most Popular",
    features: [
      { text: "Unlimited transactions", included: true },
      { text: "Escrow protection on every deal", included: true },
      { text: "Automated milestone-based release", included: true },
      { text: "Priority dispute resolution (72 hours)", included: true },
      { text: "SMS + email + webhook notifications", included: true },
      { text: "Multi-currency payouts (40+ currencies)", included: true },
      { text: "Milestone-based release", included: true },
      { text: "Full REST API & SDK access", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Custom payout schedules", included: true },
    ],
    cta: "Start 30-Day Free Trial",
    href: "/getting-started",
    ctaClass: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "volume pricing",
    desc: "For large platforms, marketplaces, and financial institutions with unique compliance, volume, and integration requirements.",
    color: "border-indigo-500/50",
    highlight: false,
    badge: "Best Value at Scale",
    features: [
      { text: "Custom transaction limits & volume rates", included: true },
      { text: "White-label escrow engine", included: true },
      { text: "Dedicated account manager + SLA", included: true },
      { text: "1-hour dispute resolution SLA", included: true },
      { text: "Custom notification channels", included: true },
      { text: "On-premise deployment option", included: true },
      { text: "Advanced AML/fraud rules engine", included: true },
      { text: "Priority API with 99.99% uptime SLA", included: true },
      { text: "Custom compliance reporting & audit logs", included: true },
      { text: "Dedicated compliance & integration support", included: true },
    ],
    cta: "Contact Sales",
    href: "/contact",
    ctaClass: "border border-indigo-500/50 hover:bg-indigo-500/10 text-indigo-500",
  },
];

const comparison = [
  { feature: "Transactions per month", starter: "10", growth: "Unlimited", enterprise: "Custom" },
  { feature: "Transaction fee", starter: "0%", growth: "2.9%", enterprise: "Negotiated" },
  { feature: "Dispute resolution", starter: "5 business days", growth: "72 hours", enterprise: "1-hour SLA" },
  { feature: "API access", starter: "Read-only", growth: "Full REST API", enterprise: "Priority API" },
  { feature: "Payout currencies", starter: "NGN, USD", growth: "40+ currencies", enterprise: "All + custom" },
  { feature: "Milestone releases", starter: "No", growth: "Yes", enterprise: "Yes + custom rules" },
  { feature: "White-label", starter: "No", growth: "No", enterprise: "Yes" },
  { feature: "Dedicated manager", starter: "No", growth: "No", enterprise: "Yes" },
  { feature: "Uptime SLA", starter: "Best effort", growth: "99.9%", enterprise: "99.99%" },
];

const faqs = [
  { q: "Are there any setup or monthly subscription fees?", a: "No. Payzento charges zero setup fees and zero monthly subscription fees on the Starter and Growth plans. You only pay a 2.9% fee when a transaction is successfully released from escrow. Enterprise pricing is volume-based and determined by contract." },
  { q: "What happens to the fee if a transaction is disputed and refunded?", a: "If a dispute results in a full refund to the buyer, the Payzento platform fee is not charged. The fee is only collected upon a successful release of funds to the seller." },
  { q: "What currencies are supported for payouts?", a: "Growth and Enterprise plans support 40+ currencies including NGN, USD, GBP, EUR, KES, GHS, ZAR, and more. Starter plan is limited to NGN and USD payouts. Real-time FX conversion is applied at the time of payout." },
  { q: "How long does a free trial on the Growth plan last?", a: "Your first 30 days on the Growth plan are completely free with full feature access. No credit card is required to start the trial. At the end of the trial, you will be prompted to add a payout account — no transaction fees are charged until day 31." },
  { q: "Can I integrate Payzento into my existing marketplace or platform?", a: "Yes. The Growth and Enterprise plans provide full REST API and SDK access. You can embed the escrow engine into any application using our JavaScript, Python, PHP, or Go SDKs. View the API documentation in your merchant dashboard." },
  { q: "Is Payzento regulated?", a: "Payzento provides the software control logic for escrow transactions. All payment processing, card/bank connectivity, fund custody, and licensing compliance are handled through our integration partner, Flutterwave. This means all transactions are protected under Flutterwave's direct licenses and banking integrations." },
  { q: "What is the dispute resolution process?", a: "When a buyer raises a dispute, both parties have 48 hours to submit evidence through the Payzento portal. Our neutral resolution team reviews all evidence and issues a binding decision within 72 hours (Growth) or 1 hour (Enterprise). Decisions are final and automatically enforced by the platform." },
  { q: "Can I upgrade or downgrade plans at any time?", a: "Yes. Plan upgrades take effect immediately. Downgrades take effect at the end of the current billing period. There are no penalties for changing plans, and any unused quota is forfeited — not refunded." },
];

export default function PricingPage() {
  return (
    <PageWrapper>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">

        {/* Hero */}
        <div className="relative pt-40 pb-24 px-6 text-center border-b border-border/50 overflow-hidden">
          <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full mb-6">
              Transparent Pricing
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">
              Simple, honest pricing.<br />No surprises. Ever.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              We only make money when your transactions succeed. No monthly fees, no hidden charges, no lock-in. Start free and scale as you grow.
            </p>
          </motion.div>
        </div>

        {/* Plans */}
        <div className="py-24 px-6">
          <motion.div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {plans.map((plan) => (
              <motion.div key={plan.name} variants={staggerItem}
                className={`relative rounded-3xl border-2 ${plan.color} ${plan.highlight ? "bg-card shadow-2xl shadow-blue-500/10 scale-[1.02]" : "bg-card"} p-8 flex flex-col gap-6 transition-all duration-300`}>
                {plan.badge && (
                  <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 ${plan.highlight ? "bg-blue-600" : "bg-indigo-600"} text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg`}>
                    {plan.badge}
                  </span>
                )}
                <div>
                  <h3 className="font-bold text-muted-foreground text-xs uppercase tracking-wider">{plan.name}</h3>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="text-5xl font-black text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-sm text-muted-foreground">/ {plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{plan.desc}</p>
                </div>
                <Link href={plan.href} className={`w-full text-center py-4 rounded-2xl font-bold text-sm transition-all duration-200 cursor-pointer ${plan.ctaClass}`}>
                  {plan.cta}
                </Link>
                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className={`flex items-start gap-2.5 text-sm ${f.included ? "text-foreground" : "text-muted-foreground/50 line-through"}`}>
                      {f.included
                        ? <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        : <X className="w-4 h-4 text-muted-foreground/30 flex-shrink-0 mt-0.5" />}
                      {f.text}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Comparison table */}
        <div className="py-16 px-6 bg-card/30 border-y border-border/40">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight text-center mb-10">Full Plan Comparison</h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-card/60 border-b border-border">
                    <th className="text-left p-4 font-bold text-muted-foreground">Feature</th>
                    <th className="text-center p-4 font-bold text-foreground">Starter</th>
                    <th className="text-center p-4 font-bold text-blue-500 bg-blue-500/5">Growth</th>
                    <th className="text-center p-4 font-bold text-indigo-500">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-border/50 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                      <td className="p-4 text-muted-foreground font-medium">{row.feature}</td>
                      <td className="p-4 text-center text-foreground">{row.starter}</td>
                      <td className="p-4 text-center font-bold text-foreground bg-blue-500/3">{row.growth}</td>
                      <td className="p-4 text-center text-foreground">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="py-16 px-6">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: <Zap className="w-6 h-6 text-amber-500" />, title: "Instant Settlement", desc: "Funds reach the seller in under 2 seconds once the buyer confirms delivery. No banking delays, no waiting periods." },
              { icon: <Shield className="w-6 h-6 text-blue-500" />, title: "Zero Fraud Liability", desc: "Payzento absorbs liability on transactions found to be fraudulent after our verification process clears a party." },
              { icon: <Headphones className="w-6 h-6 text-indigo-500" />, title: "Human-Powered Support", desc: "Every paid plan gets real human agents — not bots. Average response times: 2 minutes for live chat, 24 hours for tickets." },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-2xl bg-card border border-border">{f.icon}</div>
                <h3 className="font-bold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="py-24 px-6 bg-card/30 border-t border-border/40">
          <div className="max-w-3xl mx-auto">
            <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl font-extrabold tracking-tight">Pricing FAQs</h2>
              <p className="text-muted-foreground mt-3">Still have questions? <Link href="/contact" className="text-blue-500 font-semibold hover:underline">Talk to our team</Link></p>
            </motion.div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="p-6 rounded-2xl bg-card border border-border hover:border-blue-500/20 transition-colors">
                  <div className="flex items-start gap-3">
                    <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="py-24 px-6 bg-[#060b18] border-t border-white/5 text-center">
          <motion.div className="max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Building2 className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-white mb-3">Processing high volumes?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">If you are processing more than $50k/month in escrow transactions or need white-label capabilities, our enterprise plan will save you money and give you full control.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-2xl hover:bg-slate-100 transition-colors">
                Talk to Sales <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/case-studies" className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-2xl transition-colors">
                View Case Studies
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
      <Footer />
    </PageWrapper>
  );
}
