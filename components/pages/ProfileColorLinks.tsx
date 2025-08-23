/* eslint-disable tailwindcss/no-custom-classname */
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

export default function ProfileMatchedLinksPage() {
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
      {/* Profile-Matched Background System */}
      <div className="fixed inset-0 z-0">
        {/* Base teal-orange gradient mesh */}
        <div className="bg-profile-gradient animate-profile-shift absolute inset-0" />

        {/* Floating organic shapes inspired by profile colors */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={`shape-${i}`}
              className={`animate-float-organic- absolute rounded-full${
                (i % 3) + 1
              }`}
              style={{
                width: `${60 + i * 15}px`,
                height: `${60 + i * 15}px`,
                left: `${15 + ((i * 9) % 70)}%`,
                top: `${15 + ((i * 11) % 60)}%`,
                background:
                  i % 3 === 0
                    ? `radial-gradient(circle, hsla(177, 70%, 55%, 0.${
                        4 + (i % 3)
                      }) 0%, transparent 70%)`
                    : i % 3 === 1
                    ? `radial-gradient(circle, hsla(195, 45%, 35%, 0.${
                        3 + (i % 3)
                      }) 0%, transparent 70%)`
                    : `radial-gradient(circle, hsla(15, 85%, 65%, 0.${
                        2 + (i % 3)
                      }) 0%, transparent 70%)`,
                filter: "blur(1.5px)",
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${10 + i * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Teal pattern overlay */}
        <div className="absolute inset-0 opacity-15">
          <div className="teal-pattern" />
        </div>

        {/* Subtle texture for depth */}
        <div className="profile-texture absolute inset-0 opacity-25 mix-blend-soft-light" />
      </div>

      {/* Teal-themed light effects */}
      <div className="pointer-events-none fixed inset-0 z-10">
        <div className="teal-ray-1" />
        <div className="teal-ray-2" />
        <div className="orange-accent-ray" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Premium Glass Card with Profile Colors */}
          <div className="group relative">
            {/* Card outer glow - Teal theme */}
            <div className="animate-teal-glow absolute -inset-1 rounded-3xl bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 opacity-40 blur-lg transition duration-1000 group-hover:opacity-60" />

            <div className="relative overflow-hidden rounded-3xl border border-white/25 bg-white/[0.08] shadow-2xl backdrop-blur-3xl">
              {/* Card inner shine with teal accent */}
              <div className="animate-teal-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-teal-200/15 to-transparent" />

              {/* Profile Section */}
              <div className="relative px-8 pt-12 pb-8 text-center">
                <div className="relative inline-block">
                  {/* Avatar with teal-themed glow system */}
                  <div className="relative">
                    <Avatar className="relative z-10 mx-auto mb-6 h-24 w-24 shadow-2xl ring-2 ring-teal-300/50 backdrop-blur-sm">
                      <AvatarImage
                        src="https://lh3.googleusercontent.com/a/ACg8ocJn0LtCtdqBeDCVrCnbcCfX0n3VGhKBCbNcmNLf2GpeTNfUANTS=s288-c-no"
                        alt="Alif Dewantara"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-teal-400 to-cyan-600 text-xl font-bold text-white">
                        AD
                      </AvatarFallback>
                    </Avatar>

                    {/* Multi-layer teal glow system */}
                    <div className="absolute inset-0 -z-10 flex items-center justify-center">
                      <div className="animate-pulse-teal h-32 w-32 rounded-full bg-teal-400/50 blur-2xl" />
                    </div>
                    <div className="absolute inset-0 -z-20 flex items-center justify-center">
                      <div className="animate-pulse-teal-slow h-40 w-40 rounded-full bg-cyan-500/40 blur-3xl" />
                    </div>
                    <div className="absolute inset-0 -z-30 flex items-center justify-center">
                      <div className="animate-pulse-teal-slower h-48 w-48 rounded-full bg-blue-600/30 blur-3xl" />
                    </div>
                  </div>
                </div>

                <h1 className="mb-2 text-2xl font-bold text-white drop-shadow-2xl">
                  Alif Dewantara
                </h1>

                <p className="mx-auto max-w-xs text-sm leading-relaxed text-white/95 drop-shadow-lg">
                  {t("bio")}
                </p>
              </div>

              {/* Links Section with Teal Theme */}
              <div className="space-y-4 px-6 pb-2">
                {links.map((link, index) => (
                  <div key={index} className="group/link relative">
                    {/* Teal-themed button glow */}
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-teal-400/60 via-cyan-500/60 to-teal-400/60 opacity-0 blur transition duration-500 group-hover/link:opacity-100" />

                    <Button
                      asChild
                      variant="ghost"
                      className="relative h-14 w-full overflow-hidden rounded-2xl border border-white/25 bg-white/[0.08] text-base font-medium text-white/95 shadow-teal-500/25 backdrop-blur-xl transition-all duration-500 group-hover/link:scale-[1.02] group-hover/link:shadow-2xl hover:border-teal-300/50 hover:bg-white/[0.15]"
                    >
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="relative z-10">{link.title}</span>

                        {/* Teal-themed hover effects */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-teal-200/20 to-transparent transition-transform duration-1000 ease-out group-hover/link:translate-x-full" />
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-cyan-400/15 to-teal-500/0 opacity-0 transition-all duration-300 group-hover/link:opacity-100" />

                        {/* Teal particle simulation */}
                        <div className="absolute inset-0 overflow-hidden">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="group-hover/link:animate-teal-particle absolute h-1 w-1 rounded-full bg-teal-300/80 opacity-0"
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

              {/* Social Links Section with Profile Theme */}
              <div className="px-8 pt-6 pb-12">
                <div className="flex justify-center space-x-5">
                  {socialLinks.map((social, index) => (
                    <div key={index} className="group/social relative">
                      {/* Alternating teal/orange glow for variety */}
                      <div
                        className={`absolute -inset-1 ${
                          index % 2 === 0
                            ? "bg-gradient-to-r from-teal-400/70 to-cyan-500/70"
                            : "to-coral-500/70 bg-gradient-to-r from-orange-400/70"
                        } rounded-full opacity-0 blur transition duration-300 group-hover/social:opacity-100`}
                      />

                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="relative h-12 w-12 rounded-full border border-white/25 bg-white/[0.08] text-white/90 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-teal-300/50 hover:bg-white/[0.15] hover:text-white"
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
