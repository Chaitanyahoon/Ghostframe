import { LEVELS } from "./levels"
import type { PuzzleData, PuzzleType } from "./types"

export function buildInitialPuzzle(puzzleType: PuzzleType, level: number): {
  puzzle: PuzzleData
  terminalLines?: string[]
} {
  switch (puzzleType) {
    case "codeFragment": {
      // Different code fragments based on level
      const fragments = level === 1 ? [
        "function systemBoot() {",
        "  console.log('Initializing...');",
        "  return true;",
        "}",
      ] : level === 4 ? [
        "function bubbleSort(arr) {",
        "  for (let i = 0; i < arr.length; i++) {",
        "    for (let j = 0; j < arr.length - i - 1; j++) {",
        "      if (arr[j] > arr[j + 1]) {",
        "        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];",
        "      }",
        "    }",
        "  }",
        "  return arr;",
        "}",
      ] : [
        "function escape() {",
        "  if (corruption.level < 50) {",
        "    return true;",
        "  }",
        "  return false;",
        "}",
      ];

      const correctOrder = Array.from({ length: fragments.length }, (_, i) => i);
      const shuffledOrder = [...correctOrder].sort(() => Math.random() - 0.5);

      return {
        puzzle: {
          puzzleType: "codeFragment",
          fragments,
          correctOrder,
          currentOrder: shuffledOrder,
        },
      }
    }

    case "logicGate": {
      // Progressive difficulty based on level
      const gateConfigs = level === 2 ? [
        { type: "AND", inputs: [true, false], output: null, id: 1 },
        { type: "OR", inputs: [false, true], output: null, id: 2 },
        { type: "NOT", inputs: [true], output: null, id: 3 },
      ] : level === 7 ? [
        { type: "AND", inputs: [true, false], output: null, id: 1 },
        { type: "OR", inputs: [false, true], output: null, id: 2 },
        { type: "NOT", inputs: [true], output: null, id: 3 },
        { type: "XOR", inputs: [true, true], output: null, id: 4 },
        { type: "NAND", inputs: [true, false], output: null, id: 5 },
      ] : [
        { type: "AND", inputs: [true, false], output: null, id: 1 },
        { type: "OR", inputs: [false, true], output: null, id: 2 },
        { type: "NOT", inputs: [true], output: null, id: 3 },
        { type: "XOR", inputs: [true, true], output: null, id: 4 },
      ];

      return {
        puzzle: {
          puzzleType: "logicGate",
          gates: gateConfigs,
          solved: 0,
          required: gateConfigs.length,
        },
      }
    }

    case "memorySequence": {
      // Scale sequence length with level
      const baseLength = 4;
      const levelBonus = Math.floor((level - 3) / 2); // Level 3 = 4, Level 4 = 4, Level 5 = 5, etc.
      const sequenceLength = Math.min(baseLength + levelBonus, 8);
      const sequence = Array.from({ length: sequenceLength }, () => Math.floor(Math.random() * 4));

      return {
        puzzle: {
          puzzleType: "memorySequence",
          sequence,
          playerSequence: [],
          showingSequence: true,
          currentStep: 0,
        },
      }
    }

    case "algorithmReconstruction": {
      // Different algorithms based on level
      let algorithm: string[];
      let correctOrder: number[];

      if (level === 4) {
        // Bubble sort for level 4
        algorithm = [
          "function bubbleSort(arr) {",
          "  for (let i = 0; i < arr.length; i++) {",
          "    for (let j = 0; j < arr.length - i - 1; j++) {",
          "      if (arr[j] > arr[j + 1]) {",
          "        let temp = arr[j];",
          "        arr[j] = arr[j + 1];",
          "        arr[j + 1] = temp;",
          "      }",
          "    }",
          "  }",
          "  return arr;",
          "}",
        ];
        correctOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      } else if (level >= 8) {
        // Binary search for higher levels
        algorithm = [
          "function binarySearch(arr, target) {",
          "  let left = 0;",
          "  let right = arr.length - 1;",
          "  while (left <= right) {",
          "    let mid = Math.floor((left + right) / 2);",
          "    if (arr[mid] === target) {",
          "      return mid;",
          "    } else if (arr[mid] < target) {",
          "      left = mid + 1;",
          "    } else {",
          "      right = mid - 1;",
          "    }",
          "  }",
          "  return -1;",
          "}",
        ];
        correctOrder = Array.from({ length: algorithm.length }, (_, i) => i);
      } else {
        // Simple linear search for medium levels
        algorithm = [
          "function linearSearch(arr, target) {",
          "  for (let i = 0; i < arr.length; i++) {",
          "    if (arr[i] === target) {",
          "      return i;",
          "    }",
          "  }",
          "  return -1;",
          "}",
        ];
        correctOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      }

      const shuffledOrder = [...correctOrder].sort(() => Math.random() - 0.5);

      return {
        puzzle: {
          puzzleType: "algorithmReconstruction",
          algorithm,
          correctOrder,
          currentOrder: shuffledOrder,
        },
      }
    }

    case "binaryTree": {
      // Different tree structures and traversal types based on level
      const treeConfigs = {
        6: {
          tree: {
            value: 50,
            left: { value: 30, left: { value: 20 }, right: { value: 40 } },
            right: { value: 70, left: { value: 60 }, right: { value: 80 } },
          },
          traversalType: "inorder",
          correctSequence: [20, 30, 40, 50, 60, 70, 80],
        },
        11: {
          tree: {
            value: 100,
            left: {
              value: 50,
              left: { value: 25, left: { value: 10 }, right: { value: 30 } },
              right: { value: 75, left: { value: 60 }, right: { value: 80 } }
            },
            right: {
              value: 150,
              left: { value: 125, left: { value: 110 }, right: { value: 130 } },
              right: { value: 175, left: { value: 160 }, right: { value: 180 } }
            },
          },
          traversalType: "preorder",
          correctSequence: [100, 50, 25, 10, 30, 75, 60, 80, 150, 125, 110, 130, 175, 160, 180],
        },
        default: {
          tree: {
            value: 50,
            left: { value: 30, left: { value: 20 }, right: { value: 40 } },
            right: { value: 70, left: { value: 60 }, right: { value: 80 } },
          },
          traversalType: "inorder",
          correctSequence: [20, 30, 40, 50, 60, 70, 80],
        }
      };

      const config = treeConfigs[level as keyof typeof treeConfigs] || treeConfigs.default;

      return {
        puzzle: {
          puzzleType: "binaryTree",
          tree: config.tree,
          traversalType: config.traversalType,
          correctSequence: config.correctSequence,
          playerSequence: [],
          currentNode: null,
        },
      }
    }

    case "graphTraversal": {
      // Different graph structures based on level
      const graphConfigs = {
        7: {
          graph: {
            A: ["B", "C"],
            B: ["A", "D", "E"],
            C: ["A", "F"],
            D: ["B"],
            E: ["B", "F"],
            F: ["C", "E"],
          },
          startNode: "A",
          targetNode: "F",
          correctPath: ["A", "C", "F"],
        },
        12: {
          graph: {
            Server1: ["Router1", "Server2"],
            Router1: ["Server1", "Firewall1", "Router2"],
            Server2: ["Server1", "Database1"],
            Firewall1: ["Router1", "WebServer"],
            Router2: ["Router1", "Database1"],
            Database1: ["Server2", "Router2"],
            WebServer: ["Firewall1"],
          },
          startNode: "Server1",
          targetNode: "WebServer",
          correctPath: ["Server1", "Router1", "Firewall1", "WebServer"],
        },
        default: {
          graph: {
            A: ["B", "C"],
            B: ["A", "D", "E"],
            C: ["A", "F"],
            D: ["B"],
            E: ["B", "F"],
            F: ["C", "E"],
          },
          startNode: "A",
          targetNode: "F",
          correctPath: ["A", "C", "F"],
        }
      };

      const config = graphConfigs[level as keyof typeof graphConfigs] || graphConfigs.default;

      return {
        puzzle: {
          puzzleType: "graphTraversal",
          graph: config.graph,
          startNode: config.startNode,
          targetNode: config.targetNode,
          correctPath: config.correctPath,
          playerPath: [],
          currentNode: config.startNode,
        },
      }
    }

    case "hashTable": {
      // Scale collision complexity with level
      const collisionCount = Math.min(2 + Math.floor((level - 8) / 2), 6);
      const tableSize = 7;

      const collisions = [];
      const usedHashes = new Set<number>();

      for (let i = 0; i < collisionCount; i++) {
        let hash;
        do {
          hash = Math.floor(Math.random() * tableSize);
        } while (usedHashes.has(hash));

        usedHashes.add(hash);

        // Create realistic-looking data collisions
        const dataTypes = ["user", "file", "record", "entry", "item"];
        const dataType = dataTypes[Math.floor(Math.random() * dataTypes.length)];
        const id1 = Math.floor(Math.random() * 100) + 1;
        const id2 = Math.floor(Math.random() * 100) + 1;

        collisions.push({
          key: `${dataType}_${id1.toString().padStart(2, '0')}`,
          hash,
        }, {
          key: `${dataType}_${id2.toString().padStart(2, '0')}`,
          hash,
        });
      }

      return {
        puzzle: {
          puzzleType: "hashTable",
          hashTable: Array(tableSize).fill(null),
          collisions: collisions.flat(),
          resolved: 0,
          required: collisions.length,
        },
      }
    }

    case "dynamicProgramming": {
      // Different DP problems based on level
      const dpConfigs = {
        9: {
          problem: "fibonacci",
          n: 8,
          correctSteps: [
            "fib(8) = fib(7) + fib(6)",
            "fib(7) = fib(6) + fib(5)",
            "fib(6) = fib(5) + fib(4)",
            "fib(5) = fib(4) + fib(3)",
            "fib(4) = fib(3) + fib(2)",
            "fib(3) = fib(2) + fib(1)",
            "fib(2) = 1, fib(1) = 1",
          ],
        },
        14: {
          problem: "knapsack",
          n: 4,
          items: [
            { weight: 2, value: 3 },
            { weight: 3, value: 4 },
            { weight: 4, value: 5 },
            { weight: 5, value: 6 },
          ],
          capacity: 5,
          correctSteps: [
            "Consider item 1 (w=2, v=3): max(0, 3) = 3",
            "Consider item 2 (w=3, v=4): max(3, 4) = 4",
            "Consider item 3 (w=4, v=5): max(4, 5) = 5",
            "Consider item 4 (w=5, v=6): max(5, 6) = 6",
          ],
        },
        default: {
          problem: "fibonacci",
          n: 6,
          correctSteps: [
            "fib(6) = fib(5) + fib(4)",
            "fib(5) = fib(4) + fib(3)",
            "fib(4) = fib(3) + fib(2)",
            "fib(3) = fib(2) + fib(1)",
            "fib(2) = 1, fib(1) = 1",
          ],
        }
      };

      const config = dpConfigs[level as keyof typeof dpConfigs] || dpConfigs.default;

      return {
        puzzle: {
          puzzleType: "dynamicProgramming",
          problem: config.problem,
          n: config.n,
          items: config.items,
          capacity: config.capacity,
          memoTable: {},
          steps: [],
          correctSteps: config.correctSteps,
          currentStep: 0,
        },
      }
    }

    case "stackOverflow":
      return {
        puzzle: {
          puzzleType: "stackOverflow",
          stack: [],
          operations: ["push(5)", "push(3)", "pop()", "push(7)", "pop()", "push(1)"],
          correctResult: [5, 1],
          currentOperation: 0,
        },
      }

    case "linkedListCorruption":
      return {
        puzzle: {
          puzzleType: "linkedListCorruption",
          nodes: [
            { value: "A", next: null, id: 1 },
            { value: "B", next: null, id: 2 },
            { value: "C", next: null, id: 3 },
            { value: "D", next: null, id: 4 },
          ],
          correctConnections: [
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
          ],
          playerConnections: [],
        },
      }

    case "recursionLoop":
      return {
        puzzle: {
          puzzleType: "recursionLoop",
          recursionSteps: [
            "factorial(4)",
            "4 * factorial(3)",
            "4 * 3 * factorial(2)",
            "4 * 3 * 2 * factorial(1)",
            "4 * 3 * 2 * 1",
            "24",
          ],
          currentStep: 0,
          playerSteps: [],
        },
      }

    case "databaseCorruption":
      return {
        puzzle: {
          puzzleType: "databaseCorruption",
          tables: {
            users: [
              { id: 1, name: "Alice", age: 25 },
              { id: 2, name: "Bob", age: 30 },
            ],
            orders: [
              { id: 1, user_id: 1, product: "Laptop" },
              { id: 2, user_id: 2, product: "Phone" },
            ],
          },
          queries: [
            "SELECT * FROM users WHERE age > 25",
            "SELECT u.name, o.product FROM users u JOIN orders o ON u.id = o.user_id",
          ],
          currentQuery: 0,
          solved: 0,
        },
      }

    case "networkProtocol":
      return {
        puzzle: {
          puzzleType: "networkProtocol",
          layers: ["Physical", "Data Link", "Network", "Transport", "Session", "Presentation", "Application"],
          corruptedLayers: [2, 4, 6],
          repairedLayers: [],
          currentLayer: 0,
        },
      }

    case "multiAlgorithm": {
      // Comprehensive final challenge with multiple algorithm types
      return {
        puzzle: {
          puzzleType: "multiAlgorithm",
          challenges: [
            {
              type: "sorting",
              description: "Sort the array using any algorithm",
              data: [64, 34, 25, 12, 22, 11, 90, 45, 72, 18],
              solved: false
            },
            {
              type: "searching",
              description: "Find the target value in the sorted array",
              data: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
              target: 13,
              solved: false
            },
            {
              type: "tree_traversal",
              description: "Perform inorder traversal of the binary tree",
              data: {
                value: 50,
                left: { value: 30, left: { value: 20 }, right: { value: 40 } },
                right: { value: 70, left: { value: 60 }, right: { value: 80 } },
              },
              solved: false
            },
            {
              type: "graph_pathfinding",
              description: "Find shortest path from A to F",
              data: {
                A: ["B", "C"],
                B: ["A", "D", "E"],
                C: ["A", "F"],
                D: ["B"],
                E: ["B", "F"],
                F: ["C", "E"],
              },
              solved: false
            },
            {
              type: "hash_resolution",
              description: "Resolve hash table collisions",
              data: [
                { key: "user_01", hash: 1 },
                { key: "user_08", hash: 1 },
                { key: "file_03", hash: 3 },
                { key: "file_10", hash: 3 },
              ],
              solved: false
            },
            {
              type: "recursion_optimization",
              description: "Implement memoized fibonacci",
              data: { n: 10 },
              solved: false
            },
          ],
          currentChallenge: 0,
          totalSolved: 0,
        },
      }
    }

    case "terminalHacking": {
      // Progressive command sequences based on level
      const commandSequences = {
        5: {
          commands: ["scan", "isolate", "purge", "restore"],
          description: "Basic system recovery protocol",
        },
        10: {
          commands: ["scan", "analyze", "isolate", "patch", "restore"],
          description: "Advanced system diagnostics",
        },
        default: {
          commands: ["scan", "isolate", "purge", "restore"],
          description: "Emergency system recovery",
        }
      };

      const sequence = commandSequences[level as keyof typeof commandSequences] || commandSequences.default;

      return {
        puzzle: {
          puzzleType: "terminalHacking",
          commandsExecuted: [],
          requiredCommands: sequence.commands,
          currentStep: 0,
        },
        terminalLines: [
          `SYSTEM INTEGRITY COMPROMISED - LEVEL ${level}`,
          `Initiating ${sequence.description}...`,
          `Available commands: ${sequence.commands.join(", ")}, help`,
          "",
          "Type 'help' for command descriptions.",
          `Time remaining: ${LEVELS[level - 1].timeLimit} seconds`,
        ],
      }
    }
  }
}
