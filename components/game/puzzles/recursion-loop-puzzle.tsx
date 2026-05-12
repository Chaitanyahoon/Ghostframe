"use client"

import { Button } from "@/components/ui/button"
import type { RecursionLoopPuzzleData } from "@/lib/game/types"

export function RecursionLoopPuzzle({
  data,
  onAction,
}: {
  data: RecursionLoopPuzzleData
  onAction: (action: string, data?: unknown) => void
}) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">Trace the factorial expansion — select the correct line for each step.</p>
      <div className="space-y-2 mb-4">
        {data.recursionSteps?.map((step: string, index: number) => (
          <Button
            key={index}
            onClick={() => onAction("step", step)}
            className={`w-full text-left justify-start h-auto py-3 whitespace-normal ${
              index === data.currentStep
                ? "bg-green-600 hover:bg-green-700"
                : index < (data.currentStep ?? 0)
                  ? "bg-blue-600"
                  : "bg-gray-600 hover:bg-gray-700"
            } text-white`}
            disabled={index !== data.currentStep}
          >
            {step}
          </Button>
        ))}
      </div>
      <div className="text-center text-sm text-gray-400">
        Step {(data.currentStep ?? 0) + 1} / {data.recursionSteps?.length}
      </div>
    </div>
  )
}
