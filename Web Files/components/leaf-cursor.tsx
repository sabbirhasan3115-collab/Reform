"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

/**
 * Natural leaf cursor.
 * - Two small, organically-shaped leaves trail the pointer with spring inertia.
 * - When idle, the leaves gently breathe/sway every ~4 seconds.
 * - On movement, tiny stipules (faux baby-leaves) spawn and twirl off as a trail.
 * - On click, the active leaf detaches and feather-falls on a sine-wave path.
 */

type LeafVariant = 0 | 1

function LeafSVG({ variant, idPrefix }: { variant: LeafVariant; idPrefix: string }) {
  const gradId = `${idPrefix}-grad`
  const veinId = `${idPrefix}-vein`
  const shadeId = `${idPrefix}-shade`
  return (
    <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="20" y1="10" x2="80" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d4ff5a" />
          <stop offset="42%" stopColor="#7FFF00" />
          <stop offset="100%" stopColor="#2f6b00" />
        </linearGradient>
        <radialGradient id={shadeId} cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#eaffb0" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#7FFF00" stopOpacity="0" />
          <stop offset="100%" stopColor="#06250a" stopOpacity="0.55" />
        </radialGradient>
        <linearGradient id={veinId} x1="50" y1="6" x2="50" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1c3b00" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#163000" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#0c2200" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {variant === 0 ? (
        // Leaf 1 — slender lanceolate with a gentle natural curve
        <path
          d="M52 6 C72 26 84 48 76 70 C70 87 58 94 50 94 C43 94 30 87 24 71 C16 47 32 24 52 6 Z"
          fill={`url(#${gradId})`}
          stroke="#3a7d00"
          strokeWidth="1.1"
        />
      ) : (
        // Leaf 2 — broader ovate with a slight twist
        <path
          d="M50 7 C76 20 90 48 77 76 C69 90 58 95 50 91 C41 95 27 87 23 71 C13 45 25 22 50 7 Z"
          fill={`url(#${gradId})`}
          stroke="#3a7d00"
          strokeWidth="1.1"
        />
      )}

      <path
        d={
          variant === 0
            ? "M52 6 C72 26 84 48 76 70 C70 87 58 94 50 94 C43 94 30 87 24 71 C16 47 32 24 52 6 Z"
            : "M50 7 C76 20 90 48 77 76 C69 90 58 95 50 91 C41 95 27 87 23 71 C13 45 25 22 50 7 Z"
        }
        fill={`url(#${shadeId})`}
      />

      <path d="M50 9 C50 36 50 64 50 92" stroke={`url(#${veinId})`} strokeWidth="2.2" strokeLinecap="round" />
      <g stroke="#1f4400" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round">
        <path d="M50 28 C41 32 35 37 31 45" />
        <path d="M50 28 C59 32 65 37 69 45" />
        <path d="M50 46 C41 50 35 56 32 63" />
        <path d="M50 46 C59 50 65 56 68 63" />
        <path d="M50 64 C43 68 39 72 37 77" />
        <path d="M50 64 C57 68 61 72 63 77" />
      </g>
    </svg>
  )
}

export function LeafCursor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leafARef = useRef<HTMLDivElement>(null)
  const leafBRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const finePointer = window.matchMedia("(pointer: fine)").matches
    if (!finePointer) return

    document.documentElement.classList.add("has-leaf-cursor")

    const container = containerRef.current
    if (!container) return

    const setters = {
      a: {
        x: gsap.quickTo(leafARef.current, "x", { duration: 0.5, ease: "power3" }),
        y: gsap.quickTo(leafARef.current, "y", { duration: 0.5, ease: "power3" }),
        rot: gsap.quickTo(leafARef.current, "rotation", { duration: 0.7, ease: "power2" }),
        skew: gsap.quickTo(leafARef.current, "skewX", { duration: 0.6, ease: "power2" }),
        ry: gsap.quickTo(leafARef.current, "rotationY", { duration: 0.6, ease: "power2" }),
      },
      b: {
        x: gsap.quickTo(leafBRef.current, "x", { duration: 0.85, ease: "power3" }),
        y: gsap.quickTo(leafBRef.current, "y", { duration: 0.85, ease: "power3" }),
        rot: gsap.quickTo(leafBRef.current, "rotation", { duration: 1, ease: "power2" }),
        skew: gsap.quickTo(leafBRef.current, "skewY", { duration: 0.8, ease: "power2" }),
        rx: gsap.quickTo(leafBRef.current, "rotationX", { duration: 0.8, ease: "power2" }),
      },
    }

    gsap.set(leafARef.current, { rotationY: 24, rotationX: 6, transformPerspective: 600 })
    gsap.set(leafBRef.current, { rotationX: 30, rotationY: -12, transformPerspective: 600 })

    // Idle "breathing" sway — gently nudges the leaves every ~4 seconds.
    const idleTl = gsap.timeline({ repeat: -1, repeatDelay: 4 })
    idleTl
      .to(leafARef.current, { rotation: "+=8", y: "+=3", duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0)
      .to(leafBRef.current, { rotation: "-=7", y: "+=4", duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0)

    let lastX = window.innerWidth / 2
    let lastY = window.innerHeight / 2
    let pointerX = lastX
    let pointerY = lastY
    let stipuleAccumulator = 0

    // Spawn a tiny twirling stipule that drifts off and fades.
    const spawnStipule = (sx: number, sy: number, vx: number, vy: number) => {
      const el = document.createElement("div")
      el.style.position = "fixed"
      el.style.left = "0"
      el.style.top = "0"
      el.style.pointerEvents = "none"
      el.style.zIndex = "9996"
      el.style.willChange = "transform, opacity"
      el.innerHTML =
        '<svg width="9" height="9" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 8 C74 28 80 56 64 80 C56 92 50 94 50 94 C50 94 44 92 36 80 C20 56 26 28 50 8 Z" fill="#9bef3a" stroke="#3a7d00" stroke-width="2"/><path d="M50 12 L50 90" stroke="#2f6b00" stroke-width="2.6" stroke-linecap="round"/></svg>'
      container.appendChild(el)

      const jitter = () => (Math.random() - 0.5) * 18
      // Trail behind movement direction, with a little spread.
      const driftX = -vx * 1.4 + jitter()
      const driftY = -vy * 1.4 + jitter() + 14 // slight downward settle
      const spin = (Math.random() > 0.5 ? 1 : -1) * (220 + Math.random() * 260)

      gsap.set(el, { x: sx + jitter(), y: sy + jitter(), xPercent: -50, yPercent: -50, scale: 0.9, opacity: 0.95 })
      gsap.to(el, {
        x: `+=${driftX}`,
        y: `+=${driftY}`,
        rotation: `+=${spin}`,
        scale: 0.2,
        opacity: 0,
        duration: 0.9 + Math.random() * 0.4,
        ease: "power2.out",
        onComplete: () => el.remove(),
      })
    }

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX
      pointerY = e.clientY

      const vx = pointerX - lastX
      const vy = pointerY - lastY
      lastX = pointerX
      lastY = pointerY

      const speed = Math.min(Math.hypot(vx, vy), 60)
      const angle = (Math.atan2(vy, vx) * 180) / Math.PI

      // Pause idle sway while actively moving, resume shortly after.
      idleTl.pause()
      gsap.delayedCall(0.4, () => idleTl.play())

      setters.a.x(pointerX)
      setters.a.y(pointerY)
      setters.a.rot(angle * 0.25 + 12)
      setters.a.skew(gsap.utils.clamp(-22, 22, vx * 0.6))
      setters.a.ry(24 + gsap.utils.clamp(-30, 30, vx * 0.8))

      setters.b.x(pointerX - 5)
      setters.b.y(pointerY + 6)
      setters.b.rot(angle * 0.18 - 18)
      setters.b.skew(gsap.utils.clamp(-18, 18, vy * 0.5))
      setters.b.rx(30 + gsap.utils.clamp(-26, 26, vy * 0.7))

      gsap.to([leafARef.current, leafBRef.current], {
        scale: 1 + speed * 0.004,
        duration: 0.3,
        overwrite: "auto",
      })

      // Emit stipules proportional to distance travelled (a continuous trail).
      stipuleAccumulator += speed
      while (stipuleAccumulator > 14) {
        stipuleAccumulator -= 14
        spawnStipule(pointerX, pointerY, vx, vy)
      }
    }

    const spawnFall = (variantEl: HTMLDivElement | null, baseRotY: number) => {
      if (!variantEl) return
      const clone = variantEl.cloneNode(true) as HTMLDivElement
      clone.style.position = "fixed"
      clone.style.left = "0"
      clone.style.top = "0"
      clone.style.pointerEvents = "none"
      clone.style.zIndex = "9998"
      container.appendChild(clone)

      const startX = pointerX
      const startY = pointerY
      const driftDir = Math.random() > 0.5 ? 1 : -1
      const fallDistance = window.innerHeight - startY + 80
      const swayAmp = 70 + Math.random() * 60

      gsap.set(clone, {
        x: startX,
        y: startY,
        rotationY: baseRotY,
        transformPerspective: 600,
        xPercent: -50,
        yPercent: -50,
      })

      const tl = gsap.timeline({ onComplete: () => clone.remove() })
      tl.to(clone, { y: startY + fallDistance, duration: 3.4, ease: "power1.in" }, 0)
        .to(clone, { x: `+=${swayAmp * driftDir}`, duration: 0.85, ease: "sine.inOut", repeat: -1, yoyo: true }, 0)
        .to(clone, { rotation: `+=${360 * driftDir}`, rotationX: "+=220", duration: 3.4, ease: "none" }, 0)
        .to(clone, { opacity: 0, duration: 1, ease: "power2.in" }, 2.4)
    }

    let toggle: LeafVariant = 0
    const onClick = () => {
      if (toggle === 0) {
        spawnFall(leafARef.current, 24)
      } else {
        spawnFall(leafBRef.current, -12)
      }
      toggle = (toggle === 0 ? 1 : 0) as LeafVariant

      gsap.fromTo(
        [leafARef.current, leafBRef.current],
        { scale: 0.6 },
        { scale: 1, duration: 0.5, ease: "back.out(2.5)", overwrite: "auto" },
      )
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("click", onClick)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("click", onClick)
      idleTl.kill()
      document.documentElement.classList.remove("has-leaf-cursor")
    }
  }, [])

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9997] hidden md:block" aria-hidden="true">
      <div
        ref={leafBRef}
        className="absolute left-0 top-0 -ml-[10px] -mt-[10px] will-change-transform"
        style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.6))" }}
      >
        <LeafSVG variant={1} idPrefix="leaf-b" />
      </div>
      <div
        ref={leafARef}
        className="absolute left-0 top-0 -ml-[10px] -mt-[10px] will-change-transform"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.55))" }}
      >
        <LeafSVG variant={0} idPrefix="leaf-a" />
      </div>
    </div>
  )
}
