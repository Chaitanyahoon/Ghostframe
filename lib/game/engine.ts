import { LEVELS } from "./levels"
import { HINTS } from "./hints"
import { buildInitialPuzzle } from "./init-puzzle"
import { evaluateLogicGate } from "./logic-gate"
import { loadLevelProgressData, persistLevelProgressData, saveGameState, loadGameState, hasSavedGame, clearSavedGame } from "./storage"
import type {
  EnemyPosition,
  GameState,
  LevelConfig,
  PuzzleData,
  PuzzleType,
  SynthSound,
} from "./types"

export { persistLevelProgressData, saveGameState, loadGameState, hasSavedGame, clearSavedGame }

export const DEFAULT_TERMINAL = [
  "GHOSTFRAME OS v1.0.4",
  "Initializing secure connection...",
  "Connection established.",
  "Awaiting command input...",
]

export function createInitialGameState(): GameState {
  const stored = loadLevelProgressData()

  return {
    currentScreen: "intro",
    currentLevel: 1,
    health: 100,
    fragments: [],
    solvedPuzzles: 0,
    glitchLevel: 1,
    enemyPositions: [],
    playerHidden: false,
    levelProgress: stored.progress,
    levelBestTimes: stored.bestTimes,
    timeRemaining: 120,
    isLevelComplete: false,
    failureCount: 0,
    hintsUsed: 0,
    timerExtensions: 0,
    showHint: false,
    currentHint: "",
    hintLevel: 0,
    stealthEnergy: 100,
  }
}

export function loadSavedGameState(): GameState | null {
  const savedState = loadGameState()
  if (!savedState) return null

  // Merge saved state with fresh level data
  const stored = loadLevelProgressData()
  return {
    ...createInitialGameState(),
    ...savedState,
    levelProgress: stored.progress,
    levelBestTimes: stored.bestTimes,
  }
}

export function initializeGameLevel(levelId: number) {
  const config = LEVELS[levelId - 1]
  const puzzlePayload = buildInitialPuzzle(config.puzzleType, levelId)
  const puzzle = puzzlePayload.puzzle
  return {
    gameStatePatch: {
      currentLevel: levelId,
      currentScreen: "game",
      timeRemaining: config.timeLimit,
      health: 100,
      isLevelComplete: false,
      enemyPositions: [],
      failureCount: 0,
      hintsUsed: 0,
      timerExtensions: 0,
      showHint: false,
      currentHint: "",
      hintLevel: 0,
      stealthEnergy: 100,
    } as Partial<GameState>,
    puzzle,
    terminalOutput: puzzlePayload.terminalLines ?? DEFAULT_TERMINAL,
  }
}

export function createEnemyPositions(config: LevelConfig): EnemyPosition[] {
  const enemyTypes = ["scanner", "hunter", "corruptor", "virus", "phantom"] as const
  return Array.from({ length: config.enemyCount }, (_, i) => ({
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    id: `enemy-${i}`,
    type: enemyTypes[
      Math.floor(Math.random() * Math.min(enemyTypes.length, Math.floor(config.id / 3) + 2))
    ],
  }))
}

export function moveEnemies(enemyPositions: EnemyPosition[], playerHidden: boolean, config: LevelConfig) {
  return enemyPositions.map((enemy) => {
    const speed = playerHidden ? 20 : 25
    return {
      ...enemy,
      x: Math.max(5, Math.min(95, enemy.x + (Math.random() - 0.5) * speed)),
      y: Math.max(5, Math.min(95, enemy.y + (Math.random() - 0.5) * speed)),
    }
  })
}

export function updateStealthEnergy(stealthEnergy: number, playerHidden: boolean) {
  if (playerHidden) {
    return Math.max(0, stealthEnergy - 2)
  }
  return Math.min(100, stealthEnergy + 1)
}

export interface PuzzleActionResult {
  puzzleData: PuzzleData | null
  levelComplete?: boolean
  damage?: number
  failureCount?: number
  playSound?: SynthSound
  terminalOutput?: string[]
}

export function getHintForPuzzle(puzzleType: PuzzleType, level: number, puzzle: PuzzleData | null) {
  if (puzzleType === "codeFragment") {
    const gamePuzzle = puzzle as PuzzleData & { currentOrder?: number[]; fragments?: string[] }
    const { currentOrder, fragments } = gamePuzzle
    if (!currentOrder || !fragments) return "💡 Arrange the code lines to form a valid function."

    const firstLine = fragments[currentOrder[0]]
    const lastLine = fragments[currentOrder[currentOrder.length - 1]]

    if (!firstLine.includes("function escape()")) {
      return "💡 The function must start with the definition: 'function escape() {'"
    }
    if (lastLine.trim() !== "}") {
      return "💡 The function must end with a closing brace '}'"
    }

    const ifIndex = currentOrder.findIndex((idx) => fragments[idx].includes("if (corruption"))
    const returnTrueIndex = currentOrder.findIndex((idx) => fragments[idx].includes("return true"))

    if (ifIndex !== -1 && returnTrueIndex !== -1 && returnTrueIndex !== ifIndex + 1) {
      return "💡 The 'return true' statement should be immediately inside the 'if' block."
    }
    return "💡 Ensure the logic flows correctly: check condition -> return true -> otherwise return false."
  }

  if (puzzleType === "logicGate") {
    const gamePuzzle = puzzle as PuzzleData & { gates?: Array<{ type: string; output: boolean | null; id: number }> }
    const unsolvedGate = gamePuzzle.gates?.find((g) => g.output === null)
    if (unsolvedGate) {
      const { type, id } = unsolvedGate
      if (type === "AND") return `💡 Gate ${id} (AND): Returns TRUE only if BOTH inputs are TRUE.`
      if (type === "OR") return `💡 Gate ${id} (OR): Returns TRUE if AT LEAST ONE input is TRUE.`
      if (type === "NOT") return `💡 Gate ${id} (NOT): Inverts the input (TRUE becomes FALSE).`
      if (type === "XOR") return `💡 Gate ${id} (XOR): Returns TRUE if inputs are DIFFERENT.`
    }
    return "💡 Check your logic tables. AND needs both, OR needs one, XOR needs different inputs."
  }

  if (puzzleType === "memorySequence") {
    return "💡 Focus on the pattern. The sequence adds one new color each round. 0=Red, 1=Blue, 2=Green, 3=Yellow."
  }

  const hints = HINTS[puzzleType] ?? ["💡 Analyze the problem carefully and try different approaches"]
  return hints[Math.min(level, hints.length - 1)]
}

export function processPuzzleAction(
  config: LevelConfig,
  currentPuzzle: PuzzleData | null,
  action: string,
  data?: unknown,
): PuzzleActionResult {
  if (!currentPuzzle) {
    return { puzzleData: null, levelComplete: false }
  }

  switch (currentPuzzle.puzzleType) {
    case "codeFragment": {
      if (action === "reorder") {
        return { puzzleData: { ...currentPuzzle, currentOrder: data as number[] } }
      }
      if (action === "check") {
        const currentContent = (currentPuzzle.currentOrder ?? []).map((index) => currentPuzzle.fragments[index])
        const correctContent = (currentPuzzle.correctOrder ?? []).map((index) => currentPuzzle.fragments[index])
        const isCorrect = JSON.stringify(currentContent) === JSON.stringify(correctContent)
        if (isCorrect) {
          return { puzzleData: currentPuzzle, levelComplete: true, playSound: "success" }
        }
        return { puzzleData: currentPuzzle, damage: 10, failureCount: 1, playSound: "error" }
      }
      break
    }

    case "algorithmReconstruction": {
      if (action === "reorder") {
        return { puzzleData: { ...currentPuzzle, currentOrder: data as number[] } }
      }
      if (action === "check") {
        const isCorrect = JSON.stringify(currentPuzzle.currentOrder) === JSON.stringify(currentPuzzle.correctOrder)
        if (isCorrect) {
          return { puzzleData: currentPuzzle, levelComplete: true, playSound: "success" }
        }
        return { puzzleData: currentPuzzle, damage: 15, failureCount: 1, playSound: "error" }
      }
      break
    }

    case "stackOverflow": {
      if (action !== "execute") break
      const operation = currentPuzzle.operations[currentPuzzle.currentOperation]
      const newStack = [...currentPuzzle.stack]
      if (operation.startsWith("push")) {
        const match = operation.match(/\d+/)
        if (match) newStack.push(Number.parseInt(match[0], 10))
      } else if (operation === "pop()") {
        newStack.pop()
      }
      const nextOperation = currentPuzzle.currentOperation + 1
      const result = {
        puzzleData: { ...currentPuzzle, stack: newStack, currentOperation: nextOperation },
      }
      if (nextOperation >= currentPuzzle.operations.length) {
        const isCorrect = JSON.stringify(newStack) === JSON.stringify(currentPuzzle.correctResult)
        if (isCorrect) {
          return { ...result, levelComplete: true, playSound: "success" }
        }
        return { ...result, damage: 20, failureCount: 1, playSound: "error" }
      }
      return result
    }

    case "linkedListCorruption": {
      if (action !== "connect" || typeof data !== "object" || data === null) break
      const { from, to } = data as { from: number; to: number }
      const newConnections = [...currentPuzzle.playerConnections, { from, to }]
      const result = { puzzleData: { ...currentPuzzle, playerConnections: newConnections } }
      if (newConnections.length === currentPuzzle.correctConnections.length) {
        const sortConn = (a: { from: number; to: number }, b: { from: number; to: number }) => a.from - b.from || a.to - b.to
        const ok =
          JSON.stringify([...newConnections].sort(sortConn)) ===
          JSON.stringify([...currentPuzzle.correctConnections].sort(sortConn))
        if (ok) {
          return { ...result, levelComplete: true, playSound: "success" }
        }
        return { ...result, puzzleData: { ...result.puzzleData, playerConnections: [] }, damage: 25, failureCount: 1, playSound: "error" }
      }
      return result
    }

    case "recursionLoop": {
      if (action === "step") {
        const steps = currentPuzzle.recursionSteps
        const stepIdx = currentPuzzle.currentStep
        const isCorrect = data === steps[stepIdx]
        if (isCorrect) {
          const nextStep = stepIdx + 1
          const nextPuzzle = {
            ...currentPuzzle,
            currentStep: nextStep,
            playerSteps: [...currentPuzzle.playerSteps, String(data)],
          }
          if (nextStep >= steps.length) {
            return { puzzleData: nextPuzzle, levelComplete: true, playSound: "success" }
          }
          return { puzzleData: nextPuzzle }
        }
        return { puzzleData: currentPuzzle, damage: 30, failureCount: 1, playSound: "error" }
      }
      break
    }

    case "hashTable": {
      if (action === "resolve" && typeof data === "object" && data !== null) {
        const { key, position } = data as { key: string; position: number }
        const collision = currentPuzzle.collisions.find((c) => c.key === key)
        if (collision && position >= 0 && position < currentPuzzle.hashTable.length) {
          const nextResolved = currentPuzzle.resolved + 1
          const nextTable = [...currentPuzzle.hashTable]
          nextTable[position] = key
          if (nextResolved >= currentPuzzle.required) {
            return {
              puzzleData: { ...currentPuzzle, resolved: nextResolved, hashTable: nextTable },
              levelComplete: true,
              playSound: "success",
            }
          }
          return { puzzleData: { ...currentPuzzle, resolved: nextResolved, hashTable: nextTable } }
        }
        return { puzzleData: currentPuzzle, damage: 20, failureCount: 1, playSound: "error" }
      }
      break
    }

    case "dynamicProgramming": {
      if (action === "step") {
        const steps = currentPuzzle.correctSteps
        const stepIdx = currentPuzzle.currentStep
        const isCorrect = data === steps[stepIdx]
        if (isCorrect) {
          const nextStep = stepIdx + 1
          const nextPuzzle = {
            ...currentPuzzle,
            currentStep: nextStep,
            steps: [...currentPuzzle.steps, String(data)],
          }
          if (nextStep >= steps.length) {
            return { puzzleData: nextPuzzle, levelComplete: true, playSound: "success" }
          }
          return { puzzleData: nextPuzzle }
        }
        return { puzzleData: currentPuzzle, damage: 25, failureCount: 1, playSound: "error" }
      }
      break
    }

    case "multiAlgorithm": {
      if (action === "solve") {
        const nextTotal = currentPuzzle.totalSolved + 1
        const nextPuzzle = {
          ...currentPuzzle,
          totalSolved: nextTotal,
          challenges: currentPuzzle.challenges.map((challenge, idx) =>
            idx === currentPuzzle.currentChallenge ? { ...challenge, solved: true } : challenge,
          ),
          currentChallenge: currentPuzzle.currentChallenge + 1,
        }
        if (nextTotal >= currentPuzzle.challenges.length) {
          return { puzzleData: nextPuzzle, levelComplete: true, playSound: "success" }
        }
        return { puzzleData: nextPuzzle }
      }
      break
    }

    case "terminalHacking": {
      if (action === "command") {
        const command = String(data).toLowerCase().trim()
        const required = currentPuzzle.requiredCommands
        const currentStep = currentPuzzle.currentStep
        if (command === required[currentStep]) {
          const nextStep = currentStep + 1
          const output = [`[SUCCESS] Command '${command}' executed successfully.`]
          const puzzleUpdate = {
            ...currentPuzzle,
            commandsExecuted: [...currentPuzzle.commandsExecuted, command],
            currentStep: nextStep,
          }
          if (nextStep >= required.length) {
            return {
              puzzleData: puzzleUpdate,
              levelComplete: true,
              playSound: "success",
              terminalOutput: [...output, "[SYSTEM] ROOT ACCESS GRANTED. SYSTEM RESTORED."],
            }
          }
          return { puzzleData: puzzleUpdate, playSound: "success", terminalOutput: output }
        }
        return {
          puzzleData: currentPuzzle,
          damage: 10,
          failureCount: 1,
          playSound: "error",
          terminalOutput: [`[ERROR] Invalid command sequence. Expected '${required[currentStep]}'.`],
        }
      }
      break
    }

    case "logicGate": {
      if (action === "solve" && typeof data === "object" && data !== null) {
        const { id, output } = data as { id: number; output: boolean }
        const gate = currentPuzzle.gates.find((g) => g.id === id)
        if (!gate || gate.output !== null) break
        const expected = evaluateLogicGate(gate.type, gate.inputs)
        if (output === expected) {
          const newGates = currentPuzzle.gates.map((g) => (g.id === id ? { ...g, output } : g))
          const solvedCount = newGates.filter((g) => g.output !== null).length
          const nextPuzzle = { ...currentPuzzle, gates: newGates, solved: solvedCount }
          if (solvedCount >= currentPuzzle.required) {
            return { puzzleData: nextPuzzle, levelComplete: true, playSound: "success" }
          }
          return { puzzleData: nextPuzzle }
        }
        return { puzzleData: currentPuzzle, damage: 10, failureCount: 1, playSound: "error" }
      }
      break
    }

    case "memorySequence": {
      if (action === "input" && typeof data === "number") {
        const expected = currentPuzzle.sequence[currentPuzzle.playerSequence.length]
        const nextSequence = [...currentPuzzle.playerSequence, data]
        if (data !== expected) {
          return { puzzleData: { ...currentPuzzle, playerSequence: [] }, damage: 8, failureCount: 1, playSound: "error" }
        }
        if (nextSequence.length >= currentPuzzle.sequence.length) {
          return { puzzleData: { ...currentPuzzle, playerSequence: nextSequence }, levelComplete: true, playSound: "success" }
        }
        return { puzzleData: { ...currentPuzzle, playerSequence: nextSequence } }
      }
      break
    }

    case "binaryTree": {
      if (action === "traverse" && typeof data === "number") {
        const nextSequence = [...currentPuzzle.playerSequence, data]
        const expectedSequence = currentPuzzle.correctSequence
        const nextIndex = nextSequence.length - 1
        if (nextSequence[nextIndex] !== expectedSequence[nextIndex]) {
          return { puzzleData: { ...currentPuzzle, playerSequence: [] }, damage: 10, failureCount: 1, playSound: "error" }
        }
        if (nextSequence.length >= expectedSequence.length) {
          return { puzzleData: { ...currentPuzzle, playerSequence: nextSequence }, levelComplete: true, playSound: "success" }
        }
        return { puzzleData: { ...currentPuzzle, playerSequence: nextSequence } }
      }
      break
    }

    case "graphTraversal": {
      if (action === "move" && typeof data === "string") {
        const currentNode = currentPuzzle.currentNode
        if (!currentPuzzle.graph[currentNode]?.includes(data)) {
          return { puzzleData: currentPuzzle, damage: 15, failureCount: 1, playSound: "error" }
        }
        const nextPath = [...currentPuzzle.playerPath, data]
        const nextPuzzle = { ...currentPuzzle, currentNode: data, playerPath: nextPath }
        if (data === currentPuzzle.targetNode) {
          const correctJourney = JSON.stringify(nextPath) === JSON.stringify(currentPuzzle.correctPath)
          if (correctJourney) {
            return { puzzleData: nextPuzzle, levelComplete: true, playSound: "success" }
          }
          return { puzzleData: { ...currentPuzzle, currentNode: currentPuzzle.startNode, playerPath: [] }, damage: 20, failureCount: 1, playSound: "error" }
        }
        return { puzzleData: nextPuzzle }
      }
      break
    }

    case "databaseCorruption": {
      if (action === "query") {
        const nextQuery = currentPuzzle.currentQuery + 1
        const nextSolved = currentPuzzle.solved + 1
        if (nextSolved >= currentPuzzle.queries.length) {
          return { puzzleData: { ...currentPuzzle, currentQuery: nextQuery, solved: nextSolved }, levelComplete: true, playSound: "success" }
        }
        return { puzzleData: { ...currentPuzzle, currentQuery: nextQuery, solved: nextSolved } }
      }
      break
    }

    case "networkProtocol": {
      if (action === "repair" && typeof data === "number") {
        if (!currentPuzzle.corruptedLayers.includes(data)) break
        const repaired = [...currentPuzzle.repairedLayers]
        if (!repaired.includes(data)) repaired.push(data)
        const nextPuzzle = { ...currentPuzzle, repairedLayers: repaired }
        if (repaired.length >= currentPuzzle.corruptedLayers.length) {
          return { puzzleData: nextPuzzle, levelComplete: true, playSound: "success" }
        }
        return { puzzleData: nextPuzzle }
      }
      break
    }
  }

  return { puzzleData: currentPuzzle }
}

export function persistProgress(progress: number[]) {
  persistLevelProgress(progress)
}
