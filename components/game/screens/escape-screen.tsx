"use client"

import React from "react"
import { Button } from "@/components/ui/button"

export const EscapeScreen = React.memo(function EscapeScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="animate-pulse motion-reduce:animate-none">
        <h1 className="text-4xl font-bold mb-4 text-green-400">ESCAPE SUCCESSFUL</h1>
        <p className="text-lg text-gray-400 mb-4">All corruption levels neutralized.</p>
        <p className="text-md text-blue-400 mb-8">You have mastered the GhostFrame simulation.</p>
        <Button
          onClick={onRestart}
          className="bg-green-600 hover:bg-green-700 text-black font-bold min-h-[48px]"
        >
          RESTART SIMULATION
        </Button>
      </div>
    </div>
  )
})
