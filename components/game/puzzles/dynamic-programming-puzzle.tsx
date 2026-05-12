"use client"

import { Button } from "@/components/ui/button"
import type { DynamicProgrammingPuzzleData } from "@/lib/game/types"

export function DynamicProgrammingPuzzle({
  data,
  onAction,
}: {
  data: DynamicProgrammingPuzzleData
  onAction: (action: string, data?: unknown) => void
}) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">Solve recursive overflow using memoization:</p>
      <div className="space-y-2 mb-4">
        {data.correctSteps?.map((step: string, index: number) => (
          <Button
            key={index}
            onClick={() => onAction("step", step)}
            className={`w-full text-left ${
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
      <div className="text-center">
        Step: {(data.currentStep ?? 0) + 1}/{data.correctSteps?.length}
      </div>
    </div>
  )
}
