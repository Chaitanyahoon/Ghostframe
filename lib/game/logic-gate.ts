/**
 * Evaluate gate output for Ghostframe logic puzzles.
 */
export function evaluateLogicGate(type: string, inputs: boolean[]): boolean {
  switch (type) {
    case "AND":
      return inputs.every(Boolean)
    case "OR":
      return inputs.some(Boolean)
    case "NOT":
      return !inputs[0]
    case "XOR":
      return inputs.length >= 2 && inputs[0] !== inputs[1]
    default:
      return false
  }
}
