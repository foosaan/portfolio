"use client";

import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import TechStack from "./components/TechStack";
import Education from "./components/Education";
import TechExperience from "./components/TechExperience";
import Certificates from "./components/Certificates";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Preloader from "./components/Preloader";
import InteractiveTerminal from "./components/InteractiveTerminal";
import CommandPalette from "./components/CommandPalette";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <>
      <Preloader />
      <CommandPalette />
      <ThemeToggle />
      <InteractiveTerminal />
      <Sidebar />
      <main className="main-content">
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Education />
        <TechExperience />
        <Certificates />
        <Projects />
        <Contact />

        <footer className="footer">
          <p>
            Crafted by Fauzan Alfikri &copy;
          </p>
        </footer>
      </main>
    </>
  );
}
