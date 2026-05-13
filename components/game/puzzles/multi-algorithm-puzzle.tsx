"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { MultiAlgorithmPuzzleData } from "@/lib/game/types"

export function MultiAlgorithmPuzzle({
  data,
  onAction,
}: {
  data: MultiAlgorithmPuzzleData
  onAction: (action: string, data?: unknown) => void
}) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">Complete all system restoration challenges:</p>
      <div className="space-y-4">
        {data.challenges?.map((challenge, index: number) => (
          <Card key={index} className="bg-gray-800 p-4" aria-label="Challenge Card">
            <h4 className="font-bold mb-2">
              Challenge {index + 1}: {challenge.type.toUpperCase()} CORRUPTION
              {challenge.solved && <span className="text-green-400 ml-2">✓ RESTORED</span>}
            </h4>
            {challenge.type === "sort" && Array.isArray(challenge.data) && (
              <div>
                <div>Corrupted Array: [{challenge.data.join(", ")}]</div>
                <Button
                  onClick={() => onAction("solve")}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-black"
                  disabled={challenge.solved || index !== data.currentChallenge}
                >
                  Restore Sort Order
                </Button>
              </div>
            )}
            {challenge.type === "search" && Array.isArray(challenge.data) && (
              <div>
                <div>
                  Search Array: [{challenge.data.join(", ")}], Target: {challenge.target}
                </div>
                <Button
                  onClick={() => onAction("solve")}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-black"
                  disabled={challenge.solved || index !== data.currentChallenge}
                >
                  Execute Binary Search
                </Button>
              </div>
            )}
            {challenge.type === "tree" && (
              <div>
                <div>Task: Restore tree balance</div>
                <Button
                  onClick={() => onAction("solve")}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-black"
                  disabled={challenge.solved || index !== data.currentChallenge}
                >
                  Balance Tree Structure
                </Button>
              </div>
            )}
            {challenge.type === "graph" && (
              <div>
                <div>Task: Repair shortest path algorithm</div>
                <Button
                  onClick={() => onAction("solve")}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-black"
                  disabled={challenge.solved || index !== data.currentChallenge}
                >
                  Restore Pathfinding
                </Button>
              </div>
            )}
            {challenge.type === "hash" && (
              <div>
                <div>Task: Fix hash collision resolution</div>
                <Button
                  onClick={() => onAction("solve")}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-black"
                  disabled={challenge.solved || index !== data.currentChallenge}
                >
                  Repair Hash Table
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
      <div className="mt-4 text-center">
        Systems Restored: {data.totalSolved}/{data.challenges?.length}
      </div>
    </div>
  )
}
