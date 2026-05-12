"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { LinkedListCorruptionPuzzleData } from "@/lib/game/types"

export function LinkedListCorruptionPuzzle({
  data,
  onAction,
}: {
  data: LinkedListCorruptionPuzzleData
  onAction: (action: string, data?: unknown) => void
}) {
  const [pendingFrom, setPendingFrom] = useState<number | null>(null)

  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">
        Link nodes A→B→C→D. Tap a node, then tap another to create a connection.
      </p>
      {pendingFrom != null && (
        <p className="text-xs text-yellow-400 mb-2">Selected: node {pendingFrom} — tap destination</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {data.nodes?.map((node) => (
          <Button
            key={node.id}
            variant="outline"
            className="border-green-400/50 text-green-400 min-h-[48px]"
            onClick={() => {
              if (pendingFrom == null) {
                setPendingFrom(node.id)
              } else if (pendingFrom === node.id) {
                setPendingFrom(null)
              } else {
                onAction("connect", { from: pendingFrom, to: node.id })
                setPendingFrom(null)
              }
            }}
          >
            {node.value} (id {node.id})
          </Button>
        ))}
      </div>
      <div className="text-xs text-gray-500">
        Connections placed: {data.playerConnections?.length ?? 0} / {data.correctConnections?.length ?? 0}
      </div>
    </div>
  )
}
