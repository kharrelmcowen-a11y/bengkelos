"use client";

import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/page-transition";

export function PageShell({
  children,
  className,
  maxWidth = "max-w-2xl",
}: {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}) {
  return (
    <main className="min-h-screen p-6">
      <div className={cn("mx-auto", maxWidth, className)}>
        <PageTransition>
          {children}
        </PageTransition>
      </div>
    </main>
  );
}
