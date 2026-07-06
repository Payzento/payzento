"use client";

import {
  Bell,
  ChevronDown,
  CreditCard,
  Send,
  Lock,
  Link2,
  ShoppingCart,
  Server,
  Store,
  Code,
  Terminal,
  Activity,
  Menu,
  X,
  LogOut,
  User as UserIcon,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface DropdownItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}

const products: DropdownItem[] = [
  { icon: <CreditCard className="w-5 h-5 text-blue-500" />, title: "Payments", desc: "Accept payments globally in minutes", href: "/merchants-dashboard" },
  { icon: <Send className="w-5 h-5 text-indigo-500" />, title: "Payouts", desc: "Send money to partners & suppliers", href: "/dashboard/withdraw" },
  { icon: <Lock className="w-5 h-5 text-amber-500" />, title: "Escrow Engine", desc: "Milestone-based secure holding", href: "/new-transaction" },
  { icon: <Link2 className="w-5 h-5 text-teal-500" />, title: "Payment Links", desc: "Shareable checkout links without code", href: "/merchants-dashboard/payment-link" },
];

const useCases: DropdownItem[] = [
  { icon: <ShoppingCart className="w-5 h-5 text-pink-500" />, title: "E-commerce", desc: "Secure shopping checkouts", href: "/getting-started" },
  { icon: <Server className="w-5 h-5 text-violet-500" />, title: "SaaS Platforms", desc: "API escrow payment routing", href: "/merchants-dashboard/integrate-payzento" },
  { icon: <Store className="w-5 h-5 text-orange-500" />, title: "Marketplaces", desc: "Splitting escrow payments and fees", href: "/merchant-page" },
];

const developers: DropdownItem[] = [
  { icon: <Code className="w-5 h-5 text-emerald-500" />, title: "API Reference", desc: "Connect endpoints to your product", href: "/merchants-dashboard/integrate-payzento" },
  { icon: <Terminal className="w-5 h-5 text-cyan-500" />, title: "SDKs & Plugins", desc: "PHP, Python, and JS libraries", href: "/merchants-dashboard/integrate-payzento" },
  { icon: <Activity className="w-5 h-5 text-rose-500" />, title: "System Status", desc: "Real-time service uptime reports", href: "#" },
];

const Nav = () => {
  const router = useRouter();
  const { user, userProfile, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [disputeMsgCount, setDisputeMsgCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setDisputeMsgCount(0);
      return;
    }
    
    const clientSupabase = createClient();
    
    const fetchCount = async () => {
      try {
        const { data: disputes } = await clientSupabase
          .from("disputes")
          .select("id")
          .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`);

        if (!disputes || disputes.length === 0) {
          setDisputeMsgCount(0);
          return;
        }

        const disputeIds = disputes.map((d) => d.id);
        
        const { count, error } = await clientSupabase
          .from("dispute_messages")
          .select("id", { count: "exact", head: true })
          .in("dispute_id", disputeIds);

        if (error) {
          console.error("Error fetching message count:", error);
        } else {
          setDisputeMsgCount(count || 0);
        }
      } catch (err) {
        console.error("Dispute count fetch error:", err);
      }
    };

    fetchCount();

    const messagesChannel = clientSupabase
      .channel("nav-dispute-messages-count")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "dispute_messages",
        },
        () => {
          fetchCount();
        }
      )
      .subscribe();

    return () => {
      clientSupabase.removeChannel(messagesChannel);
    };
  }, [user]);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const getInitials = () => {
    if (userProfile?.firstName && userProfile?.lastName) {
      return `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase();
    }
    if (userProfile?.firstName) {
      return userProfile.firstName[0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "?";
  };

  const handleLogout = async () => {
    try {
      await logout();
      setProfileSidebarOpen(false);
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full fixed top-0 left-0 border-b border-border bg-background/85 backdrop-blur-md z-50 transition-colors duration-300">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto p-4 px-6">
        
        {/* LOGO */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <motion.h1
              className="text-2xl font-black tracking-tight text-foreground"
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              Payzento
            </motion.h1>
          </Link>

          {/* DESKTOP MEGA MENUS */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Products Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveMenu("products")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                Products <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "products" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {activeMenu === "products" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-[480px] bg-card border border-border rounded-2xl shadow-xl p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {products.map((item, idx) => (
                      <Link href={item.href} key={idx} className="flex gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="mt-1">{item.icon}</div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Use Cases Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveMenu("useCases")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                Use Cases <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "useCases" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {activeMenu === "useCases" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-[280px] bg-card border border-border rounded-2xl shadow-xl p-3 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {useCases.map((item, idx) => (
                      <Link href={item.href} key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                        {item.icon}
                        <span className="text-sm font-bold text-foreground">{item.title}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Developers Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveMenu("developers")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                Developers <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "developers" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {activeMenu === "developers" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-[480px] bg-card border border-border rounded-2xl shadow-xl p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {developers.map((item, idx) => (
                      <Link href={item.href} key={idx} className="flex gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="mt-1">{item.icon}</div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pricing Direct Link */}
            <Link href="/pricing" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            {/* About Us Direct Link */}
            <Link href="/about" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              About Us
            </Link>
          </nav>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer text-foreground hover:text-primary transition-colors"
          >
            <Bell className="w-5 h-5" />
          </motion.div>
          
          {user ? (
            /* Logged in state avatar */
            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-sm font-semibold text-foreground">
                Hi, {userProfile?.firstName || "User"}
              </span>
              <motion.button
                onClick={() => setProfileSidebarOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center cursor-pointer shadow-sm border border-primary/20"
              >
                {getInitials()}
              </motion.button>
            </div>
          ) : (
            /* Unauthenticated actions */
            <>
              <Link href="/sign-in" className="hidden sm:block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-sm font-semibold text-foreground hover:text-primary px-4 py-2"
                >
                  Sign In
                </motion.div>
              </Link>

              <Link href="/getting-started" className="hidden sm:block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-xl px-4 py-2.5 shadow-sm"
                >
                  Get Started
                </motion.div>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className="lg:hidden text-foreground p-1 cursor-pointer">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV BAR */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-card border-t border-border lg:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Products</p>
                <div className="flex flex-col gap-2">
                  {products.map((item, idx) => (
                    <Link href={item.href} key={idx} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition-colors">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-t border-border/60 pt-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Use Cases</p>
                <div className="flex flex-col gap-2">
                  {useCases.map((item, idx) => (
                    <Link href={item.href} key={idx} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition-colors">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-t border-border/60 pt-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Developers</p>
                <div className="flex flex-col gap-2">
                  {developers.map((item, idx) => (
                    <Link href={item.href} key={idx} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition-colors">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-t border-border/60 pt-4 flex flex-col gap-3">
                <Link href="/pricing" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
                <Link href="/about" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
                {!user && (
                  <>
                    <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                      Sign In
                    </Link>
                    <Link href="/getting-started" onClick={() => setMobileOpen(false)} className="bg-primary hover:bg-primary/95 text-primary-foreground text-center text-sm font-semibold rounded-xl py-3 shadow-sm">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* USER PROFILE SIDEBAR PANEL (Slide-over) */}
      <AnimatePresence>
        {profileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileSidebarOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            {/* Slide-over */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-card border-l border-border shadow-2xl z-50 p-6 flex flex-col justify-between text-foreground"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <h3 className="font-bold text-lg">Account Profile</h3>
                  <button
                    onClick={() => setProfileSidebarOpen(false)}
                    className="p-1 hover:bg-muted rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Profile Details */}
                <div className="py-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground text-3xl font-extrabold flex items-center justify-center mb-4 shadow-md border-4 border-primary/20">
                    {getInitials()}
                  </div>
                  <h4 className="font-bold text-xl">
                    {userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : "User Profile"}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    {user?.email}
                  </p>
                  
                  {/* Account Type Badge */}
                  {userProfile?.accountType && (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      userProfile.accountType === "merchant" 
                        ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20" 
                        : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                    }`}>
                      {userProfile.accountType === "merchant" ? "Merchant" : "Buyer"}
                    </span>
                  )}
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setProfileSidebarOpen(false)}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-muted text-sm font-semibold transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-blue-500" />
                    Buyer Dashboard
                  </Link>
                  <Link
                    href="/merchants-dashboard"
                    onClick={() => setProfileSidebarOpen(false)}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-muted text-sm font-semibold transition-colors"
                  >
                    <Store className="w-4 h-4 text-indigo-500" />
                    Merchant Dashboard
                  </Link>
                  <Link
                    href="/new-transaction"
                    onClick={() => setProfileSidebarOpen(false)}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-muted text-sm font-semibold transition-colors"
                  >
                    <Lock className="w-4 h-4 text-amber-500" />
                    New Transaction
                  </Link>
                  <Link
                    href="/dispute-resolution"
                    onClick={() => setProfileSidebarOpen(false)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-muted text-sm font-semibold transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <TriangleAlert className="w-4 h-4 text-red-500" />
                      <span>Disputes</span>
                    </div>
                    {disputeMsgCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {disputeMsgCount}
                      </span>
                    )}
                  </Link>
                </div>

              </div>

              {/* Bottom Logout Button */}
              <div className="pt-6 border-t border-border">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer border border-red-500/15"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
