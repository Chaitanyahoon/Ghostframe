# 👻 GhostFrame

**GhostFrame** is a glitch horror puzzle game built with **Next.js**, **React**, and **Tailwind CSS**.

You are trapped inside a corrupted simulation. Repair broken systems, outsmart hostile AI, and escape through 15 escalating levels of logic-based challenges.

🎮 Live demo: https://ghostframe-seven.vercel.app/

---

## 🕹️ What is GhostFrame?

GhostFrame blends atmospheric horror styling with puzzle-driven gameplay. Players progress through a series of levels that test logic, pattern recognition, and timing while navigating a collapsing digital environment.

Key gameplay elements:

- 15 progressive levels of corruption and puzzles
- level select matrix with unlockable stages
- real-time threat management and stealth mechanics
- code fragment, logic gate, recursion, and memory puzzles
- auto-save and resume support

---

## ✨ Features

- **Mobile-first UX** with responsive layout, large touch targets, and safe-area support
- **Modern horror aesthetic** using glitch effects, CRT-style overlays, and low-light UI
- **Puzzle variety**: logic gates, binary trees, linked lists, recursion loops, and more
- **Sound-driven feedback** with micro-synth audio cues for actions and failures
- **Progress tracking** and best-time indicators per level
- **Client-side persistence** using browser storage

---

## 🧰 Tech Stack

- **Next.js 15**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Vitest** for testing
- **Lucide React** icons
- **Radix UI / shadcn** components

---

## 🚀 Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Chaitanyahoon/ghostframe.git
   cd ghostframe/Ghostframe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Open the app:
   ```text
   http://localhost:3000
   ```

---

## 🧪 Build & Test

- Build production output:
  ```bash
  npm run build
  ```

- Run tests:
  ```bash
  npm test
  ```

---

## 📁 Project Structure

- `app/` — Next.js App Router pages and global styling
- `components/` — reusable UI elements and game screens
- `hooks/` — client behavior and game state hooks
- `lib/` — game engine, puzzle definitions, persistence, and utilities
- `public/` — static assets

---

## 💡 Notes

- The game uses browser storage for progress and resumed sessions.
- The UI is designed for both desktop and mobile gameplay.

---

## 📜 License

GhostFrame is licensed under the MIT License.



