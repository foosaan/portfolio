"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Send, MessageSquare, Linkedin } from "lucide-react";
import TerminalWindow from "./TerminalWindow";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function GitHubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

const contactLinks = [
  {
    label: "Email",
    value: "fauzan4297@gmail.com",
    href: "mailto:fauzan4297@gmail.com",
    icon: Mail,
    color: "var(--accent-cyan)",
    bg: "rgba(0,229,255,.08)",
  },
  {
    label: "GitHub",
    value: "github.com/foosaan",
    href: "https://github.com/foosaan",
    iconCustom: GitHubIcon,
    color: "var(--accent-cyan)",
    bg: "rgba(0,229,255,.08)",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/fauzanalfikri",
    href: "https://linkedin.com/in/fauzanalfikri",
    icon: Linkedin,
    color: "var(--accent-blue)",
    bg: "rgba(94,158,255,.08)",
  },
  {
    label: "WhatsApp",
    value: "+62 812-2548-7266",
    href: "https://wa.me/6281225487266",
    icon: MessageSquare,
    color: "var(--accent-green)",
    bg: "rgba(57,255,20,.08)",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      e.target.reset();
    }, 3000);
  };

  return (
    <section className="section" id="contact" ref={ref}>
      <motion.span className="section-label" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
        {"// Contact"}
      </motion.span>
      <motion.h2 className="section-title" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.1 }}>
        <span className="accent">ping</span> me
      </motion.h2>
      <motion.p className="section-desc" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.15 }}>
        Have a project in mind? Let&apos;s talk and build something amazing together.
      </motion.p>

      <div className="contact-grid">
        {/* Terminal Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <TerminalWindow title="contact — form">
            <div className="contact-form-body">
              <form onSubmit={handleSubmit}>
                <div className="form-line">
                  <span className="prompt">name $</span>
                  <input type="text" className="form-input" placeholder="Your name..." required />
                </div>
                <div className="form-line">
                  <span className="prompt">email $</span>
                  <input type="email" className="form-input" placeholder="your@email.com" required />
                </div>
                <div className="form-line">
                  <span className="prompt">subject $</span>
                  <input type="text" className="form-input" placeholder="Project inquiry..." />
                </div>
                <div className="form-line" style={{ flexDirection: "column", alignItems: "stretch" }}>
                  <span className="prompt">message $</span>
                  <textarea className="form-textarea" placeholder="Tell me about your project..." rows={5} required />
                </div>
                <div className="form-submit">
                  <motion.button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      background: submitted ? "var(--accent-green)" : undefined,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitted ? (
                      <>✓ Message Sent!</>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </TerminalWindow>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {contactLinks.map((link, i) => {
            const Icon = link.icon;
            const CustomIcon = link.iconCustom;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-info-card"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                whileHover={{ x: 4, borderColor: "var(--border-glow)", boxShadow: "var(--glow-cyan)" }}
              >
                <div className="contact-info-icon" style={{ background: link.bg, color: link.color }}>
                  {CustomIcon ? <CustomIcon size={20} /> : <Icon size={20} />}
                </div>
                <div>
                  <div className="contact-info-label">{link.label}</div>
                  <div className="contact-info-value">{link.value}</div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
