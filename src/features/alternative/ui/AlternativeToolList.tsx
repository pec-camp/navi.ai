"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import AlternativeToolSkeleton from "@/src/entities/tool/ui/AlternativeToolSkeleton";
import AddToCompareButton from "@/src/features/compare/ui/AddToCompareButton";
import {
  TOOLS_PATHNAME,
  TOOLS_SLUG_PATHNAME,
} from "@/src/shared/config/pathname";

import { useAlternativeTools } from "../hooks/useAlternativeTools";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import AlternativeCard from "./AlternativeCard";

interface AlternativeToolListProps {
  slug: string;
  toolName: string;
}

export default function AlternativeToolList({
  slug,
  toolName,
}: AlternativeToolListProps) {
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver<HTMLElement>();
  
  const {
    alternativeTools,
    loadState,
    error,
    retry,
  } = useAlternativeTools({
    slug,
    limit: 3,
    enabled: hasIntersected,
  });

  return (
    <section ref={sectionRef} className="mt-32">
      <div className="container mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-medium text-foreground">
          <span className="capitalize">{toolName}</span>와 비슷한 도구들을
          추천해드려요
        </h2>

        {loadState === 'loading' ? (
          <AlternativeToolSkeleton />
        ) : loadState === 'error' ? (
          <div className="py-8 text-center">
            <p className="mb-4 text-muted-foreground">
              데이터를 불러오는 중 문제가 발생했습니다.
            </p>
            {error && (
              <p className="mb-4 text-sm text-muted-foreground-secondary">
                {error}
              </p>
            )}
            <button
              onClick={retry}
              className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              다시 시도
            </button>
          </div>
        ) : alternativeTools.length > 0 ? (
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
    </section>
  );
}