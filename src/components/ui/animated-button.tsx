"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
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
  const ButtonComponent = (
    <Button
      variant={variant}
      size={size}
      className={`glow-hover transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );

  if (href) {
    return (
      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="block"
        >
          {ButtonComponent}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {ButtonComponent}
    </motion.div>
  );
}