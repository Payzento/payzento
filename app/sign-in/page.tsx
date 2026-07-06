"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { scaleIn, staggerContainer, staggerItem, fadeUp } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { ShieldCheck, ShieldAlert, Sparkles, ChevronLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const supabase = createClient();

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInData = z.infer<typeof schema>;

const SignIn = () => {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignInData) => {
    setError("");
    setIsSubmitting(true);
    try {
      await signIn(data.email, data.password);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("account_type")
          .eq("id", session.user.id)
          .single();

        if (profile?.account_type === "merchant") {
          router.push("/merchants-dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password");
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error(err);
      setError("Google sign in failed");
    }
  };

  return (
    <PageWrapper>
      <div className="w-full min-h-screen flex flex-col md:flex-row bg-background text-foreground transition-colors duration-300">
        
        {/* LEFT COLUMN: BRAND SHOWCASE (Desktop only) */}
        <div className="hidden md:flex md:w-[45%] lg:w-[40%] bg-[#060b18] relative overflow-hidden flex-col justify-between p-12 text-white border-r border-[#152347]">
          {/* Decorative glowing gradient backgrounds */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          
          {/* Header */}
          <div className="relative z-10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-wider text-white">PAYZENTO</span>
            </Link>
          </div>

          {/* Interactive Feature List */}
          <motion.div 
            className="relative z-10 space-y-8 my-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/15">
                Escrow Payments Platform
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
                Secure digital trade, guaranteed.
              </h2>
            </motion.div>

            <div className="space-y-6">
              {[
                { icon: <ShieldCheck className="w-6 h-6 text-green-400" />, title: "Locked Escrow Guarantee", desc: "Funds remain safely protected until conditions are verified." },
                { icon: <Sparkles className="w-6 h-6 text-blue-400" />, title: "Frictionless Integration", desc: "Embed payments in your products in just a few lines of code." },
                { icon: <ShieldAlert className="w-6 h-6 text-indigo-400" />, title: "Dispute Mediation", desc: "Dedicated neutral review layer to protect buyers and sellers alike." }
              ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  variants={staggerItem}
                  className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 h-fit">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{feature.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer details */}
          <div className="relative z-10 text-xs text-slate-500">
            &copy; 2026 Payzento Technologies. All rights reserved.
          </div>
        </div>

        {/* RIGHT COLUMN: SIGN IN FORM */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-20 relative">
          
          {/* Back button and Theme Toggle for Right Column */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </Link>
            <ThemeToggle />
          </div>

          <motion.div
            className="w-full max-w-md flex flex-col gap-6"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {/* Logo for mobile view only */}
            <div className="md:hidden flex flex-col items-center gap-2 mb-4">
              <span className="text-2xl font-black tracking-wider text-primary">PAYZENTO</span>
            </div>

            <div className="text-left">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Welcome Back</h2>
              <p className="text-muted-foreground mt-1.5">
                Sign in to manage your active transactions and payouts.
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-semibold flex items-center gap-2"
              >
                <ShieldAlert className="w-5 h-5" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full text-foreground bg-card border border-border p-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Password
                  </label>
                  <Link href="/contact" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full text-foreground bg-card border border-border p-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">{errors.password.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl cursor-pointer font-semibold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-200 mt-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </motion.button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">or</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <motion.button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 border border-border bg-card hover:bg-muted text-foreground py-3.5 rounded-xl cursor-pointer font-semibold transition-all duration-200"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.37 3.65 1.4 7.56l3.87 3A7.004 7.004 0 0 1 12 5.04z" />
                <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44a5.513 5.513 0 0 1-2.4 3.62l3.73 2.89c2.18-2.01 3.72-4.97 3.72-8.61z" />
                <path fill="#FBBC05" d="M5.27 14.56A7.02 7.02 0 0 1 4.8 12c0-.9.17-1.76.47-2.56L1.4 6.44A11.96 11.96 0 0 0 0 12c0 2.05.52 4 1.4 5.7l3.87-3.14z" />
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.89a7.03 7.03 0 0 1-4.23 1.2c-3.77 0-6.97-2.54-8.1-6L1.03 15.5A11.963 11.963 0 0 0 12 23z" />
              </svg>
              Sign in with Google
            </motion.button>
            
            <p className="text-center text-sm text-muted-foreground mt-2">
              Don&apos;t have an account?{" "}
              <Link href="/getting-started" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Create account
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SignIn;
