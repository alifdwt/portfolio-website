"use client";

import { Menu, Twitter, Linkedin, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Navigation from "./Navigation";

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
    <header className="dark fixed top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-sm dark:border-border dark:bg-background/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Navigation Menu */}
          <div className="hidden items-center lg:flex">
            <Navigation items={navItems} dark />
          </div>

          {/* Center: Brand Name */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="text-xl font-bold tracking-wider text-foreground transition-colors hover:text-primary"
            >
              ALIFDWT
            </Link>
          </div>

          {/* Right: Social Links + Language Switcher */}
          <div className="hidden items-center space-x-3 lg:flex">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-200 hover:bg-muted/50 hover:text-foreground"
                >
                  <Icon fill="white" strokeWidth={0} className="h-4 w-4" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              );
            })}
            <div className="mx-2 h-6 w-px bg-border" />
            <LanguageSwitcher dark />
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-3 lg:hidden">
            <LanguageSwitcher dark />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-accent hover:text-primary"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] border-border bg-background"
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
                    <p className="mb-4 text-sm text-muted-foreground">
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
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/20 text-muted-foreground transition-all duration-200 hover:bg-muted/30 hover:text-foreground"
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
