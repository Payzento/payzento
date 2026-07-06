"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

const faqs = [
  {
    question: "How does escrow protect me from scams?",
    answer:
      "Your money is held securely and cannot be released to the seller until you confirm delivery. You always remain in control.",
  },
  {
    question: "What if the seller doesn't deliver?",
    answer:
      "Open a dispute and our team will review the case. Your money stays locked until the issue is resolved.",
  },
  {
    question: "How long does it take to release payment?",
    answer:
      "Payment is released instantly once you confirm delivery. The seller receives it within minutes.",
  },
  {
    question: "Are there any fees?",
    answer:
      "Small transaction fees apply (typically 2-3%). Always clearly displayed before you confirm payment.",
  },
];

export default function FAQSection() {
  return (
    <div className="w-full flex flex-col items-center py-20 px-4 bg-background border-t border-border transition-colors duration-300">
      <motion.h2
        className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
      >
        Frequently Asked Questions
      </motion.h2>

      <motion.div
        className="w-full max-w-3xl flex flex-col gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="bg-card rounded-2xl p-6 shadow-sm border border-border transition-colors duration-300"
          >
            <h3 className="text-lg font-bold text-foreground">{faq.question}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{faq.answer}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}