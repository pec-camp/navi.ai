import { Star } from "lucide-react";
import Image from "next/image";

import { Review } from "../model/Review.interface";

interface ReviewItemProps {
  review: Review;
  showActions?: boolean; // 추후 수정/삭제 버튼 표시 여부
}

export function ReviewItem({ review, showActions = false }: ReviewItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getAuthorName = () => {
    return review.author?.name || "Anonymous";
  };

  const getAuthorInitial = () => {
    const name = getAuthorName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <article className="group rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:shadow-sm">
      {/* 헤더: 사용자 정보와 액션 버튼 공간 */}
      <header className="mb-4 flex items-start justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          {/* 아바타 */}
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-surface">
            {review.author?.avatar_url ? (
              <Image
                src={review.author.avatar_url}
                width={48}
                height={48}
                alt={`${getAuthorName()}의 아바타`}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary-secondary text-sm font-light text-white">
                {getAuthorInitial()}
              </div>
            )}
          </div>

          {/* 사용자 정보 */}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-light text-foreground">
                {getAuthorName()}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {/* 평점 */}
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-3 w-3 ${
                      index < review.rating
                        ? "fill-star text-star"
                        : "fill-gray-200 text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <span className="text-muted-foreground">•</span>

              <time
                dateTime={review.created_at}
                className="font-light text-muted-foreground"
              >
                {formatDate(review.created_at)}
              </time>

              {/* 직업 */}
              {review.author?.profession && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-light text-muted-foreground">
                    {review.author.profession}
                  </span>
                </>
              )}

              {/* TODO: 추후 구현 - 추천 표시 */}
              {/* {review.recommend && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <ThumbsUp className="h-3 w-3" />
                    <span className="font-light">추천</span>
                  </div>
                </>
              )} */}
            </div>
          </div>
        </div>

        {/* 액션 버튼 공간 (추후 구현) */}
        {showActions && (
          <div className="ml-2 flex items-start gap-1">
            {/* TODO: 수정/삭제 버튼이 여기에 들어갈 예정 */}
            <div className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100">
              {/* 버튼 placeholder */}
            </div>
          </div>
        )}
      </header>

      {/* 리뷰 내용 */}
      <div className="space-y-3">
        <p className="pl-13 text-sm font-light leading-relaxed text-foreground">
          {review.review_text}
        </p>

        {/* 함께 사용한 도구 */}
        {review.used_with_tool_id && (
          <div className="ml-13 rounded-md bg-surface p-3">
            <p className="text-xs font-light text-muted-foreground-secondary">
              <span className="font-normal">함께 사용:</span> Tool ID{" "}
              {review.used_with_tool_id}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
