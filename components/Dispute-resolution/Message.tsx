"use client";

import React from "react";
import { motion } from "framer-motion";

type ChatBubble = {
  message: string;
  time: string;
  variant: "incoming" | "outgoing";
};

const Message = ({ message, time, variant }: ChatBubble) => {
  const isOutgoing = variant === "outgoing";

  // Outgoing = current user (slide from left), incoming = other party (slide from right)
  const slideVariant = {
    hidden: { opacity: 0, x: isOutgoing ? -20 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <motion.div
      className={`flex items-center my-2 ${isOutgoing ? "justify-start" : "justify-end"}`}
      initial="hidden"
      animate="visible"
      variants={slideVariant}
    >
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl border ${
          isOutgoing 
            ? "bg-secondary text-foreground border-border" 
            : "bg-primary text-primary-foreground border-primary"
        }`}
      >
        <p className="text-sm font-medium">
          {message}
        </p>
        <span className="text-[10px] opacity-70 block text-right mt-1">{time}</span>
      </div>
    </motion.div>
  );
};

export default Message;
