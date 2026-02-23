# 🔤 Tapple

A digital recreation of the fast-paced word game **Tapple**, built with React, Vite, TypeScript, and MobX.

## What is Tapple?

Tapple is a category-based word game where players race against the clock. Each round, a category is drawn (e.g. *"Things in a kitchen"*) and players take turns naming a word that fits — but each word must start with a letter that hasn't been used yet. Tap the letter, reset the timer, and pass it along. Run out of time or letters and you're out!

## Features

- 🔡 Interactive letter board — tap letters to mark them as used
- ⏱️ Countdown timer that resets with each successful play
- 📋 Category display for each round
- 🔄 Round reset to restore all letters and restart the timer
- ⚡ Reactive UI powered by MobX — state changes reflect instantly

## Tech Stack

- [React](https://react.dev/) — component-based UI
- [Vite](https://vitejs.dev/) — fast dev server and build tool
- [TypeScript](https://www.typescriptlang.org/) — type-safe development
- [MobX](https://mobx.js.org/) + [mobx-react-lite](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite) — observable state management
- [styled-components](https://styled-components.com/) — component-level styling

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/tapple.git
cd tapple
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

## How to Play

1. Draw a category from the deck (or select one from the list)
2. The timer starts — you have **10 seconds**
3. Say a word that fits the category and starts with any available letter
4. Tap that letter to mark it as used
5. The timer resets and passes to the next player
6. If a player can't think of a word before time runs out, they're eliminated
7. Last player standing wins the round!

## Project Structure

```
src/
├── components/
│   ├── Letter.tsx         # Individual letter button
│   ├── LetterBoard.tsx    # Full A–Z letter grid
│   ├── Modal.tsx          # Parent modal component
│   └── CategoryCard.tsx   # Displays the active category
├── stores/
│   └── TappleStore.ts     # MobX store — letter states, timer, game logic
├── App.tsx
└── main.tsx
```

## License

MIT
