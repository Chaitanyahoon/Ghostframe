"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Skull, Zap } from "lucide-react"
import type { SynthSound } from "@/lib/game/types"

export const IntroScreen = React.memo(function IntroScreen({
  onEnter,
  onResume,
  hasSavedGame,
  playSound,
}: {
  onEnter: () => void
  onResume?: () => void
  hasSavedGame?: boolean
  playSound: (t: SynthSound) => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative z-10 p-4 mobile-safe-area">
      <div className="relative z-20 mb-6 sm:mb-10 text-center animate-pulse motion-reduce:animate-none">
        <img
          src="/logo-transparent.png"
          alt="GhostFrame Skull Logo"
          className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 object-contain"
          style={{ filter: "drop-shadow(0 0 16px rgba(0,255,65,0.4))" }}
        />
        <h1
          className="mobile-heading-scale text-4xl sm:text-6xl font-black mb-2 text-green-400 glitch-text text-glow-green tracking-[0.45em] uppercase"
          data-text="GHOSTFRAME"
        >
          GHOSTFRAME
        </h1>
        <p className="text-sm sm:text-base text-green-300/80 mb-1 tracking-[0.34em] uppercase">
          Multi-Level Corruption Protocol
        </p>
        <p className="text-xs sm:text-sm text-gray-500 tracking-[0.24em] uppercase">15 Levels · Escalating System Failures</p>
      </div>

      <Card className="relative z-20 bg-gray-900/95 border border-green-400/30 p-5 sm:p-8 max-w-2xl mx-auto backdrop-blur-2xl shadow-2xl w-full" aria-label="Intro Screen Card">
        <div className="space-y-5 sm:space-y-6">
          <div className="space-y-3 text-center sm:text-left">
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
              The simulation is corrupt. <span className="text-green-400 font-semibold">Restore the system</span>, outsmart the AI, and escape before the terminal collapses.
            </p>
            <p className="text-gray-400 text-sm sm:text-base">
              Start with a system repair challenge, then unlock deeper corruption levels as you survive the glitch protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm text-gray-400">
            <div className="rounded-lg border border-gray-700/80 bg-white/5 p-3">
              <p className="text-green-300 font-semibold">PLAYSTYLE</p>
              <p>Logic puzzles meet stealth timing.</p>
            </div>
            <div className="rounded-lg border border-gray-700/80 bg-white/5 p-3">
              <p className="text-green-300 font-semibold">PROGRESS</p>
              <p>Auto-save as you play through 15 levels.</p>
            </div>
            <div className="rounded-lg border border-gray-700/80 bg-white/5 p-3">
              <p className="text-green-300 font-semibold">GOAL</p>
              <p>Repair corruption and escape the ghostframe.</p>
            </div>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-gray-800 space-y-3">
            {hasSavedGame && onResume && (
              <Button
                onClick={() => {
                  playSound("click")
                  onResume()
                }}
                onMouseEnter={() => playSound("hover")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-lg py-3 shadow-lg hover:shadow-blue-500/30 transition-all duration-300 mobile-touch-target touch-manipulation"
              >
                CONTINUE FROM LAST SAVE
              </Button>
            )}
            <Button
              onClick={() => {
                playSound("click")
                onEnter()
              }}
              onMouseEnter={() => playSound("hover")}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold text-base sm:text-lg py-3 shadow-xl shadow-green-500/20 transition-all duration-300 mobile-touch-target touch-manipulation"
            >
              ENTER LEVEL MATRIX
              <span className="ml-2 text-xs text-gray-900">→</span>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs text-gray-400 pt-1">
            <div className="flex items-center gap-1">
              <img src="/logo-transparent.png" alt="Skull" className="w-3 h-3 shrink-0" />
              <span>Horror Theme</span>
            </div>
            <div className="flex items-center gap-1">
              <Brain className="w-3 h-3 shrink-0" />
              <span>Logic Puzzles</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 shrink-0" />
              <span>Real-time Action</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
})
