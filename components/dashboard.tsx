"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { META, type TabId } from "@/lib/curriculum-data"
import { NavTabs } from "./nav-tabs"
import { SyllabusView } from "./syllabus-view"
import { PhasesView } from "./phases-view"
import { TrackerView } from "./tracker-view"
import { LeafCursor } from "./leaf-cursor"

export function Dashboard() {
  const [tab, setTab] = useState<TabId>("syllabus")

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <LeafCursor />

      {/* ambient chartreuse glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% -10%, oklch(0.45 0.1 128 / 0.18), transparent 70%)",
        }}
      />
      {/* faint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--chartreuse) 1px, transparent 1px), linear-gradient(90deg, var(--chartreuse) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* header */}
        <header className="mb-10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-chartreuse shadow-[0_0_10px_var(--chartreuse)]" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-chartreuse">
              15-Book Synthesis Engine
            </span>
          </div>
          <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            {META.title}
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-sm italic leading-relaxed text-muted-foreground sm:text-base">
            {META.subtitle}
          </p>
          <p className="mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground/80">
            {META.intro}
          </p>
        </header>

        {/* sticky nav */}
        <div className="sticky top-4 z-30 mb-8">
          <NavTabs active={tab} onChange={setTab} />
        </div>

        {/* content */}
        <AnimatePresence mode="wait">
          <motion.section
            key={tab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === "syllabus" && <SyllabusView />}
            {tab === "phases" && <PhasesView />}
            {tab === "tracker" && <TrackerView />}
          </motion.section>
        </AnimatePresence>

        <footer className="mt-16 border-t border-hairline pt-6">
          <p className="font-mono text-xs text-muted-foreground">
            Backward Design · Conceptual Discrimination · Click anywhere to release a leaf.
          </p>
        </footer>
      </div>
    </main>
  )
}
