"use client"

import { useEffect, useState } from "react"
import { GameChrome } from "@/components/game/game-chrome"
import { GameSession } from "@/components/game/game-session"
import { EscapeScreen } from "@/components/game/screens/escape-screen"
import { GameOverScreen } from "@/components/game/screens/game-over-screen"
import { IntroScreen } from "@/components/game/screens/intro-screen"
import { LevelSelectScreen } from "@/components/game/screens/level-select-screen"
import { useGhostFrameGame } from "@/hooks/useGhostFrameGame"

export default function GhostFramePage() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReducedMotion(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  const {
    gameState,
    dispatch,
    glitchIntensity,
    terminalInput,
    setTerminalInput,
    terminalOutput,
    currentPuzzleData,
    currentLevelConfig,
    audioRef,
    playSynthSound,
    initializeLevel,
    handlePuzzleAction,
    handleTerminalSubmit,
    showHintSystem,
    extendTimer,
    dismissHint,
    resumeGame,
    hasSavedGame,
  } = useGhostFrameGame()

  return (
    <GameChrome
      screen={gameState.currentScreen}
      glitchIntensity={glitchIntensity}
      reducedMotion={reducedMotion}
      enemies={gameState.enemyPositions}
    >
      <audio ref={audioRef} className="hidden" aria-hidden />

      {gameState.currentScreen === "intro" && (
        <IntroScreen
          onEnter={() => dispatch({ type: "MERGE", patch: { currentScreen: "levelSelect" } })}
          onResume={resumeGame}
          hasSavedGame={hasSavedGame}
          playSound={playSynthSound}
        />
      )}

      {gameState.currentScreen === "levelSelect" && (
        <LevelSelectScreen
          gameState={gameState}
          onSelectLevel={initializeLevel}
          onBack={() => dispatch({ type: "MERGE", patch: { currentScreen: "intro" } })}
        />
      )}

      {gameState.currentScreen === "game" && currentLevelConfig && currentPuzzleData && (
        <GameSession
          gameState={gameState}
          currentLevelConfig={currentLevelConfig}
          currentPuzzleData={currentPuzzleData as NonNullable<typeof currentPuzzleData>}
          onPuzzleAction={handlePuzzleAction}
          onAbort={() => dispatch({ type: "MERGE", patch: { currentScreen: "levelSelect" } })}
          onToggleStealth={() =>
            dispatch({
              type: "MERGE_FN",
              fn: (prev) => ({ ...prev, playerHidden: !prev.playerHidden }),
            })
          }
          showHintSystem={showHintSystem}
          extendTimer={extendTimer}
          dismissHint={dismissHint}
          playSound={playSynthSound}
          terminalInput={terminalInput}
          setTerminalInput={setTerminalInput}
          terminalOutput={terminalOutput}
          onTerminalSubmit={handleTerminalSubmit}
        />
      )}

      {gameState.currentScreen === "gameOver" && (
        <GameOverScreen
          onRetry={() => initializeLevel(gameState.currentLevel)}
          onLevelSelect={() => dispatch({ type: "MERGE", patch: { currentScreen: "levelSelect" } })}
        />
      )}

      {gameState.currentScreen === "escape" && <EscapeScreen onRestart={() => window.location.reload()} />}
    </GameChrome>
  )
}
