"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { MapPin, Mail, Phone, Clock, MessageSquare, Building2, Users, Headphones } from "lucide-react";

const offices = [
  { city: "Lagos, Nigeria", address: "14 Adeola Odeku St, Victoria Island, Lagos", flag: "🇳🇬" },
  { city: "London, UK", address: "22 Bishopsgate, London EC2N 4BQ", flag: "🇬🇧" },
  { city: "Dubai, UAE", address: "Dubai International Financial Centre, Gate Ave", flag: "🇦🇪" },
];

export default function ContactPage() {
  return (
    <PageWrapper>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">

        {/* Hero */}
        <div className="relative pt-40 pb-20 px-6 border-b border-border/50 overflow-hidden">
          <div className="absolute -top-40 right-1/4 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
          <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-500 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full mb-6">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">We'd love to hear from you</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Whether you're exploring enterprise integrations or need help with a transaction, our team is ready.</p>
          </motion.div>
        </div>

        {/* Contact options */}
        <div className="py-20 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: <MessageSquare className="w-7 h-7 text-blue-500" />, title: "Sales Enquiries", desc: "Looking to integrate Payzento into your platform or negotiate custom volume pricing?", cta: "Talk to Sales", bg: "bg-blue-500/8 border-blue-500/20" },
              { icon: <Headphones className="w-7 h-7 text-emerald-500" />, title: "Support", desc: "Have a transaction issue or account question? Our support team is available 24/7.", cta: "Open a Ticket", bg: "bg-emerald-500/8 border-emerald-500/20" },
              { icon: <Building2 className="w-7 h-7 text-indigo-500" />, title: "Partnerships", desc: "Interested in a referral partnership, reseller arrangement, or API marketplace listing?", cta: "Partner With Us", bg: "bg-indigo-500/8 border-indigo-500/20" },
            ].map((c) => (
              <div key={c.title} className={`p-6 rounded-2xl border ${c.bg} flex flex-col gap-4`}>
                <div className="p-3 bg-background rounded-xl border border-border w-fit">{c.icon}</div>
                <h3 className="font-bold text-foreground text-lg">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{c.desc}</p>
                <button className="w-full py-3 rounded-xl border border-border hover:bg-muted text-sm font-bold transition-colors">{c.cta}</button>
              </div>
            ))}
          </div>

          {/* Contact form + info */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="flex flex-col gap-5">
              <h2 className="text-2xl font-extrabold tracking-tight">Send us a message</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">First Name</label>
                  <input className="p-3.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="John" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Last Name</label>
                  <input className="p-3.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="Doe" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Work Email</label>
                <input type="email" className="p-3.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="john@company.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Company</label>
                <input className="p-3.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="Your company name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea rows={5} className="p-3.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none" placeholder="Tell us how we can help..." />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-blue-500/20">
                Send Message
              </button>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight mb-6">Our Offices</h2>
                <div className="space-y-4">
                  {offices.map((o) => (
                    <div key={o.city} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
                      <span className="text-2xl">{o.flag}</span>
                      <div>
                        <p className="font-bold text-foreground text-sm">{o.city}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 flex items-start gap-1"><MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />{o.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: <Mail className="w-4 h-4" />, label: "General Enquiries", value: "hello@payzento.com" },
                  { icon: <Phone className="w-4 h-4" />, label: "Sales Hotline", value: "+234 800 PAY ZENTO" },
                  { icon: <Clock className="w-4 h-4" />, label: "Support Hours", value: "24/7 — 365 days" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <div className="p-2 rounded-lg bg-card border border-border text-muted-foreground">{item.icon}</div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </PageWrapper>
  );
}
