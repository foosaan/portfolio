"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download } from "lucide-react";
import StatsCounter from "./StatsCounter";
import TerminalWindow from "./TerminalWindow";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const aboutData = [
  { key: '"name":', value: '"Fauzan Alfikri",' },
  { key: '"role":', value: '"Full-Stack Developer",' },
  { key: '"location":', value: '"Yogyakarta, Indonesia",' },
  { key: '"focus":', value: '"Web Development",' },
  { key: '"education":', value: '"Technology Information",' },
  { key: '"available":', value: "true" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section" id="about" ref={ref}>
      <motion.span className="section-label" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
        {"// About Me"}
      </motion.span>
      <motion.h2 className="section-title" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.1 }}>
        <span className="accent">const</span> aboutMe
      </motion.h2>
      <motion.p className="section-desc" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.15 }}>
        A passionate developer who loves building things for the web and beyond.
      </motion.p>

      <div className="about-grid">
        {/* Left: Terminal with Photo */}
        <motion.div
          className="about-terminal-col"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <TerminalWindow title="about.json">
            <div className="terminal-body">
              <div className="terminal-photo-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile.jpg" alt="Fauzan Alfikri" className="terminal-photo" />
              </div>
              <div className="terminal-divider">
                <span>─── data ───</span>
              </div>
              {aboutData.map((item, i) => (
                <motion.div
                  className="about-line"
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                >
                  <span className="key">{item.key}</span>
                  <span className="value">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </TerminalWindow>
        </motion.div>

        {/* Right: Text + CTA */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="about-text">
            <p>
              With a strong background in <strong style={{ color: "var(--accent-cyan)" }}>Informatics Engineering</strong>,
              I specialize in building modern web applications and mobile solutions that are fast,
              accessible, and designed with purpose.
            </p>
            <p>
              I&apos;m passionate about writing clean, maintainable code and creating seamless user
              experiences. From front-end interfaces to back-end APIs, I enjoy the full spectrum of
              development.
            </p>
            <p>
              Based in <strong style={{ color: "var(--accent-purple)" }}>Yogyakarta, Indonesia</strong>,
              I&apos;m always open to new challenges and collaboration opportunities.
            </p>
          </div>

          <motion.a
            href="/cv.pdf"
            download="CV_Fauzan_Alfikri.pdf"
            className="btn btn-secondary"
            style={{ marginTop: 24, display: "inline-flex" }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ scale: 1.02 }}
          >
            <Download size={16} /> Download CV
          </motion.a>
        </motion.div>
      </div>

      {/* Stats Counter */}
      <StatsCounter />
    </section>
  );
}

