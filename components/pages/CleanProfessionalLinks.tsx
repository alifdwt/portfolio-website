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

export default function CleanProfessionalLinksPage() {
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
      {/* Clean Professional Background */}
      <div className="fixed inset-0 z-0">
        {/* Static gradient base - no animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-teal-600 to-slate-700" />

        {/* Subtle static orbs for depth - only 3 static elements */}
        <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="absolute right-16 bottom-32 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-orange-400/10 blur-2xl" />

        {/* Very subtle pattern - static */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Clean Glass Card */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-2xl">
              {/* Profile Section */}
              <div className="px-8 pt-12 pb-8 text-center">
                <div className="relative inline-block">
                  <Avatar className="mx-auto mb-6 h-24 w-24 shadow-xl ring-2 ring-white/30">
                    <AvatarImage
                      src="https://lh3.googleusercontent.com/a/ACg8ocJn0LtCtdqBeDCVrCnbcCfX0n3VGhKBCbNcmNLf2GpeTNfUANTS=s288-c-no"
                      alt="Alif Dewantara"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-teal-400 to-teal-600 text-xl font-bold text-white">
                      AD
                    </AvatarFallback>
                  </Avatar>

                  {/* Single subtle glow - static */}
                  <div className="absolute inset-0 -z-10 flex items-center justify-center">
                    <div className="h-32 w-32 rounded-full bg-teal-400/30 blur-2xl" />
                  </div>
                </div>

                <h1 className="mb-2 text-2xl font-bold text-white drop-shadow-lg">
                  Alif Dewantara
                </h1>

                <p className="mx-auto max-w-xs text-sm leading-relaxed text-white/90">
                  {t("bio")}
                </p>
              </div>

              {/* Links Section - Clean and Simple */}
              <div className="space-y-3 px-6 pb-2">
                {links.map((link, index) => (
                  <Button
                    key={index}
                    asChild
                    variant="ghost"
                    className="h-14 w-full rounded-2xl border border-white/20 bg-white/10 text-base font-medium text-white/95 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/40 hover:bg-white/20"
                  >
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.title}
                    </Link>
                  </Button>
                ))}
              </div>

              {/* Social Links Section - Clean */}
              <div className="px-8 pt-6 pb-12">
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      asChild
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full border border-white/20 bg-white/10 text-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-white/40 hover:bg-white/20 hover:text-white"
                    >
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-white/90">{t("footer")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
