"use client";

import { useEffect, useState, useTransition } from "react";

import { getReviewsByTool } from "@/entities/review/api/getToolReviews";
import { Review, ReviewStats } from "@/entities/review/model/Review.interface";

import { ViewMoreButton } from "@/src/shared/ui";
import { ReviewItem } from "@/src/entities/review";
import ReviewActions from "./ReviewActions";

interface ReviewListProps {
  toolId: number;
  toolSlug: string;
  currentUserId?: string;
  initialReviews: Review[];
  stats: ReviewStats;
  total: number;
  isLoading?: boolean;
  onReviewAdded?: (review: Review) => void;
}

export function ReviewList({
  toolId,
  toolSlug,
  currentUserId,
  initialReviews,
  stats,
  total,
}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setReviews(initialReviews);
  }, [initialReviews]);

  const handleLoadMore = () => {
    startTransition(async () => {
      try {
        const result = await getReviewsByTool(toolId, 5, reviews.length);
        setReviews((prev) => [...prev, ...result.reviews]);
      } catch (error) {
        console.error("Failed to load more reviews:", error);
      }
    });
  };

  const hasMore = reviews.length < total;

  if (reviews.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">아직 등록된 리뷰가 없습니다.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          첫 번째 리뷰를 작성해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 통계 정보 */}
      {stats.totalReviews > 0 && (
        <div className="mb-6 flex items-center gap-4 text-base text-muted-foreground">
          <span>
            총{" "}
            <strong className="font-medium text-primary">
              {stats.totalReviews}
            </strong>
            개의 리뷰
          </span>
        </div>
      )}

      {/* 리뷰 목록 */}
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          actionSlot={
            currentUserId && currentUserId === review.userId ? (
              <ReviewActions
                reviewId={review.id}
                toolSlug={toolSlug}
                currentUserId={currentUserId}
                reviewUserId={review.userId}
              />
            ) : null
          }
        />
      ))}

      {/* 더보기 버튼 */}
      {hasMore && (
        <div className="flex justify-center">
          <ViewMoreButton
            handleLoadMore={handleLoadMore}
            isPending={isPending}
          />
        </div>
      )}
    </div>
  );
}
