import { describe, expect, it } from "vitest"
import { evaluateLogicGate } from "./logic-gate"

describe("evaluateLogicGate", () => {
  it("AND is true only when all inputs are true", () => {
    expect(evaluateLogicGate("AND", [true, true])).toBe(true)
    expect(evaluateLogicGate("AND", [true, false])).toBe(false)
    expect(evaluateLogicGate("AND", [false, false])).toBe(false)
  })

  it("OR is true when any input is true", () => {
    expect(evaluateLogicGate("OR", [false, true])).toBe(true)
    expect(evaluateLogicGate("OR", [false, false])).toBe(false)
  })

  it("NOT inverts the first input", () => {
    expect(evaluateLogicGate("NOT", [true])).toBe(false)
    expect(evaluateLogicGate("NOT", [false])).toBe(true)
  })

  it("XOR is true when inputs differ", () => {
    expect(evaluateLogicGate("XOR", [true, false])).toBe(true)
    expect(evaluateLogicGate("XOR", [true, true])).toBe(false)
  })
})
