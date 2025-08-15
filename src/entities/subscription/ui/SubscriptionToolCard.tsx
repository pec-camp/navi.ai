import { MessageCircle, StarIcon } from "lucide-react";
import { SubscriptionTool } from "../model/CategorySubscription.interface";

export default function SubscriptionToolCard({
  name,
  category,
  rating,
  description,
  price,
  date,
  reviewCount,
}: SubscriptionTool) {
  return (
    <div className="flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* 헤더 섹션 */}
      <div className="flex items-center space-x-3 p-4">
        {/* 도구 아이콘 */}
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-surface">
          <div className="h-6 w-6 rounded-lg bg-muted"></div>
        </div>

        {/* 도구명 및 카테고리 */}
        <div className="flex flex-col">
          <h3 className="text-base font-semibold leading-tight text-foreground">
            {name}
          </h3>
          <span className="text-xs font-normal leading-tight text-muted-foreground-secondary">
            {category}
          </span>
        </div>
      </div>

      {/* 메인 이미지 */}
      <div className="px-4 pb-4">
        <div className="h-40 w-full overflow-hidden rounded-xl border border-border bg-surface">
          <div className="h-full w-full rounded-lg bg-muted"></div>
        </div>
      </div>

      {/* 평점 및 리뷰 */}
      <div className="px-4 pb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <StarIcon className="h-3.5 w-3.5 text-secondary" />
            <span className="text-sm font-light text-foreground">{rating}</span>
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
          {description}
        </p>
      </div>

      {/* 가격 및 날짜 - 항상 하단에 고정 */}
      <div className="bg-muted/30 mt-auto border-t border-muted px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-light text-foreground">{price}</span>
          <span className="text-xs font-light text-muted-foreground-secondary">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}
