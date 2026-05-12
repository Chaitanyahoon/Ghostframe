"use client"

import { Button } from "@/components/ui/button"
import type { CodeFragmentPuzzleData } from "@/lib/game/types"

export function CodeFragmentPuzzle({
  data,
  onAction,
}: {
  data: CodeFragmentPuzzleData
  onAction: (action: string, data?: unknown) => void
}) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">Drag and drop the code lines to restore the function:</p>
      <div className="space-y-2 mb-4">
        {data.currentOrder?.map((fragmentIndex: number, index: number) => (
          <div
            key={index}
            className="bg-gray-800 p-3 rounded border border-gray-600 cursor-move hover:border-green-400/50 transition-colors"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", index.toString())}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const dragIndex = Number.parseInt(e.dataTransfer.getData("text/plain"), 10)
              const newOrder = [...(data.currentOrder ?? [])]
              const draggedItem = newOrder[dragIndex]
              newOrder.splice(dragIndex, 1)
              newOrder.splice(index, 0, draggedItem)
              onAction("reorder", newOrder)
            }}
          >
            <code className="text-green-400">{data.fragments?.[fragmentIndex]}</code>
          </div>
        ))}
      </div>
      <Button onClick={() => onAction("check")} className="bg-green-600 hover:bg-green-700 text-black font-bold">
        EXECUTE CODE
      </Button>
    </div>
  )
}
