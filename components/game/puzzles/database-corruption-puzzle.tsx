"use client"

import { Button } from "@/components/ui/button"
import type { DatabaseCorruptionPuzzleData } from "@/lib/game/types"

export function DatabaseCorruptionPuzzle({
  data,
  onAction,
}: {
  data: DatabaseCorruptionPuzzleData
  onAction: (action: string, data?: unknown) => void
}) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">Execute SQL queries to restore database integrity:</p>
      <div className="mb-4">
        <div className="bg-gray-800 p-4 rounded border border-gray-600">
          <h4 className="font-bold mb-2">Database Tables</h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-bold">Users</div>
              {data.tables?.users?.map((user) => (
                <div key={user.id}>
                  {user.id}: {user.name}, {user.age}
                </div>
              ))}
            </div>
            <div>
              <div className="font-bold">Orders</div>
              {data.tables?.orders?.map((order) => (
                <div key={order.id}>
                  {order.id}: User {order.user_id}, {order.product}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {data.queries?.map((query: string, index: number) => (
          <div key={index} className="bg-gray-800 p-3 rounded">
            <code className="text-green-400 text-sm">{query}</code>
            <Button
              onClick={() => onAction("query")}
              className="ml-4 bg-green-600 hover:bg-green-700 text-black"
              size="sm"
              disabled={index !== data.currentQuery}
            >
              EXECUTE
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        Progress: {data.solved}/{data.queries?.length}
      </div>
    </div>
  )
}
