import { Button } from "@/src/shared/ui";
import { getReviewsByTool, ReviewList } from "@/src/entities/review";
import { getToolBySlug } from "@/src/entities/tool-detail";
import { PencilLine } from "lucide-react";
import { notFound } from "next/navigation";

interface ToolReviewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolReviewsPage({
  params,
}: ToolReviewsPageProps) {
  const { slug } = await params;

  // 도구 정보 가져오기
  const toolData = await getToolBySlug(slug);
  
  if (!toolData) {
    notFound();
  }

  // 리뷰 데이터 가져오기
  const reviewsData = await getReviewsByTool(slug, 10, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-secondary">
          {toolData.name} 리뷰
        </h2>

        <Button variant="secondary">
          <PencilLine className="h-4 w-4 mr-2" />
          리뷰 남기기
        </Button>
      </div>

      {/* 리뷰 통계 */}
      {reviewsData.stats.totalReviews > 0 && (
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-semibold text-foreground">
                {reviewsData.stats.averageRating.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">평균 평점</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-foreground">
                {reviewsData.stats.totalReviews}
              </div>
              <div className="text-sm text-muted-foreground">총 리뷰</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-foreground">
                {reviewsData.stats.ratingDistribution[5]}
              </div>
              <div className="text-sm text-muted-foreground">5점 리뷰</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-foreground">
                {Math.round((reviewsData.stats.ratingDistribution[4] + reviewsData.stats.ratingDistribution[5]) / reviewsData.stats.totalReviews * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">만족도</div>
            </div>
          </div>
        </div>
      )}

      {/* 리뷰 목록 */}
      <ReviewList
        reviews={reviewsData.reviews}
        stats={reviewsData.stats}
      />
    </div>
  );
}
