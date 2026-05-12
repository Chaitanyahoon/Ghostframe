"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Lock, Shield } from "lucide-react"
import { getDifficultyColor } from "@/lib/game/difficulty"
import { LEVELS } from "@/lib/game/levels"
import type { GameState } from "@/lib/game/types"
import { getCorruptionIcon } from "../corruption-icons"

export const LevelSelectScreen = React.memo(function LevelSelectScreen({
  gameState,
  onSelectLevel,
  onBack,
}: {
  gameState: GameState
  onSelectLevel: (id: number) => void
  onBack: () => void
}) {
  return (
    <div className="flex flex-col min-h-screen relative z-10 p-4 mobile-safe-area">
      <div className="flex-1 flex flex-col">
        <div className="max-w-6xl mx-auto mb-4 sm:mb-8">
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="mobile-heading-scale text-4xl sm:text-5xl font-black text-green-400 glitch-text text-glow-green tracking-[0.35em] mb-2 uppercase">
              corruption levels
            </h1>
            <p className="text-xs sm:text-sm text-green-400/70 tracking-[0.3em] uppercase">
              Choose your next system repair mission
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto] items-center rounded-3xl border border-green-400/20 bg-gray-950/80 p-5 sm:p-6 shadow-2xl shadow-green-500/10">
            <div className="space-y-3 text-center sm:text-left">
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                Levels unlock sequentially as you repair deeper corruption. Higher levels mean stricter time limits, more enemies, and sharper logical traps.
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-[11px] tracking-[0.2em] uppercase text-gray-400">
                <span className="rounded-full border border-gray-800 bg-white/5 px-3 py-1">Logic</span>
                <span className="rounded-full border border-gray-800 bg-white/5 px-3 py-1">Strategy</span>
                <span className="rounded-full border border-gray-800 bg-white/5 px-3 py-1">Speed</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
              <div className="rounded-2xl border border-gray-800 bg-white/5 p-3">
                <div className="text-[10px] uppercase text-gray-500">Completed</div>
                <div className="text-lg font-semibold text-blue-300">{gameState.levelProgress.filter((p) => p === 1).length}</div>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-white/5 p-3">
                <div className="text-[10px] uppercase text-gray-500">Next</div>
                <div className="text-lg font-semibold text-green-300">L{gameState.levelProgress.filter((p) => p === 1).length + 1}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 max-w-7xl mx-auto">
            {LEVELS.map((level) => {
              const isUnlocked = level.id === 1 || gameState.levelProgress[level.id - 2] === 1
              const isCompleted = gameState.levelProgress[level.id - 1] === 1

              return (
                <Card
                  key={level.id}
                  className={`p-3 sm:p-4 transition-all duration-300 min-h-[180px] touch-manipulation ${
                    isUnlocked
                      ? "bg-gray-900/80 border-green-400/50 hover:border-green-400 cursor-pointer hover:scale-[1.02] active:scale-[0.99]"
                      : "bg-gray-900/40 border-gray-600/30 cursor-not-allowed"
                  } ${isCompleted ? "border-blue-400/50 bg-blue-900/20" : ""} `}
                  onClick={() => isUnlocked && onSelectLevel(level.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {getCorruptionIcon(level.corruptionType)}
                      <div>
                        <h3 className="text-sm font-bold text-green-400 shrink-0">L{level.id}</h3>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                          {isCompleted ? "complete" : isUnlocked ? "unlocked" : "locked"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {isCompleted && <Shield className="w-3 h-3 text-blue-400" />}
                      {!isUnlocked && <Lock className="w-3 h-3 text-gray-500" />}
                    </div>
                  </div>

                  <h4 className="text-white font-semibold mb-2 text-sm sm:text-base leading-tight line-clamp-2">
                    {level.name}
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 line-clamp-3 leading-tight">
                    {level.description}
                  </p>

                  <div className="space-y-1 text-[12px] sm:text-xs">
                    <div className="flex justify-between gap-2">
                      <span className="text-gray-500 shrink-0">Difficulty</span>
                      <span className={`${getDifficultyColor(level.difficulty)} truncate text-right`}>
                        {level.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time</span>
                      <span className="text-yellow-400">{level.timeLimit}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Threats</span>
                      <span className="text-red-400">{level.enemyCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Best</span>
                      <span className="text-cyan-400">
                        {gameState.levelBestTimes[level.id - 1] > 0 ? `${gameState.levelBestTimes[level.id - 1]}s` : "—"}
                      </span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="mt-4 sm:mt-8 text-center mobile-landscape-compact">
          <div className="mb-3 sm:mb-4">
            <span className="text-gray-400 text-sm">Progress: </span>
            <span className="text-green-400 font-bold">
              {gameState.levelProgress.filter((p) => p === 1).length}/{LEVELS.length} Levels Completed
            </span>
          </div>
          <Button
            onClick={onBack}
            variant="outline"
            className="border-gray-600 text-gray-400 hover:bg-gray-800 mobile-touch-target touch-manipulation"
          >
            RETURN TO MAIN MENU
          </Button>
        </div>
      </div>
    </div>
  )
})
