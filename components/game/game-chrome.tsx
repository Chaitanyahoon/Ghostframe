"use client"

import React, { useMemo } from "react"
import type { EnemyPosition, GameScreen } from "@/lib/game/types"
import { getEnemyColor, getEnemyIcon } from "./corruption-icons"

export const GameChrome = React.memo(function GameChrome({
  screen,
  glitchIntensity,
  reducedMotion,
  enemies,
  children,
}: {
  screen: GameScreen
  glitchIntensity: number
  reducedMotion: boolean
  enemies: EnemyPosition[]
  children: React.ReactNode
}) {
  const intro = screen === "intro"
  const anim = reducedMotion ? "none" : "glitch 0.2s infinite"
  const overlayStyle = useMemo(
    () => ({
      background: `linear-gradient(45deg, 
            rgba(255,0,255,${intro ? glitchIntensity * 0.05 : glitchIntensity * 0.1}) 0%, 
            transparent 25%, 
            rgba(0,255,255,${intro ? glitchIntensity * 0.05 : glitchIntensity * 0.1}) 50%, 
            transparent 75%, 
            rgba(255,255,0,${intro ? glitchIntensity * 0.05 : glitchIntensity * 0.1}) 100%)`,
      filter: reducedMotion
        ? undefined
        : `blur(${intro ? glitchIntensity * 0.5 : glitchIntensity}px) contrast(${1 + (intro ? glitchIntensity * 0.5 : glitchIntensity)})`,
      animation: anim,
    }),
    [intro, glitchIntensity, reducedMotion, anim],
  )

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-hidden relative font-ghost mobile-safe-area">
      <div className="crt-overlay" aria-hidden="true" />
      <div className="noise-grain" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-screen" style={overlayStyle} />

      {enemies.map((enemy) => (
        <div
          key={enemy.id}
          className={`fixed w-6 h-6 sm:w-8 sm:h-8 rounded-full z-40 shadow-lg ${getEnemyColor(enemy.type)} ${reducedMotion ? "" : "animate-pulse"}`}
          style={{
            left: `${enemy.x}%`,
            top: `${enemy.y}%`,
            filter: reducedMotion ? undefined : "blur(1px)",
            transition: "all 1.5s ease-in-out",
          }}
        >
          {getEnemyIcon(enemy.type)}
        </div>
      ))}

      {children}
    </div>
  )
})
