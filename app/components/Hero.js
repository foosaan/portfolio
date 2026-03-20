"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Mail } from "lucide-react";
import TerminalWindow from "./TerminalWindow";

const phrases = [
  "Full-Stack Web Developer",
  "UI/UX Enthusiast",
];

function TypingText() {
  const [displayText, setDisplayText] = useState("");
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    let timeout;

    const type = () => {
      const current = phrases[phraseIdx.current];
      let speed = 80;

      if (isDeleting.current) {
        setDisplayText(current.substring(0, charIdx.current - 1));
        charIdx.current--;
        speed = 40;
      } else {
        setDisplayText(current.substring(0, charIdx.current + 1));
        charIdx.current++;
        speed = 80;
      }

      if (!isDeleting.current && charIdx.current === current.length) {
        speed = 2000;
        isDeleting.current = true;
      } else if (isDeleting.current && charIdx.current === 0) {
        isDeleting.current = false;
        phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        speed = 400;
      }

      timeout = setTimeout(type, speed);
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span>
      {displayText}
      <span className="cursor" />
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Hero() {
  const terminalRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!terminalRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      terminalRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="hero section" id="home">
      <div className="hero-content">
        {/* Terminal */}
        <motion.div
          ref={terminalRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginBottom: 36 }}
        >
          <TerminalWindow title="~/portfolio — zsh">
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="prompt">❯</span>
                <span className="command">cd</span>
                <span className="output">~/portfolio</span>
              </div>
              <div className="terminal-line">
                <span className="prompt">❯</span>
                <span className="command">npm</span>
                <span className="flag">run</span>
                <span className="output">dev</span>
              </div>
              <div className="terminal-line">
                <span className="prompt">❯</span>
                <span className="command">git</span>
                <span className="flag">status</span>
              </div>
              <div className="terminal-line">
                <span className="output" style={{ opacity: 0.6 }}>
                  &nbsp; ✓ On branch main — nothing to commit, working tree clean
                </span>
              </div>
            </div>
          </TerminalWindow>
        </motion.div>

        {/* Text */}
        <motion.p className="hero-greeting" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          {"// Hello, World! 👋"}
        </motion.p>
        <motion.h1 className="hero-name" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
          Fauzan ALfikri
        </motion.h1>
        <motion.p className="hero-role" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
          <TypingText />
        </motion.p>
        <motion.p className="hero-desc" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
          I craft modern, performant, and beautiful web & mobile applications.
          Passionate about clean code, great UX, and turning ideas into reality.
        </motion.p>
        <motion.div className="hero-buttons" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
          <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}>
            <FolderOpen size={16} /> View Projects
          </a>
          <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            <Mail size={16} /> Hire Me
          </a>
        </motion.div>

        {/* Floating Commands */}
        <div className="hero-float-cmds">
          {["$ npm run build", "$ git push origin main", "$ docker compose up"].map((cmd, i) => (
            <motion.div
              key={cmd}
              className="float-cmd"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
            >
              {cmd}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
