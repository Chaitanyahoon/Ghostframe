import type { PuzzleType } from "./types"

export const HINTS: Record<PuzzleType, string[]> = {
  codeFragment: [
    "💡 Try to arrange the code lines in logical execution order",
    "🔍 Look for function declaration, condition check, and return statements",
    "⚡ The function should start with 'function escape()' and end with the closing brace",
  ],
  logicGate: [
    "💡 Remember basic logic: AND needs both inputs true, OR needs at least one true",
    "🔍 NOT gate inverts the input, XOR is true when inputs are different",
    "⚡ Check each gate type carefully - AND, OR, NOT, XOR have different rules",
  ],
  memorySequence: [
    "💡 Watch the sequence carefully and memorize the pattern",
    "🔍 Click the colors in the exact same order they were shown",
    "⚡ If you make a mistake, the sequence resets - start over from the beginning",
  ],
  algorithmReconstruction: [
    "💡 Bubble sort compares adjacent elements and swaps them if they're in wrong order",
    "🔍 The outer loop controls passes, inner loop does the comparisons",
    "⚡ Structure: function declaration → outer loop → inner loop → comparison → swap → return",
  ],
  terminalHacking: [
    "💡 Follow the command sequence shown at the bottom of the terminal",
    "🔍 Start with 'scan' to detect threats, then 'isolate' them",
    "⚡ Complete sequence: scan → isolate → purge → restore",
  ],
  binaryTree: [
    "💡 In-order traversal visits: left subtree → root → right subtree",
    "🔍 Start from the leftmost node and work your way up and right",
    "⚡ Correct order: 20, 30, 40, 50, 60, 70, 80",
  ],
  graphTraversal: [
    "💡 Find the shortest path from A to F through the network",
    "🔍 Look for direct connections between nodes",
    "⚡ Optimal path: A → C → F (only 3 steps)",
  ],
  hashTable: [
    "💡 Use linear probing to resolve hash collisions",
    "🔍 If a slot is occupied, try the next available slot",
    "⚡ Place each key in the first empty slot after its hash position",
  ],
  dynamicProgramming: [
    "💡 Break down the fibonacci calculation step by step",
    "🔍 Each step shows how larger problems depend on smaller ones",
    "⚡ Follow the recursive breakdown from fib(8) down to base cases",
  ],
  stackOverflow: [
    "💡 Execute stack operations in the given sequence",
    "🔍 Push adds elements to top, pop removes from top",
    "⚡ Follow each operation carefully and watch the stack state change",
  ],
  linkedListCorruption: [
    "💡 Reconnect the nodes in alphabetical order: A→B→C→D",
    "🔍 Click the connection buttons to link nodes together",
    "⚡ Each node should point to the next one in sequence",
  ],
  recursionLoop: [
    "💡 Trace through the factorial calculation step by step",
    "🔍 Each recursive call multiplies by the current number",
    "⚡ Follow the pattern: 4! = 4 × 3 × 2 × 1 = 24",
  ],
  databaseCorruption: [
    "💡 Execute the SQL queries in order to restore database integrity",
    "🔍 First query filters users, second query joins tables",
    "⚡ Click EXECUTE on each query when it becomes available",
  ],
  networkProtocol: [
    "💡 Repair the corrupted OSI layers (highlighted in red)",
    "🔍 Click REPAIR on layers that show corruption",
    "⚡ Focus on layers 3, 5, and 7 (Network, Session, Application)",
  ],
  multiAlgorithm: [
    "💡 Complete each algorithm challenge in sequence",
    "🔍 Start with sorting, then search, tree, graph, and hash",
    "⚡ Each challenge tests a different computer science concept",
  ],
}
