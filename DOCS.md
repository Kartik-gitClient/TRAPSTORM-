# TRAPSTORM Documentation

## Overview

TRAPSTORM is a React based web application that runs a multiplayer game where players compete across several categories, scoring points for successful "rope" actions and losing points for "trap" actions. The app is built with:
- **React** (functional components)
- **React Router** for navigation between pages (`/play`, `/results`, etc.)
- **Context API** (`GameContext`) for global state management
- **Framer Motion** for animated UI transitions
- **Tailwind CSS** for styling

## Project Structure

```
src/
├─ context/
│   └─ GameContext.jsx      # Provides game state & actions via React Context
├─ pages/
│   ├─ Play.jsx             # Main game loop, challenges, timer, scoring
│   └─ Results.jsx          # End‑game results display with scorecards
├─ App.jsx                  # Route definitions (not shown here)
├─ main.jsx                 # Entry point, renders <App /> inside <GameProvider>
└─ index.css                # Tailwind base styles
```

### `src/context/GameContext.jsx`

- Holds core state: players, scores, current turn, round number, category navigation, and game mode.
- Exposes helper functions via context:
  - `addPlayers` – initialise player list.
  - `addScore` – record a "rope" or "trap" for a player.
  - `nextTurn` – advance to the next player/round.
  - `resetGame` – bring the game back to its initial state.
  - `nextCategory` – move to the next category or navigate to results.
- Uses `useNavigate` from React Router to change routes after state updates, with a short timeout to ensure state is applied before navigation.

### `src/pages/Play.jsx`

- Retrieves game state and actions from `useGame()`.
- Loads challenge data from `data/Data.json`.
- Manages local UI state:
  - `challenge` – current challenge string.
  - `timeLeft` – countdown timer (35 seconds per turn).
  - `isTimeUp` – flag when timer expires.
- `useEffect` resets the timer and selects a new random challenge whenever the player or round changes.
- `handleScore(type)` records the player's action (`"rope"` or `"trap"`), then determines if the turn should advance to the next player, next round, or move to the next category.
- Renders the challenge, timer, and buttons for scoring.

### `src/pages/Results.jsx`

- Shows final rankings based on `scoreBoard`.
- Animates each player's scorecard with Framer Motion.
- Displays total points and a breakdown of ropes/traps per player.

### `src/main.jsx`

- Wraps the application in `<StrictMode>` and the `GameProvider` to make context available throughout the app.
- Renders the root component into the HTML element with id `root`.

## Key Concepts

1. **State Management via Context** – Centralizes all mutable game data, avoiding prop‑drilling.
2. **Navigation Timing** – `nextCategory` updates state then uses `setTimeout` before calling `navigate` to ensure React processes the state change first.
3. **Timer Logic** – A `setInterval` decrements `timeLeft`; when it reaches zero the interval is cleared and `isTimeUp` is set, prompting the UI to handle a timeout.
4. **Scoring** – `addScore` updates a nested `scoreBoard` object, tracking separate counts for `rope` and `trap` per player.
5. **Animations** – Framer Motion adds smooth entry transitions for player lists and scorecards, enhancing the UX.

## How to Run

```bash
npm install          # install dependencies
npm run dev          # start Vite dev server (assumes Vite setup)
```

The app will be available at `http://localhost:5173`. Navigate through the UI to add players, play the challenges, and view results.

## Extending the Game

- **Add New Categories**: Update the `categories` array in `GameContext.jsx` and provide corresponding challenge data in `Data.json`.
- **Custom Scoring Rules**: Modify `addScore` in `GameContext.jsx` to change point values or add new score types.
- **UI Enhancements**: Leverage Framer Motion for additional animations or replace Tailwind classes with your own design system.

---

*Generated documentation for developers to understand the codebase and contribute effectively.*