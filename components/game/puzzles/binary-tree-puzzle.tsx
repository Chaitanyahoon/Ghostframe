"use client"

import { Button } from "@/components/ui/button"
import type { BinaryTreePuzzleData } from "@/lib/game/types"

export function BinaryTreePuzzle({
  data,
  onAction,
}: {
  data: BinaryTreePuzzleData
  onAction: (action: string, data?: unknown) => void
}) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">Perform in-order traversal of the corrupted tree structure:</p>
      <div className="mb-4 text-center">
        <div className="inline-block bg-gray-800 p-4 rounded">
          <div className="text-center mb-2">
            <Button
              onClick={() => onAction("traverse", 50)}
              className="bg-blue-600 hover:bg-blue-700 text-white m-1"
              size="sm"
            >
              50
            </Button>
          </div>
          <div className="flex justify-center gap-8 mb-2">
            <Button onClick={() => onAction("traverse", 30)} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
              30
            </Button>
            <Button onClick={() => onAction("traverse", 70)} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
              70
            </Button>
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={() => onAction("traverse", 20)} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
              20
            </Button>
            <Button onClick={() => onAction("traverse", 40)} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
              40
            </Button>
            <Button onClick={() => onAction("traverse", 60)} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
              60
            </Button>
            <Button onClick={() => onAction("traverse", 80)} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
              80
            </Button>
          </div>
        </div>
      </div>
      <div className="text-center">
        <div>Expected: {data.correctSequence?.join(" → ")}</div>
        <div>Your path: {data.playerSequence?.join(" → ")}</div>
      </div>
    </div>
  )
}
