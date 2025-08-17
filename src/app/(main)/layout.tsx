import { MainSearchBar } from "@/features/search/ui/MainSearchBar";
import { TabNavigation } from "@/shared/ui/TabNavigation";
import { TOOL_PATHNAME } from "@/src/shared/config/pathname";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mt-14 min-h-screen w-full">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-6">
        {/* Notification Banner */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 shadow-sm">
            <Link
              href={TOOL_PATHNAME}
              className="font-onest text-xs font-light text-foreground"
            >
              Introducing AI Tools Discovery Platform
            </Link>
            <ArrowUpRight className="h-3 w-3 text-foreground" />
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center">
          <h1 className="font-rajdhani text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            DISCOVER THE WORLD'S
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                background:
                  "linear-gradient(135deg, #7C3AED 0%, #A855F7 30%, #D946EF 70%, #EC4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              TOP AI TOOLS
            </span>
          </h1>
        </div>

        {/* Sub Text */}
        <div className="mb-8 text-center">
          <p className="font-onest text-sm text-muted-foreground">
            21,346+ <span className="font-medium text-secondary">AI tools</span>{" "}
            for 13,583 <span className="font-medium text-secondary">tasks</span>{" "}
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
      <TabNavigation />

      {/* Page Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
