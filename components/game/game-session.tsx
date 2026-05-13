"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, HelpCircle, Lightbulb, Timer } from "lucide-react"
import { getDifficultyColor } from "@/lib/game/difficulty"
import type { GameState, LevelConfig, PuzzleData, SynthSound } from "@/lib/game/types"
import { getCorruptionIcon } from "./corruption-icons"
import { PuzzleView } from "./puzzles/puzzle-view"

export const GameSession = React.memo(function GameSession({
  gameState,
  currentLevelConfig,
  currentPuzzleData,
  onPuzzleAction,
  onAbort,
  onToggleStealth,
  showHintSystem,
  extendTimer,
  dismissHint,
  playSound,
  terminalInput,
  setTerminalInput,
  terminalOutput,
  onTerminalSubmit,
}: {
  gameState: GameState
  currentLevelConfig: LevelConfig
  currentPuzzleData: PuzzleData
  onPuzzleAction: (action: string, data?: unknown) => void
  onAbort: () => void
  onToggleStealth: () => void
  showHintSystem: () => void
  extendTimer: () => void
  dismissHint: () => void
  playSound: (t: SynthSound) => void
  terminalInput: string
  setTerminalInput: (v: string) => void
  terminalOutput: string[]
  onTerminalSubmit: (e: React.FormEvent) => void
}) {
  return (
    <div className="p-3 sm:p-4 min-h-screen mobile-safe-area">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4 bg-gray-900/50 p-2 sm:p-3 rounded border border-green-400/30">
        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            {getCorruptionIcon(currentLevelConfig.corruptionType)}
            <span>LEVEL {gameState.currentLevel}</span>
          </div>
          <span>HEALTH: {gameState.health}%</span>
          <span className={gameState.stealthEnergy < 20 ? "text-red-400 animate-pulse" : "text-blue-400"}>
            ENERGY: {Math.floor(gameState.stealthEnergy)}%
          </span>
          <span className={gameState.timerExtensions > 0 ? "text-yellow-400" : ""}>
            TIME: {Math.floor(gameState.timeRemaining / 60)}:
            {(gameState.timeRemaining % 60).toString().padStart(2, "0")}
            {gameState.timerExtensions > 0 && <Timer className="w-3 h-3 inline ml-1" />}
          </span>
          <span className={getDifficultyColor(currentLevelConfig.difficulty)}>{currentLevelConfig.difficulty}</span>
          {gameState.failureCount > 0 && (
            <span className="text-red-400 text-xs">Failures: {gameState.failureCount}</span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          {gameState.failureCount >= 3 && (
            <Button
              onClick={showHintSystem}
              variant="outline"
              size="sm"
              aria-label="Get Hint"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-900/20 animate-pulse mobile-touch-target touch-manipulation"
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              HINT
            </Button>
          )}

          {gameState.failureCount >= 2 && gameState.timeRemaining < 30 && gameState.timerExtensions < 3 && (
            <Button
              onClick={extendTimer}
              variant="outline"
              size="sm"
              className="border-blue-400 text-blue-400 hover:bg-blue-900/20 animate-pulse mobile-touch-target touch-manipulation"
            >
              <Clock className="w-3 h-3 mr-1" />
              +TIME
            </Button>
          )}

          <Button
            onClick={() => {
              playSound("click")
              onToggleStealth()
            }}
            onMouseEnter={() => playSound("hover")}
            disabled={gameState.stealthEnergy <= 0 && !gameState.playerHidden}
            variant="outline"
            size="sm"
            className={`${
              gameState.playerHidden
                ? "bg-blue-600 animate-pulse border-blue-400"
                : gameState.stealthEnergy <= 0
                  ? "bg-gray-900 text-gray-600 border-gray-800 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-500"
            } transition-all duration-300 min-w-[80px] sm:min-w-[100px] mobile-touch-target touch-manipulation`}
          >
            {gameState.playerHidden ? "HIDDEN" : "STEALTH"}
          </Button>
          <Button
            onClick={onAbort}
            variant="outline"
            size="sm"
            className="border-red-400 text-red-400 hover:bg-red-900/20 mobile-touch-target touch-manipulation"
          >
            ABORT
          </Button>
        </div>
      </div>

      {gameState.showHint && (
        <Card className="mb-3 sm:mb-4 bg-yellow-900/20 border-yellow-400/50 p-3 sm:p-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-400 font-bold mb-2">SYSTEM HINT ACTIVATED</h4>
              <p className="text-yellow-200 text-sm">{gameState.currentHint}</p>
              <Button onClick={dismissHint} size="sm" className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-black mobile-touch-target touch-manipulation">
                DISMISS
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-900/80 border-green-400/50 p-3 sm:p-6 mb-4 sm:mb-6">
          <h3 className="mobile-heading-scale font-bold mb-2 text-green-400">{currentLevelConfig.name}</h3>
          <p className="text-gray-400 mb-3 sm:mb-4 mobile-text-scale">{currentLevelConfig.description}</p>

          <PuzzleView
            config={currentLevelConfig}
            puzzle={currentPuzzleData}
            onAction={onPuzzleAction}
            terminalInput={terminalInput}
            setTerminalInput={setTerminalInput}
            terminalOutput={terminalOutput}
            onTerminalSubmit={onTerminalSubmit}
          />
        </Card>

        {gameState.isLevelComplete && (
          <Card className="bg-green-900/80 border-green-400 p-4 sm:p-6 text-center">
            <h3 className="mobile-heading-scale font-bold text-green-400 mb-2">CORRUPTION NEUTRALIZED</h3>
            <p className="text-gray-300 mobile-text-scale">System restored. Advancing to next corruption level...</p>
            {gameState.hintsUsed > 0 && (
              <p className="text-yellow-400 text-sm mt-2">Hints used: {gameState.hintsUsed}</p>
            )}
            {gameState.timerExtensions > 0 && (
              <p className="text-blue-400 text-sm">Timer extensions: {gameState.timerExtensions}</p>
            )}
          </Card>
        )}
      </div>
    </div>
  )
})
