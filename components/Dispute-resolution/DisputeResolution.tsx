"use client";

import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import { MoveLeft, Search, TriangleAlert } from "lucide-react";
import Link from "next/link";
import DisputeChat from "./DisputeChat";
import PageWrapper from "@/components/PageWrapper";
import { scaleIn, staggerContainer, staggerItem } from "@/lib/animations";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getTransactionById } from "@/lib/services/transactions.service";
import { getDisputeByTransactionId } from "@/lib/services/dispute.service";
import { createClient } from "@/lib/supabase/client";

const DisputeResolution = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const { user } = useAuth();

  const [transaction, setTransaction] = useState<any>(null);
  const [dispute, setDispute] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!transactionId) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const tx = await getTransactionById(transactionId);
        setTransaction(tx);
        
        const disp = await getDisputeByTransactionId(transactionId);
        if (disp) {
          setDispute(disp);
          setMessages(disp.messages || []);
        }
      } catch (err) {
        console.error("Error loading dispute data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [transactionId]);

  useEffect(() => {
    if (!dispute?.id) return;

    const clientSupabase = createClient();
    
    const messagesChannel = clientSupabase
      .channel(`dispute-msgs-${dispute.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "dispute_messages",
          filter: `dispute_id=eq.${dispute.id}`,
        },
        (payload) => {
          if (payload.new) {
            setMessages((prev) => {
              // Avoid duplicates
              if (prev.some((m) => m.id === payload.new.id)) return prev;
              return [...prev, payload.new];
            });
          }
        }
      )
      .subscribe();

    return () => {
      clientSupabase.removeChannel(messagesChannel);
    };
  }, [dispute?.id]);

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

  if (!transaction) {
    return (
      <PageWrapper>
        <div className="bg-background text-foreground min-h-screen transition-colors duration-300 pb-12">
          <Nav />
          <div className="max-w-3xl mx-auto px-4 mt-24 text-center">
            <h2 className="text-2xl font-bold text-red-500">Transaction Not Found</h2>
            <Link href="/dashboard" className="text-blue-500 hover:underline mt-4 inline-block font-semibold">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const formatCurrency = (amountKobo: number) => {
    return (amountKobo / 100).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    });
  };

  return (
    <PageWrapper>
      <div className="bg-background text-foreground min-h-screen transition-colors duration-300 pb-12">
        <Nav />

        <div
          className="max-w-3xl mx-auto px-4 mt-24 space-y-6"
        >
          <Link href={`/review-funds?transactionId=${transaction.id}`} className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors mb-4">
            <MoveLeft className="w-4 h-4" />
            Back to Transaction
          </Link>

          <p className="text-2xl font-bold tracking-tight text-foreground">Dispute Resolution</p>

          <div
            className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex flex-col items-start"
          >
            <div className="rounded-full text-red-500 py-1 px-3 bg-red-500/15 border border-red-500/20 flex items-center gap-1.5 mb-3 text-xs font-semibold uppercase tracking-wider">
              <TriangleAlert className="w-3.5 h-3.5" />
              <span>Dispute Open</span>
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              Transaction ID: #{transaction.id.slice(0, 8)} - {transaction.description} ({formatCurrency(transaction.amount || 0)})
            </p>
          </div>

          {dispute ? (
            <div
              className="bg-card border border-border p-6 rounded-2xl shadow-sm transition-colors duration-300 space-y-4"
            >
              <div>
                <p className="font-bold text-lg text-foreground">Dispute Details</p>
                <div className="mt-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Reason</p>
                  <p className="text-sm font-semibold text-foreground mt-1 bg-muted/40 p-3 rounded-lg border border-border/40">
                    {dispute.reason}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</p>
                  <p className="text-sm text-foreground mt-1 bg-muted/40 p-3 rounded-lg border border-border/40 whitespace-pre-wrap">
                    {dispute.description}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm text-center">
              <p className="text-muted-foreground">No active dispute exists for this transaction yet.</p>
            </div>
          )}

          {dispute && (
            <section className="mt-6">
              <DisputeChat disputeId={dispute.id} messages={messages} />
            </section>
          )}

          <div
            className="w-full flex flex-col items-center justify-center border border-blue-500/20 bg-blue-500/5 p-6 rounded-2xl text-center"
          >
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Search className="w-4 h-4" />
              <p className="text-sm font-bold uppercase tracking-wider">Under Review</p>
            </div>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed max-w-md">
              Our support team is currently reviewing this dispute. Funds will remain locked securely in escrow until resolved.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DisputeResolution;
