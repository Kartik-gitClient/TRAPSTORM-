# TRAPSTORM!

A fun web‑app that generates creative prompts for brainstorming, writing, or party games. The app displays a random prompt drawn from a large collection stored in `src/pages/data/Data.json`.

## Features

- Randomly selects a prompt from a curated list of over 200 items.
- Prompts are categorized by tags such as **Invention Twist**, **Specific**, **Situation**, **Gen Z**, **Thought** etc.
- Simple React front‑end built with Vite (or similar) – see `src/main.jsx` and page components under `src/pages/`.
- Data driven: all prompts are stored in a single JSON file (`src/pages/data/Data.json`) making it easy to extend.

## Project Structure

```
├── index.html                # Entry HTML file
├── src/
│   ├── main.jsx              # React entry point
│   ├── assets/               # Images, icons, etc.
│   └── pages/
│       ├── data/Data.json    # Prompt database
│       └── ...                # Page components
└── README.md                 # You are here
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or the port shown in the console).
3. **Build for production**
   ```bash
   npm run build
   ```
   The static files will be output to the `dist/` directory.

## Adding New Prompts

Edit `src/pages/data/Data.json`. Each entry is a string in the format:
```
"[Category] Prompt text"
```
- Keep the JSON array syntax valid (commas between entries, quotes around each string).
- After editing, the app will automatically include the new prompts on the next reload.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. Follow the existing coding style (React + JSX, use functional components, keep JSON data tidy).

## License

This project is open‑source and available under the MIT License.
