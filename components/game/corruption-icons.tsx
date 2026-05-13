"use client"

import {
  AlertTriangle,
  Binary,
  Brain,
  Bug,
  Cpu,
  Database,
  Eye,
  GitBranch,
  Hash,
  Layers,
  Network,
  Skull,
  Zap,
} from "lucide-react"

export function getCorruptionIcon(corruptionType: string) {
  switch (corruptionType) {
    case "startup_failure":
      return <Cpu className="w-4 h-4" />
    case "circuit_damage":
      return <Zap className="w-4 h-4" />
    case "memory_leak":
      return <Brain className="w-4 h-4" />
    case "algorithm_decay":
      return <Binary className="w-4 h-4" />
    case "kernel_breach":
      return <img src="/logo-transparent.png" alt="skull" className="w-4 h-4 object-contain" />
    case "tree_corruption":
      return <GitBranch className="w-4 h-4" />
    case "network_failure":
      return <Network className="w-4 h-4" />
    case "hash_breakdown":
      return <Hash className="w-4 h-4" />
    case "recursion_bomb":
      return <Layers className="w-4 h-4" />
    case "stack_breach":
      return <Database className="w-4 h-4" />
    case "pointer_chaos":
      return <GitBranch className="w-4 h-4" />
    case "recursion_hell":
      return <AlertTriangle className="w-4 h-4" />
    case "db_meltdown":
      return <Database className="w-4 h-4" />
    case "protocol_decay":
      return <Network className="w-4 h-4" />
    case "total_collapse":
      return <img src="/logo-transparent.png" alt="skull" className="w-4 h-4 object-contain" />
    default:
      return <Bug className="w-4 h-4" />
  }
}

export function getEnemyIcon(type: string) {
  switch (type) {
    case "scanner":
      return <Eye className="w-full h-full" />
    case "hunter":
      return <Zap className="w-full h-full" />
    case "corruptor":
      return <img src="/logo-transparent.png" alt="skull" className="w-full h-full object-contain mix-blend-screen" />
    case "virus":
      return <AlertTriangle className="w-full h-full" />
    case "phantom":
      return <Binary className="w-full h-full" />
    default:
      return <Eye className="w-full h-full" />
  }
}

export function getEnemyColor(type: string) {
  switch (type) {
    case "scanner":
      return "bg-blue-500 shadow-blue-500/50"
    case "hunter":
      return "bg-red-500 shadow-red-500/50"
    case "corruptor":
      return "bg-emerald-500 shadow-emerald-500/50"
    case "virus":
      return "bg-green-500 shadow-green-500/50"
    case "phantom":
      return "bg-cyan-500 shadow-cyan-500/50"
    default:
      return "bg-red-500 shadow-red-500/50"
  }
}
