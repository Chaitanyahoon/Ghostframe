export function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "text-green-400 border-green-400"
    case "Medium":
      return "text-yellow-400 border-yellow-400"
    case "Hard":
      return "text-orange-400 border-orange-400"
    case "Extreme":
      return "text-red-400 border-red-400"
    case "Nightmare":
      return "text-purple-400 border-purple-400"
    case "Impossible":
      return "text-pink-400 border-pink-400"
    case "Legendary":
      return "text-cyan-400 border-cyan-400"
    default:
      return "text-gray-400 border-gray-400"
  }
}
