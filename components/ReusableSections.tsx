import { cn } from "@/lib/utils";
import React from "react";

interface CardItem {
  cardIcon: React.ReactNode;
  cardTitle: string;
  cardDescription: string;
  className?: string;
  className1?: string;
}

interface ReusableSectionProps {
  header: string;
  description?: string;
  className?: string;
  cards: CardItem[];
}

const ReusableSections = ({
  header,
  description,
  className,
  cards,
}: ReusableSectionProps) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-xl md:text-3xl font-semibold">{header}</h1>
        <p className="text-sm text-gray-400 mb-5">{description}</p>
      </div>

      <div className={cn("flex flex-col md:flex-row items-center justify-between gap-2 mt-6", className)}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={cn("w-full md:w-[32%] flex flex-col items-center justify-center gap-2 border border-gray-300 py-4 px-8  rounded-lg hover:shadow-lg transition-shadow duration-300", card.className1)}
          >
            <div
              className={cn(
                `w-12.5 h-12.5 rounded-full flex items-center justify-center`, card.className
              )}
            >
              {card.cardIcon}
            </div>
            <h2 className="text-lg font-bold mt-2">{card.cardTitle}</h2>
            <p className="text-gray-500 text-sm text-center font-light mt-1">{card.cardDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReusableSections;
