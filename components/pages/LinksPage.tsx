import {
  Twitter as XIcon,
  Instagram,
  Github,
  Music,
  LinkedinIcon,
} from "lucide-react";
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

export default function LinksPage() {
  const t = useTranslations("links");

  // Links data
  const links: LinkItem[] = [
    {
      title: t("links.portfolio"),
      href: "https://alifdwt.com",
    },
    {
      title: t("links.curriculumVitae"),
      href: "https://drive.google.com/file/d/1x-CftJbRHruWmkhv8LCkegx-futTu3b_/view?usp=sharing",
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
      icon: LinkedinIcon,
      href: "https://linkedin.com/in/alifdwt",
      label: "LinkedIn",
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-600 via-primary to-green-800 p-4">
      <div className="mx-auto max-w-md">
        <div className="overflow-hidden rounded-3xl bg-white/90 shadow-2xl backdrop-blur-sm">
          {/* Profile Section */}
          <div className="px-8 pt-12 pb-8 text-center">
            <Avatar className="mx-auto mb-6 h-24 w-24 shadow-lg ring-4 ring-white">
              <AvatarImage
                src="https://lh3.googleusercontent.com/a/ACg8ocJn0LtCtdqBeDCVrCnbcCfX0n3VGhKBCbNcmNLf2GpeTNfUANTS=s288-c-no"
                alt="Alif Dewantara"
              />
              <AvatarFallback className="bg-primary text-xl font-semibold text-black">
                AD
              </AvatarFallback>
            </Avatar>

            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Alif Dewantara
            </h1>

            <p className="text-sm leading-relaxed text-gray-600">{t("bio")}</p>
          </div>

          {/* Links Section */}
          <div className="space-y-4 px-6">
            {links.map((link, index) => (
              <Button
                key={index}
                asChild
                variant="outline"
                className="h-14 w-full rounded-2xl border-2 border-gray-200 text-base font-medium text-gray-800 transition-all duration-200 hover:border-primary hover:bg-primary/5"
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

          {/* Social Links Section */}
          <div className="px-8 pt-8 pb-12">
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-gray-100 transition-all duration-200 hover:bg-primary hover:text-black"
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

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-white/80">{t("footer")}</p>
        </div>
      </div>
    </div>
  );
}
