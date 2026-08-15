"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, X, Search, Tag, ChevronRight, Star, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { staggerContainerVariant, staggerItemVariant, modalVariant, overlayVariant, viewportConfig } from "@/lib/animations";
import portfolioData from "@/data/portfolio.json";
import { cn, debounce } from "@/lib/utils";
import type { Project } from "@/types";

// Project Card Component
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.article
      variants={staggerItemVariant}
      whileHover={{ y: -6, scale: 1.01 }}
      className="card-base overflow-hidden group cursor-pointer flex flex-col"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-600/20 to-accent-400/20">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="primary" size="sm">
            {project.category.toUpperCase()}
          </Badge>
        </div>

        {/* Featured star */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <div className="w-7 h-7 rounded-full bg-amber-500/90 flex items-center justify-center">
              <Star size={12} className="text-white" fill="white" />
            </div>
          </div>
        )}

        {/* Status */}
        <div className="absolute bottom-3 right-3">
          <span className={cn(
            "text-[10px] font-semibold px-2 py-0.5 rounded-full",
            project.status === "completed"
              ? "bg-green-500/90 text-white"
              : project.status === "in-progress"
              ? "bg-amber-500/90 text-white"
              : "bg-gray-500/90 text-white"
          )}>
            {project.status === "completed" ? "✓ Selesai" : project.status === "in-progress" ? "⟳ Ongoing" : "Archived"}
          </span>
        </div>

        {/* Hover: default image placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-600/30 to-accent-400/30">
          <div className="text-center text-white opacity-40 group-hover:opacity-0 transition-opacity">
            <div className="text-5xl mb-2">💻</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-sm sm:text-base text-[var(--color-fg)] leading-snug line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-1">
            {project.title}
          </h3>
          <div className="flex items-center gap-1 text-[10px] text-[var(--color-fg-subtle)] shrink-0 mt-0.5">
            <Calendar size={10} />
            {project.year}
          </div>
        </div>

        <p className="text-[var(--color-fg-muted)] text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
          {project.shortDescription}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-[var(--color-primary-light)] text-primary-600 dark:text-primary-400"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold text-[var(--color-fg-subtle)] bg-[var(--color-border)]">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--color-border)] text-[var(--color-fg-muted)] text-[11px] font-semibold hover:text-primary-600 hover:border-primary-600/30 hover:bg-[var(--color-primary-light)] transition-all duration-200"
            >
              <Github size={12} />
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-600/10 text-primary-600 dark:text-primary-400 text-[11px] font-semibold hover:bg-primary-600 hover:text-white transition-all duration-200"
            >
              <ExternalLink size={12} />
              Live Demo
            </a>
          )}
          <button
            className="flex items-center gap-1 ml-auto text-[11px] text-[var(--color-fg-subtle)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="View project details"
          >
            Detail <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// Project Modal
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        variants={overlayVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Project details: ${project.title}`}
      >
        <motion.div
          key="modal"
          variants={modalVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
            aria-label="Close modal"
          >
            <X size={17} />
          </button>

          {/* Modal Image */}
          <div className="relative h-52 bg-gradient-to-br from-primary-600/20 to-accent-400/20 overflow-hidden rounded-t-3xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="672px"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl opacity-20">💻</span>
            </div>
          </div>

          <div className="p-7">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <Badge variant="primary">{project.category}</Badge>
                  {project.featured && <Badge variant="warning">⭐ Featured</Badge>}
                  <Badge variant="success">{project.status === "completed" ? "Selesai" : project.status}</Badge>
                </div>
                <h2 className="text-xl font-bold text-[var(--color-fg)] leading-snug">
                  {project.title}
                </h2>
              </div>
            </div>

            <p className="text-[var(--color-fg-muted)] text-sm leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[var(--color-fg)] mb-3 flex items-center gap-2">
                <Tag size={14} className="text-primary-600" />
                Fitur Utama
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-[var(--color-fg-muted)]">
                    <ChevronRight size={12} className="text-primary-600 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[var(--color-fg)] mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-xl text-xs font-semibold bg-[var(--color-primary-light)] text-primary-600 dark:text-primary-400 border border-primary-600/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-[var(--color-border)] text-[var(--color-fg)] text-sm font-semibold hover:border-primary-600/40 hover:bg-[var(--color-primary-light)] hover:text-primary-600 transition-all"
                >
                  <Github size={15} />
                  Lihat di GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Projects() {
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSearch = debounce((query: string) => {
    setSearchQuery(query.toLowerCase());
  }, 250);

  const filteredProjects = useMemo(() => {
    return (projects as Project[]).filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery) ||
        p.shortDescription.toLowerCase().includes(searchQuery) ||
        p.techStack.some((t) => t.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section
      id="projects"
      className="section-padding bg-[var(--color-bg-secondary)]"
      aria-label="Projects section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="My Projects"
          title="Proyek yang"
          titleHighlight="Telah Saya Bangun"
          subtitle="Koleksi proyek nyata yang menunjukkan kemampuan teknis dan kreativitas saya dalam membangun solusi digital."
        />

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Project category filter">
            {PROJECT_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                    : "bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-fg-muted)] hover:border-primary-600/30 hover:text-primary-600"
                )}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-fg-subtle)]" />
            <input
              type="search"
              placeholder="Cari project..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-fg)] placeholder-[var(--color-fg-subtle)] focus:outline-none focus:border-primary-600/40 focus:ring-2 focus:ring-primary-600/10 transition-all"
              aria-label="Search projects"
            />
          </div>
        </div>

        {/* Results Count */}
        <p className="text-xs text-[var(--color-fg-subtle)] mb-6">
          Menampilkan {filteredProjects.length} dari {projects.length} project
        </p>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project as Project}
                  onClick={() => setSelectedProject(project as Project)}
                />
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-20 text-[var(--color-fg-muted)]"
              >
                <div className="text-5xl mb-4">🔍</div>
                <p className="font-semibold">Tidak ada project yang ditemukan.</p>
                <p className="text-sm mt-1">Coba kata kunci atau filter yang berbeda.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
