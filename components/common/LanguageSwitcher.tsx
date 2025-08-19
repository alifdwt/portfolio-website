"use client";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";

interface LanguageSwitcherProps {
  dark?: boolean;
}

export default function LanguageSwitcher({
  dark = false,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = () => {
    const newLocale = locale === "en" ? "id" : "en";

    // Use next-intl's router.replace to maintain the same pathname but change locale
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      className={`flex items-center space-x-1 text-sm transition-colors ${
        dark
          ? "text-gray-300 hover:bg-white/10 hover:text-white"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{locale === "en" ? "ID" : "EN"}</span>
    </Button>
  );
}
