import { Star, ThumbsUp, Verified } from "lucide-react";
import { Review } from "../model/Review.interface";

interface ReviewItemProps {
  review: Review;
  showHelpful?: boolean;
}

export function ReviewItem({ review, showHelpful = true }: ReviewItemProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).replace(/\./g, '.').replace(/\s/g, '');
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      {/* 리뷰 헤더 */}
      <div className="mb-4 flex items-start gap-3">
        {/* 아바타 */}
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted">
          <span className="text-sm font-medium text-muted-foreground">
            {review.author.charAt(0)}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          {/* 사용자 정보 */}
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-secondary">
                {review.author}
              </h4>
              {review.isVerified && (
                <div className="flex items-center gap-1">
                  <Verified className="h-3 w-3 fill-blue-500 text-blue-500" />
                  <span className="text-xs text-blue-600">인증됨</span>
                </div>
              )}
            </div>

            {/* 별점과 날짜 */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground-secondary">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-3 w-3 ${
                      index < review.rating
                        ? "fill-star text-star"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
                <span className="ml-1 font-medium">
                  {review.rating}.0
                </span>
              </div>
              <span>•</span>
              <time dateTime={review.createdAt.toISOString()}>
                {formatDate(review.createdAt)}
              </time>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {/* 리뷰 내용 */}
        <p className="text-sm font-light leading-relaxed text-foreground">
          {review.content}
        </p>

        {/* 함께 사용한 도구 */}
        {review.tools && (
          <div className="text-xs">
            <div className="mb-2 font-medium text-muted-foreground">
              함께 사용한 도구:
            </div>
            <span className="rounded-[4px] bg-muted px-3 py-1 text-xs font-normal text-muted-foreground">
              {review.tools}
            </span>
          </div>
        )}

        {/* 도움됨 버튼 */}
        {showHelpful && review.helpfulCount !== undefined && (
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <ThumbsUp className="h-3 w-3" />
                도움됨 ({review.helpfulCount})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
