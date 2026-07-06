"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

const services = [
  { name: "API Gateway", status: "operational", latency: "18ms" },
  { name: "Escrow Engine", status: "operational", latency: "22ms" },
  { name: "Payment Processing", status: "operational", latency: "45ms" },
  { name: "Webhook Delivery", status: "operational", latency: "12ms" },
  { name: "Dashboard & Portal", status: "operational", latency: "95ms" },
  { name: "KYC Verification Service", status: "degraded", latency: "320ms" },
  { name: "Payout Processing", status: "operational", latency: "38ms" },
  { name: "Fraud Detection Engine", status: "operational", latency: "9ms" },
];

const incidents = [
  { date: "Jul 1, 2026", title: "Resolved: KYC verification delays", desc: "A third-party identity provider experienced elevated response times for 47 minutes. All verifications queued during the incident have been processed.", status: "resolved" },
  { date: "Jun 14, 2026", title: "Resolved: Webhook retry delays", desc: "A configuration change caused webhook retries to be delayed by up to 8 minutes. Issue was rolled back within 12 minutes of detection.", status: "resolved" },
  { date: "May 30, 2026", title: "Resolved: Dashboard slow load", desc: "CDN edge nodes in West Africa experienced elevated latency. Traffic was rerouted to EU fallback nodes within 6 minutes.", status: "resolved" },
];

const StatusBadge = ({ status }: { status: string }) => {
  if (status === "operational") return (
    <span className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Operational
    </span>
  );
  if (status === "degraded") return (
    <span className="flex items-center gap-1.5 text-amber-500 text-xs font-bold">
      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> Degraded
    </span>
  );
  return (
    <span className="flex items-center gap-1.5 text-red-500 text-xs font-bold">
      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Outage
    </span>
  );
};

export default function ApiStatusPage() {
  const operational = services.filter(s => s.status === "operational").length;
  return (
    <PageWrapper>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">
        <div className="relative pt-40 pb-20 px-6 text-center border-b border-border/50 overflow-hidden">
          <motion.div className="max-w-2xl mx-auto" initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-500" />
              <span className="text-2xl font-black text-emerald-500">All Systems Operational</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-3">API Status</h1>
            <p className="text-muted-foreground">{operational}/{services.length} services fully operational · Last updated just now</p>
          </motion.div>
        </div>

        <div className="py-16 px-6">
          <div className="max-w-4xl mx-auto space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Live Service Status</h2>
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-5 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  {s.status === "operational"
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    : <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />}
                  <span className="font-semibold text-foreground text-sm">{s.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.latency}</span>
                  <StatusBadge status={s.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-16 px-6 bg-card/30 border-t border-border/40">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Recent Incidents</h2>
            <div className="space-y-4">
              {incidents.map((inc) => (
                <div key={inc.title} className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-bold text-foreground text-sm">{inc.title}</h3>
                    <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">Resolved</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{inc.desc}</p>
                  <p className="text-[10px] text-muted-foreground font-semibold">{inc.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}
