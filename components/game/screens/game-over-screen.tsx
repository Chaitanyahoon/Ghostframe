"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export const GameOverScreen = React.memo(function GameOverScreen({
  onRetry,
  onLevelSelect,
}: {
  onRetry: () => void
  onLevelSelect: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="animate-pulse motion-reduce:animate-none">
        <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-400" />
        <h1 className="text-4xl font-bold mb-4 text-red-400">SYSTEM FAILURE</h1>
        <p className="text-lg text-gray-400 mb-8">The corruption has consumed your logic circuits.</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Button
            onClick={onRetry}
            className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold w-full sm:w-auto min-h-[48px]"
          >
            RETRY LEVEL
          </Button>
          <Button
            onClick={onLevelSelect}
            className="bg-green-600 hover:bg-green-700 text-black font-bold w-full sm:w-auto min-h-[48px]"
          >
            LEVEL SELECT
          </Button>
        </div>
      </div>
    </div>
  )
})
