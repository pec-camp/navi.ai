import { ArrowUpRight, Bell, Home } from "lucide-react";
import Link from "next/link";

import { MainTabNavigation } from "@/features/main-navigation";
import { MainSearchBar } from "@/features/search/ui/MainSearchBar";
import { AnimatedShinyText, AuroraText } from "@/shared/ui";
import {
  MAIN_PATHNAME,
  SUBSCRIPTIONS_PATHNAME,
  TOOLS_PATHNAME,
} from "@/src/shared/config/pathname";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="home-background pointer-events-none absolute inset-x-0 top-0 h-[100vh] bg-contain bg-top bg-repeat-x" />

      <div className="relative mt-14 min-h-screen w-full">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-6">
          {/* Notification Banner */}
          <div className="mb-6 flex justify-center">
            <Link
              href={TOOLS_PATHNAME}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <AnimatedShinyText
                text="Introducing AI Tools Discovery Platform"
                className="font-onest m-0 max-w-none text-xs font-light text-foreground"
              />
              <ArrowUpRight className="h-3 w-3 text-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Main Heading */}
          <div className="text-center">
            <h1 className="font-rajdhani text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
              DISCOVER THE WORLD&#39;S
              <br />
              <AuroraText
                text="TOP AI TOOLS"
                className="font-rajdhani text-5xl font-bold leading-tight tracking-tight md:text-6xl"
              />
            </h1>
          </div>

          {/* Sub Text */}
          <div className="mb-8 text-center">
            <p className="font-onest text-sm text-muted-foreground">
              26,214+{" "}
              <span className="font-medium text-secondary">AI tools</span> for
              13,583 <span className="font-medium text-secondary">tasks</span>{" "}
              and 5,018{" "}
              <span className="font-medium text-secondary">categories</span>
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 flex justify-center">
            <MainSearchBar />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-b border-[#E1E5E9]" />

        {/* Tab Navigation */}
        <MainTabNavigation
          tabs={[
            {
              name: "Home",
              href: MAIN_PATHNAME,
              icon: <Home className="h-6 w-6" />,
            },
            {
              name: "Subscriptions",
              href: SUBSCRIPTIONS_PATHNAME,
              icon: <Bell className="h-6 w-6" />,
            },
          ]}
        />

        {/* Page Content */}
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
