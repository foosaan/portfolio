"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Code2,
  Package,
  GraduationCap,
  Building2,
  Award,
  FolderOpen,

  Mail,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "techstack", label: "Tech Stack", icon: Package },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "techexperience", label: "Experience", icon: Building2 },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "projects", label: "Projects", icon: FolderOpen },

  { id: "contact", label: "Contact", icon: Mail },
];

export default function Sidebar() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      const sections = document.querySelectorAll(".section");
      let current = "home";

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          current = section.getAttribute("id") || "home";
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="sidebar-overlay show"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            style={{ display: "block" }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <nav className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <span className="logo-text" onClick={() => scrollTo("home")}>
            <span className="logo-bracket">{"{"}</span> dev
            <span className="logo-dot">.</span>folio{" "}
            <span className="logo-bracket">{"}"}</span>
          </span>
        </div>

        <ul className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li className="nav-item" key={item.id}>
                <button
                  className={`nav-link ${active === item.id ? "active" : ""}`}
                  onClick={() => scrollTo(item.id)}
                >
                  <Icon size={18} />
                  <span className="nav-text">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-footer">
          <p>
            <span className="status-dot" /> Available for hire
          </p>
          <p style={{ marginTop: 8, fontSize: ".65rem", color: "var(--text-muted)" }}>
            Press <kbd style={{ padding: "1px 5px", background: "rgba(255,255,255,.06)", border: "1px solid var(--border-color)", borderRadius: 3, fontSize: ".6rem" }}>⌘K</kbd> to navigate
          </p>
        </div>
      </nav>
    </>
  );
}
