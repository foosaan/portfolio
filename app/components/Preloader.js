"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "$ initializing system...", delay: 0 },
  { text: "> loading modules ████████████ 100%", delay: 400 },
  { text: "> compiling components...", delay: 800 },
  { text: "> fetching portfolio data...", delay: 1200 },
  { text: "> optimizing assets...", delay: 1500 },
  { text: "> starting dev server...", delay: 1800 },
  { text: "", delay: 2100 },
  { text: "✓ Ready", delay: 2100, accent: true },
];

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    // Prevent scroll during preloader
    document.body.style.overflow = "hidden";

    bootLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, line.delay);
    });

    // Fade out after boot sequence
    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="preloader-content">
            {/* Logo */}
            <motion.div
              className="preloader-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="logo-bracket">{"{"}</span> dev
              <span className="logo-dot">.</span>folio{" "}
              <span className="logo-bracket">{"}"}</span>
            </motion.div>

            {/* Terminal boot sequence */}
            <div className="preloader-terminal">
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  className={`preloader-line ${line.accent ? "preloader-line-accent" : ""}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {line.text}
                </motion.div>
              ))}
            </div>

            {/* Loading bar */}
            <div className="preloader-bar-track">
              <motion.div
                className="preloader-bar-fill"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
