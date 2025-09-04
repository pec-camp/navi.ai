"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/ui/lib/utils";

interface Tab {
  name: string;
  href: string;
  icon: React.ReactNode;
  className?: string;
}

export function MainTabNavigation({ tabs }: { tabs: Tab[] }) {
  const pathname = usePathname();
  const safePathname = pathname || "/";

  return (
    <div className="flex justify-center bg-background">
      <nav className="flex items-center gap-8 p-10">
        {tabs.map((tab) => {
          const icon = tab.icon;
          const isActive = safePathname === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              prefetch={true}
              className={cn(
                "font-onest flex h-12 items-center gap-2 px-0 py-3 text-base transition-colors",
                isActive
                  ? "font-medium text-primary"
                  : "font-medium hover:text-primary",
                tab.className,
              )}
            >
              {icon}
              <span className="text-lg">{tab.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}