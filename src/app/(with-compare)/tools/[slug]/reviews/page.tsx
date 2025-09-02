import { PencilLine } from "lucide-react";
import Link from "next/link";

import { getReviewsByTool } from "@/src/entities/review";
import { getToolBySlug } from "@/src/entities/tool";
import { getCurrentUser } from "@/src/features/auth";
import {
  PaginatedReviewList,
  ReviewsLoginInduceModal,
} from "@/src/features/review";
import { TOOLS_SLUG_REVIEWS_REVIEW_FORM_PATHNAME } from "@/src/shared/config/pathname";
import { Button } from "@/src/shared/ui";

interface ToolReviewsPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    modal?: string;
  }>;
}

export default async function ToolReviewsPage({
  params,
  searchParams,
}: ToolReviewsPageProps) {
  const { slug } = await params;
  const { modal } = await searchParams;

  const toolData = (await getToolBySlug(slug))!;

  const user = await getCurrentUser();
  const reviewsData = await getReviewsByTool(toolData.id, 5, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-secondary">
          {toolData.name} 리뷰
        </h2>

        <Button variant="secondary" asChild>
          <Link
            href={
              user
                ? TOOLS_SLUG_REVIEWS_REVIEW_FORM_PATHNAME(slug)
                : `?modal=login`
            }
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
        toolSlug={slug}
        currentUserId={user?.id}
        initialReviews={reviewsData.reviews}
        stats={reviewsData.stats}
        total={reviewsData.total}
      />

      {/* 로그인 유도 모달 */}
      <ReviewsLoginInduceModal isOpen={modal === "login"} />
    </div>
  );
}
