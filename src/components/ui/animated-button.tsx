"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  href?: string;
}

export function AnimatedButton({
  children,
  variant = "default",
  size = "default",
  className = "",
  href,
  ...props
}: AnimatedButtonProps) {
  const buttonContent = (
    <Button
      variant={variant}
      size={size}
      className={`glow-hover transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );

  const animatedContent = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {buttonContent}
    </motion.div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="block"
      >
        {buttonContent}
      </motion.a>
    );
  }

  return animatedContent;
}