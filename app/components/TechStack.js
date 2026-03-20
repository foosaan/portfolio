"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TerminalWindow from "./TerminalWindow";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const techSections = [
  {
    comment: "// ─── Frontend Dependencies ───",
    title: '"frontend"',
    items: [
      { name: "react", version: "^18.2.0" },
      { name: "next.js", version: "^14.0.0" },
      { name: "vue.js", version: "^3.4.0" },
      { name: "tailwindcss", version: "^3.4.0" },
    ],
  },
  {
    comment: "// ─── Backend Dependencies ───",
    title: '"backend"',
    items: [
      { name: "laravel", version: "^11.0" },
      { name: "node.js", version: "^20.0" },
      { name: "express", version: "^4.18.0" },
    ],
  },
  {
    comment: "// ─── Database & Infra ───",
    title: '"infrastructure"',
    items: [
      { name: "mysql", version: "^8.0" },
      { name: "postgresql", version: "^16.0" },
      { name: "docker", version: "^24.0" },
      { name: "git", version: "^2.43" },
    ],
  },
  {
    comment: "// ─── Design ───",
    title: '"design"',
    items: [
      { name: "figma", version: "latest" },
      { name: "adobe xd", version: "latest" },
    ],
  },
];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  let itemIndex = 0;

  return (
    <section className="section" id="techstack" ref={ref}>
      <motion.span className="section-label" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
        {"// Tech Stack"}
      </motion.span>
      <motion.h2 className="section-title" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.1 }}>
        <span className="accent">cat</span> package.json
      </motion.h2>
      <motion.p className="section-desc" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.15 }}>
        My go-to technologies, presented like a package manager.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <TerminalWindow title="package.json — techstack" className="techstack-terminal">
          <div className="techstack-body">
            {techSections.map((section, sIdx) => (
              <div key={sIdx}>
                <div className="techstack-comment" style={sIdx > 0 ? { marginTop: 20 } : {}}>
                  {section.comment}
                </div>
                <div className="techstack-section-title">{section.title}: {"{"}</div>
                {section.items.map((item) => {
                  itemIndex++;
                  return (
                    <motion.div
                      className="techstack-item"
                      key={item.name}
                      initial={{ opacity: 0, x: -15 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + itemIndex * 0.04 }}
                    >
                      <span className="pkg-quote">&quot;</span>
                      <span className="pkg-name">{item.name}</span>
                      <span className="pkg-quote">&quot;</span>
                      <span className="pkg-version">{item.version}</span>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </TerminalWindow>
      </motion.div>
    </section>
  );
}
