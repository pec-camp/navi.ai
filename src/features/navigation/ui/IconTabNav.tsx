"use client";

import { Bell, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/ui/lib/utils";
import {
  MAIN_PATHNAME,
  SUBSCRIPTIONS_PATHNAME,
} from "@/src/shared/config/pathname";

const tabs = [
  {
    name: "Home",
    href: MAIN_PATHNAME,
    icon: Home,
  },
  {
    name: "Subscriptions",
    href: SUBSCRIPTIONS_PATHNAME,
    icon: Bell,
  },
];

export default function IconTabNav() {
  const pathname = usePathname();
  const safePathname = pathname || "/";

  return (
    <div className="flex justify-center bg-background">
      <nav className="flex items-center gap-8 p-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = safePathname === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "font-onest flex h-12 items-center gap-2 px-0 py-3 text-base transition-colors",
                isActive
                  ? "font-semibold text-primary"
                  : "font-medium hover:text-primary",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={isActive ? 2.5 : 2} />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
