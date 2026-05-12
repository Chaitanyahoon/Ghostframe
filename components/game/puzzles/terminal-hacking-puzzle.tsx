"use client"

import { Card } from "@/components/ui/card"
import type { TerminalHackingPuzzleData } from "@/lib/game/types"

export function TerminalHackingPuzzle({
  data,
  terminalInput,
  setTerminalInput,
  terminalOutput,
}: {
  data: TerminalHackingPuzzleData
  terminalInput: string
  setTerminalInput: (v: string) => void
  terminalOutput: string[]
}) {
  return (
    <div>
      <Card className="bg-black border-green-400 p-4 h-64 overflow-y-auto mb-4">
        <div className="space-y-1">
          {terminalOutput.map((line, index) => (
            <div key={index} className="text-green-400 text-sm font-mono">
              {line}
            </div>
          ))}
        </div>
      </Card>
      <div className="flex">
        <span className="text-green-400 mr-2">{">"}</span>
        <input
          type="text"
          value={terminalInput}
          onChange={(e) => setTerminalInput(e.target.value)}
          className="flex-1 bg-transparent text-green-400 outline-none font-mono"
          placeholder="Enter command..."
          autoFocus
        />
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Required sequence: {data.requiredCommands?.join(" → ")}
      </div>
    </div>
  )
}
