"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";

// import ProfileImage from "./about/ProfileImage";

interface WorkExperience {
  name: string;
  period: string;
  positions: {
    title: string;
    description: string;
    period: string;
  }[];
}

interface Education {
  formal: {
    institution: string;
    degree: string;
    period: string;
    gpa?: string;
  }[];
  nonFormal: {
    institution: string;
    program: string;
    period: string;
  }[];
}

export default function About() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">(
    "experience"
  );
  const t = useTranslations("about");

  // Get work experience data from translations
  const workExperiences = t.raw("workExperience.companies") as WorkExperience[];
  const educationData = {
    formal: t.raw("education.formal.items"),
    nonFormal: t.raw("education.nonFormal.items"),
  } as Education;

  return (
    <section
      className="relative min-h-screen bg-primary/30 px-4 py-16 md:px-8 lg:px-16"
      id="about"
    >
      <div className="mx-auto max-w-7xl">
        {/* Row 1: Title & Subtitle with Tabs */}
        <div className="mb-12 grid grid-cols-12 gap-8">
          {/* Left Column (4/12) - Badge */}
          <div className="col-span-12 lg:col-span-4">
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-sm font-medium text-gray-700">
              <span className="mr-2 text-xl text-primary">✦</span> {t("badge")}
            </span>
          </div>

          {/* Right Column (8/12) - Subtitle and Tabs */}
          <div className="col-span-12 space-y-6 lg:col-span-8">
            <h2 className="text-4xl leading-tight font-semibold text-gray-900 md:text-5xl lg:text-6xl">
              {t("title")}
            </h2>

            {/* Tab Buttons */}
            <div className="flex space-x-2 rounded-xl bg-white p-2 shadow-sm">
              <Button
                onClick={() => setActiveTab("experience")}
                className={`flex-1 rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                  activeTab === "experience"
                    ? "bg-primary text-black shadow-sm hover:bg-primary/80"
                    : "bg-transparent text-gray-700 hover:bg-gray-50"
                }`}
              >
                {t("tabs.workExperience")}
              </Button>
              <Button
                onClick={() => setActiveTab("education")}
                className={`flex-1 rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                  activeTab === "education"
                    ? "bg-primary text-black shadow-sm hover:bg-primary/80"
                    : "bg-transparent text-gray-700 hover:bg-gray-50"
                }`}
              >
                {t("tabs.myEducation")}
              </Button>
            </div>
          </div>
        </div>

        {/* Row 2: Content Grid (4:8) */}
        <div className="mb-16 space-y-12">
          {activeTab === "experience" && (
            <>
              {workExperiences.map((experience, index: number) => (
                <div key={index} className="grid grid-cols-12 gap-8">
                  {/* Left Column: Company Info */}
                  <div className="col-span-12 space-y-2 lg:col-span-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      {experience.name}
                    </h3>
                    <p className="text-sm text-gray-600">{experience.period}</p>
                  </div>

                  {/* Right Column: Positions with Timeline */}
                  <div className="col-span-12 lg:col-span-8">
                    <div className="relative">
                      {/* Timeline Items */}
                      <div className="space-y-8">
                        {experience.positions.map(
                          (position, posIndex: number) => (
                            <div key={posIndex} className="relative space-y-3">
                              {/* Timeline Line - only show between positions */}
                              {posIndex < experience.positions.length - 1 && (
                                <div
                                  className="absolute top-6 left-3 z-0 w-0.5 bg-primary"
                                  style={{ height: "calc(100% + 2rem)" }}
                                />
                              )}

                              <div className="flex items-center space-x-3">
                                <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                                  <div className="h-2 w-2 rounded-full bg-black" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800">
                                  {position.title}
                                </h4>
                              </div>
                              <p className="ml-9 leading-relaxed text-gray-600">
                                {position.description}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === "education" && (
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column: Formal Education */}
              <div className="col-span-12 lg:col-span-4">
                <h3 className="mb-6 text-lg font-bold text-gray-900">
                  {t("education.formal.title")}
                </h3>
                {educationData.formal.map((edu, index: number) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-gray-800">
                      {edu.institution}
                    </h4>
                    <p className="text-sm text-gray-600">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.period}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Column: Certifications */}
              <div className="col-span-12 space-y-6 lg:col-span-8">
                <h3 className="text-lg font-bold text-gray-900">
                  {t("education.nonFormal.title")}
                </h3>
                {educationData.nonFormal.map((program, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {program.program}
                      </h4>
                    </div>
                    <p className="ml-5 text-gray-600">
                      {program.institution} • {program.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Row 3: Profile Image (Full Width) */}
        {/* <ProfileImage /> */}
      </div>
    </section>
  );
}
