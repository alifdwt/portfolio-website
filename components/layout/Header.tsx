"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Menu, Twitter, Linkedin, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navigation from "./Navigation";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("navigation");

  const navItems = [
    { label: t("home"), href: "#home" },
    { label: t("about"), href: "#about" },
    { label: t("services"), href: "#services" },
    { label: t("portfolio"), href: "#portfolio" },
    { label: t("contact"), href: "#contact" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/alifdwt", label: "Twitter" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/alifdwt",
      label: "LinkedIn",
    },
    { icon: Github, href: "https://github.com/alifdwt", label: "GitHub" },
    { icon: ExternalLink, href: "https://alifdwt.github.io", label: "Website" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-background/90 dark:bg-background/90 backdrop-blur-sm border-b border-border dark:border-border dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Navigation Menu */}
          <div className="hidden lg:flex items-center">
            <Navigation items={navItems} dark />
          </div>

          {/* Center: Brand Name */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="text-xl font-bold text-foreground tracking-wider hover:text-primary transition-colors"
            >
              ALIFDWT
            </Link>
          </div>

          {/* Right: Social Links + Language Switcher */}
          <div className="hidden lg:flex items-center space-x-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-muted hover:bg-muted/50 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
                >
                  <Icon fill="white" strokeWidth={0} className="h-4 w-4" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              );
            })}
            <div className="w-px h-6 bg-border mx-2" />
            <LanguageSwitcher dark />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center space-x-3">
            <LanguageSwitcher dark />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary hover:bg-accent"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-background border-border"
              >
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-6 px-4">
                  <Navigation
                    items={navItems}
                    mobile
                    dark
                    onItemClick={() => setIsOpen(false)}
                  />

                  {/* Mobile Social Links */}
                  <div className="border-t border-border pt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect with me
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <Link
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-muted/20 hover:bg-muted/30 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
                            title={social.label}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="sr-only">{social.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
