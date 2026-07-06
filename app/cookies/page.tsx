"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const cookieTypes = [
  { name: "Strictly Necessary", id: "necessary", required: true, desc: "These cookies are essential for the platform to function. They enable core features like session authentication, CSRF protection, and escrow transaction routing. They cannot be disabled." },
  { name: "Functional", id: "functional", required: false, desc: "These cookies remember your preferences such as theme (dark/light), language, and dashboard layout to provide a personalised experience." },
  { name: "Analytics", id: "analytics", required: false, desc: "We use anonymised analytics (Plausible Analytics — privacy-first, no cross-site tracking) to understand how users interact with the platform and improve it. No personal data is shared with third parties." },
  { name: "Marketing", id: "marketing", required: false, desc: "If you opt in, these cookies allow us to show you relevant Payzento messages on third-party platforms. We do not sell this data. You can withdraw consent at any time." },
];

export default function CookiesPage() {
  return (
    <PageWrapper>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">
        <div className="pt-40 pb-16 px-6 border-b border-border/50">
          <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={fadeUp}>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Legal</span>
            <h1 className="text-4xl font-extrabold tracking-tight mt-3 mb-3">Cookie Preferences</h1>
            <p className="text-muted-foreground text-sm">Last updated: July 1, 2026 · You are in control of your privacy.</p>
          </motion.div>
        </div>
        <div className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-muted-foreground leading-relaxed mb-10">
              Payzento uses cookies and similar tracking technologies to operate our platform, remember your preferences, and understand how you use our service. Below you can manage your preferences for each category. Changes take effect immediately.
            </p>
            <div className="space-y-5">
              {cookieTypes.map((ct) => (
                <div key={ct.id} className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-extrabold text-foreground">{ct.name}</h3>
                    {ct.required ? (
                      <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">Always On</span>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={ct.id === "functional"} className="sr-only peer" />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ct.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-500/20">
                Save Preferences
              </button>
              <button className="flex-1 py-3.5 rounded-xl border border-border hover:bg-muted text-foreground font-bold text-sm transition-colors">
                Accept All
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
              For more information on how we use cookies, see our <a href="/privacy" className="text-blue-500 hover:underline font-semibold">Privacy Policy</a>. To withdraw consent entirely, clear your browser cookies and do not re-enable optional categories on your next visit.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}
