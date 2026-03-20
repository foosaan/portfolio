"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const projects = [
  {
    name: "Sistem Absensi Pegawai Kontrak TVRI",
    desc: "Full-stack employee attendance management system with shift scheduling, leave management, salary & payroll processing, and multi-role admin dashboard.",
    tech: ["Laravel 11", "MySQL", "Tailwind CSS", "Alpine.js", "DomPDF", "Maatwebsite Excel"],
    image: "projects/absensitvri.png",
    demo: "https://yogyakarta.tvri.go.id/e-absensiPPNPN",
    github: "https://github.com/foosaan/absensi-tvri",
  },
  {
    name: "Serdadu Kumbang",
    desc: "Website informasi dan pendaftaran untuk Sekolah Rakyat Serdadu Kumbang, sebuah lembaga pendidikan berbasis komunitas di Yogyakarta.",
    tech: ["Laravel", "MySQL", "Tailwind"],
    image: "projects/serdadukumbang.png",
    demo: "https://serdadukumbang.biz.id",
    github: "https://github.com/foosaan/SerdaduKumbang.git",
  },
  {
    name: "SIG Kampung Wisata Purbayan",
    desc: "Sistem Informasi Geografis (GIS) untuk pemetaan kampung wisata Purbayan, Kotagede, Yogyakarta. Dilengkapi peta interaktif, filter kategori, detail lokasi wisata & UMKM, fitur export peta, serta admin dashboard untuk manajemen data lokasi.",
    tech: ["HTML", "CSS", "JavaScript", "Leaflet.js", "Firebase Realtime Database"],
    image: "projects/sigpurbayan.png",
    demo: "https://foosaan.github.io/mpas/",
    github: "https://github.com/foosaan/mpas.git",
  },
  {
    name: "WebBerkas - Sistem Manajemen Berkas KPPN Jogja",
    desc: "Aplikasi web manajemen pengajuan berkas layanan KPPN (Kantor Pelayanan Perbendaharaan Negara) Jogja dengan sistem multi-role (Admin, Staff, User), tracking status berkas, dan pengelolaan divisi/layanan.",
    tech: ["Laravel 12", "MySQL", "Tailwind CSS", "Alpine.js", "Vite"],
    image: "projects/kppn.png",
    demo: "https://webberkas.kppnmedan.id/",
    github: "https://github.com/foosaan/KPPNJOGJA.git",
  },
  {
    name: "Website Portofolio Photography",
    desc: "Website portofolio photography.",
    tech: ["Laravel 12", "MySQL", "Tailwind CSS", "Alpine.js", "Vite"],
    image: "projects/portofolio-photography.png",
    demo: "https://serdadukumbang.biz.id/fauzanalfikri",
    github: "https://github.com/foosaan/portofolio-photography.git",
  },
  {
    name: "Website Portofolio Programmer",
    desc: "This is my portfolio website, which I designed and built for my personal branding.",
    tech: ["Laravel 12", "MySQL", "Tailwind CSS", "Alpine.js", "Vite"],
    image: "projects/portofolio-programer.png",
    demo: "https://webberkas.kppnmedan.id/fauzanalfikri",
    github: "https://github.com/foosaan/portofolio-photography.git",
  },
];

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section" id="projects" ref={ref}>
      <motion.span className="section-label" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
        {"// Projects"}
      </motion.span>
      <motion.h2 className="section-title" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.1 }}>
        <span className="accent">ls</span> ~/projects
      </motion.h2>
      <motion.p className="section-desc" variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.15 }}>
        A selection of notable projects I&apos;ve worked on recently.
      </motion.p>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <motion.div
            className="project-card"
            key={project.name}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
            whileHover={{ y: -6, scale: 1.01, borderColor: "var(--border-glow)", boxShadow: "0 0 40px rgba(0,229,255,.15), 0 20px 60px rgba(0,0,0,.3)" }}
          >
            <div className="project-image-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={project.name} className="project-image" loading="lazy" />
            </div>
            <div className="project-body">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span className="project-tech-tag" key={t}>{t}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} /> Live Demo
                </a>
                <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon /> GitHub
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
