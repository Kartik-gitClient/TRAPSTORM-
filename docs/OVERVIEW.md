# Project Overview

## What is Trapstorm?
Trapstorm is a web‑based party game built with **React** and **Vite**. Players join a lobby, select a game mode, and compete across three mini‑games:
1. **Name Drop** – rapid‑fire category answers.
2. **Roast Rumble** – persuasive debates on whimsical topics.
3. **Mind Meld** – clue‑giving without naming the target.

The app supports both **Normal** (single game at a time) and **Storm** (all three games back‑to‑back) modes.

## Repository Structure
```
.
├── public/                 # Static assets (vite logo, etc.)
├── src/                    # Source code
│   ├── assets/             # Images used in the UI
│   ├── components/         # Reusable React components (Header, VersionControl)
│   ├── context/            # React context for global game state (GameContext.jsx)
│   ├── pages/              # Page‑level components for each route
│   │   ├── Home.jsx
│   │   ├── HowToPlay.jsx
│   │   ├── Lobby.jsx
│   │   ├── MindMeld.jsx
│   │   ├── ModeSelect.jsx
│   │   ├── Play.jsx
│   │   ├── Results.jsx
│   │   ├── RoastRumble.jsx
│   │   ├── Settings.jsx
│   │   └── data/Data.json   # Game data (questions, topics, etc.)
│   ├── App.jsx             # Root component with routing
│   ├── index.css           # Global CSS (mostly resets)
│   └── main.jsx            # Entry point, mounts React app
├── server.js               # Simple Express server for production builds
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project description (this file)
```

## Key Technologies
- **React 18** with functional components & hooks
- **React Router** for client‑side navigation
- **Vite** for fast development builds
- **Express** (server.js) for serving the production bundle
- **ESLint** configured via `eslint.config.js`

## Getting Started
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Contributing
1. Fork the repository.
2. Create a feature branch.
3. Follow the existing code style (ESLint rules).
4. Submit a pull request.

For detailed component documentation, see the inline JSDoc comments within each file.
