"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Shield, Lock, Eye, Key, AlertTriangle, CheckCircle2, Server, Globe, FileText, ArrowRight, Fingerprint, Database } from "lucide-react";

const controls = [
  { icon: <Lock className="w-6 h-6 text-blue-500" />, title: "AES-256 Encryption at Rest & Transit", desc: "Every byte of data stored or transmitted by Payzento is encrypted using AES-256. All network traffic is enforced over TLS 1.3 with certificate pinning on mobile clients. We do not support TLS 1.0 or 1.1 on any endpoint.", bg: "border-blue-500/20 bg-blue-500/5" },
  { icon: <Eye className="w-6 h-6 text-amber-500" />, title: "Real-Time Fraud Monitoring", desc: "Every transaction is scored in real-time by our ML-based anomaly detection engine. Signals include device fingerprinting, velocity checks, network analysis, and behavioural patterns. Suspicious transactions are flagged and held for manual review within milliseconds.", bg: "border-amber-500/20 bg-amber-500/5" },
  { icon: <Key className="w-6 h-6 text-indigo-500" />, title: "API Key Rotation & Scoping", desc: "All API keys are scoped to minimum necessary permissions. Keys automatically expire every 90 days with a 14-day overlap window. Webhook signing secrets use HMAC-SHA256. We never log API keys in plaintext in any environment.", bg: "border-indigo-500/20 bg-indigo-500/5" },
  { icon: <AlertTriangle className="w-6 h-6 text-rose-500" />, title: "AML & Sanctions Screening", desc: "Every user, entity, and transaction is screened in real time against OFAC, UN, EU, and domestic watchlists via our compliance engine. Adverse media screening and PEP (Politically Exposed Persons) detection are included for all KYB-level accounts.", bg: "border-rose-500/20 bg-rose-500/5" },
  { icon: <Server className="w-6 h-6 text-emerald-500" />, title: "Multi-Region Redundant Infrastructure", desc: "Payzento's production infrastructure runs across 3 geographically distributed AWS regions with active-active replication. No single region failure can cause an outage. Database failovers are automated with a target RTO of under 30 seconds.", bg: "border-emerald-500/20 bg-emerald-500/5" },
  { icon: <Globe className="w-6 h-6 text-teal-500" />, title: "Annual VAPT & Bug Bounty", desc: "We engage certified CREST-accredited security firms for annual penetration testing. Our private bug bounty programme with HackerOne provides continuous crowdsourced testing. All critical findings are patched within 48 hours.", bg: "border-teal-500/20 bg-teal-500/5" },
  { icon: <Fingerprint className="w-6 h-6 text-violet-500" />, title: "Multi-Factor Authentication", desc: "MFA is mandatory for all Payzento staff with access to production systems and for merchant accounts managing above $10,000 in transaction volume. We support TOTP (Google Authenticator), hardware keys (YubiKey), and biometric verification.", bg: "border-violet-500/20 bg-violet-500/5" },
  { icon: <Database className="w-6 h-6 text-sky-500" />, title: "Immutable Audit Logs", desc: "Every action taken on the Payzento platform — transaction creation, fund movement, dispute filing, API call — is recorded in cryptographically signed, append-only audit logs. Logs are retained for 7 years and cannot be altered or deleted.", bg: "border-sky-500/20 bg-sky-500/5" },
  { icon: <FileText className="w-6 h-6 text-orange-500" />, title: "Regulatory-Grade Reporting", desc: "Enterprise clients receive automated compliance reports including SAR-ready suspicious activity summaries, transaction velocity reports, and jurisdiction-specific data localisation confirmations. Reports are generated in PDF and JSON formats.", bg: "border-orange-500/20 bg-orange-500/5" },
];

const certifications = [
  { name: "PCI-DSS Level 1", body: "Via Flutterwave Infrastructure", year: "Partner Certified", desc: "Our infrastructure partner Flutterwave maintains PCI-DSS Level 1 compliance to secure and encrypt all payment card operations, cardholder details, and transaction channels.", color: "border-blue-500/25 bg-blue-500/5" },
  { name: "ISO/IEC 27001:2022", body: "BSI Group (British Standards Institution)", year: "Certified Q3 2025", desc: "International standard for information security management systems. Our ISMS covers all aspects of data classification, asset management, incident response, and business continuity.", color: "border-indigo-500/25 bg-indigo-500/5" },
  { name: "SOC 2 Type II", body: "AICPA — Schellman & Co.", year: "Audited Annually", desc: "Annual third-party audit of our Trust Service Criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy. Full reports available to Enterprise clients under NDA.", color: "border-violet-500/25 bg-violet-500/5" },
  { name: "NDPR Compliance", body: "NITDA — Nigeria", year: "Active", desc: "Fully compliant with the Nigeria Data Protection Regulation. Our Data Protection Officer (DPO) is registered with NITDA. Breach notification procedures follow the 72-hour rule.", color: "border-emerald-500/25 bg-emerald-500/5" },
  { name: "GDPR Ready", body: "EU General Data Protection Regulation", year: "Active", desc: "Our EU data processing agreements, consent management, right-to-erasure workflows, and international transfer safeguards (SCCs) are fully compliant with the GDPR.", color: "border-teal-500/25 bg-teal-500/5" },
  { name: "CBN PSSP Licence", body: "Via Flutterwave", year: "Partner Licensed", desc: "All payment transactions and fund custody are processed under Flutterwave's direct Central Bank of Nigeria PSSP and IMTO licenses. Escrow funds are secured in Flutterwave's licensed trust and settlement accounts.", color: "border-amber-500/25 bg-amber-500/5" },
];

const securityPolicies = [
  { title: "Responsible Disclosure Policy", desc: "Security researchers who discover vulnerabilities in Payzento's platform are encouraged to report them through our coordinated disclosure programme. We commit to a 24-hour acknowledgement and 48-hour triage SLA for all critical reports. Researchers who report valid critical or high-severity findings receive a monetary reward and public recognition." },
  { title: "Incident Response", desc: "Payzento maintains a 24/7 Security Operations Centre (SOC). Our incident response plan follows the NIST Cybersecurity Framework. Critical security incidents trigger automated isolation procedures, and affected users are notified within 72 hours." },
  { title: "Employee Security", desc: "All Payzento employees undergo background checks before joining. Access to production systems follows a strict least-privilege model with quarterly access reviews. Staff with production access are required to use hardware security keys and go through annual security awareness training." },
];

export default function SecurityPage() {
  return (
    <PageWrapper>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">

        {/* Hero */}
        <div className="relative pt-40 pb-24 px-6 text-center border-b border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />
          <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center justify-center mb-6">
              <div className="p-5 rounded-3xl bg-blue-500/10 border border-blue-500/20 shadow-xl shadow-blue-500/10">
                <Shield className="w-12 h-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">Security & Trust</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              At Payzento, security is not a feature we bolted on — it is the architectural foundation everything else is built upon. Every design decision, every API endpoint, every database schema starts with a threat model. We hold ourselves to the same standards as Tier 1 financial institutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-500/20">
                Request Security Report <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/api-status" className="inline-flex items-center gap-2 border border-border hover:bg-muted text-foreground font-bold px-6 py-3.5 rounded-xl transition-colors">
                View API Status
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Cert badges bar */}
        <div className="py-8 px-6 bg-card/50 border-b border-border/40">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-3">
            {["Partner PCI-DSS L1", "Partner CBN Licensed", "ISO/IEC 27001", "SOC 2 Type II", "NDPR Compliant", "GDPR Ready", "TLS 1.3 Only"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-background border border-border text-xs font-bold text-muted-foreground hover:border-emerald-500/30 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Infrastructure</span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-3">Nine layers of security</h2>
              <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm leading-relaxed">Defence in depth means no single control failure can compromise the platform. We layer technical, procedural, and physical controls across every system.</p>
            </motion.div>
            <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              {controls.map((c) => (
                <motion.div key={c.title} variants={staggerItem} className={`p-6 rounded-2xl border ${c.bg} hover:shadow-lg hover:shadow-black/5 transition-all duration-200`}>
                  <div className="p-3 rounded-xl bg-background/50 border border-white/5 w-fit mb-4">{c.icon}</div>
                  <h3 className="font-bold text-foreground mb-2 text-sm leading-snug">{c.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Certifications */}
        <div className="py-24 px-6 bg-card/30 border-y border-border/40">
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Compliance</span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-3">Certifications & Regulatory Status</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm leading-relaxed">We pursue certifications proactively — not reactively. Enterprise clients can request audit reports and compliance documentation under NDA.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certifications.map((c) => (
                <div key={c.name} className={`p-6 rounded-2xl border ${c.color}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <h3 className="font-extrabold text-foreground text-sm">{c.name}</h3>
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground mb-1 ml-7">{c.body} · {c.year}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-3">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl font-extrabold tracking-tight">Security Policies</h2>
            </motion.div>
            <div className="space-y-5">
              {securityPolicies.map((p) => (
                <div key={p.title} className="p-7 rounded-2xl bg-card border border-border">
                  <h3 className="font-extrabold text-foreground text-lg mb-3">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclosure metrics */}
        <div className="py-16 px-6 bg-card/30 border-y border-border/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold tracking-tight mb-3">Responsible Disclosure Programme</h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto text-sm">
              Found a vulnerability? We welcome responsible disclosure. Report any issues to <span className="text-blue-500 font-semibold">security@payzento.com</span> with full reproduction steps. All valid reports are triaged by our security team and rewarded based on severity.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[{ v: "24h", l: "Acknowledgement SLA" }, { v: "48h", l: "Critical Patch Target" }, { v: "100%", l: "Reports Reviewed" }, { v: "$2,500", l: "Max Bug Bounty" }].map((s) => (
                <div key={s.l} className="p-5 rounded-2xl bg-card border border-border">
                  <p className="text-2xl font-black text-foreground">{s.v}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium leading-tight">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 px-6 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight mb-3">Need our security documentation?</h2>
          <p className="text-muted-foreground mb-6 text-sm max-w-md mx-auto">Enterprise clients can request our full SOC 2 Type II report, penetration test executive summary, and data processing agreements.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg shadow-blue-500/20">
            Request Compliance Pack <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
      <Footer />
    </PageWrapper>
  );
}
