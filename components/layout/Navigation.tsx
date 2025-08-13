"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items: NavItem[];
  mobile?: boolean;
  dark?: boolean;
  onItemClick?: () => void;
}

export default function Navigation({
  items,
  mobile = false,
  dark = false,
  onItemClick,
}: NavigationProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
      }
    );

    // Observe all sections
    items.forEach((item) => {
      const id = item.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    onItemClick?.();
  };

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-4">
        {items.map((item) => {
          const isActive = activeSection === item.href.replace("#", "");
          return (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className={cn(
                "text-left text-lg transition-colors",
                dark
                  ? "text-foreground hover:text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-8">
      {items.map((item) => {
        const isActive = activeSection === item.href.replace("#", "");
        return (
          <button
            key={item.href}
            onClick={() => handleClick(item.href)}
            className={cn(
              "text-sm transition-colors relative",
              dark
                ? "text-foreground hover:text-foreground"
                : "text-muted-foreground hover:text-foreground",
              isActive ? "font-extrabold" : "font-medium"
            )}
          >
            {item.label}
            {isActive && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
