"use client"

import { Button } from "@/components/ui/button"
import type { StackOverflowPuzzleData } from "@/lib/game/types"

export function StackOverflowPuzzle({
  data,
  onAction,
}: {
  data: StackOverflowPuzzleData
  onAction: (action: string, data?: unknown) => void
}) {
  const op = data.operations?.[data.currentOperation ?? 0]
  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">Execute each stack operation in order. Push adds to top; pop removes from top.</p>
      <div className="mb-4 font-mono text-green-400 bg-gray-800 p-4 rounded border border-gray-600">
        Stack: [{data.stack?.join(", ") ?? ""}]
      </div>
      <div className="mb-4 text-sm">
        Next operation: <span className="text-yellow-400 font-mono">{op ?? "—"}</span>
      </div>
      <Button onClick={() => onAction("execute")} className="bg-green-600 hover:bg-green-700 text-black font-bold">
        EXECUTE OPERATION
      </Button>
      <p className="text-xs text-gray-500 mt-4">
        Target end state: [{data.correctResult?.join(", ")}]
      </p>
    </div>
  )
}
