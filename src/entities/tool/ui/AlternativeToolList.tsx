import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { TOOLS_PATHNAME, TOOLS_SLUG_PATHNAME } from "@/shared/config/pathname";
import AddToCompareButton from "@/src/features/compare/ui/AddToCompareButton";

import { getAlternativeToolList } from "../api/getAlternativeToolList";
import AlternativeCard from "./AlternativeCard";

interface AlternativeToolListProps {
  slug: string;
  toolName: string;
}

export default async function AlternativeToolList({
  slug,
  toolName,
}: AlternativeToolListProps) {
  const alternativeTools = await getAlternativeToolList(slug, 3);

  return (
    <div className="container mx-auto max-w-7xl">
      {alternativeTools.length > 0 ? (
        <div className="grid min-h-[480px] gap-6 md:grid-cols-2 lg:grid-cols-3">
          {alternativeTools.map((alternativeTool) => (
            <div key={alternativeTool.slug} className="relative">
              <Link href={TOOLS_SLUG_PATHNAME(alternativeTool.slug || "")}>
                <AlternativeCard alternativeTool={alternativeTool} />
              </Link>
              <div className="absolute right-4 top-4 z-10">
                <AddToCompareButton
                  tool={alternativeTool}
                  aria-label={`${toolName}를 비교목록에 추가`}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">
            유사한 도구를 찾을 수 없습니다.
          </p>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href={TOOLS_PATHNAME}
          className="group flex items-center justify-center gap-1 text-sm font-medium text-primary transition-all duration-200 hover:text-foreground"
        >
          View more
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}