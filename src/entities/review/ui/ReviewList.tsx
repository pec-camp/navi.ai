import { Review, ReviewStats } from "../model/Review.interface";
import { ReviewItem } from "./ReviewItem";

interface ReviewListProps {
  reviews: Review[];
  stats: ReviewStats;
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function ReviewList({ 
  reviews, 
  stats, 
  isLoading = false, 
  onLoadMore,
  hasMore = false 
}: ReviewListProps) {
  if (isLoading && reviews.length === 0) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-start gap-2">
                <div className="h-8 w-8 rounded-full bg-muted"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-20 rounded bg-muted"></div>
                  <div className="h-3 w-32 rounded bg-muted"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted"></div>
                <div className="h-4 w-3/4 rounded bg-muted"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">아직 등록된 리뷰가 없습니다.</p>
        <p className="text-sm text-muted-foreground mt-2">
          첫 번째 리뷰를 작성해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 통계 정보 */}
      {stats.totalReviews > 0 && (
        <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
          <span>총 {stats.totalReviews}개의 리뷰</span>
          <span>•</span>
          <span>평균 평점 {stats.averageRating.toFixed(1)}/5.0</span>
        </div>
      )}

      {/* 리뷰 목록 */}
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}

      {/* 더보기 버튼 */}
      {hasMore && onLoadMore && (
        <div className="text-center pt-4">
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="rounded-md border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
          >
            {isLoading ? "로딩 중..." : "더보기"}
          </button>
        </div>
      )}
    </div>
  );
}
