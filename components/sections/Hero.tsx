import { ContactIcon, FileIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import ScrollIndicator from "../common/ScrollIndicator";

export default function Hero() {
  const t = useTranslations("hero");

  // Portfolio cards data
  const portfolioCards = [
    {
      id: 1,
      alt: "Haiwan E-commerce Platform",
    },
    {
      id: 2,
      alt: "Circle Social Media App",
    },
    {
      id: 3,
      alt: "Trivia Game Mobile App",
    },
    {
      id: 4,
      alt: "Spotify Indonesia Data Visualization",
    },
  ];

  return (
    <section
      id="home"
      className="bg-hero-pattern relative flex min-h-screen flex-col justify-between overflow-hidden py-32"
    >
      <div className="container mx-auto flex flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8">
        {/* Top Content Area */}
        <div className="mb-16 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left Side - Main Headline */}
          <div className="lg:col-span-8">
            {/* Greeting */}
            <p className="mb-6 text-lg text-gray-400 md:text-xl">
              {t("greeting")}
            </p>

            {/* Main Headline */}
            <h1 className="mb-8 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl xl:text-7xl">
              {t("title")}
              <span className="ml-4 inline-block">⚡</span>
            </h1>
          </div>

          {/* Right Side - Role Description */}
          <div className="lg:col-span-4 lg:mt-8">
            <div className="relative text-right">
              {/* Green dot indicator */}
              <div className="mb-4 flex items-center justify-end">
                <div className="mr-3 h-3 w-3 rounded-full bg-primary"></div>
                <span className="font-medium text-primary">{t("role")}</span>
              </div>

              {/* Description text */}
              <p className="mb-6 text-sm leading-relaxed text-gray-300 md:text-base">
                {t("description")}
              </p>

              <div className="flex items-center justify-end gap-4">
                <Link
                  href="https://drive.google.com/file/d/1x-CftJbRHruWmkhv8LCkegx-futTu3b_/view?usp=sharing"
                  className="inline-flex transform items-center rounded bg-gradient-to-r from-[#dcf2b0] to-[#8df5a3] px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#8df5a3] hover:to-[#dcf2b0] hover:shadow-xl md:text-base"
                  target="_blank"
                >
                  {t("viewResume")}
                  <FileIcon className="ml-2 size-4" />
                </Link>
                {/* CTA Button */}
                <Link
                  href="#contact"
                  className="inline-flex transform items-center rounded bg-gradient-to-r from-[#dcf2b0] to-[#8df5a3] px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#8df5a3] hover:to-[#dcf2b0] hover:shadow-xl md:text-base"
                >
                  {t("cta")}
                  <ContactIcon className="ml-2 size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator - di atas cards, menjorok ke dalam */}
        <ScrollIndicator text={t("scrollDown")} />

        {/* Portfolio Preview Cards */}
        <div className="-mt-16 md:grid grid-cols-1 items-end gap-6 md:grid-cols-2 lg:grid-cols-4 hidden">
          {portfolioCards.map((card, index) => (
            <div key={card.id} className="group relative cursor-pointer">
              {/* Card dengan bentuk unik seperti design reference */}
              <div
                className={`relative overflow-hidden transition-transform duration-300 group-hover:scale-105 ${
                  index === 1 || index === 2 ? "aspect-[3/3.2]" : "aspect-[3/4]"
                }`}
                style={{
                  borderRadius:
                    index === 0
                      ? "20px 20px 20px 60px" // Card 1: rounded kiri atas, kanan atas, kiri bawah normal, kanan bawah sangat rounded
                      : index === 1
                      ? "20px 20px 60px 20px" // Card 2: rounded normal atas, kiri bawah sangat rounded
                      : index === 2
                      ? "20px 60px 20px 20px" // Card 3: kanan atas sangat rounded
                      : "60px 20px 20px 20px", // Card 4: kiri atas sangat rounded
                  background:
                    index === 0
                      ? "linear-gradient(135deg, #e8f4f8 0%, #d6e7dd 50%, #f0c5c5 100%)"
                      : index === 1
                      ? "linear-gradient(135deg, #fce4ec 0%, #f8d7da 50%, #e1f5fe 100%)"
                      : index === 2
                      ? "linear-gradient(135deg, #f3e5f5 0%, #e8f5e8 50%, #ffe0b2 100%)"
                      : "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 50%, #fd79a8 100%)",
                }}
              >
                {/* 3D Scene Content - mirip design reference */}
                <div className="absolute inset-0 p-6">
                  {/* Background elements */}
                  <div className="relative h-full w-full">
                    {/* Card 1 - Circular arch scene */}
                    {index === 0 && (
                      <>
                        <div className="absolute top-1/4 left-1/4 h-16 w-16 rounded-full bg-gradient-to-br from-purple-300 to-purple-500 opacity-70"></div>
                        <div className="absolute right-1/4 bottom-1/3 h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500"></div>
                        <div className="absolute right-0 bottom-6 left-0 h-8 rounded-t-full bg-gradient-to-r from-blue-200 to-cyan-200 opacity-60"></div>
                        <div className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-white/50"></div>
                      </>
                    )}

                    {/* Card 2 - Steps and arch scene (lebih pendek) */}
                    {index === 1 && (
                      <>
                        <div className="absolute top-1/4 right-6 h-12 w-12 rounded-full bg-gradient-to-br from-red-300 to-pink-400"></div>
                        <div className="absolute bottom-1/4 left-4 h-2 w-full rounded-full bg-pink-200"></div>
                        <div className="absolute bottom-1/3 left-4 h-2 w-3/4 rounded-full bg-pink-300"></div>
                        <div className="absolute bottom-6 left-4 h-2 w-1/2 rounded-full bg-pink-400"></div>
                        <div className="absolute top-8 left-1/3 h-8 w-16 rounded-full bg-gradient-to-r from-cyan-200 to-blue-200 opacity-70"></div>
                      </>
                    )}

                    {/* Card 3 - Circular portal scene (lebih pendek) */}
                    {index === 2 && (
                      <>
                        <div className="absolute top-1/4 left-1/2 h-16 w-16 -translate-x-1/2 transform rounded-full bg-gradient-to-br from-orange-400 to-red-500"></div>
                        <div className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-8 border-orange-300 opacity-60"></div>
                        <div className="absolute bottom-8 left-6 h-6 w-6 rounded-full bg-gradient-to-br from-orange-300 to-yellow-400"></div>
                        <div className="absolute right-8 bottom-10 h-4 w-4 rounded-full bg-gradient-to-br from-blue-300 to-cyan-400"></div>
                        <div className="absolute right-0 bottom-0 left-0 h-8 rounded-t-full bg-gradient-to-t from-cyan-200 to-transparent"></div>
                      </>
                    )}

                    {/* Card 4 - Abstract geometric scene */}
                    {index === 3 && (
                      <>
                        <div className="absolute top-6 left-6 h-12 w-8 rounded-lg bg-gradient-to-b from-blue-300 to-cyan-400 opacity-80"></div>
                        <div className="absolute top-8 right-8 h-8 w-6 rounded-md bg-gradient-to-b from-orange-300 to-pink-400"></div>
                        <div className="absolute bottom-1/3 left-1/4 h-8 w-12 rounded-lg bg-gradient-to-r from-purple-300 to-pink-300 opacity-70"></div>
                        <div className="absolute right-6 bottom-6 h-6 w-10 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300"></div>
                        <div className="absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t from-purple-200 to-transparent"></div>
                      </>
                    )}
                  </div>
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-all duration-300 group-hover:opacity-100"
                  style={{
                    borderRadius:
                      index === 0
                        ? "20px 20px 20px 60px"
                        : index === 1
                        ? "20px 20px 60px 20px"
                        : index === 2
                        ? "20px 60px 20px 20px"
                        : "60px 20px 20px 20px",
                  }}
                >
                  <span className="rounded-full bg-black/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                    View Project
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
