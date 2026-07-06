"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      {children}
    </motion.div>
  );
}
