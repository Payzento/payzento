"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const sections = [
  { title: "1. Merchant Eligibility", body: "To become a Payzento merchant, you must be a registered legal entity or sole proprietor with valid business registration documents, a verified bank account in your business name, and must pass Payzento's enhanced KYB (Know Your Business) verification. Individuals may not sign up as merchants under their personal name." },
  { title: "2. Merchant Obligations", body: "Merchants agree to: deliver goods or services as described in each transaction; update inventory and pricing in real time; respond to buyer disputes within 48 hours of notification; maintain a dispute rate below 2% of total monthly transactions; never use the platform for prohibited goods or services." },
  { title: "3. Fund Release Conditions", body: "Escrowed funds are released to the merchant when: (a) the buyer explicitly confirms delivery satisfaction; (b) the auto-release timer expires after 7 days of buyer inactivity following merchant's delivery confirmation; or (c) Payzento's dispute resolution team rules in the merchant's favour." },
  { title: "4. Merchant Fees", body: "Merchants are charged a platform fee of 2.9% per released transaction. Enterprise merchants on custom contracts may have negotiated rates. Fees are deducted automatically from each released payment and are non-refundable once a release is processed." },
  { title: "5. Chargebacks & Reversals", body: "Payzento does not support traditional card chargebacks. All fund reversals are processed through our internal dispute resolution process. Merchants who accumulate excessive dispute losses may be subject to account suspension and additional security holds." },
  { title: "6. Settlement & Payouts", body: "Settled funds are available for payout within 1 business day after the T+1 settlement cut-off. Merchants may configure automatic daily, weekly, or monthly payout schedules. Minimum payout amount is ₦1,000 or $5 USD equivalent." },
  { title: "7. Account Suspension", body: "Payzento reserves the right to suspend a merchant account with immediate effect in cases of: fraudulent activity, abnormal dispute rates, receipt of law enforcement requests, or violation of any clause of this agreement. During suspension, all escrowed funds are frozen pending investigation." },
  { title: "8. Data & API Usage", body: "Merchants using Payzento APIs agree not to store raw payment credentials, share API keys with unauthorised third parties, or use the API to process transactions outside of their approved business category. API abuse results in immediate key revocation." },
  { title: "9. Term & Termination", body: "This agreement is effective from the date of merchant account activation and continues indefinitely unless terminated by either party with 30 days' written notice. Payzento may terminate immediately for cause. Upon termination, all pending settlements will be processed within 14 business days." },
  { title: "10. Governing Law", body: "This Merchant Agreement is governed by Nigerian law and the parties submit to the non-exclusive jurisdiction of the Lagos State courts. In the event of arbitration, proceedings shall be conducted under the Lagos Court of Arbitration rules." },
];

export default function MerchantAgreementPage() {
  return (
    <PageWrapper>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">
        <div className="pt-40 pb-16 px-6 border-b border-border/50">
          <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Legal · Merchants</span>
            <h1 className="text-4xl font-extrabold tracking-tight mt-3 mb-3">Merchant Agreement</h1>
            <p className="text-muted-foreground text-sm">Last updated: July 1, 2026 · Applies to all registered Payzento merchants</p>
          </motion.div>
        </div>
        <div className="py-16 px-6">
          <div className="max-w-3xl mx-auto space-y-10">
            {sections.map((s) => (
              <div key={s.title} className="border-b border-border/40 pb-8 last:border-0">
                <h2 className="text-lg font-extrabold text-foreground mb-3">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-sm">{s.body}</p>
              </div>
            ))}
            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/15">
              <p className="text-sm text-muted-foreground">Merchant disputes or agreement queries: <span className="text-amber-500 font-semibold">merchants@payzento.com</span></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}
