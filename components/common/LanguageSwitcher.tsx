// components/common/LanguageSwitcher.tsx
"use client";

import { Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";

interface LanguageSwitcherProps {
  dark?: boolean;
}

export default function LanguageSwitcher({}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = () => {
    const newLocale = locale === "en" ? "id" : "en";

    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";

    // Add new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      className="flex items-center space-x-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{locale === "en" ? "ID" : "EN"}</span>
    </Button>
  );
}
