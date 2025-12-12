import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  categories: string[];
  title: string;
  subtitle: string;
  description: string;
  timeline: string;
  technologies: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  backgroundColor: string;
}

export default function Portfolio() {
  const t = useTranslations("portfolio");

  // Get projects data from translations
  const projects: Project[] = t.raw("projects");

  return (
    <section
      className="relative min-h-screen bg-gray-50 px-4 py-16 md:px-8 lg:px-16"
      id="portfolio"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 grid grid-cols-12 gap-8">
          {/* Left Column (4/12) - Badge */}
          <div className="col-span-12 lg:col-span-4">
            <span className="inline-flex items-center rounded-full border border-primary bg-white px-3 py-1 text-sm font-medium text-gray-700">
              <span className="mr-2 text-xl text-primary">✦</span> {t("badge")}
            </span>
          </div>

          {/* Right Column (8/12) - Title */}
          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-right text-4xl leading-tight font-semibold text-gray-900 md:text-5xl lg:text-6xl">
              {t("title").split(" ").slice(0, -3).join(" ")}{" "}
              <span className="text-muted-foreground">
                {t("title").split(" ").slice(-3).join(" ")}
              </span>
            </h2>
          </div>
        </div>

        {/* Projects Grid - Card Layout */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-300"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                {project.images.length > 0 ? (
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="mb-2 text-3xl">🚀</div>
                      <p className="text-xs">Preview</p>
                    </div>
                  </div>
                )}

                {/* Floating Badge */}
                <div className="absolute top-3 right-3">
                  <div className="rounded-full bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-medium text-gray-700 shadow-sm">
                    {index < 2 ? "Featured" : "Recent"}
                  </div>
                </div>

                {/* Categories */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {project.categories
                    .slice(0, 2)
                    .map((category, categoryIndex) => (
                      <Badge
                        key={categoryIndex}
                        variant="secondary"
                        className="bg-white/90 backdrop-blur-sm text-xs text-gray-700"
                      >
                        {category}
                      </Badge>
                    ))}
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-full items-center justify-center gap-3">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white p-2 text-gray-900 transition-transform hover:scale-110"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white p-2 text-gray-900 transition-transform hover:scale-110"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-5">
                {/* Timeline */}
                <p className="mb-2 text-xs font-medium text-gray-500">
                  {project.timeline}
                </p>

                {/* Project Title */}
                <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">
                  {project.title}
                </h3>
                <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                  {project.subtitle}
                </p>

                {/* Description (Limited) */}
                <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack (Compact) */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 border-gray-300 text-xs hover:border-gray-400"
                    >
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1 h-3 w-3" />
                        Code
                      </Link>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 border-gray-300 text-xs hover:border-gray-400"
                    >
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Live
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-base text-gray-600">
            Have a project in mind? Let&apos;s work together!
          </p>
          <Button asChild className="bg-primary text-black hover:bg-primary/90">
            <Link href="mailto:aputradewantara@gmail.com">
              Start a Project
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
