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
      className="relative min-h-screen px-4 py-16 md:px-8 lg:px-16"
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

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl"
            >
              {/* Project Card */}
              <div className="grid lg:grid-cols-2">
                {/* Left Side - Project Info */}
                <div className={`${project.backgroundColor} p-8 lg:p-12`}>
                  {/* Categories */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.categories.map((category, categoryIndex) => (
                      <Badge
                        key={categoryIndex}
                        variant="secondary"
                        className="bg-white/70 text-gray-700"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>

                  {/* Project Title */}
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-lg text-gray-700 lg:text-xl">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Timeline */}
                  <p className="mb-4 text-sm font-medium text-gray-600">
                    {project.timeline}
                  </p>

                  {/* Description */}
                  <p className="mb-8 leading-relaxed text-gray-600">
                    {project.description}
                  </p>

                  {/* Do you have a project idea in mind? */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700">
                      Do you have a project idea in mind?
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className="group mb-8 bg-primary text-black hover:bg-primary/90"
                  >
                    <Link href="mailto:aputradewantara@gmail.com">
                      {t("letsChat")}
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="mb-3 text-sm font-semibold tracking-wide text-gray-800 uppercase">
                      Tech Stack
                    </h4>
                    <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-600">
                      {project.technologies.map((tech, techIndex) => (
                        <div key={techIndex} className="flex items-center">
                          <div className="mr-2 h-1 w-1 rounded-full bg-gray-400"></div>
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="mt-8 flex gap-4">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-gray-300 hover:border-gray-400"
                      >
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          {t("viewCode")}
                        </Link>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-gray-300 hover:border-gray-400"
                      >
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {t("viewProject")}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right Side - Project Visuals */}
                <div className="relative bg-gray-100 p-8 lg:p-12">
                  {/* Project Images */}
                  <div className="space-y-6">
                    {project.images.map((image, imageIndex) => (
                      <div
                        key={imageIndex}
                        className="overflow-hidden rounded-xl bg-white shadow-lg"
                      >
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${imageIndex + 1}`}
                          width={600}
                          height={400}
                          className="max-h-96 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          // onError={(e) => {
                          //   // Fallback if image doesn't exist
                          //   e.currentTarget.style.display = "none";
                          // }}
                        />
                      </div>
                    ))}

                    {/* Fallback when no images */}
                    {project.images.length === 0 && (
                      <div className="flex h-64 items-center justify-center rounded-xl bg-white shadow-lg">
                        <div className="text-center text-gray-400">
                          <div className="mb-2 text-4xl">🚀</div>
                          <p className="text-sm">Project Screenshots</p>
                          <p className="text-xs">Coming Soon</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Floating Label */}
                  <div className="absolute top-4 right-4">
                    <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                      {index < 2 ? "Featured" : "Recent Work"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-lg text-gray-600">
            Have a project in mind? Let&apos;s work together!
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-black hover:bg-primary/90"
          >
            <Link href="mailto:aputradewantara@gmail.com">
              Start a Project
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
