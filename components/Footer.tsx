"use client";

import Link from "next/link";
import React from "react";
import { Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Products",
    links: [
      { name: "Collect Payments", href: "/merchants-dashboard" },
      { name: "Send Money", href: "/dashboard/withdraw" },
      { name: "Escrow Engine", href: "/new-transaction" },
      { name: "Payment Links", href: "/merchants-dashboard/payment-link" },
      { name: "Developer APIs", href: "/merchants-dashboard/integrate-payzento" },
    ],
  },
  {
    title: "Developers",
    links: [
      { name: "API Documentation", href: "/merchants-dashboard/integrate-payzento" },
      { name: "Libraries & SDKs", href: "/merchants-dashboard/integrate-payzento" },
      { name: "API Status", href: "/api-status" },
      { name: "Integrations", href: "/merchants-dashboard/integrate-payzento" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact Sales", href: "/contact" },
      { name: "Press & Media", href: "/press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Pricing", href: "/pricing" },
      { name: "Support Center", href: "/support" },
      { name: "Security & Trust", href: "/security" },
      { name: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Merchant Agreement", href: "/merchant-agreement" },
      { name: "Cookie Preferences", href: "/cookies" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-card text-foreground border-t border-border/80 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-6 py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h3 className="text-sm font-bold tracking-wider uppercase text-muted-foreground">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/60 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black tracking-tight text-foreground">Payzento</h2>
              <span className="flex items-center gap-1 text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 uppercase tracking-wider">
                <Shield className="w-3 h-3" /> Powered by Flutterwave
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center md:text-left mt-1 max-w-md">
              Payzento provides the escrow control logic layer. All payment processing, fund custody, and licensing compliance are handled securely by our infrastructure partner, Flutterwave.
            </p>
          </div>

          {/* Socials & Language */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-4 text-muted-foreground">
              {/* Custom SVG X (formerly Twitter) */}
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#" className="hover:text-primary transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
              
              {/* Custom SVG Facebook */}
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#" className="hover:text-primary transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </motion.a>

              {/* Custom SVG Instagram */}
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#" className="hover:text-primary transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </motion.a>

              {/* Custom SVG LinkedIn */}
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#" className="hover:text-primary transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border px-3 py-1.5 rounded-xl bg-background/50 cursor-pointer">
              <Globe className="w-3.5 h-3.5" />
              <span>English (US)</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-border/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Payzento. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Use</a>
            <a href="/cookies" className="hover:underline">Cookie Policy</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
