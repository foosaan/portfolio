"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Award, ExternalLink, Calendar, X, ZoomIn } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const certificates = [
  {
    name: "Web Development",
    issuer: "BNSP",
    date: "2026",
    image: "certificates/bnsp.jpg",
    credentialUrl: "#",
    color: "var(--accent-cyan)",
    bg: "rgba(0,229,255,.08)",
  },
  {
    name: "IT Intern",
    issuer: "KPPN Jogja",
    date: "2026",
    image: "certificates/kppn.png",
    credentialUrl: "#",
    color: "var(--accent-purple)",
    bg: "rgba(191,90,242,.08)",
  },
  {
    name: "IT Intern",
    issuer: "TVRI Yogyakarta",
    date: "2026",
    image: "certificates/tvri.png",
    credentialUrl: "#",
    color: "var(--accent-green)",
    bg: "rgba(57,255,20,.08)",
  },
];

export default function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="section" id="certificates" ref={ref}>
      <motion.span className="section-label" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
        {"// Certificates"}
      </motion.span>
      <motion.h2 className="section-title" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.1 }}>
        <span className="accent">cat</span> ~/certificates
      </motion.h2>
      <motion.p className="section-desc" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.15 }}>
        Professional certifications and achievements that validate my expertise.
      </motion.p>

      <div className="cert-grid">
        {certificates.map((cert, i) => (
          <motion.div
            className="cert-card"
            key={cert.name + "-" + cert.issuer}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            whileHover={{ y: -6, borderColor: "var(--border-glow)", boxShadow: "0 0 30px rgba(0,229,255,.12)" }}
          >
            <div className="cert-card-glow" style={{ background: `linear-gradient(135deg, ${cert.color}, transparent)` }} />

            {/* Certificate Image Preview */}
            <div
              className="cert-image-wrapper"
              onClick={() => setLightbox(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLightbox(cert)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cert.image} alt={cert.name} className="cert-image" loading="lazy" />
              <div className="cert-image-overlay">
                <ZoomIn size={24} />
                <span>View Certificate</span>
              </div>
            </div>

            <div className="cert-body">
              <div className="cert-icon" style={{ background: cert.bg, color: cert.color }}>
                <Award size={22} />
              </div>
              <h3 className="cert-name">{cert.name}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <div className="cert-footer">
                <span className="cert-date">
                  <Calendar size={12} /> {cert.date}
                </span>
                {cert.credentialUrl && cert.credentialUrl !== "#" && (
                  <a href={cert.credentialUrl} className="cert-link" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={12} /> Verify
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="cert-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="cert-lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="cert-lightbox-close" onClick={() => setLightbox(null)}>
                <X size={20} />
              </button>
              <div className="cert-lightbox-image-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lightbox.image} alt={lightbox.name} className="cert-lightbox-image" />
              </div>
              <div className="cert-lightbox-info">
                <h3>{lightbox.name}</h3>
                <p>{lightbox.issuer} • {lightbox.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
