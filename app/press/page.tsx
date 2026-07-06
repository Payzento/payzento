"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Download, ExternalLink } from "lucide-react";

const coverage = [
  { outlet: "TechCabal", date: "Jun 2026", title: "Payzento raises $3M to bring escrow-first payments to West African SMEs", tag: "Funding" },
  { outlet: "Disrupt Africa", date: "May 2026", title: "How Payzento is solving the trust gap in African B2B trade", tag: "Feature" },
  { outlet: "Techpoint Africa", date: "Apr 2026", title: "Payzento hits $2M in protected escrow transactions in Q1 2026", tag: "Milestone" },
  { outlet: "The Guardian Nigeria", date: "Mar 2026", title: "Payzento partners with Flutterwave to secure digital trade transactions", tag: "Partnership" },
  { outlet: "Bloomberg Africa", date: "Feb 2026", title: "Startup of the Month: Payzento's approach to payment trust", tag: "Award" },
];

const assets = [
  { name: "Payzento Logo Pack (SVG + PNG)", size: "2.1 MB" },
  { name: "Brand Guidelines PDF", size: "4.6 MB" },
  { name: "Founder Headshots (Hi-Res)", size: "18 MB" },
  { name: "Product Screenshots", size: "11 MB" },
  { name: "Company Fact Sheet", size: "0.8 MB" },
];

export default function PressPage() {
  return (
    <PageWrapper>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">
        <div className="relative pt-40 pb-20 px-6 text-center border-b border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.06),transparent_60%)] pointer-events-none" />
          <motion.div className="max-w-2xl mx-auto" initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-violet-500 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-full mb-6">Newsroom</span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Press & Media</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Media enquiries, press kits, and coverage about Payzento. For interviews or statements, contact <span className="text-violet-500 font-semibold">press@payzento.com</span></p>
          </motion.div>
        </div>

        <div className="py-20 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-20">
            {[{ v: "$3M", l: "Raised (Seed)" }, { v: "2023", l: "Founded" }, { v: "12", l: "Team Members" }].map((s) => (
              <div key={s.l} className="p-6 rounded-2xl bg-card border border-border text-center">
                <p className="text-4xl font-black text-foreground">{s.v}</p>
                <p className="text-sm text-muted-foreground font-medium mt-1">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight mb-6">Media Coverage</h2>
              <div className="space-y-4">
                {coverage.map((c) => (
                  <div key={c.title} className="p-5 rounded-2xl bg-card border border-border group hover:border-violet-500/20 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-foreground">{c.outlet}</span>
                        <span className="text-[9px] font-bold bg-violet-500/10 text-violet-500 border border-violet-500/15 px-2 py-0.5 rounded-full uppercase">{c.tag}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{c.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.title}</p>
                    <div className="flex items-center gap-1 text-xs text-violet-500 mt-3 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Read article <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold tracking-tight mb-6">Press Kit</h2>
              <div className="space-y-3 mb-8">
                {assets.map((a) => (
                  <div key={a.name} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-violet-500/20 cursor-pointer group transition-all">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.size}</p>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-violet-500 transition-colors" />
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-500/15">
                <h3 className="font-extrabold text-foreground mb-2">Press Contact</h3>
                <p className="text-sm text-muted-foreground mb-3">For interview requests, editorial fact-checks, or embargoed announcements:</p>
                <p className="text-sm font-semibold text-violet-500">press@payzento.com</p>
                <p className="text-sm text-muted-foreground mt-1">Response within 4 business hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}
