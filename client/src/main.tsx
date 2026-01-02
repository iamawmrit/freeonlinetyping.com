import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Easter egg for curious developers 🚀
const styles = {
    title: 'color: #00F0FF; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00F0FF;',
    subtitle: 'color: #FFD700; font-size: 16px; font-weight: bold;',
    text: 'color: #A0B0C0; font-size: 14px;',
    accent: 'color: #00F0FF; font-weight: bold;',
    link: 'color: #FFD700; text-decoration: underline;',
    art: 'color: #00F0FF; font-family: monospace; line-height: 1.2;'
};

console.log('%c' + `
██████╗ ██╗████████╗██╗  ██╗    ████████╗██╗   ██╗██████╗ ██╗███╗   ██╗ ██████╗ 
██╔══██╗██║╚══██╔══╝██║  ██║    ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██║████╗  ██║██╔════╝ 
██████╔╝██║   ██║   ███████║       ██║    ╚████╔╝ ██████╔╝██║██╔██╗ ██║██║  ███╗
██╔══██╗██║   ██║   ██╔══██║       ██║     ╚██╔╝  ██╔═══╝ ██║██║╚██╗██║██║   ██║
██║  ██║██║   ██║   ██║  ██║       ██║      ██║   ██║     ██║██║ ╚████║╚██████╔╝
╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝       ╚═╝      ╚═╝   ╚═╝     ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
`, styles.art);

console.log('%c⚡ Welcome to Free Online Typing! ⚡', styles.title);
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.accent);
console.log('%c✨ Hey there, developer! ✨', styles.subtitle);
console.log('%c', 'font-size: 2px;'); // spacing
console.log('%cLooks like you know your way around the console.', styles.text);
console.log('%cWant to test YOUR typing speed? Try beating %c100 WPM%c! 🚀', styles.text, styles.accent, styles.text);
console.log('%c', 'font-size: 2px;');
console.log('%c💡 Fun Fact:', styles.subtitle);
console.log('%cThe average typing speed is %c40 WPM%c.', styles.text, styles.accent, styles.text);
console.log('%cProgrammers average around %c60-70 WPM%c.', styles.text, styles.accent, styles.text);
console.log('%cTop typists can exceed %c150 WPM%c! 💨', styles.text, styles.accent, styles.text);
console.log('%c', 'font-size: 2px;');
console.log('%c🌐 Visit: %chttps://freeonlinetyping.com', styles.text, styles.link);
console.log('%c', 'font-size: 2px;');
console.log('%c💻 Created by awmrit | %chttps://awmrit.com', styles.text, styles.link);
console.log('%c', 'font-size: 2px;');
console.log('%c💬 Psst... Want to collaborate or have feedback? Reach out! 🤝', styles.subtitle);

createRoot(document.getElementById("root")!).render(<App />);
