import { describe, expect, it } from "vitest"
import { LEVELS } from "./levels"
import type { CodeFragmentPuzzleData } from "./types"
import { getHintForPuzzle, initializeGameLevel, processPuzzleAction } from "./engine"

describe("game engine", () => {
  it("initializes a level puzzle payload and returns the correct hint type", () => {
    const { puzzle } = initializeGameLevel(1)
    if (puzzle.puzzleType !== "codeFragment") throw new Error("Expected codeFragment puzzle")
    const codePuzzle = puzzle as CodeFragmentPuzzleData
    expect(codePuzzle.puzzleType).toBe("codeFragment")
    expect(codePuzzle.fragments.length).toBeGreaterThan(0)
    const hint = getHintForPuzzle(codePuzzle.puzzleType, 0, codePuzzle)
    expect(hint).toContain("function escape()")
  })

  it("processes a correct code fragment check", () => {
    const config = LEVELS[0]
    const { puzzle } = initializeGameLevel(1)
    if (puzzle.puzzleType !== "codeFragment") throw new Error("Expected codeFragment puzzle")
    const codePuzzle = puzzle as CodeFragmentPuzzleData
    // Use the correct order from the puzzle initialization
    const correctOrder = codePuzzle.correctOrder ?? [0, 1, 2]
    const reorderResult = processPuzzleAction(config, codePuzzle, "reorder", correctOrder)
    if (!reorderResult.puzzleData || reorderResult.puzzleData.puzzleType !== "codeFragment") {
      throw new Error("Expected codeFragment puzzle data")
    }
    expect(reorderResult.puzzleData.currentOrder).toEqual(correctOrder)
    const checkResult = processPuzzleAction(config, reorderResult.puzzleData, "check")
    expect(checkResult.levelComplete).toBe(true)
    expect(checkResult.playSound).toBe("success")
  })

  it("flags an incorrect logic gate answer and returns an error outcome", () => {
    const config = LEVELS[1]
    const { puzzle } = initializeGameLevel(2)
    const result = processPuzzleAction(config, puzzle, "solve", { id: 1, output: true })
    expect(result.levelComplete).not.toBe(true)
    expect(result.damage).toBe(10)
    expect(result.playSound).toBe("error")
  })
})
