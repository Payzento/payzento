"use client";

import { MessageSquare, Send, Loader2 } from "lucide-react";
import React, { useState } from "react";
import Messages from "./Messages";
import { useAuth } from "@/context/AuthContext";
import { sendMessage } from "@/lib/chat.service";

interface DisputeChatProps {
  disputeId: string;
  messages: any[];
  senderRole: "buyer" | "seller" | "arbitrator";
}

const DisputeChat = ({ disputeId, messages, senderRole }: DisputeChatProps) => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !user || !disputeId) return;

    setSending(true);
    try {
      await sendMessage(disputeId, user.id, senderRole, text);
      setText("");
    } catch (err) {
      console.error("Failed to send dispute message:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="shadow-lg border border-border p-6 rounded-2xl bg-card text-foreground transition-colors duration-300">
      <h1 className="flex items-center gap-2 text-lg font-semibold mb-4">
        <MessageSquare className="w-4.5 h-4.5 text-[#356eed]"/>
        Escrow Dispute Chat ({senderRole})
      </h1>

      <div>
        <Messages messages={messages} />

        <form onSubmit={handleSend} className="w-full flex items-center justify-between gap-3 mt-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message and press Enter..."
            className="flex-1 h-12 border border-border bg-background text-foreground rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2360e8]/20 focus:border-[#2360e8]"
          />
          <button
            type="submit"
            disabled={sending || !text.trim()}
            className="bg-[#225de6] hover:bg-[#1a4ec4] disabled:bg-gray-400 p-3.5 rounded-xl h-12 w-12 flex items-center justify-center cursor-pointer transition-colors"
          >
            {sending ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DisputeChat;
