"use client"

import { Button } from "@/components/ui/button"
import type { GraphTraversalPuzzleData } from "@/lib/game/types"

export function GraphTraversalPuzzle({
  data,
  onAction,
}: {
  data: GraphTraversalPuzzleData
  onAction: (action: string, data?: unknown) => void
}) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">Navigate through the corrupted network topology:</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {Object.keys(data.graph || {}).map((node) => (
          <Button
            key={node}
            onClick={() => onAction("move", node)}
            className={`${
              data.currentNode === node ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
            } text-white`}
            disabled={
              data.currentNode !== node && !data.graph?.[data.currentNode ?? ""]?.includes(node)
            }
          >
            {node}
          </Button>
        ))}
      </div>
      <div className="text-center">
        <div>Current: {data.currentNode}</div>
        <div>Path: {data.playerPath?.join(" → ")}</div>
        <div>Target: {data.targetNode}</div>
      </div>
    </div>
  )
}
