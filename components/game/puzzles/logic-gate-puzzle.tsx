"use client"

import { Button } from "@/components/ui/button"
import type { LogicGatePuzzleData } from "@/lib/game/types"
import { Cpu } from "lucide-react"

export function LogicGatePuzzle({
  data,
  onAction,
}: {
  data: LogicGatePuzzleData
  onAction: (action: string, data?: unknown) => void
}) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">Solve the logic gates by determining the correct outputs:</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {data.gates?.map((gate) => (
          <div key={gate.id} className="bg-gray-800 p-4 rounded border border-gray-600">
            <div className="text-center mb-2">
              <Cpu className="w-8 h-8 mx-auto text-blue-400" />
              <div className="text-lg font-bold">{gate.type}</div>
            </div>
            <div className="text-sm mb-2">
              Inputs:{" "}
              {gate.inputs.map((input: boolean, i: number) => (
                <span key={i} className={input ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                  {input.toString()}
                  {i < gate.inputs.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => onAction("solve", { id: gate.id, output: true })}
                className="bg-green-600 hover:bg-green-700 text-black"
              >
                TRUE
              </Button>
              <Button
                size="sm"
                onClick={() => onAction("solve", { id: gate.id, output: false })}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                FALSE
              </Button>
            </div>
            {gate.output !== null && (
              <div className="mt-2 text-gray-300">
                Output:{" "}
                <span className={gate.output ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                  {String(gate.output)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        Progress: {data.solved}/{data.required}
      </div>
    </div>
  )
}
