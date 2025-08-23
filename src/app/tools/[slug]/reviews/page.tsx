import { PencilLine } from "lucide-react";
import Link from "next/link";

import { getReviewsByTool } from "@/src/entities/review";
import { getToolBySlug } from "@/src/entities/tool";
import { ReviewList } from "@/src/features/review";
import { TOOLS_SLUG_REVIEW_FORM_PATHNAME } from "@/src/shared/config/pathname";
import { Button } from "@/src/shared/ui";

interface ToolReviewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolReviewsPage({
  params,
}: ToolReviewsPageProps) {
  const { slug } = await params;

  const toolData = (await getToolBySlug(slug))!;
  const reviewsData = await getReviewsByTool(toolData.id, 5, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-secondary">
          {toolData.name} 리뷰
        </h2>

        <Button variant="secondary" asChild>
          <Link
            href={TOOLS_SLUG_REVIEW_FORM_PATHNAME(slug)}
            aria-label="리뷰 작성"
          >
            <PencilLine className="mr-2 h-4 w-4" />
            리뷰 작성
          </Link>
        </Button>
      </div>

      {/* 리뷰 목록 */}
      <ReviewList 
        toolId={toolData.id}
        initialReviews={reviewsData.reviews} 
        stats={reviewsData.stats}
        total={reviewsData.total}
      />
    </div>
  );
}
