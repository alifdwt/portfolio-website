"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useEffect } from "react";

export default function Companies() {
  const t = useTranslations("companies");
  const scrollRef = useRef<HTMLDivElement>(null);
  const companies = [
    {
      name: "PT. Digital Niaga Internasional",
      logo: "/logo/dni-logo.png",
      alt: "Digital Niaga Internasional Logo",
    },
    {
      name: "DumbWays Indonesia",
      logo: "/logo/dumbways-logo.png",
      alt: "DumbWays Indonesia Logo",
    },
    {
      name: "Binasentra Purna",
      logo: "/logo/bsp-logo.webp",
      alt: "Binasentra Purna Logo",
    },
    {
      name: "Eternesia",
      logo: "/logo/eternesia-logo.png",
      alt: "Eternesia Logo",
    },
    {
      name: "Pandu Cipta Solusi",
      logo: "/logo/pcs-logo.jpg",
      alt: "Pandu Cipta Solusi Logo",
    },
    {
      name: "Universitas Siber Asia",
      logo: "/logo/unsia-logo.png",
      alt: "Universitas Siber Asia Logo",
    },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll - 10) {
          // Reset to beginning when reaching the end
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll right
          scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="border-b border-gray-100 bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <p className="text-sm font-medium text-gray-600 md:text-base">
            {t("title")}
          </p>
        </div>

        {/* Companies Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex space-x-12 overflow-x-auto scroll-smooth pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="group flex h-20 w-50 flex-shrink-0 items-center justify-center"
              >
                <div className="relative flex h-full w-full items-center justify-center opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
                  <Image
                    src={company.logo}
                    alt={company.alt}
                    width={180}
                    height={40}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Fade gradients on edges */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent"></div>
          <div className="pointer-events-none absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent"></div>
        </div>

        {/* Optional: Scroll indicators */}
        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(companies.length / 4) }).map(
            (_, index) => (
              <div
                key={index}
                className="h-2 w-2 rounded-full bg-gray-300 opacity-50"
              ></div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
