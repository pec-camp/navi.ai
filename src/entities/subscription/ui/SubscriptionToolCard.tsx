import { ExternalLinkIcon, MessageCircle, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/shared/ui/card";
import { TOOLS_SLUG_PATHNAME } from "@/src/shared/config/pathname";
import { ExternalLink, ToolLogo } from "@/src/shared/ui";

import { SubscriptionToolData } from "../model/SubscriptionTool.interface";

type SubscriptionToolCardProps = SubscriptionToolData & {
  className?: string;
};

export default function SubscriptionToolCard({
  name,
  slug,
  websiteLogo,
  imageUrl,
  website,
  category,
  rating,
  summary,
  isFreePlan,
  isPaidPlan,
  isFreemium,
  hasTrial,
  date,
  reviewCount,
  className,
}: SubscriptionToolCardProps) {
  const getPricingDisplay = () => {
    if (isFreePlan && !isPaidPlan && !isFreemium) {
      return {
        text: "무료",
        badge: true,
        className:
          "inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800",
      };
    }

    if (isFreemium || (isFreePlan && isPaidPlan)) {
      return {
        text: "무료 + 유료 플랜",
        badge: false,
        className: "text-xs font-light text-foreground",
      };
    }

    if (hasTrial && isPaidPlan) {
      return {
        text: "무료 체험 + 유료",
        badge: false,
        className: "text-xs font-light text-foreground",
      };
    }

    if (isPaidPlan) {
      return {
        text: "유료 플랜",
        badge: false,
        className: "text-xs font-light text-foreground",
      };
    }

    return {
      text: "가격 문의",
      badge: false,
      className: "text-xs font-light text-muted-foreground",
    };
  };

  const pricing = getPricingDisplay();

  return (
    <Link href={TOOLS_SLUG_PATHNAME(slug)}>
      <Card
        className={`group relative h-full max-w-sm cursor-pointer overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-sm ${className || ""}`}
      >
        <CardContent className="flex h-full flex-col p-0">
          {/* 헤더 섹션 */}
          <div className="flex items-center space-x-3 p-4">
            {/* 도구 아이콘 */}
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-2xl bg-surface">
              <ToolLogo
                websiteLogo={websiteLogo}
                name={name}
                className="h-6 w-6"
              />
            </div>

            {/* 도구명 및 카테고리 */}
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-base font-semibold leading-tight text-foreground">
                  {name.includes("-") ? name.split("-")[0] : name}
                </h3>
                {website && (
                  <ExternalLink href={website || ""} asButton>
                    <ExternalLinkIcon className="h-3 w-3 text-muted-foreground hover:text-primary" />
                  </ExternalLink>
                )}
              </div>
              <span className="text-xs font-normal leading-tight text-muted-foreground-secondary">
                {category}
              </span>
            </div>
          </div>

          {/* 메인 이미지 */}
          <div className="px-4 pb-4">
            <div className="h-40 w-full overflow-hidden rounded-xl border border-border bg-surface">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={`${name} preview`}
                  width={400}
                  height={160}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted">
                  <span className="text-sm text-muted-foreground">{name}</span>
                </div>
              )}
            </div>
          </div>

          {/* 평점 및 리뷰 */}
          <div className="px-4 pb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <StarIcon className="h-3.5 w-3.5 text-secondary" />
                <span className="text-sm font-light text-foreground">
                  {rating}
                </span>
              </div>

              {/* 리뷰 아이콘 */}
              <div className="ml-4 flex items-center space-x-1">
                <MessageCircle className="h-3.5 w-3.5 text-secondary" />
                <span className="text-sm font-light text-secondary">
                  {reviewCount}
                </span>
              </div>
            </div>
          </div>

          {/* 설명 텍스트 - 남은 공간을 모두 차지 */}
          <div className="flex-1 px-4 pb-4">
            <p className="text-sm font-light leading-relaxed text-muted-foreground">
              {summary}
            </p>
          </div>

          {/* 가격 및 날짜 - 항상 하단에 고정 */}
          <div className="bg-muted/30 mt-auto border-t border-muted px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={pricing.className}>{pricing.text}</span>
              </div>
              <span className="text-xs font-light text-muted-foreground-secondary">
                {date}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
