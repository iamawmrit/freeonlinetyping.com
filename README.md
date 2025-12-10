# Rith Typing Pro

A high-performance, full-stack typing test application inspired by Monkeytype, featuring a futuristic "Cyber-Zenith" aesthetic.

## 🚀 Features

- **Multiple Test Modes**: Time (15s, 30s, 60s), Words (10, 25, 50, 100), Quote, Zen, and Custom.
- **Cyber-Zenith Theme**: Deep navy background with electric cyan and laser gold accents, CRT scanline effects, and glowing UI elements.
- **Real-time Statistics**: Live WPM, accuracy, and character tracking.
- **Smooth Animations**: Powered by Framer Motion for fluid transitions and cursor movement.
- **Virtual Keyboard**: Interactive on-screen keyboard that reacts to your typing.
- **Result Analysis**: Detailed breakdown of performance with shareable results.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite (Next.js-compatible architecture)
- **Styling**: Tailwind CSS 4 + CSS Variables
- **State Management**: Zustand
- **Animations**: Framer Motion + Canvas Confetti
- **Icons**: Lucide React
- **Fonts**: JetBrains Mono (Monospace), Orbitron (Display)

## 🏃‍♂️ Getting Started

1.  **Install Dependencies**:
    ```bash
    pnpm install
    ```

2.  **Start Development Server**:
    ```bash
    pnpm dev
    ```

3.  **Build for Production**:
    ```bash
    pnpm build
    ```

## 🎨 Customization

- **Theme**: Edit `client/src/index.css` to modify the CSS variables for colors and fonts.
- **Word Lists**: Update `client/src/lib/words.ts` to add more words or support new languages.
- **Configuration**: Default test settings can be modified in `client/src/lib/store.ts`.

## 📄 License

MIT
