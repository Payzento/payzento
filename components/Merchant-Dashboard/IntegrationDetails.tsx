"use client";

import { useState } from "react";
import { Book, Check, Copy, TriangleAlert } from "lucide-react";
import IntegrationCode from "./IntegrationCode";
import { motion, AnimatePresence } from "framer-motion";
import { scaleIn, staggerContainer, staggerItem } from "@/lib/animations";

const IntegrationDetails = () => {
  const [apiKey] = useState("sk_live_abc123xyz789def456ghi");
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCodeCopy = () => {
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-6 w-full">
      <div className="flex flex-col gap-6 flex-2 w-full">
        {/* API KEYS */}
        <motion.div
          className="bg-card border border-border shadow-sm p-6 rounded-2xl transition-colors duration-300"
          initial="hidden"
          animate="visible"
          variants={scaleIn}
        >
          <h1 className="text-xl font-bold tracking-tight text-foreground">Your API Keys</h1>
          <p className="text-muted-foreground text-sm mt-1 mb-6">
            Use your API keys to authenticate requests to Payzento
          </p>

          <div className="w-full mb-6">
            <p className="text-sm font-semibold text-foreground mb-2">Live API Key</p>
            <div className="w-full flex items-center justify-between gap-3">
              <input
                type="text"
                disabled
                value={apiKey}
                className="w-full border border-border bg-background text-muted-foreground p-3 rounded-xl text-sm font-mono focus:outline-none"
              />
              <motion.button
                onClick={handleCopy}
                className="flex items-center justify-center bg-primary hover:bg-primary/95 p-3 rounded-xl cursor-pointer text-primary-foreground shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                      <Check className="w-5 h-5 text-green-500" />
                    </motion.div>
                  ) : (
                    <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                      <Copy className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          <div className="bg-amber-500/10 p-4 border border-amber-500/20 rounded-xl">
            <p className="flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 mb-1">
              <TriangleAlert className="w-4 h-4" />
              Keep your API Keys secure
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Never share your secret keys in client-side code, public repositories, or client browsers.
            </p>
          </div>
        </motion.div>

        {/* JS INTEGRATION */}
        <motion.div
          className="bg-card border border-border shadow-sm p-6 rounded-2xl transition-colors duration-300"
          initial="hidden"
          animate="visible"
          variants={scaleIn}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between gap-2 mb-4">
            <h1 className="text-xl font-bold tracking-tight text-foreground">JavaScript Integration</h1>
            <div className="relative">
              <motion.button
                onClick={handleCodeCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-muted text-foreground text-xs font-semibold rounded-lg border border-border transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {codeCopied ? (
                  <Check className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                )}
                Copy
              </motion.button>
              <AnimatePresence>
                {codeCopied && (
                  <motion.div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  >
                    Copied!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* INTEGRATION CODE SNIPPET (Dark theme matching code block style) */}
          <motion.div
            className="bg-[#0c152b] text-white my-3 p-6 border border-[#1e2d52] shadow-lg rounded-xl overflow-x-auto"
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            transition={{ delay: 0.2 }}
          >
            <IntegrationCode />
          </motion.div>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <motion.button
              className="flex items-center gap-2 text-xs font-semibold border border-border bg-secondary hover:bg-muted text-foreground px-4 py-2.5 rounded-xl cursor-pointer"
              whileHover={{ scale: 1.01, opacity: 0.9 }}
              whileTap={{ scale: 0.98 }}
            >
              <Book className="w-4 h-4" />
              View Full Documentation
            </motion.button>
            <motion.span
              className="hover:bg-muted text-xs font-semibold px-4 py-2.5 rounded-xl border border-transparent hover:border-border cursor-pointer text-muted-foreground hover:text-foreground transition-all"
              whileHover={{ scale: 1.01 }}
            >
              Try in Sandbox
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDEBAR */}
      <motion.div
        className="flex flex-1 flex-col gap-6 w-full lg:max-w-xs"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* INTEGRATION STEPS */}
        <motion.div className="bg-card border border-border p-6 rounded-2xl shadow-sm transition-colors duration-300" variants={staggerItem}>
          <h1 className="text-lg font-bold tracking-tight text-foreground mb-4">Integration Steps</h1>
          <ol className="w-full text-foreground space-y-4">
            {[
              "Copy Your API key from above",
              "Add the Payzento script to your site",
              "Initialize with your configuration",
              "Test in sandbox mode",
              "Go live and accept payments",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="flex items-center justify-center w-5.5 h-5.5 p-3.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="mt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* HELP */}
        <motion.div className="bg-card border border-border p-6 rounded-2xl shadow-sm transition-colors duration-300" variants={staggerItem}>
          <h1 className="text-lg font-bold tracking-tight text-foreground mb-1">Need Help?</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Our support team is here to assist with your API setup
          </p>
          <motion.button
            className="w-full text-xs font-bold border border-border hover:bg-muted py-3 rounded-xl transition-colors cursor-pointer text-foreground"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Support
          </motion.button>
        </motion.div>

        {/* WEBHOOKS */}
        <motion.div
          className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-2xl transition-colors duration-300"
          variants={staggerItem}
        >
          <h1 className="text-lg font-bold text-foreground mb-1">Webhooks</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Get real-time notification alerts for transaction events
          </p>
          <motion.p
            className="text-center text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
            whileHover={{ scale: 1.01 }}
          >
            Configure Webhooks
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntegrationDetails;
