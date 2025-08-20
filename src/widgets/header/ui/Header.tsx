"use client";

import Link from "next/link";

import { cn } from "@/shared/ui/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/shared/ui/navigation-menu";
import { useScrolled } from "@/src/shared/hooks";
import { Logo } from "@/src/shared/ui";

const HEADER_HEIGHT = 64;

export function Header() {
  const isScrolled = useScrolled(HEADER_HEIGHT);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-[#0000001a] duration-300",
        isScrolled
          ? "bg-white shadow-sm"
          : "supports-[backdrop-filter]:bg-background/60 backdrop-blur",
      )}
    >
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="text-xl font-semibold text-foreground">
              Navi.ai
            </span>
          </Link>

          {/* Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/tools"
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-base font-normal text-muted-foreground transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    )}
                  >
                    All Tools
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Actions */}
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href="/login"
            className="hover:text-foreground/80 text-base font-normal text-foreground"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
