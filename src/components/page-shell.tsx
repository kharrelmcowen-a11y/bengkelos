import { cn } from "@/lib/utils";

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
      <div className={cn("mx-auto", maxWidth, className)}>{children}</div>
    </main>
  );
}
