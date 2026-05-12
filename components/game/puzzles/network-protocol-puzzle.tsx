"use client"

import { Button } from "@/components/ui/button"
import type { NetworkProtocolPuzzleData } from "@/lib/game/types"

export function NetworkProtocolPuzzle({
  data,
  onAction,
}: {
  data: NetworkProtocolPuzzleData
  onAction: (action: string, data?: unknown) => void
}) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">Repair corrupted OSI layers:</p>
      <div className="space-y-2 mb-4">
        {data.layers?.map((layer: string, index: number) => (
          <div
            key={index}
            className={`p-3 rounded border ${
              data.corruptedLayers?.includes(index)
                ? data.repairedLayers?.includes(index)
                  ? "bg-green-800 border-green-400"
                  : "bg-red-800 border-red-400"
                : "bg-gray-800 border-gray-600"
            } `}
          >
            <div className="flex justify-between items-center">
              <span>
                Layer {index + 1}: {layer}
              </span>
              {data.corruptedLayers?.includes(index) && !data.repairedLayers?.includes(index) && (
                <Button
                  onClick={() => onAction("repair", index)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-black"
                  size="sm"
                >
                  REPAIR
                </Button>
              )}
              {data.repairedLayers?.includes(index) && <span className="text-green-400">✓ REPAIRED</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        Repaired: {data.repairedLayers?.length}/{data.corruptedLayers?.length}
      </div>
    </div>
  )
}
