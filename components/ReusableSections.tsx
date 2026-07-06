"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface CardItem {
  cardIcon: React.ReactNode;
  cardTitle: string;
  cardDescription: string;
  className?: string;
  className1?: string;
}

interface ReusableSectionProps {
  header?: string;
  description?: string;
  className?: string;
  cards?: CardItem[];
}

const ReusableSections = ({
  header,
  description,
  className,
  cards,
}: ReusableSectionProps) => {
  return (
    <div>
      <motion.div
        className="flex flex-col items-center justify-center gap-3 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.h1
          className="text-2xl md:text-4xl font-bold tracking-tight text-foreground"
          variants={staggerItem}
        >
          {header}
        </motion.h1>
        <motion.p
          className="text-sm md:text-base text-muted-foreground max-w-xl mb-6"
          variants={staggerItem}
        >
          {description}
        </motion.p>
      </motion.div>

      <motion.div
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-6 mt-8",
          className
        )}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {cards?.map((card, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.04)" }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex flex-col items-center justify-center gap-3 border border-border bg-card/50 text-foreground py-8 px-6 rounded-2xl transition-all duration-300 backdrop-blur-sm",
              card.className1
            )}
          >
            <div
              className={cn(
                `w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm`,
                card.className
              )}
            >
              {card.cardIcon}
            </div>
            <h2 className="text-lg font-bold mt-2 text-foreground">{card.cardTitle}</h2>
            <p className="text-muted-foreground text-sm text-center leading-relaxed">
              {card.cardDescription}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ReusableSections;
