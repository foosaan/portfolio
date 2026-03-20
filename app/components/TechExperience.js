"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, ArrowUpRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const experiences = [
  {
    role: "Web Developer Intern",
    company: "TVRI Yogyakarta",
    period: "2026",
    type: "Internship",
    desc: "Developed employee attendance management system with full-stack approach.",
    tasks: [
      "Built attendance & shift scheduling system",
      "Implemented salary & payroll processing",
      "Designed multi-role admin dashboard",
      "Developed reporting with PDF & Excel export",
    ],
    tech: ["Laravel 11", "MySQL", "Tailwind CSS"],
    color: "var(--accent-cyan)",
    bg: "rgba(0,229,255,.08)",
  },
  {
    role: "IT Intern",
    company: "KPPN Yogyakarta",
    period: "2025",
    type: "Internship",
    desc: "Developed document management web application for government services.",
    tasks: [
      "Built file submission tracking system",
      "Implemented multi-role access control",
      "Created document status workflow",
      "Managed database design & optimization",
    ],
    tech: ["Laravel 12", "MySQL", "Tailwind CSS"],
    color: "var(--accent-purple)",
    bg: "rgba(191,90,242,.08)",
  },
  {
    role: "Freelance Developer",
    company: "Self-Employed",
    period: "2025 — Present",
    type: "Freelance",
    desc: "Building custom web and mobile solutions for various clients.",
    tasks: [
      "Custom web applications development",
      "Website design & development",
      "API integration & backend services",
      "Client consultation & project management",
    ],
    tech: ["React", "Next.js", "Laravel", "Node.js"],
    color: "var(--accent-green)",
    bg: "rgba(57,255,20,.08)",
  },
];

export default function TechExperience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section" id="techexperience" ref={ref}>
      <motion.span className="section-label" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
        {"// Work Experience"}
      </motion.span>
      <motion.h2 className="section-title" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.1 }}>
        <span className="accent">grep</span> --work-history
      </motion.h2>
      <motion.p className="section-desc" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.15 }}>
        Professional experience and career milestones.
      </motion.p>

      <div className="techexp-timeline">
        <div className="timeline-line" />
        {experiences.map((exp, i) => (
          <motion.div
            className="timeline-item"
            key={exp.company + exp.role}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
          >
            <div className="timeline-dot" style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}` }} />
            <motion.div
              className="techexp-card"
              whileHover={{ y: -4, borderColor: "var(--border-glow)", boxShadow: "0 0 30px rgba(0,229,255,.1)" }}
            >
              <div className="techexp-card-top">
                <div className="techexp-icon" style={{ background: exp.bg, color: exp.color }}>
                  <Building2 size={20} />
                </div>
                <div className="techexp-meta">
                  <span className="techexp-type" style={{ color: exp.color, borderColor: exp.color }}>{exp.type}</span>
                  <span className="techexp-period">
                    <Calendar size={12} /> {exp.period}
                  </span>
                </div>
              </div>
              <h3 className="techexp-role">{exp.role}</h3>
              <p className="techexp-company">
                <ArrowUpRight size={14} /> {exp.company}
              </p>
              <p className="techexp-desc">{exp.desc}</p>
              <ul className="techexp-tasks">
                {exp.tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
              <div className="techexp-tech">
                {exp.tech.map((t) => (
                  <span className="techexp-tech-tag" key={t}>{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
