export type GameScreen = "intro" | "levelSelect" | "game" | "terminal" | "escape" | "gameOver"

export type EnemyType = "scanner" | "hunter" | "corruptor" | "virus" | "phantom"

export type SynthSound = "hover" | "click" | "success" | "error" | "glitch" | "gamestart" | "ambient-drone"

export interface EnemyPosition {
  x: number
  y: number
  id: string
  type: EnemyType
}

export interface GameState {
  currentScreen: GameScreen
  currentLevel: number
  health: number
  fragments: string[]
  solvedPuzzles: number
  glitchLevel: number
  enemyPositions: EnemyPosition[]
  playerHidden: boolean
  levelProgress: number[]
  levelBestTimes: number[]
  timeRemaining: number
  isLevelComplete: boolean
  failureCount: number
  hintsUsed: number
  timerExtensions: number
  showHint: boolean
  currentHint: string
  hintLevel: number
  stealthEnergy: number
}

export type Difficulty = "Easy" | "Medium" | "Hard" | "Extreme" | "Nightmare" | "Impossible" | "Legendary"

export type PuzzleType =
  | "codeFragment"
  | "logicGate"
  | "memorySequence"
  | "algorithmReconstruction"
  | "terminalHacking"
  | "binaryTree"
  | "graphTraversal"
  | "hashTable"
  | "dynamicProgramming"
  | "multiAlgorithm"
  | "stackOverflow"
  | "linkedListCorruption"
  | "recursionLoop"
  | "databaseCorruption"
  | "networkProtocol"

export interface LevelConfig {
  id: number
  name: string
  description: string
  difficulty: Difficulty
  puzzleType: PuzzleType
  enemyCount: number
  timeLimit: number
  corruptionRate: number
  requiredScore: number
  corruptionType: string
}

export interface LogicGate {
  type: string
  inputs: boolean[]
  output: boolean | null
  id: number
}

export interface ListConnection {
  from: number
  to: number
}

export interface HashCollision {
  key: string
  hash: number
}

export interface MultiChallenge {
  type: "sort" | "search" | "tree" | "graph" | "hash"
  data: number[] | string
  target?: number
  solved: boolean
}

export interface CodeFragmentPuzzleData {
  puzzleType: "codeFragment"
  fragments: string[]
  correctOrder: number[]
  currentOrder: number[]
}

export interface LogicGatePuzzleData {
  puzzleType: "logicGate"
  gates: LogicGate[]
  solved: number
  required: number
}

export interface MemorySequencePuzzleData {
  puzzleType: "memorySequence"
  sequence: number[]
  playerSequence: number[]
  showingSequence: boolean
  currentStep: number
}

export interface AlgorithmReconstructionPuzzleData {
  puzzleType: "algorithmReconstruction"
  algorithm: string[]
  correctOrder: number[]
  currentOrder: number[]
}

export interface TerminalHackingPuzzleData {
  puzzleType: "terminalHacking"
  commandsExecuted: string[]
  requiredCommands: string[]
  currentStep: number
}

export interface TreeNode {
  value: number
  left?: TreeNode
  right?: TreeNode
}

export interface BinaryTreePuzzleData {
  puzzleType: "binaryTree"
  tree: TreeNode
  traversalType: string
  correctSequence: number[]
  playerSequence: number[]
  currentNode: string | null
}

export interface GraphTraversalPuzzleData {
  puzzleType: "graphTraversal"
  graph: Record<string, string[]>
  startNode: string
  targetNode: string
  correctPath: string[]
  playerPath: string[]
  currentNode: string
}

export interface HashTablePuzzleData {
  puzzleType: "hashTable"
  hashTable: (string | null)[]
  collisions: HashCollision[]
  resolved: number
  required: number
}

export interface DynamicProgrammingPuzzleData {
  puzzleType: "dynamicProgramming"
  problem: string
  n: number
  memoTable: Record<string, unknown>
  steps: string[]
  correctSteps: string[]
  currentStep: number
}

export interface StackOverflowPuzzleData {
  puzzleType: "stackOverflow"
  stack: number[]
  operations: string[]
  correctResult: number[]
  currentOperation: number
}

export interface LinkedListCorruptionPuzzleData {
  puzzleType: "linkedListCorruption"
  nodes: Array<{ value: string; next: null; id: number }>
  correctConnections: ListConnection[]
  playerConnections: ListConnection[]
}

export interface RecursionLoopPuzzleData {
  puzzleType: "recursionLoop"
  recursionSteps: string[]
  currentStep: number
  playerSteps: string[]
}

export interface DatabaseCorruptionPuzzleData {
  puzzleType: "databaseCorruption"
  tables: {
    users: Array<{ id: number; name: string; age: number }>
    orders: Array<{ id: number; user_id: number; product: string }>
  }
  queries: string[]
  currentQuery: number
  solved: number
}

export interface NetworkProtocolPuzzleData {
  puzzleType: "networkProtocol"
  layers: string[]
  corruptedLayers: number[]
  repairedLayers: number[]
  currentLayer: number
}

export interface MultiAlgorithmPuzzleData {
  puzzleType: "multiAlgorithm"
  challenges: MultiChallenge[]
  currentChallenge: number
  totalSolved: number
}

export type PuzzleData =
  | CodeFragmentPuzzleData
  | LogicGatePuzzleData
  | MemorySequencePuzzleData
  | AlgorithmReconstructionPuzzleData
  | TerminalHackingPuzzleData
  | BinaryTreePuzzleData
  | GraphTraversalPuzzleData
  | HashTablePuzzleData
  | DynamicProgrammingPuzzleData
  | MultiAlgorithmPuzzleData
  | StackOverflowPuzzleData
  | LinkedListCorruptionPuzzleData
  | RecursionLoopPuzzleData
  | DatabaseCorruptionPuzzleData
  | NetworkProtocolPuzzleData

export type GameReducerAction =
  | { type: "MERGE_FN"; fn: (s: GameState) => GameState }
  | { type: "MERGE"; patch: Partial<GameState> }
