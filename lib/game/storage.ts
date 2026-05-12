import { LEVEL_COUNT } from "./levels"
import type { GameState } from "./types"

const STORAGE_KEY = "ghostframe-level-progress"
const GAME_STATE_KEY = "ghostframe-game-state"

export interface LevelStorageData {
  progress: number[]
  bestTimes: number[]
}

const createEmptyProgress = (): number[] => Array(LEVEL_COUNT).fill(0)
const createEmptyBestTimes = (): number[] => Array(LEVEL_COUNT).fill(0)

export function loadLevelProgressData(): LevelStorageData {
  if (typeof window === "undefined") {
    return {
      progress: createEmptyProgress(),
      bestTimes: createEmptyBestTimes(),
    }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {
        progress: createEmptyProgress(),
        bestTimes: createEmptyBestTimes(),
      }
    }

    const parsed = JSON.parse(raw) as unknown
    if (Array.isArray(parsed) && parsed.length === LEVEL_COUNT) {
      return {
        progress: parsed.map((n) => (n === 1 ? 1 : 0)),
        bestTimes: createEmptyBestTimes(),
      }
    }

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      Array.isArray((parsed as any).progress) &&
      Array.isArray((parsed as any).bestTimes)
    ) {
      const progress = ((parsed as any).progress as unknown[]).map((n) => (n === 1 ? 1 : 0))
      const bestTimes = ((parsed as any).bestTimes as unknown[]).map((n) => (typeof n === "number" && n >= 0 ? n : 0))
      return {
        progress: progress.length === LEVEL_COUNT ? progress : createEmptyProgress(),
        bestTimes: bestTimes.length === LEVEL_COUNT ? bestTimes : createEmptyBestTimes(),
      }
    }

    return {
      progress: createEmptyProgress(),
      bestTimes: createEmptyBestTimes(),
    }
  } catch {
    return {
      progress: createEmptyProgress(),
      bestTimes: createEmptyBestTimes(),
    }
  }
}

export function persistLevelProgressData(data: LevelStorageData) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* ignore quota / private mode */
  }
}

export function saveGameState(state: GameState) {
  if (typeof window === "undefined") return
  try {
    // Only save state if we're in a meaningful game session
    if (state.currentScreen === "intro" || state.currentScreen === "levelSelect") {
      localStorage.removeItem(GAME_STATE_KEY)
      return
    }

    const gameStateToSave = {
      ...state,
      // Don't save volatile UI state
      showHint: false,
      currentHint: "",
      enemyPositions: [], // Will be regenerated
    }
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameStateToSave))
  } catch {
    /* ignore quota / private mode */
  }
}

export function loadGameState(): Partial<GameState> | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(GAME_STATE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as unknown
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as Partial<GameState>
    }
    return null
  } catch {
    return null
  }
}

export function hasSavedGame(): boolean {
  if (typeof window === "undefined") return false
  try {
    return localStorage.getItem(GAME_STATE_KEY) !== null
  } catch {
    return false
  }
}

export function clearSavedGame() {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(GAME_STATE_KEY)
  } catch {
    /* ignore */
  }
}

// Test helper functions (only available in test environment)
if (typeof window !== "undefined" && window.location?.hostname === "localhost") {
  // @ts-ignore - test helpers
  window.testHelpers = {
    clearAllStorage: () => {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(GAME_STATE_KEY)
    },
    getStorageData: () => ({
      levelProgress: localStorage.getItem(STORAGE_KEY),
      gameState: localStorage.getItem(GAME_STATE_KEY),
    }),
  }
}
