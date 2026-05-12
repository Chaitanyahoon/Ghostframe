import type { GameReducerAction, GameState } from "./types"

export function gameReducer(state: GameState, action: GameReducerAction): GameState {
  switch (action.type) {
    case "MERGE":
      return { ...state, ...action.patch }
    case "MERGE_FN":
      return action.fn(state)
    default:
      return state
  }
}
