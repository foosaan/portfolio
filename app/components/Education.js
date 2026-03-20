"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const educationData = [
  {
    degree: "S1 Teknik Informatika",
    school: "Universitas Muhammadiyah Yogyakarta",
    period: "2022 — 2026",
    location: "Yogyakarta, Indonesia",
    desc: "Focused on software engineering, web development, and database systems. Active in campus tech communities and hackathons.",
    highlights: [
      "IPK: 3.48 / 4.00",
      "Final Project: Web-based information system",
      "Active member of IT community",
    ],
    color: "var(--accent-cyan)",
    bg: "rgba(0,229,255,.08)",
  },
  {
    degree: "Ilmu Pengetahuan Alam",
    school: "SMA IT Baitussalam Sleman",
    period: "2019 — 2022",
    location: "Yogyakarta, Indonesia",
    desc: "Ilmu Pengetahuan Alam",
    color: "var(--accent-purple)",
    bg: "rgba(191,90,242,.08)",
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section" id="education" ref={ref}>
      <motion.span className="section-label" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
        {"// Education"}
      </motion.span>
      <motion.h2 className="section-title" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.1 }}>
        <span className="accent">git log</span> --education
      </motion.h2>
      <motion.p className="section-desc" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.15 }}>
        My academic journey and educational background.
      </motion.p>

      <div className="education-timeline">
        <div className="timeline-line" />
        {educationData.map((edu, i) => (
          <motion.div
            className="timeline-item"
            key={edu.school}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
          >
            <div className="timeline-dot" style={{ background: edu.color, boxShadow: `0 0 12px ${edu.color}` }} />
            <motion.div
              className="timeline-card"
              whileHover={{ y: -4, borderColor: "var(--border-glow)", boxShadow: "0 0 30px rgba(0,229,255,.1)" }}
            >
              <div className="timeline-card-header">
                <div className="timeline-icon" style={{ background: edu.bg, color: edu.color }}>
                  <GraduationCap size={20} />
                </div>
                <div className="timeline-period">
                  <Calendar size={12} />
                  {edu.period}
                </div>
              </div>
              <h3 className="timeline-degree">{edu.degree}</h3>
              <p className="timeline-school">{edu.school}</p>
              <div className="timeline-location">
                <MapPin size={12} />
                {edu.location}
              </div>
              <p className="timeline-desc">{edu.desc}</p>
              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="timeline-highlights">
                  {edu.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
