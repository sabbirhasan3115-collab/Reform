"use client"

import { useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { PHASES, type Category } from "@/lib/curriculum-data"
import { Panel } from "./panel"

function catColor(category: Category) {
  switch (category) {
    case "Fiction":
      return "text-chartreuse border-chartreuse/40"
    default:
      return "text-muted-foreground border-hairline"
  }
}

const ALL = "all"

const card = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 160, damping: 20 } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.15 } },
}

// count unique book titles across the whole corpus for the header stat
const uniqueTitles = new Set(PHASES.flatMap((p) => p.reading.map((b) => b.title))).size

export function PhasesView() {
  const [filter, setFilter] = useState<string>(ALL)
  const shownPhases = PHASES.filter((p) => filter === ALL || p.id === filter)

  return (
    <div className="flex flex-col gap-5">
      {/* intro + filter */}
      <Panel className="!p-3">
        <LayoutGroup id="phases-filter">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {uniqueTitles} unique texts · grouped by phase
            </span>
            {[{ id: ALL, label: "All Phases" }, ...PHASES.map((p) => ({ id: p.id, label: `Phase ${p.number}` }))].map(
              (opt) => (
                <button
                  key={opt.id}
                  onClick={() => setFilter(opt.id)}
                  className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                >
                  {filter === opt.id && (
                    <motion.span
                      layoutId="phases-filter-pill"
                      className="absolute inset-0 rounded-full bg-chartreuse"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={filter === opt.id ? "relative text-background" : "relative text-muted-foreground"}
                  >
                    {opt.label}
                  </span>
                </button>
              ),
            )}
          </div>
        </LayoutGroup>
      </Panel>

      {/* phase groups */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-8"
        >
          {shownPhases.map((phase) => (
            <section key={phase.id}>
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-3xl font-bold leading-none text-chartreuse text-glow-chartreuse">
                  {String(phase.number).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-pretty text-lg font-semibold tracking-tight text-foreground">
                    {phase.title}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {phase.reading.length} books in this phase
                  </p>
                </div>
              </div>

              <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {phase.reading.map((book) => (
                  <motion.div
                    key={`${phase.id}-${book.order}-${book.title}`}
                    layout
                    variants={card}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    whileHover={{ y: -6 }}
                  >
                    <Panel className="group h-full transition-colors hover:border-chartreuse/50">
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${catColor(
                            book.category,
                          )}`}
                        >
                          {book.category}
                        </span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-md border border-chartreuse/30 bg-chartreuse/[0.06] font-mono text-xs font-bold text-chartreuse">
                          {book.order}
                        </span>
                      </div>
                      <h4 className="mt-3 text-balance text-base font-semibold leading-tight text-foreground transition-colors group-hover:text-chartreuse">
                        {book.title}
                      </h4>
                      <p className="mt-1 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                        {book.author}
                      </p>
                      <p className="mt-3 border-t border-hairline pt-3 text-sm leading-relaxed text-muted-foreground">
                        {book.note}
                      </p>
                    </Panel>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
