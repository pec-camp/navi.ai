import { notFound } from "next/navigation";

import { getReviewById } from "@/src/entities/review/api";
import { getToolBySlug } from "@/src/entities/tool";
import { getCurrentUser } from "@/src/features/auth";
import { ReviewSideSheet } from "@/src/features/review";

interface ReviewFormProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    mode?: string;
    id?: string;
  }>;
}

export default async function ReviewFormPage({
  params,
  searchParams,
}: ReviewFormProps) {
  const { slug } = await params;
  const { mode, id } = await searchParams;

  const toolData = await getToolBySlug(slug);

  if (!toolData) {
    notFound();
  }

  // 편집 모드인 경우 추가 처리
  if (mode === "edit" && id) {
    const reviewId = parseInt(id, 10);

    if (isNaN(reviewId)) {
      notFound();
    }

    // 현재 사용자 확인
    const user = await getCurrentUser();

    // 리뷰 데이터 조회
    const reviewData = await getReviewById(reviewId);

    if (!reviewData || !user) {
      notFound();
    }

    // 권한 검증: 본인 리뷰인지 확인
    if (reviewData.userId !== user.id) {
      notFound();
    }

    // 편집 모드로 ReviewSideSheet 렌더링
    return (
      <ReviewSideSheet
        toolId={toolData.id}
        toolName={toolData.name || "도구"}
        mode="edit"
        reviewId={reviewId}
        initialData={reviewData}
      />
    );
  }

  // 기본 생성 모드
  return (
    <ReviewSideSheet
      toolId={toolData.id}
      toolName={toolData.websiteName || ""}
    />
  );
}