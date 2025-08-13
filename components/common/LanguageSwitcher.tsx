// components/common/LanguageSwitcher.tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

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

    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";

    // Add new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    // newLocale === "en"
    //   ? pathWithoutLocale
    //   : `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{locale === "en" ? "ID" : "EN"}</span>
    </Button>
  );
}
