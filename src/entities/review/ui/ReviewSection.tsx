import { PencilLine } from "lucide-react";
import Link from "next/link";

import { getReviewsByTool } from "@/src/entities/review/api/getReviewsByTool";
import { getCurrentUser } from "@/src/features/auth";
import {
  PaginatedReviewList,
  ReviewsLoginInduceModal,
} from "@/src/features/review";
import { Button } from "@/src/shared/ui";

import { AiToolDetail } from "../../tool";

interface ReviewSectionProps {
  toolData: AiToolDetail;
}

export default async function ReviewSection({ toolData }: ReviewSectionProps) {
  const user = await getCurrentUser();
  const reviewsData = await getReviewsByTool(toolData.id, 5, 0);

  return (
    <section className="mt-24">
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium text-foreground">
              <span className="capitalize">{toolData.name}</span> 리뷰
            </h2>

            <Button variant="secondary" asChild>
              <Link
                href={
                  user ? `/tools/${toolData.slug}/review-form` : `?modal=login`
                }
                scroll={false}
                aria-label="리뷰 작성"
              >
                <PencilLine className="mr-2 h-4 w-4" />
                리뷰 작성
              </Link>
            </Button>
          </div>

          {/* 리뷰 목록 */}
          <PaginatedReviewList
            toolId={toolData.id}
            toolSlug={toolData.slug}
            currentUserId={user?.id}
            initialReviews={reviewsData.reviews}
            stats={reviewsData.stats}
            total={reviewsData.total}
          />
        </div>
      </div>

      {/* 로그인 유도 모달 */}
      <ReviewsLoginInduceModal />
    </section>
  );
}
