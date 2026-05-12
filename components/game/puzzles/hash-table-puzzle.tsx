"use client"

import type { HashTablePuzzleData } from "@/lib/game/types"

export function HashTablePuzzle({
  data,
  onAction,
}: {
  data: HashTablePuzzleData
  onAction: (action: string, data?: unknown) => void
}) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">Resolve hash collisions using linear probing:</p>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {data.hashTable?.map((item: string | null, index: number) => (
          <div key={index} className="bg-gray-800 p-2 text-center border border-gray-600 rounded">
            <div className="text-xs text-gray-400">[{index}]</div>
            <div className="text-sm">{item || "null"}</div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {data.collisions?.map((collision, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-sm">
              {collision.key} (hash: {collision.hash})
            </span>
            <input
              type="number"
              min={0}
              max={6}
              placeholder="Position"
              className="bg-gray-800 text-green-400 p-1 rounded w-20"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const position = Number.parseInt((e.target as HTMLInputElement).value, 10)
                  onAction("resolve", { key: collision.key, position })
                }
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        Progress: {data.resolved}/{data.required}
      </div>
    </div>
  )
}
