"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  key: string;
  label: string;
  href: string;
}

interface ToolDetailTabsProps {
  tabs: Tab[];
}

export function ToolDetailTabs({ tabs }: ToolDetailTabsProps) {
  const pathname = usePathname();

  const isActiveTab = (href: string) => {
    return pathname === href;
  };

  return (
    <nav
      className="scrollbar-hide mb-10 flex gap-6 overflow-x-auto border-b border-border"
      role="tablist"
      aria-label="도구 정보 탭"
    >
      {tabs.map(({ key, label, href }) => {
        const isActive = isActiveTab(href);
        return (
          <Link
            key={key}
            href={href}
            className={
              isActive
                ? "flex items-center space-x-1 whitespace-nowrap border-b-2 border-secondary px-1 py-2 font-medium text-secondary sm:space-x-2 sm:text-base"
                : "flex items-center space-x-1 whitespace-nowrap px-1 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:space-x-2 sm:text-sm"
            }
            role="tab"
            aria-selected={isActive}
            aria-controls={`${key}-panel`}
          >
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">
              {label.length > 4 ? label.slice(0, 3) : label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}