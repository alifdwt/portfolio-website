"use client";

import { Twitter as XIcon, Instagram, Github, Music } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface LinkItem {
  title: string;
  href: string;
}

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

export default function MegaModernLinksPage() {
  const t = useTranslations("links");

  // Links data
  const links: LinkItem[] = [
    {
      title: t("links.portfolio"),
      href: "https://alifdwt.com",
    },
    {
      title: "LyricsTranslate",
      href: "https://lyricstranslate.com/en/translator/alif-putra-dewantara",
    },
    {
      title: t("links.insandunia"),
      href: "https://insandunia.com",
    },
  ];

  // Social links data
  const socialLinks: SocialLink[] = [
    {
      icon: XIcon,
      href: "https://x.com/alifdwt",
      label: "X (Twitter)",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/alifdwt/",
      label: "Instagram",
    },
    {
      icon: Music,
      href: "https://open.spotify.com/user/alifpd?si=a744e18e9a704f2a",
      label: "Spotify",
    },
    {
      icon: Github,
      href: "https://github.com/alifdwt",
      label: "GitHub",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Mega Background System */}
      <div className="fixed inset-0 z-0">
        {/* Base animated mesh gradient */}
        <div className="bg-gradient-mesh animate-gradient-shift absolute inset-0" />

        {/* Floating orbs layer */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={`orb-${i}`}
              // eslint-disable-next-line tailwindcss/no-custom-classname
              className={`animate-float- absolute rounded-full${(i % 4) + 1}`}
              style={{
                width: `${80 + i * 20}px`,
                height: `${80 + i * 20}px`,
                left: `${10 + ((i * 8) % 80)}%`,
                top: `${10 + ((i * 12) % 70)}%`,
                background: `radial-gradient(circle, hsla(${
                  25 + i * 15
                }, 80%, 65%, 0.${3 + (i % 4)}) 0%, transparent 70%)`,
                filter: "blur(1px)",
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${12 + i * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="geometric-pattern" />
        </div>

        {/* Noise texture */}
        <div className="noise-texture absolute inset-0 opacity-30 mix-blend-overlay" />
      </div>

      {/* Interactive light rays */}
      <div className="pointer-events-none fixed inset-0 z-10">
        <div className="light-ray-1" />
        <div className="light-ray-2" />
        <div className="light-ray-3" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Ultra Premium Glass Card */}
          <div className="group relative">
            {/* Card outer glow */}
            <div className="animate-pulse-glow absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 opacity-30 blur-lg transition duration-1000 group-hover:opacity-50" />

            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/[0.08] shadow-2xl backdrop-blur-3xl">
              {/* Card inner shine effect */}
              <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Profile Section */}
              <div className="relative px-8 pt-12 pb-8 text-center">
                <div className="relative inline-block">
                  {/* Avatar container with multiple glows */}
                  <div className="relative">
                    <Avatar className="relative z-10 mx-auto mb-6 h-24 w-24 shadow-2xl ring-2 ring-white/40 backdrop-blur-sm">
                      <AvatarImage
                        src="https://lh3.googleusercontent.com/a/ACg8ocJn0LtCtdqBeDCVrCnbcCfX0n3VGhKBCbNcmNLf2GpeTNfUANTS=s288-c-no"
                        alt="Alif Dewantara"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-500 text-xl font-bold text-white">
                        AD
                      </AvatarFallback>
                    </Avatar>

                    {/* Multi-layer avatar glow system */}
                    <div className="absolute inset-0 -z-10 flex items-center justify-center">
                      <div className="animate-pulse-slow h-32 w-32 rounded-full bg-yellow-400/40 blur-2xl" />
                    </div>
                    <div className="absolute inset-0 -z-20 flex items-center justify-center">
                      <div className="animate-pulse-slower h-40 w-40 rounded-full bg-orange-500/30 blur-3xl" />
                    </div>
                    <div className="absolute inset-0 -z-30 flex items-center justify-center">
                      <div className="animate-pulse-slowest h-48 w-48 rounded-full bg-red-500/20 blur-3xl" />
                    </div>
                  </div>
                </div>

                <h1 className="mb-2 text-2xl font-bold text-white drop-shadow-2xl">
                  Alif Dewantara
                </h1>

                <p className="mx-auto max-w-xs text-sm leading-relaxed text-white/90 drop-shadow-lg">
                  {t("bio")}
                </p>
              </div>

              {/* Links Section */}
              <div className="space-y-4 px-6 pb-2">
                {links.map((link, index) => (
                  <div key={index} className="group/link relative">
                    {/* Link button glow */}
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-400/50 via-yellow-500/50 to-orange-400/50 opacity-0 blur transition duration-500 group-hover/link:opacity-100" />

                    <Button
                      asChild
                      variant="ghost"
                      className="relative h-14 w-full overflow-hidden rounded-2xl border border-white/20 bg-white/[0.08] text-base font-medium text-white/95 shadow-orange-500/25 backdrop-blur-xl transition-all duration-500 group-hover/link:scale-[1.02] group-hover/link:shadow-2xl hover:border-white/40 hover:bg-white/[0.15]"
                    >
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="relative z-10">{link.title}</span>

                        {/* Advanced hover effects */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover/link:translate-x-full" />
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-400/10 to-yellow-500/0 opacity-0 transition-all duration-300 group-hover/link:opacity-100" />

                        {/* Particle effect simulation */}
                        <div className="absolute inset-0 overflow-hidden">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="group-hover/link:animate-particle absolute h-1 w-1 rounded-full bg-white/60 opacity-0"
                              style={{
                                left: `${20 + i * 15}%`,
                                top: "50%",
                                animationDelay: `${i * 0.1}s`,
                              }}
                            />
                          ))}
                        </div>
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>

              {/* Social Links Section */}
              <div className="px-8 pt-6 pb-12">
                <div className="flex justify-center space-x-5">
                  {socialLinks.map((social, index) => (
                    <div key={index} className="group/social relative">
                      {/* Social button glow */}
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-400/60 to-yellow-500/60 opacity-0 blur transition duration-300 group-hover/social:opacity-100" />

                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="relative h-12 w-12 rounded-full border border-white/20 bg-white/[0.08] text-white/90 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-white/[0.15] hover:text-white"
                        style={{
                          animationDelay: `${index * 150}ms`,
                        }}
                      >
                        <Link
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                        >
                          <social.icon className="h-5 w-5 drop-shadow-lg" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-white/95 drop-shadow-2xl">
              {t("footer")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
