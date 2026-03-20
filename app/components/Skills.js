"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Server, Smartphone, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const skillCategories = [
  {
    title: "Frontend",
    icon: Monitor,
    color: "var(--accent-cyan)",
    colorRaw: "0,229,255",
    skills: [
      { name: "HTML / CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "React.js", level: 85 },
      { name: "Vue.js", level: 80 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "var(--accent-purple)",
    colorRaw: "191,90,242",
    skills: [
      { name: "Laravel / PHP", level: 92 },
      { name: "Node.js", level: 85 },
      { name: "Python", level: 78 },
      { name: "REST API", level: 90 },
      { name: "MySQL", level: 88 },
    ],
  },
  {
    title: "Others",
    icon: Zap,
    color: "var(--accent-green)",
    colorRaw: "57,255,20",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "Figma", level: 78 },
    ],
  },
];

function CircularProgress({ level, color, colorRaw, inView, delay }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <div className="skill-ring-wrapper">
      <svg className="skill-ring" width="88" height="88" viewBox="0 0 88 88">
        {/* Background track */}
        <circle
          cx="44" cy="44" r={radius}
          fill="none"
          stroke="rgba(255,255,255,.06)"
          strokeWidth="5"
        />
        {/* Animated progress arc */}
        <motion.circle
          cx="44" cy="44" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay }}
          style={{
            transformOrigin: "center",
            transform: "rotate(-90deg)",
            filter: `drop-shadow(0 0 6px rgba(${colorRaw},.4))`,
          }}
        />
      </svg>
      <motion.span
        className="skill-ring-value"
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay + 0.5, duration: 0.4 }}
      >
        {level}%
      </motion.span>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section" id="skills" ref={ref}>
      <motion.span className="section-label" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
        {"// Skills"}
      </motion.span>
      <motion.h2 className="section-title" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.1 }}>
        <span className="accent">import</span> {"{ skills }"}
      </motion.h2>
      <motion.p className="section-desc" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.15 }}>
        Technologies and tools I work with on a daily basis.
      </motion.p>

      <div className="skills-grid">
        {skillCategories.map((cat, catIdx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              className="skill-category"
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + catIdx * 0.12 }}
              whileHover={{ borderColor: "var(--border-glow)", boxShadow: `0 0 30px rgba(${cat.colorRaw},.12)` }}
            >
              {/* Category Glow */}
              <div className="skill-cat-glow" style={{ background: `radial-gradient(circle at 50% 0%, rgba(${cat.colorRaw},.08), transparent 70%)` }} />

              {/* Header */}
              <div className="skill-cat-header">
                <div className="skill-cat-icon" style={{ background: `rgba(${cat.colorRaw},.1)`, color: cat.color }}>
                  <Icon size={20} />
                </div>
                <h3 className="skill-category-title" style={{ color: cat.color }}>
                  {cat.title}
                </h3>
              </div>

              {/* Skills with circular progress */}
              <div className="skill-rings-grid">
                {cat.skills.map((skill, skillIdx) => (
                  <motion.div
                    className="skill-ring-item"
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + catIdx * 0.15 + skillIdx * 0.08 }}
                  >
                    <CircularProgress
                      level={skill.level}
                      color={cat.color}
                      colorRaw={cat.colorRaw}
                      inView={inView}
                      delay={0.3 + catIdx * 0.15 + skillIdx * 0.1}
                    />
                    <span className="skill-ring-label">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
