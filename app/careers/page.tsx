"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

const openRoles = [
  { title: "Senior Backend Engineer (Payments)", dept: "Engineering", type: "Full-time", location: "Lagos / Remote", desc: "Build and scale the core escrow transaction engine processing millions of events per day." },
  { title: "Product Designer (UX Lead)", dept: "Design", type: "Full-time", location: "Lagos / London", desc: "Own the end-to-end product design experience for our merchant and buyer-facing platforms." },
  { title: "Compliance & KYC Analyst", dept: "Trust & Safety", type: "Full-time", location: "Lagos", desc: "Review KYC submissions, monitor AML signals, and design compliance workflows at scale." },
  { title: "Developer Advocate", dept: "Engineering", type: "Full-time", location: "Remote", desc: "Write tutorials, build sample apps, speak at conferences, and grow our developer ecosystem." },
  { title: "Growth Marketer", dept: "Marketing", type: "Full-time", location: "Lagos / Remote", desc: "Drive acquisition, activation, and retention across merchant and enterprise segments." },
  { title: "Enterprise Account Executive", dept: "Sales", type: "Full-time", location: "London / Dubai", desc: "Own the full sales cycle for enterprise deals above $100k ARR in Europe and the Middle East." },
];

const perks = [
  { emoji: "🌍", title: "Remote-friendly", desc: "Work from anywhere with async-first culture." },
  { emoji: "💰", title: "Competitive Pay", desc: "Top-of-market salaries plus equity options." },
  { emoji: "🏥", title: "Full Health Cover", desc: "Medical, dental, and optical for you and your family." },
  { emoji: "📚", title: "Learning Budget", desc: "$2,000/year for courses, books, and conferences." },
  { emoji: "🏖️", title: "Unlimited PTO", desc: "Take the time you need to rest and recharge." },
  { emoji: "⚡", title: "Fast Decisions", desc: "Flat hierarchy — your ideas ship in days, not quarters." },
];

export default function CareersPage() {
  return (
    <PageWrapper>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">

        {/* Hero */}
        <div className="relative pt-40 pb-24 px-6 text-center border-b border-border/50 overflow-hidden">
          <div className="absolute -top-40 left-1/3 w-96 h-96 bg-emerald-500/6 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />
          <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-6">
              We&apos;re Hiring
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">
              Build the future of trust in commerce
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Join a team of engineers, designers, and payment experts solving one of the hardest problems in trade — how do two strangers trust each other with money?
            </p>
          </motion.div>
        </div>

        {/* Perks */}
        <div className="py-20 px-6 bg-card/30 border-b border-border/40">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight text-center mb-12">Why people love working here</h2>
            <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              {perks.map((p) => (
                <motion.div key={p.title} variants={staggerItem} className="p-5 rounded-2xl bg-card border border-border hover:border-emerald-500/30 transition-all">
                  <span className="text-3xl">{p.emoji}</span>
                  <h3 className="font-bold text-foreground mt-3 mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Open roles */}
        <div className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight mb-10">Open Positions</h2>
            <div className="space-y-4">
              {openRoles.map((role) => (
                <motion.div key={role.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-bold bg-blue-500/10 text-blue-500 px-2.5 py-0.5 rounded-full border border-blue-500/15">{role.dept}</span>
                        <span className="text-xs font-bold bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" />{role.type}</span>
                        <span className="text-xs font-bold bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full flex items-center gap-1"><MapPin className="w-3 h-3" />{role.location}</span>
                      </div>
                      <h3 className="font-bold text-foreground text-lg mb-1">{role.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{role.desc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* No fit CTA */}
        <div className="py-16 px-6 bg-card/40 border-t border-border/40 text-center">
          <Briefcase className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold tracking-tight mb-3">Don't see a perfect fit?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">We're always looking for exceptional talent. Send your CV and tell us what you'd build.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg shadow-blue-500/20">
            Send Open Application <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
      <Footer />
    </PageWrapper>
  );
}
