"use client"

import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { gameReducer } from "@/lib/game/game-reducer"
import { LEVELS } from "@/lib/game/levels"
import { persistLevelProgressData, loadSavedGameState, saveGameState, hasSavedGame, clearSavedGame } from "@/lib/game/engine"
import {
  createEnemyPositions,
  createInitialGameState,
  DEFAULT_TERMINAL,
  getHintForPuzzle,
  initializeGameLevel,
  moveEnemies,
  processPuzzleAction,
  updateStealthEnergy,
} from "@/lib/game/engine"
import type { GameState, PuzzleData, PuzzleType, SynthSound } from "@/lib/game/types"

const initialGameState = createInitialGameState()

function initState(): GameState {
  const savedState = loadSavedGameState()
  return savedState || { ...initialGameState }
}

export function useGhostFrameGame() {
  const [gameState, dispatch] = useReducer(gameReducer, undefined, initState)
  const [glitchIntensity, setGlitchIntensity] = useState(0.3)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalOutput, setTerminalOutput] = useState<string[]>(DEFAULT_TERMINAL)
  const [currentPuzzleData, setCurrentPuzzleData] = useState<PuzzleData | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const currentLevelConfig = LEVELS[gameState.currentLevel - 1]

  const playSynthSound = useCallback((type: SynthSound) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }

    const ctx = audioContextRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime

    switch (type) {
      case "hover":
        osc.type = "sine"
        osc.frequency.setValueAtTime(440, now)
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05)
        gain.gain.setValueAtTime(0.05, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
        osc.start(now)
        osc.stop(now + 0.05)
        break

      case "click":
        osc.type = "square"
        osc.frequency.setValueAtTime(880, now)
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.1)
        gain.gain.setValueAtTime(0.1, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
        osc.start(now)
        osc.stop(now + 0.1)
        break

      case "success":
        osc.type = "triangle"
        osc.frequency.setValueAtTime(440, now)
        osc.frequency.setValueAtTime(554, now + 0.1)
        osc.frequency.setValueAtTime(659, now + 0.2)
        gain.gain.setValueAtTime(0.1, now)
        gain.gain.linearRampToValueAtTime(0.1, now + 0.3)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)
        osc.start(now)
        osc.stop(now + 0.6)
        break

      case "error":
        osc.type = "sawtooth"
        osc.frequency.setValueAtTime(110, now)
        osc.frequency.linearRampToValueAtTime(55, now + 0.3)
        gain.gain.setValueAtTime(0.2, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
        osc.start(now)
        osc.stop(now + 0.3)
        break

      case "glitch":
        osc.type = "sawtooth"
        osc.frequency.setValueAtTime(Math.random() * 1000 + 100, now)
        osc.frequency.linearRampToValueAtTime(Math.random() * 1000 + 100, now + 0.1)
        gain.gain.setValueAtTime(0.1, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
        osc.start(now)
        osc.stop(now + 0.1)
        break

      case "gamestart":
        osc.type = "sine"
        osc.frequency.setValueAtTime(220, now)
        osc.frequency.exponentialRampToValueAtTime(880, now + 1)
        gain.gain.setValueAtTime(0.3, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5)
        osc.start(now)
        osc.stop(now + 1.5)
        break

      case "ambient-drone":
        osc.type = "sine"
        osc.frequency.setValueAtTime(55, now)
        osc.frequency.linearRampToValueAtTime(65, now + 5)
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(0.05, now + 2)
        gain.gain.linearRampToValueAtTime(0, now + 5)
        osc.start(now)
        osc.stop(now + 5)
        break
    }
  }, [])

  const takeDamage = useCallback(
    (amount: number) => {
      playSynthSound("glitch")
      dispatch({
        type: "MERGE_FN",
        fn: (prev) => {
          const newHealth = Math.max(0, prev.health - amount)
          if (newHealth <= 0) {
            return { ...prev, health: 0, currentScreen: "gameOver" }
          }
          return { ...prev, health: newHealth }
        },
      })
      setGlitchIntensity((prev) => Math.min(1, prev + 0.2))
    },
    [playSynthSound],
  )

  const completeLevel = useCallback(() => {
    playSynthSound("success")
    dispatch({
      type: "MERGE_FN",
      fn: (prev) => {
        const newProgress = [...prev.levelProgress]
        newProgress[prev.currentLevel - 1] = 1
        const newBestTimes = [...prev.levelBestTimes]
        const currentTime = Math.max(0, prev.timeRemaining)
        newBestTimes[prev.currentLevel - 1] = Math.max(newBestTimes[prev.currentLevel - 1], currentTime)
        persistLevelProgressData({ progress: newProgress, bestTimes: newBestTimes })
        return {
          ...prev,
          isLevelComplete: true,
          levelProgress: newProgress,
          levelBestTimes: newBestTimes,
          solvedPuzzles: prev.solvedPuzzles + 1,
        }
      },
    })

    setTimeout(() => {
      dispatch({
        type: "MERGE_FN",
        fn: (prev) => ({
          ...prev,
          currentScreen: prev.currentLevel >= 15 ? "escape" : "levelSelect",
        }),
      })
    }, 2000)
  }, [playSynthSound])

  const showHintSystem = useCallback(() => {
    if (!currentLevelConfig) return
    const hint = getHintForPuzzle(currentLevelConfig.puzzleType, gameState.hintLevel, currentPuzzleData)
    dispatch({
      type: "MERGE_FN",
      fn: (prev) => ({
        ...prev,
        showHint: true,
        currentHint: hint,
        hintsUsed: prev.hintsUsed + 1,
        hintLevel: Math.min(prev.hintLevel + 1, 2),
      }),
    })
  }, [currentLevelConfig, currentPuzzleData, gameState.hintLevel])

  const extendTimer = useCallback(() => {
    dispatch({
      type: "MERGE_FN",
      fn: (prev) => {
        const extension = prev.timerExtensions === 0 ? 60 : 30
        return {
          ...prev,
          timeRemaining: prev.timeRemaining + extension,
          timerExtensions: prev.timerExtensions + 1,
        }
      },
    })
  }, [])

  const dismissHint = useCallback(() => {
    dispatch({ type: "MERGE", patch: { showHint: false } })
  }, [])

  const initializeLevel = useCallback((levelId: number) => {
    const config = LEVELS[levelId - 1]
    const { gameStatePatch, puzzle, terminalOutput } = initializeGameLevel(levelId)
    dispatch({ type: "MERGE", patch: gameStatePatch })
    setCurrentPuzzleData(puzzle)
    setTerminalOutput(terminalOutput)
    setGlitchIntensity(0.2 + (levelId - 1) * 0.04)
    setTerminalInput("")
  }, [])

  useEffect(() => {
    if (gameState.currentScreen === "game" && !gameState.isLevelComplete) {
      timerRef.current = setInterval(() => {
        dispatch({
          type: "MERGE_FN",
          fn: (prev) => {
            if (prev.currentScreen !== "game" || prev.isLevelComplete) return prev
            const newTime = prev.timeRemaining - 1
            if (newTime <= 0) {
              return { ...prev, currentScreen: "gameOver", timeRemaining: 0 }
            }
            return { ...prev, timeRemaining: newTime }
          },
        })
      }, 1000)

      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
  }, [gameState.currentScreen, gameState.isLevelComplete])

  useEffect(() => {
    if (gameState.currentScreen === "game" && currentLevelConfig) {
      const enemies = createEnemyPositions(currentLevelConfig)

      dispatch({ type: "MERGE", patch: { enemyPositions: enemies } })

      const moveInterval = setInterval(
        () => {
          dispatch({
            type: "MERGE_FN",
            fn: (prev) => ({
              ...prev,
              enemyPositions: moveEnemies(prev.enemyPositions, prev.playerHidden, currentLevelConfig),
            }),
          })
        },
        Math.max(400, 2000 - currentLevelConfig.id * 100),
      )

      return () => clearInterval(moveInterval)
    }
  }, [gameState.currentScreen, currentLevelConfig])

  useEffect(() => {
    if (gameState.currentScreen === "game") {
      const stealthInterval = setInterval(() => {
        dispatch({
          type: "MERGE_FN",
          fn: (prev) => ({
            ...prev,
            stealthEnergy: updateStealthEnergy(prev.stealthEnergy, prev.playerHidden),
          }),
        })
      }, 100)

      return () => clearInterval(stealthInterval)
    }
  }, [gameState.currentScreen])

  useEffect(() => {
    if (gameState.currentScreen === "game" && currentLevelConfig) {
      const corruptionInterval = setInterval(() => {
        setGlitchIntensity((prev) => Math.min(1, prev + currentLevelConfig.corruptionRate * 0.05))
      }, 1000)

      const ambientInterval = setInterval(() => {
        playSynthSound("ambient-drone")
      }, 8000)

      return () => {
        clearInterval(corruptionInterval)
        clearInterval(ambientInterval)
      }
    }
  }, [gameState.currentScreen, currentLevelConfig, playSynthSound])

  // Auto-save game state
  useEffect(() => {
    if (gameState.currentScreen === "game" || gameState.currentScreen === "levelSelect") {
      saveGameState(gameState)
    } else if (gameState.currentScreen === "intro" || gameState.currentScreen === "gameOver" || gameState.currentScreen === "escape") {
      clearSavedGame()
    }
  }, [gameState])

  const resumeGame = useCallback(() => {
    const savedState = loadSavedGameState()
    if (savedState) {
      dispatch({ type: "REPLACE", state: savedState })
      // Reinitialize puzzle data if resuming to a game screen
      if (savedState.currentScreen === "game") {
        const config = LEVELS[savedState.currentLevel - 1]
        const { puzzle, terminalOutput } = initializeGameLevel(savedState.currentLevel)
        setCurrentPuzzleData(puzzle)
        setTerminalOutput(terminalOutput)
        setGlitchIntensity(0.2 + (savedState.currentLevel - 1) * 0.04)
        setTerminalInput("")
      }
    }
  }, [])

  const handlePuzzleAction = useCallback(
    (action: string, data?: unknown) => {
      if (!currentLevelConfig || !currentPuzzleData) return
      const outcome = processPuzzleAction(currentLevelConfig, currentPuzzleData, action, data)
      setCurrentPuzzleData(outcome.puzzleData)
      if (outcome.terminalOutput) {
        setTerminalOutput((prev) => [...prev, ...(outcome.terminalOutput ?? [])])
      }
      if (outcome.damage) {
        takeDamage(outcome.damage)
      }
      const failureCount = outcome.failureCount
      if (typeof failureCount === "number") {
        dispatch({
          type: "MERGE_FN",
          fn: (prev) => ({ ...prev, failureCount: prev.failureCount + failureCount }),
        })
      }
      if (outcome.playSound) {
        playSynthSound(outcome.playSound)
      }
      if (outcome.levelComplete) {
        completeLevel()
      }
    },
    [currentLevelConfig, currentPuzzleData, completeLevel, playSynthSound, takeDamage],
  )

  const handleTerminalSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!terminalInput.trim()) return

      const command = terminalInput.trim().toLowerCase()
      setTerminalOutput((prev) => [...prev, `> ${command}`])

      if (command === "help") {
        setTerminalOutput((prev) => [...prev, "Available commands: scan, isolate, purge, restore"])
      } else if (command === "clear") {
        setTerminalOutput([])
      } else {
        handlePuzzleAction("command", command)
      }

      setTerminalInput("")
    },
    [terminalInput, handlePuzzleAction],
  )

  return {
    gameState,
    dispatch,
    glitchIntensity,
    setGlitchIntensity,
    terminalInput,
    setTerminalInput,
    terminalOutput,
    setTerminalOutput,
    currentPuzzleData,
    setCurrentPuzzleData,
    currentLevelConfig,
    audioRef,
    playSynthSound,
    initializeLevel,
    handlePuzzleAction,
    handleTerminalSubmit,
    showHintSystem,
    extendTimer,
    dismissHint,
    takeDamage,
    completeLevel,
    resumeGame,
    hasSavedGame: hasSavedGame(),
  }
}
