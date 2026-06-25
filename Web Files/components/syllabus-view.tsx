"use client"

import { useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { PHASES, type Category } from "@/lib/curriculum-data"
import { Panel } from "./panel"

function catColor(category: Category) {
  switch (category) {
    case "Fiction":
      return "text-chartreuse border-chartreuse/40 bg-chartreuse/[0.06]"
    default:
      return "text-muted-foreground border-hairline bg-background/40"
  }
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 150, damping: 18 } },
}

export function SyllabusView() {
  const [activeId, setActiveId] = useState(PHASES[0].id)
  const phase = PHASES.find((p) => p.id === activeId) ?? PHASES[0]

  return (
    <div className="flex flex-col gap-5">
      {/* phase sub-tabs */}
      <Panel className="!p-2">
        <LayoutGroup id="syllabus-subtabs">
          <div className="flex flex-wrap items-center gap-1.5">
            {PHASES.map((p) => {
              const isActive = p.id === activeId
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className="relative flex-1 rounded-lg px-3 py-2.5 text-left outline-none transition-colors sm:flex-none"
                  aria-current={isActive ? "true" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="syllabus-subtab-pill"
                      className="absolute inset-0 rounded-lg bg-chartreuse shadow-[0_0_18px_-4px_var(--chartreuse)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <span
                      className={`font-mono text-base font-bold ${isActive ? "text-background" : "text-chartreuse"}`}
                    >
                      {String(p.number).padStart(2, "0")}
                    </span>
                    <span
                      className={`hidden text-xs font-medium sm:inline ${
                        isActive ? "text-background" : "text-muted-foreground"
                      }`}
                    >
                      Phase {p.number}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </LayoutGroup>
      </Panel>

      <AnimatePresence mode="wait">
        <motion.div
          key={phase.id}
          variants={container}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-col gap-5"
        >
          {/* phase header */}
          <motion.div variants={item}>
            <Panel>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-5xl font-bold leading-none text-chartreuse text-glow-chartreuse">
                    {String(phase.number).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-pretty text-xl font-semibold tracking-tight text-foreground">
                      {phase.title}
                    </h3>
                    <p className="mt-1 text-pretty text-sm italic text-muted-foreground">{phase.tagline}</p>
                  </div>
                </div>
                <span className="shrink-0 self-start rounded-full border border-panel-border bg-chartreuse/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-chartreuse">
                  Phase {phase.number}
                </span>
              </div>

              {/* objectives */}
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {phase.objectives.map((o) => (
                  <div key={o.verb} className="rounded-lg border border-hairline bg-background/40 p-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-chartreuse">{o.verb}</span>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{o.text}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>

          {/* ordered reading list */}
          <motion.div variants={item}>
            <Panel>
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Reading Order — Books to Read
                </h4>
                <span className="font-mono text-xs text-chartreuse/70">{phase.reading.length} texts</span>
              </div>
              <ol className="flex flex-col gap-2.5">
                {phase.reading.map((b) => (
                  <li
                    key={`${b.order}-${b.title}`}
                    className="group flex items-start gap-3 rounded-lg border border-hairline bg-background/40 p-3 transition-colors hover:border-chartreuse/50 hover:bg-chartreuse/[0.04]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-chartreuse/30 bg-chartreuse/[0.06] font-mono text-sm font-bold text-chartreuse">
                      {b.order}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-chartreuse">
                          {b.title}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">· {b.author}</span>
                        <span
                          className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${catColor(
                            b.category,
                          )}`}
                        >
                          {b.category}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Panel>
          </motion.div>

          {/* serial execution steps */}
          <motion.div variants={item}>
            <Panel>
              <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Execution Steps — Do In Order
              </h4>
              <ol className="flex flex-col gap-3">
                {phase.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chartreuse font-mono text-xs font-bold text-background">
                      {i + 1}
                    </span>
                    <p className="pt-0.5 text-sm leading-relaxed text-foreground/85">{step}</p>
                  </li>
                ))}
              </ol>
            </Panel>
          </motion.div>

          {/* task + checkpoint */}
          <motion.div variants={item} className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-chartreuse">Task</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{phase.task}</p>
            </Panel>
            <Panel className="border-chartreuse/30 bg-chartreuse/[0.05]">
              <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-chartreuse">Cognitive Checkpoint</h4>
              <p className="text-sm italic leading-relaxed text-foreground/85">&ldquo;{phase.checkpoint}&rdquo;</p>
            </Panel>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
