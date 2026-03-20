"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const COMMANDS = {
  help: () => [
    "Available commands:",
    "  about      — Who am I?",
    "  skills     — My tech stack",
    "  projects   — View my projects",
    "  contact    — Get in touch",
    "  social     — Social links",
    "  clear      — Clear terminal",
    "  whoami     — Current user",
    "  date       — Current date",
    "  neofetch   — System info",
    "",
    'Type a command and press Enter…',
  ],
  about: () => [
    "╔═══════════════════════════════════════╗",
    "║         FAUZAN ALFIKRI                ║",
    "║     Full-Stack Web Developer          ║",
    "╠═══════════════════════════════════════╣",
    "║  📍 Yogyakarta, Indonesia             ║",
    "║  🎓 Informatics Engineering - UMY     ║",
    "║  💼 Available for hire                ║",
    "╚═══════════════════════════════════════╝",
  ],
  skills: () => [
    "⚡ Frontend:  HTML/CSS • JavaScript • React • Vue • Tailwind",
    "⚡ Backend:   Laravel/PHP • Node.js • Python • REST API",
    "⚡ Database:  MySQL • PostgreSQL",
    "⚡ Tools:     Git • Docker • Figma • VS Code",
  ],
  projects: () => {
    // Scroll to projects section
    setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
    return [
      "📁 Navigating to projects section...",
      "",
      "→ Sistem Absensi Pegawai Kontrak TVRI",
      "→ Serdadu Kumbang",
      "→ SIG Kampung Wisata Purbayan",
      "→ WebBerkas - KPPN Jogja",
    ];
  },
  contact: () => {
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
    return [
      "📬 Navigating to contact section...",
      "",
      "📧 Email:    fauzan4297@gmail.com",
      "🔗 GitHub:   github.com/foosaan",
      "💬 Let's connect!",
    ];
  },
  social: () => [
    "🔗 GitHub:    github.com/foosaan",
    "🔗 LinkedIn:  linkedin.com/in/fauzanalfikri",
    "📧 Email:     fauzan4297@gmail.com",
  ],
  whoami: () => ["fauzan@portfolio:~$ root (developer)"],
  date: () => [new Date().toLocaleString("id-ID", { dateStyle: "full", timeStyle: "medium" })],
  neofetch: () => [
    "        ╭──────────────╮",
    "   ⬢    │  dev.folio   │",
    "  ⬢ ⬢   ╰──────────────╯",
    " ⬢   ⬢  OS:      Next.js 16",
    "  ⬢ ⬢   Shell:   React 19",
    "   ⬢    Theme:   Terminal Dark",
    "        Font:    JetBrains Mono",
    "        Uptime:  ∞",
  ],
};

export default function InteractiveTerminal() {
  const [history, setHistory] = useState([
    { type: "output", lines: ["Welcome to dev.folio terminal! Type 'help' for available commands.", ""] },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: "command", text: cmd }];

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      newHistory.push({ type: "output", lines: handler() });
    } else {
      newHistory.push({ type: "output", lines: [`command not found: ${cmd}`, "Type 'help' for available commands."] });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className="terminal-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle interactive terminal"
      >
        {isOpen ? "✕" : ">_"}
      </motion.button>

      {/* Terminal Panel */}
      {isOpen && (
        <motion.div
          className="interactive-terminal"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="terminal-header">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="terminal-title">interactive — zsh</span>
            <button className="it-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="it-body" onClick={() => inputRef.current?.focus()}>
            {history.map((entry, i) =>
              entry.type === "command" ? (
                <div className="it-line" key={i}>
                  <span className="it-prompt">❯</span>
                  <span className="it-cmd">{entry.text}</span>
                </div>
              ) : (
                entry.lines.map((line, j) => (
                  <div className="it-output" key={`${i}-${j}`}>{line}</div>
                ))
              )
            )}
            <form onSubmit={handleSubmit} className="it-input-line">
              <span className="it-prompt">❯</span>
              <input
                ref={inputRef}
                type="text"
                className="it-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </form>
            <div ref={terminalEndRef} />
          </div>
        </motion.div>
      )}
    </>
  );
}
