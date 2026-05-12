"use client"

import { Button } from "@/components/ui/button"
import type { MemorySequencePuzzleData } from "@/lib/game/types"

export function MemorySequencePuzzle({
  data,
  onAction,
}: {
  data: MemorySequencePuzzleData
  onAction: (action: string, data?: unknown) => void
}) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">Memorize and repeat the corrupted sequence:</p>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[0, 1, 2, 3].map((colorIndex) => (
          <Button
            key={colorIndex}
            className={`h-16 ${
              colorIndex === 0
                ? "bg-red-600 hover:bg-red-700"
                : colorIndex === 1
                  ? "bg-blue-600 hover:bg-blue-700"
                  : colorIndex === 2
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-600 hover:bg-yellow-700"
            } `}
            onClick={() => onAction("input", colorIndex)}
          />
        ))}
      </div>
      <div className="text-center">
        <div>
          Target:{" "}
          {data.sequence?.map((num: number, i: number) => (
            <span
              key={i}
              className={`font-bold ${
                num === 0
                  ? "text-red-400"
                  : num === 1
                    ? "text-blue-400"
                    : num === 2
                      ? "text-green-400"
                      : "text-yellow-400"
              } `}
            >
              {num}
              {i < (data.sequence?.length ?? 0) - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div>
          Your input:{" "}
          {data.playerSequence?.map((num: number, i: number) => (
            <span
              key={i}
              className={`font-bold ${
                num === 0
                  ? "text-red-400"
                  : num === 1
                    ? "text-blue-400"
                    : num === 2
                      ? "text-green-400"
                      : "text-yellow-400"
              } `}
            >
              {num}
              {i < (data.playerSequence?.length ?? 0) - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
