"use client";

import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useAuth } from "@/context/AuthContext";

const Messages = ({ messages }: { messages: any[] }) => {
  const { user } = useAuth();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="overflow-y-auto h-80 pr-1 space-y-2 border border-border/40 rounded-xl p-4 bg-muted/20">
      {messages.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm py-12">
          No messages in this dispute yet. Communicate with the seller and arbitrator here.
        </p>
      ) : (
        messages.map((m, idx) => {
          const isOutgoing = m.sender_id === user?.id;
          const roleLabel = m.sender_role ? ` (${m.sender_role})` : "";
          const senderInfo = isOutgoing ? "You" : `Other Party${roleLabel}`;
          
          return (
            <Message
              key={m.id || idx}
              variant={isOutgoing ? "outgoing" : "incoming"}
              message={m.content}
              time={`${senderInfo} • ${new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
            />
          );
        })
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;
