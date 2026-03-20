"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { label: "Projects", value: 5, suffix: "+", color: "var(--accent-cyan)" },
  { label: "Internships", value: 2, suffix: "", color: "var(--accent-purple)" },
  { label: "Certificates", value: 3, suffix: "+", color: "var(--accent-green)" },
  { label: "Years Coding", value: 3, suffix: "+", color: "var(--accent-orange)" },
];

function AnimatedCounter({ target, suffix, color, inView, delay }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, target, delay]);

  return (
    <span className="stat-number" style={{ color }}>
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="stats-grid" ref={ref}>
      {stats.map((stat, i) => (
        <motion.div
          className="stat-card"
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
          whileHover={{ y: -4, borderColor: "var(--border-glow)", boxShadow: "0 0 20px rgba(0,229,255,.1)" }}
        >
          <AnimatedCounter
            target={stat.value}
            suffix={stat.suffix}
            color={stat.color}
            inView={inView}
            delay={200 + i * 150}
          />
          <span className="stat-label">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
