"use client";

import { usePathname, Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface NavigationItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items: NavigationItem[];
  dark?: boolean;
  mobile?: boolean;
  onItemClick?: () => void;
}

export default function Navigation({
  items,
  dark = false,
  mobile = false,
  onItemClick,
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex", mobile ? "flex-col space-y-4" : "space-x-8")}>
      {items.map((item) => {
        // More robust active state detection
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "relative transition-colors duration-200",
              mobile ? "block py-2" : "inline-block",
              dark
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900",
              isActive &&
                (dark
                  ? "text-white font-semibold"
                  : "text-gray-900 font-semibold"),
              "group"
            )}
          >
            {item.label}

            {/* Active indicator */}
            <span
              className={cn(
                "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-200",
                mobile ? "hidden" : "block",
                isActive ? "w-full" : "w-0 group-hover:w-full"
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
