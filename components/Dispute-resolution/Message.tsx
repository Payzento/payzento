"use client";

import React from "react";
import { motion } from "framer-motion";

type ChatBubble = {
  message: string;
  time: string;
  variant: "incoming" | "outgoing";
};

const Message = ({ message, time, variant }: ChatBubble) => {
  // Parse role label from time (passed as "Role • Time")
  // e.g. "Other Party (arbitrator) • 2:34 PM" or "Other Party (seller) • 2:34 PM"
  const isArbitrator = time.toLowerCase().includes("(arbitrator)");
  const isSeller = time.toLowerCase().includes("(seller)");
  const isBuyer = time.toLowerCase().includes("(buyer)") || time.startsWith("You");

  // Buyer: right-aligned, indigo bubble
  // Seller: left-aligned, grey bubble
  // Arbitrator: left-aligned, amber left border
  const isRightAligned = isBuyer;

  const slideVariant = {
    hidden: { opacity: 0, x: isRightAligned ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  let bubbleClass = "";
  if (isArbitrator) {
    bubbleClass = "bg-amber-500/5 text-foreground border-l-4 border-l-amber-500 border-y-transparent border-r-transparent rounded-r-2xl pl-4 py-2.5";
  } else if (isBuyer) {
    bubbleClass = "bg-indigo-600 text-white border-none rounded-2xl";
  } else {
    // Seller
    bubbleClass = "bg-secondary text-foreground border border-border rounded-2xl";
  }

  return (
    <motion.div
      className={`flex items-center my-2.5 ${isRightAligned ? "justify-end" : "justify-start"}`}
      initial="hidden"
      animate="visible"
      variants={slideVariant}
    >
      <div className={`max-w-[80%] px-4 py-2.5 shadow-sm ${bubbleClass}`}>
        <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
        <span className={`text-[10px] opacity-70 block mt-1 ${isRightAligned ? "text-right" : "text-left"}`}>
          {time}
        </span>
      </div>
    </motion.div>
  );
};

export default Message;
