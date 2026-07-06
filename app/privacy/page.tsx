"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const sections = [
  { title: "1. Who We Are", body: "Payzento is a B2B escrow payment platform operated by Payzento Technologies Ltd, incorporated in Nigeria (RC: 2045893). Our registered office is at 14 Adeola Odeku Street, Victoria Island, Lagos." },
  { title: "2. Data We Collect", body: "We collect: (a) Identity data — full name, date of birth, government ID scans; (b) Contact data — email, phone number, address; (c) Financial data — bank account details, transaction history; (d) Technical data — IP address, browser type, device identifiers; (e) Usage data — pages visited, features used, click patterns." },
  { title: "3. How We Use Your Data", body: "We use your data to: process and secure escrow transactions; verify your identity (KYC/AML); detect fraud and prevent money laundering; send transactional and service emails; comply with legal obligations; improve our product. We do not sell your personal data to third parties under any circumstances." },
  { title: "4. Legal Basis for Processing", body: "We process your data under the following legal bases: Contract — processing your transactions requires us to use your data. Legal obligation — AML/KYC regulations require identity verification. Legitimate interests — fraud prevention and platform security. Consent — where explicitly obtained for marketing communications." },
  { title: "5. Data Sharing", body: "We share data only with: licensed banking and payment partners required to process transactions; government and regulatory authorities when required by law; identity verification partners (Smile ID, Youverify) under strict data processing agreements; cloud providers (AWS, GCP) with standard contractual clauses in place." },
  { title: "6. International Transfers", body: "Your data may be transferred to and processed in countries outside Nigeria. All such transfers are protected by standard contractual clauses and adequacy decisions where applicable." },
  { title: "7. Data Retention", body: "We retain transaction data for 7 years to meet financial regulatory requirements. Account data is retained for 2 years after account closure. You may request deletion of non-regulatory data by contacting privacy@payzento.com." },
  { title: "8. Your Rights", body: "You have the right to: access a copy of your personal data; correct inaccurate data; request deletion of non-essential data; object to processing for direct marketing; data portability; lodge a complaint with the Nigerian Data Protection Commission (NDPC)." },
  { title: "9. Cookies", body: "We use strictly necessary, functional, and analytical cookies. You can manage your cookie preferences at any time via our Cookie Preferences page. We do not use cross-site tracking cookies." },
  { title: "10. Contact & DPO", body: "Our Data Protection Officer can be reached at privacy@payzento.com or by post to our registered office. We will respond to all verified requests within 30 days." },
];

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">
        <div className="pt-40 pb-16 px-6 border-b border-border/50">
          <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Legal</span>
            <h1 className="text-4xl font-extrabold tracking-tight mt-3 mb-3">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm">Last updated: July 1, 2026 · NDPR & GDPR compliant</p>
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
            <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/15">
              <p className="text-sm text-muted-foreground">Data subject requests: <span className="text-indigo-500 font-semibold">privacy@payzento.com</span></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}
