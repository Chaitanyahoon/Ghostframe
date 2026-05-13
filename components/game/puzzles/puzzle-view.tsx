"use client"

import { memo } from "react"
import type {
  AlgorithmReconstructionPuzzleData,
  BinaryTreePuzzleData,
  CodeFragmentPuzzleData,
  DatabaseCorruptionPuzzleData,
  DynamicProgrammingPuzzleData,
  GraphTraversalPuzzleData,
  HashTablePuzzleData,
  LevelConfig,
  LinkedListCorruptionPuzzleData,
  LogicGatePuzzleData,
  MemorySequencePuzzleData,
  MultiAlgorithmPuzzleData,
  NetworkProtocolPuzzleData,
  PuzzleData,
  RecursionLoopPuzzleData,
  StackOverflowPuzzleData,
  TerminalHackingPuzzleData,
} from "@/lib/game/types"
import { AlgorithmReconstructionPuzzle } from "./algorithm-reconstruction-puzzle"
import { BinaryTreePuzzle } from "./binary-tree-puzzle"
import { CodeFragmentPuzzle } from "./code-fragment-puzzle"
import { DatabaseCorruptionPuzzle } from "./database-corruption-puzzle"
import { DynamicProgrammingPuzzle } from "./dynamic-programming-puzzle"
import { GraphTraversalPuzzle } from "./graph-traversal-puzzle"
import { HashTablePuzzle } from "./hash-table-puzzle"
import { LinkedListCorruptionPuzzle } from "./linked-list-corruption-puzzle"
import { LogicGatePuzzle } from "./logic-gate-puzzle"
import { MemorySequencePuzzle } from "./memory-sequence-puzzle"
import { MultiAlgorithmPuzzle } from "./multi-algorithm-puzzle"
import { NetworkProtocolPuzzle } from "./network-protocol-puzzle"
import { RecursionLoopPuzzle } from "./recursion-loop-puzzle"
import { StackOverflowPuzzle } from "./stack-overflow-puzzle"
import { TerminalHackingPuzzle } from "./terminal-hacking-puzzle"

function PuzzleViewComponent({
  config,
  puzzle,
  onAction,
  terminalInput,
  setTerminalInput,
  terminalOutput,
  onTerminalSubmit,
}: {
  config: LevelConfig
  puzzle: PuzzleData
  onAction: (action: string, data?: unknown) => void
  terminalInput: string
  setTerminalInput: (v: string) => void
  terminalOutput: string[]
  onTerminalSubmit: (e: React.FormEvent) => void
}) {
  switch (config.puzzleType) {
    case "codeFragment":
      return <CodeFragmentPuzzle data={puzzle as CodeFragmentPuzzleData} onAction={onAction} />
    case "algorithmReconstruction":
      return <AlgorithmReconstructionPuzzle data={puzzle as AlgorithmReconstructionPuzzleData} onAction={onAction} />
    case "logicGate":
      return <LogicGatePuzzle data={puzzle as LogicGatePuzzleData} onAction={onAction} />
    case "memorySequence":
      return <MemorySequencePuzzle data={puzzle as MemorySequencePuzzleData} onAction={onAction} />
    case "binaryTree":
      return <BinaryTreePuzzle data={puzzle as BinaryTreePuzzleData} onAction={onAction} />
    case "graphTraversal":
      return <GraphTraversalPuzzle data={puzzle as GraphTraversalPuzzleData} onAction={onAction} />
    case "hashTable":
      return <HashTablePuzzle data={puzzle as HashTablePuzzleData} onAction={onAction} />
    case "dynamicProgramming":
      return <DynamicProgrammingPuzzle data={puzzle as DynamicProgrammingPuzzleData} onAction={onAction} />
    case "multiAlgorithm":
      return <MultiAlgorithmPuzzle data={puzzle as MultiAlgorithmPuzzleData} onAction={onAction} />
    case "databaseCorruption":
      return <DatabaseCorruptionPuzzle data={puzzle as DatabaseCorruptionPuzzleData} onAction={onAction} />
    case "networkProtocol":
      return <NetworkProtocolPuzzle data={puzzle as NetworkProtocolPuzzleData} onAction={onAction} />
    case "terminalHacking":
      return (
        <form onSubmit={onTerminalSubmit} aria-label="Terminal Input Form">
          <TerminalHackingPuzzle
            data={puzzle as TerminalHackingPuzzleData}
            terminalInput={terminalInput}
            setTerminalInput={setTerminalInput}
            terminalOutput={terminalOutput}
          />
        </form>
      )
    case "stackOverflow":
      return <StackOverflowPuzzle data={puzzle as StackOverflowPuzzleData} onAction={onAction} />
    case "linkedListCorruption":
      return <LinkedListCorruptionPuzzle data={puzzle as LinkedListCorruptionPuzzleData} onAction={onAction} />
    case "recursionLoop":
      return <RecursionLoopPuzzle data={puzzle as RecursionLoopPuzzleData} onAction={onAction} />
    default:
      return null
  }
}

export const PuzzleView = memo(PuzzleViewComponent)
