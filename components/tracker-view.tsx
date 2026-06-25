"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { TASKS, TACTICAL_FAMILIES, PHASES } from "@/lib/curriculum-data"
import { Panel } from "./panel"
import { cn } from "@/lib/utils"

const TYPE_LABEL: Record<string, string> = {
  matrix: "Matrix",
  drill: "Drill",
  campaign: "Campaign",
  essay: "Essay",
  checkpoint: "Checkpoint",
}

export function TrackerView() {
  const [done, setDone] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => setDone((p) => ({ ...p, [id]: !p[id] }))

  const completed = useMemo(() => Object.values(done).filter(Boolean).length, [done])
  const pct = Math.round((completed / TASKS.length) * 100)

  return (
    <div className="flex flex-col gap-5">
      {/* progress + tactical families */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-1">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Synthesis Progress</h3>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-mono text-5xl font-bold leading-none text-chartreuse text-glow-chartreuse">{pct}</span>
            <span className="mb-1 font-mono text-lg text-muted-foreground">%</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {completed} of {TASKS.length} deliverables synthesized
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-background">
            <motion.div
              className="h-full rounded-full bg-chartreuse shadow-[0_0_12px_var(--chartreuse)]"
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Modular Tactical Toolkit
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {TACTICAL_FAMILIES.map((f) => (
              <div key={f.name} className="rounded-lg border border-hairline bg-background/40 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{f.name}</span>
                  <span className="font-mono text-xs text-chartreuse">×{f.count}</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">{f.sources}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* tasks grouped by phase */}
      {PHASES.map((phase) => {
        const phaseTasks = TASKS.filter((t) => t.phase === phase.number)
        const phaseDone = phaseTasks.filter((t) => done[t.id]).length
        return (
          <Panel key={phase.id}>
            <div className="mb-4 flex items-center justify-between border-b border-hairline pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-chartreuse">
                  {String(phase.number).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold tracking-tight text-foreground">{phase.title}</h3>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {phaseDone}/{phaseTasks.length}
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {phaseTasks.map((t) => {
                const checked = !!done[t.id]
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => toggle(t.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border border-hairline bg-background/40 p-3 text-left transition-all",
                        "hover:border-chartreuse/50 hover:bg-chartreuse/[0.04]",
                        checked && "border-chartreuse/30 bg-chartreuse/[0.05]",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all",
                          checked
                            ? "border-chartreuse bg-chartreuse text-background shadow-[0_0_10px_var(--chartreuse)]"
                            : "border-panel-border",
                        )}
                      >
                        {checked && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </motion.svg>
                        )}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-sm leading-relaxed transition-colors",
                          checked ? "text-muted-foreground line-through" : "text-foreground",
                        )}
                      >
                        {t.text}
                      </span>
                      <span className="shrink-0 rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-chartreuse/70">
                        {TYPE_LABEL[t.type]}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Panel>
        )
      })}
    </div>
  )
}
