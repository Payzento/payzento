"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const sections = [
  { title: "1. Acceptance of Terms", body: "By accessing or using the Payzento platform, website, or API services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, do not use our services. These terms apply to all users including buyers, sellers, merchants, and developers." },
  { title: "2. Description of Service", body: "Payzento provides an escrow control logic layer and software platform. All payment processing, fund custody, and transactional operations are handled through our integration partner, Flutterwave, who holds the necessary payment infrastructure licenses. Payzento acts as a neutral transaction coordinator and control logic engine, and does not take custody or ownership of funds at any point." },
  { title: "3. User Accounts & KYC", body: "To use the full features of Payzento, you must complete our Know Your Customer (KYC) verification process. You agree to provide accurate, complete, and up-to-date information. Accounts found to contain false information will be suspended immediately." },
  { title: "4. Transaction Rules", body: "All transactions processed through Payzento are subject to our escrow policy. Funds deposited into escrow are non-withdrawable until the agreed delivery conditions are confirmed or a dispute resolution outcome is issued. Payzento reserves the right to freeze transactions under fraud suspicion." },
  { title: "5. Fees & Charges", body: "Payzento charges a transaction fee as outlined on our Pricing page. Fees are deducted from the escrowed amount at the time of release unless otherwise agreed in an enterprise contract. Refunds of fees are not provided in the event of a buyer-side cancellation after funds are locked." },
  { title: "6. Dispute Resolution", body: "In the event of a transaction dispute, both parties must submit evidence through the Payzento dispute portal within 7 calendar days of dispute initiation. Payzento's neutral resolution team will review all evidence and issue a binding decision within 72 hours. The decision is final." },
  { title: "7. Prohibited Activities", body: "You may not use Payzento for: illegal goods or services, money laundering, terrorism financing, Ponzi or pyramid schemes, gambling operations, or any activity that violates applicable law. Violations result in immediate account termination and reporting to relevant authorities." },
  { title: "8. Liability Limitation", body: "Payzento's total liability for any claim arising from use of our services shall not exceed the total fees paid by the user in the 3-month period preceding the claim. We are not liable for indirect, incidental, or consequential damages of any kind." },
  { title: "9. Modifications", body: "We may update these Terms from time to time. Users will be notified of material changes via email. Continued use of the platform after a notification constitutes acceptance of the updated terms." },
  { title: "10. Governing Law", body: "These Terms shall be governed by the laws of the Federal Republic of Nigeria. Any dispute not resolved internally shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria." },
];

export default function TermsPage() {
  return (
    <PageWrapper>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">
        <div className="pt-40 pb-16 px-6 border-b border-border/50">
          <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Legal</span>
            <h1 className="text-4xl font-extrabold tracking-tight mt-3 mb-3">Terms & Conditions</h1>
            <p className="text-muted-foreground text-sm">Last updated: July 1, 2026 · Effective immediately</p>
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
            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/15">
              <p className="text-sm text-muted-foreground">Questions about these terms? Contact our legal team at <span className="text-blue-500 font-semibold">legal@payzento.com</span></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}
