"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { SignupFormData } from "./SignupFormContext";

export type UserProfile = {
  accountType: 'buyer' | 'merchant';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  kycStatus?: 'pending' | 'verified' | 'failed';
  createdAt?: string;
};

type AuthContextType = {
  user: SupabaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (data: SignupFormData) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const setSessionCookie = (value: string | null) => {
  if (typeof window !== "undefined") {
    if (value) {
      document.cookie = `payzento_session=${value}; path=/; max-age=86400; SameSite=Lax; Secure`;
    } else {
      document.cookie = "payzento_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure";
    }
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          setSessionCookie(session.access_token);
          const meta = session.user.user_metadata || {};
          setUserProfile({
            firstName: meta.first_name || "",
            lastName: meta.last_name || "",
            email: session.user.email || "",
            phone: meta.phone || "",
            accountType: meta.account_type || "buyer",
            kycStatus: meta.kyc_status || "pending",
          });
        } else {
          setSessionCookie(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error retrieving initial session:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (session) {
        setSessionCookie(session.access_token);
        const meta = session.user.user_metadata || {};
        setUserProfile({
          firstName: meta.first_name || "",
          lastName: meta.last_name || "",
          email: session.user.email || "",
          phone: meta.phone || "",
          accountType: meta.account_type || "buyer",
          kycStatus: meta.kyc_status || "pending",
        });
      } else {
        setSessionCookie(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (data: SignupFormData) => {
    if (!data.accountType) {
      throw new Error("Account type is required for sign up");
    }
    
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          account_type: data.accountType,
          kyc_status: 'pending',
        }
      }
    });

    if (error) throw error;
    if (!authData.user) throw new Error("Signup failed");

    setUser(authData.user);
    const profile: UserProfile = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      accountType: data.accountType,
      kycStatus: 'pending',
    };
    setUserProfile(profile);
    setSessionCookie(authData.session?.access_token || authData.user.id);
  };

  const signIn = async (email: string, password: string) => {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!authData.user) throw new Error("Sign in failed");

    setUser(authData.user);
    const meta = authData.user.user_metadata || {};
    const profile: UserProfile = {
      firstName: meta.first_name || "",
      lastName: meta.last_name || "",
      email: authData.user.email || "",
      phone: meta.phone || "",
      accountType: meta.account_type || "buyer",
      kycStatus: meta.kyc_status || "pending",
    };
    setUserProfile(profile);
    setSessionCookie(authData.session?.access_token || authData.user.id);
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined,
      }
    });
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSessionCookie(null);
    setUser(null);
    setUserProfile(null);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060b18] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="text-3xl font-black tracking-wider animate-pulse">
            PAYZENTO
          </div>
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signUp, signIn, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
