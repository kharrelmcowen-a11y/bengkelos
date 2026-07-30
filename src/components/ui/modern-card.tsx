"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export function ModernCard({ 
  children, 
  className = "", 
  hover = true,
  gradient = false 
}: ModernCardProps) {
  const cardContent = (
    <Card className={`transition-all duration-300 ${hover ? 'hover:shadow-xl hover:scale-[1.02]' : ''} ${gradient ? 'gradient-border' : ''} ${className}`}>
      {children}
    </Card>
  );

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}