"use client";

import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import { MoveLeft, Search, TriangleAlert, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import DisputeChat from "./DisputeChat";
import FileUploader, { QueuedFile } from "../FileUploader";
import PageWrapper from "@/components/PageWrapper";
import { scaleIn, staggerContainer, staggerItem } from "@/lib/animations";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getTransactionById } from "@/lib/services/transactions.service";
import { getDisputeByTransactionId, createDispute } from "@/lib/services/dispute.service";
import { uploadEvidenceFileWithProgress } from "@/lib/storage.service";
import { createClient } from "@/lib/supabase/client";

const DisputeResolution = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const { user } = useAuth();

  const [transaction, setTransaction] = useState<any>(null);
  const [dispute, setDispute] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Dispute Form State
  const [reason, setReason] = useState("Item not received");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loadData = async () => {
    if (!transactionId) return;
    try {
      const tx = await getTransactionById(transactionId);
      setTransaction(tx);
      
      const disp = await getDisputeByTransactionId(transactionId);
      if (disp) {
        // Generate fresh signed URLs for each evidence path on page load
        if (disp.evidence_urls && disp.evidence_urls.length > 0) {
          const clientSupabase = createClient();
          // Extract paths if stored as full URL, otherwise use raw paths
          const paths = disp.evidence_urls.map((url: string) => {
            if (url.includes("dispute-evidence/")) {
              return url.split("dispute-evidence/")[1].split("?")[0];
            }
            return url;
          });

          const { data: signedData, error: signedError } = await clientSupabase.storage
            .from("dispute-evidence")
            .createSignedUrls(paths, 604800); // 7 days

          if (!signedError && signedData) {
            disp.signedEvidenceUrls = signedData.map(s => s.signedUrl);
          }
        }
        setDispute(disp);
        setMessages(disp.messages || []);
      }
    } catch (err) {
      console.error("Error loading dispute data:", err);
    }
  };

  useEffect(() => {
    if (!transactionId) {
      setLoading(false);
      return;
    }

    const init = async () => {
      setLoading(true);
      await loadData();
      setLoading(false);
    };

    init();
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

  const handleSubmitDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction || !user) return;
    if (!description.trim()) {
      setErrorMsg("Please provide a description of the issue.");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setSubmitting(true);

    const uploadedPaths: string[] = [];

    try {
      // 1. Upload queued files sequentially with progress
      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        if (item.status === "error") continue;

        // Update file status to uploading in state
        setFiles(prev =>
          prev.map(f => (f.id === item.id ? { ...f, status: "uploading", progress: 0 } : f))
        );

        try {
          const uploadRes = await uploadEvidenceFileWithProgress(
            transaction.id,
            item.file,
            user.id,
            (progress) => {
              setFiles(prev =>
                prev.map(f => (f.id === item.id ? { ...f, progress } : f))
              );
            }
          );

          // Update file status to success in state
          setFiles(prev =>
            prev.map(f => (f.id === item.id ? { ...f, status: "success", progress: 100 } : f))
          );

          // Store the relative path inside bucket (display will use fresh signed URLs)
          uploadedPaths.push(uploadRes.path);
        } catch (uploadErr: any) {
          // Update file status to error in state
          setFiles(prev =>
            prev.map(f => (f.id === item.id ? { ...f, status: "error", error: uploadErr.message || "Upload failed" } : f))
          );
          throw new Error(`Upload failed for ${item.file.name}.`);
        }
      }

      // 2. Submit dispute
      await createDispute({
        transactionId: transaction.id,
        buyerId: user.id,
        sellerId: transaction.seller_id,
        reason,
        description,
        evidenceUrls: uploadedPaths,
      });

      setSuccessMsg("Dispute submitted. An arbitrator will review within 24 hours.");
      
      // Reload page data to switch to active dispute panel
      await loadData();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to submit dispute. Please try again.");
    } finally {
      setSubmitting(false);
    }
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

        <div className="max-w-3xl mx-auto px-4 mt-24 space-y-6">
          <Link
            href={`/review-funds?transactionId=${transaction.id}`}
            className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors mb-4"
          >
            <MoveLeft className="w-4 h-4" />
            Back to Transaction
          </Link>

          <p className="text-2xl font-bold tracking-tight text-foreground">Dispute Resolution</p>

          {errorMsg && (
            <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 flex items-start gap-2.5 text-sm font-semibold">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-green-50 text-green-600 border border-green-200 rounded-xl p-4 flex items-start gap-2.5 text-sm font-semibold">
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex flex-col items-start">
            <div className="rounded-full text-red-500 py-1 px-3 bg-red-500/15 border border-red-500/20 flex items-center gap-1.5 mb-3 text-xs font-semibold uppercase tracking-wider">
              <TriangleAlert className="w-3.5 h-3.5" />
              <span>Dispute Open</span>
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              Transaction ID: #{transaction.id.slice(0, 8)} - {transaction.description} ({formatCurrency(transaction.amount || 0)})
            </p>
          </div>

          {dispute ? (
            /* Active dispute details */
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm transition-colors duration-300 space-y-4">
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

                {dispute.signedEvidenceUrls && dispute.signedEvidenceUrls.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Uploaded Evidence Documents</p>
                    <div className="flex flex-col gap-2 bg-muted/20 p-3 rounded-xl border border-border/40">
                      {dispute.signedEvidenceUrls.map((url: string, index: number) => {
                        const dbPath = dispute.evidence_urls?.[index];
                        const fileName = dbPath ? dbPath.split("/").pop() : `Evidence #${index + 1}`;
                        // Remove prefix timestamp if present
                        const cleanName = fileName.replace(/^\d+_(.*)/, "$1");
                        return (
                          <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
                          >
                            <span>{cleanName}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* File dispute submission form */
            <form onSubmit={handleSubmitDispute} className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-6">
              <h3 className="font-bold text-lg text-foreground">File a Dispute</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Reason for Dispute
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full border border-border bg-background text-foreground rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  >
                    <option value="Item not received">Item not received</option>
                    <option value="Item not as described">Item not as described</option>
                    <option value="Seller unresponsive">Seller unresponsive</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Provide Details
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide full description of why you are filing this dispute. The support team will review this message."
                    className="w-full border border-border bg-background text-foreground focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 p-4 rounded-xl transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Evidence Files (Optional)
                  </label>
                  <FileUploader files={files} setFiles={setFiles} />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting Dispute & Files...
                  </>
                ) : (
                  "Submit Dispute"
                )}
              </button>
            </form>
          )}

          {dispute && (
            <section className="mt-6">
              <DisputeChat
                disputeId={dispute.id}
                messages={messages}
                senderRole={
                  user?.id === dispute.buyer_id
                    ? "buyer"
                    : user?.id === dispute.seller_id
                    ? "seller"
                    : "arbitrator"
                }
              />
            </section>
          )}

          <div className="w-full flex flex-col items-center justify-center border border-blue-500/20 bg-blue-500/5 p-6 rounded-2xl text-center">
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
