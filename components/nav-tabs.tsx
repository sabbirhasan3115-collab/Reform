"use client"

import { motion } from "framer-motion"
import type { TabId } from "@/lib/curriculum-data"

const TABS: { id: TabId; label: string }[] = [
  { id: "syllabus", label: "Syllabus" },
  { id: "phases", label: "Phases" },
  { id: "tracker", label: "Task Tracker" },
]

export function NavTabs({
  active,
  onChange,
}: {
  active: TabId
  onChange: (id: TabId) => void
}) {
  return (
    <nav className="inline-flex flex-wrap items-center gap-1 rounded-full border border-panel-border bg-panel/70 p-1.5 backdrop-blur-md">
      {TABS.map((tab) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative rounded-full px-5 py-2 text-sm font-medium outline-none transition-colors"
            aria-current={isActive ? "page" : undefined}
          >
            {isActive && (
              <motion.span
                layoutId="active-tab-pill"
                className="absolute inset-0 rounded-full bg-chartreuse shadow-[0_0_20px_-2px_var(--chartreuse)]"
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
              />
            )}
            <span className={isActive ? "relative font-semibold text-background" : "relative text-muted-foreground"}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
