"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, Code2, Package, GraduationCap,
  Building2, Award, FolderOpen, Mail, Search, Command
} from "lucide-react";

const palette = [
  { id: "home", label: "Home", icon: Home, keywords: "home landing hero" },
  { id: "about", label: "About Me", icon: User, keywords: "about info bio" },
  { id: "skills", label: "Skills", icon: Code2, keywords: "skills tech abilities" },
  { id: "techstack", label: "Tech Stack", icon: Package, keywords: "tech stack tools" },
  { id: "education", label: "Education", icon: GraduationCap, keywords: "education school university" },
  { id: "techexperience", label: "Experience", icon: Building2, keywords: "experience work intern" },
  { id: "certificates", label: "Certificates", icon: Award, keywords: "certificates certs awards" },
  { id: "projects", label: "Projects", icon: FolderOpen, keywords: "projects portfolio work" },
  { id: "contact", label: "Contact", icon: Mail, keywords: "contact email hire" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  const filtered = palette.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.keywords.includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e) => {
      // Ctrl+K or Cmd+K to toggle
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelected(0);
      }
      // Escape to close
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    },
    [open]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const navigate = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
    setQuery("");
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[selected]) {
      navigate(filtered[selected].id);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="cmd-palette"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="cmd-search">
              <Search size={16} />
              <input
                ref={inputRef}
                type="text"
                className="cmd-input"
                placeholder="Search sections... (↑↓ to navigate, Enter to select)"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                onKeyDown={handleInputKeyDown}
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="cmd-kbd">ESC</kbd>
            </div>

            {/* Results */}
            <div className="cmd-results">
              {filtered.length === 0 ? (
                <div className="cmd-empty">No results found.</div>
              ) : (
                filtered.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      className={`cmd-item ${i === selected ? "cmd-item-active" : ""}`}
                      key={item.id}
                      onClick={() => navigate(item.id)}
                      onMouseEnter={() => setSelected(i)}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                      <span className="cmd-item-id">#{item.id}</span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="cmd-footer">
              <span><kbd>↑↓</kbd> Navigate</span>
              <span><kbd>↵</kbd> Select</span>
              <span><kbd>ESC</kbd> Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
