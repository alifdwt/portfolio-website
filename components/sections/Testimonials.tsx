"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    position: string;
    company: string;
    avatar: string;
  };
}

export default function Testimonials() {
  const t = useTranslations("testimonials");

  // Get testimonials data from translations
  const testimonials: Testimonial[] = t.raw("testimonials");

  // State for current testimonial
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  const bottomStats = [
    {
      label: "Projects Completed",
      value: "10+",
    },
    {
      label: "Technologies Mastered",
      value: "3+",
    },
    {
      label: "Happy Users",
      value: "100+",
    },
    {
      label: "Support Available",
      value: "24/7",
    },
  ];

  return (
    <section
      className="relative bg-[#E8F5E8] px-4 py-16 md:px-8 lg:px-16"
      id="testimonials"
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
          {/* Navigation Buttons */}
          <div className="col-span-12 flex justify-end gap-2 lg:col-span-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="h-12 w-12 rounded-xl border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={goToNext}
              className="h-12 w-12 rounded-xl bg-primary text-black hover:bg-primary/90"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Testimonial Content */}
        <div className="relative">
          {/* Testimonial Card */}
          <div className="overflow-hidden rounded-2xl bg-white p-8 shadow-lg lg:p-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Testimonial Content */}
              <div className="lg:col-span-8">
                <blockquote className="text-xl leading-relaxed text-gray-700 lg:text-2xl lg:leading-relaxed">
                  &quot;{currentTestimonial.content}&quot;
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 lg:col-span-4 lg:flex-col lg:items-start lg:gap-6">
                {/* Author Avatar */}
                <div className="relative h-16 w-16 lg:h-20 lg:w-20">
                  <Image
                    src={currentTestimonial.author.avatar}
                    alt={currentTestimonial.author.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-full object-cover"
                    onError={(e) => {
                      // Fallback avatar
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSIyNCIgeT0iMjQiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiI+CjxwYXRoIGQ9Im0yMCAyMS0xNi0xNm0wIDAtNS41IDUuNW0wIDAtMy01IiBzdHJva2U9IiM5Q0EzQUYiLz4KPC9zdmc+Cg==";
                    }}
                  />
                </div>

                {/* Author Details */}
                <div className="flex-1 lg:flex-none">
                  <h4 className="text-lg font-semibold text-gray-900 lg:text-xl">
                    {currentTestimonial.author.name}
                  </h4>
                  <p className="text-sm text-gray-600 lg:text-base">
                    {currentTestimonial.author.position}
                  </p>
                  <p className="text-sm text-gray-500 lg:text-base">
                    {currentTestimonial.author.company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Stats (Optional) */}
        <div className="mt-16 grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {bottomStats.map((stat, index) => (
            <div key={index} className="">
              <div className="text-3xl font-bold text-gray-900 lg:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 lg:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
