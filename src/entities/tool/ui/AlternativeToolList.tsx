import { ArrowUpRight, ChevronRight, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/shared/ui/card";
import { ToolLogo } from "@/src/shared/ui";
import { ExternalLink } from "@/src/shared/ui/ExternalLink";
import { getPricingDisplay } from "@/src/shared/utils/getPricingDisplay";

import { getAlternativeToolList, getToolBySlug } from "../api";
import { AlternativeTool } from "../model/AlternativeTool.interface";
import { TOOLS_PATHNAME } from "@/src/shared/config/pathname";

interface AlternativeToolListProps {
  slug: string;
}

export default async function AlternativeToolList({
  slug,
}: AlternativeToolListProps) {
  const toolData = (await getToolBySlug(slug))!;
  const alternativeTools = await getAlternativeToolList(slug, 3);

  return (
    <section className="mt-32">
      <div className="container mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-medium text-foreground">
          <span className="capitalize">{toolData.name}</span>와 비슷한 도구들을
          추천해드려요
        </h2>

        <div className="grid min-h-[480px] gap-6 md:grid-cols-2 lg:grid-cols-3">
          {alternativeTools.map((alternativeTool) => (
            <Link
              key={alternativeTool.slug}
              href={`/tools/${alternativeTool.slug}`}
            >
              <AlternativeCard alternativeTool={alternativeTool} />
            </Link>
          ))}
        </div>

        {/* 데이터가 없는 경우 안내 메시지 */}
        {alternativeTools.length === 0 && (
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

function AlternativeCard({
  alternativeTool,
}: {
  alternativeTool: AlternativeTool;
}) {
  const pricing = getPricingDisplay(
    alternativeTool?.isFree,
    alternativeTool?.pricingLabel,
  );

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0].replace(/-/g, ".");
  };

  return (
    <Card className="group relative h-full cursor-pointer overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-sm">
      <CardContent className="flex h-full flex-col p-0">
        {/* 헤더 섹션 */}
        <div className="flex items-center space-x-3 p-4">
          {/* 도구 아이콘 */}
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-2xl bg-surface">
            <ToolLogo
              websiteLogo={alternativeTool.websiteLogo || ""}
              name={alternativeTool.name}
              className="h-6 w-6"
            />
          </div>

          {/* 도구명 및 유사도 */}
          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-2">
              <h3 className="truncate pb-1 text-base font-semibold leading-tight text-foreground">
                {alternativeTool.name.includes("-")
                  ? alternativeTool.name.split("-")[0]
                  : alternativeTool.name}
              </h3>
              {alternativeTool.website && (
                <ExternalLink href={alternativeTool.website || ""} asButton>
                  <ExternalLinkIcon className="h-3 w-3 text-muted-foreground hover:text-primary" />
                </ExternalLink>
              )}
            </div>
            {alternativeTool.similarityScore && (
              <span className="text-xs font-normal leading-tight text-muted-foreground-secondary">
                유사도 {Math.round(alternativeTool.similarityScore * 100)}%
              </span>
            )}
          </div>
        </div>

        {/* 메인 이미지 */}
        <div className="px-4 pb-4">
          <div className="h-40 w-full overflow-hidden rounded-xl border border-border bg-surface">
            {alternativeTool.imageUrl ? (
              <Image
                src={alternativeTool.imageUrl}
                alt={`${alternativeTool.name} preview`}
                width={400}
                height={160}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted">
                <span className="text-sm text-muted-foreground">
                  {alternativeTool.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 설명 텍스트  */}
        <div className="flex-1 px-4 pb-4">
          <p className="text-sm font-light leading-relaxed text-muted-foreground">
            {alternativeTool.whatIs}
          </p>
        </div>
        {/* 가격 및 mau */}
        <div className="bg-muted/30 mt-auto border-t border-muted px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={pricing.className}>{pricing.text}</span>
            </div>
            <span className="text-xs font-light text-muted-foreground-secondary">
              {formatDate(alternativeTool.dates.createdAt)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
