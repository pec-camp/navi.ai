import { ExternalLink, MessageCircle, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatToolDetail } from "@/entities/tool";
import { AddToCompareButton } from "@/features/compare";
import { TOOLS_SLUG_PATHNAME } from "@/shared/config/pathname";
import { ToolLogo } from "@/shared/ui";
import { Card, CardContent } from "@/shared/ui/card";
import { getPricingDisplay } from "@/src/shared/utils/getPricingDisplay";

interface ToolCardProps {
  tool: ReturnType<typeof formatToolDetail>;
  className?: string;
}

export default function ToolCard({ tool, className }: ToolCardProps) {
  const pricing = getPricingDisplay(tool.isFree, tool.pricingLabel);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0].replace(/-/g, ".");
  };

  return (
    <div className="relative">
      <Link href={TOOLS_SLUG_PATHNAME(tool.slug)}>
        <Card
          className={`group relative h-full max-w-sm cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-sm ${
            className || ""
          }`}
        >
          <CardContent className="flex h-full flex-col p-0">
            {/* 헤더 섹션 */}
            <div className="flex items-center space-x-2 p-3">
              {/* 도구 아이콘 */}
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface">
                <ToolLogo
                  websiteLogo={tool.websiteLogo || ""}
                  name={tool.name}
                  className="h-5 w-5"
                />
              </div>

              {/* 도구명 및 카테고리 */}
              <div className="flex min-w-0 max-w-[calc(100%-2rem)] flex-1 flex-col">
                <div className="flex items-center gap-1.5">
                  <h3
                    className="truncate text-sm font-semibold leading-tight text-foreground"
                    style={{ maxWidth: "150px" }}
                  >
                    {tool.websiteName}
                  </h3>
                  {tool.website && (
                    <ExternalLink className="h-2.5 w-2.5 flex-shrink-0 text-muted-foreground" />
                  )}
                </div>
                <span className="truncate text-xs font-normal leading-tight text-muted-foreground-secondary">
                  {tool.tags?.[0] || "AI Tool"}
                </span>
              </div>
            </div>

            {/* 메인 이미지 */}
            <div className="px-3 pb-3">
              <div className="h-36 w-full overflow-hidden rounded-lg border border-border bg-surface">
                {tool.imageUrl ? (
                  <Image
                    src={tool.imageUrl}
                    alt={`${tool.name} preview`}
                    width={400}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted p-4">
                    <span className="truncate text-sm text-muted-foreground">
                      {tool.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 평점 및 리뷰 */}
            <div className="px-3 pb-2">
              <div className="flex items-center space-x-2">
                {tool.avgRating ? (
                  <>
                    <div className="flex items-center space-x-0.5">
                      <StarIcon className="h-3 w-3 text-secondary" />
                      <span className="text-xs font-light text-foreground">
                        {tool.avgRating.toFixed(1)}
                      </span>
                    </div>

                    {/* 리뷰 아이콘 */}
                    <div className="flex items-center space-x-0.5">
                      <MessageCircle className="h-3 w-3 text-secondary" />
                      <span className="text-xs font-light text-secondary">
                        {tool.reviewCount || 0}
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    평점 없음
                  </span>
                )}
              </div>
            </div>

            {/* 설명 텍스트 - 남은 공간을 모두 차지 */}
            <div className="flex-1 px-3 pb-3">
              <p className="line-clamp-2 text-xs font-light leading-relaxed text-muted-foreground">
                {tool.whatIsSummary || tool.description || ""}
              </p>
            </div>

            {/* 가격 및 날짜 - 항상 하단에 고정 */}
            <div className="bg-muted/30 mt-auto border-t border-muted px-3 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className={pricing.className}>{pricing.text}</span>
                </div>
                <span className="text-xs font-light text-muted-foreground-secondary">
                  {formatDate(tool.dates.createdAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Compare button - positioned absolutely over the card */}
      <div className="absolute right-2 top-2 z-10">
        <AddToCompareButton tool={tool} />
      </div>
    </div>
  );
}
