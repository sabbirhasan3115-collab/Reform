"use client"

import { cn } from "@/lib/utils"

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-panel-border bg-panel/70 p-5 backdrop-blur-md",
        "shadow-[inset_0_1px_0_0_oklch(0.45_0.1_128/0.08)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:bg-[radial-gradient(120%_80%_at_0%_0%,oklch(0.45_0.1_128/0.07),transparent_55%)]",
        className,
      )}
    >
      <div className="relative">{children}</div>
    </div>
  )
}
