import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { TOOLS_PATHNAME } from "@/shared/config/pathname";
import { FeaturedToolList } from "@/src/entities/tool/ui";

export default async function Home() {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-medium leading-9 text-foreground">
          Discover AI Tools
        </h2>

        {/* 더보기 */}
        <Link
          href={TOOLS_PATHNAME}
          className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground"
        >
          View more
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Featured Tool List */}
      <FeaturedToolList />
    </section>
  );
}
