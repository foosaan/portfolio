"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TerminalWindow({ title, children, style, className = "" }) {
  const [state, setState] = useState("open"); // "open" | "minimized" | "closed"

  if (state === "closed") {
    return (
      <motion.div
        className={`terminal-window terminal-closed ${className}`}
        style={style}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setState("open")}
      >
        <div className="terminal-header">
          <span className="terminal-dot green clickable" onClick={(e) => { e.stopPropagation(); setState("open"); }} title="Open" />
          <span className="terminal-title">{title} — (closed, click to reopen)</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`terminal-window ${className}`}
      style={style}
      layout
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="terminal-header">
        <span
          className="terminal-dot red clickable"
          onClick={() => setState("closed")}
          title="Close"
        />
        <span
          className="terminal-dot yellow clickable"
          onClick={() => setState(state === "minimized" ? "open" : "minimized")}
          title={state === "minimized" ? "Expand" : "Minimize"}
        />
        <span
          className="terminal-dot green clickable"
          onClick={() => setState("open")}
          title="Expand"
        />
        <span className="terminal-title">{title}</span>
      </div>
      <AnimatePresence>
        {state === "open" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
