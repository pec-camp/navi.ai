import {
  anonymizeNickname,
  formatProfessionForDisplay,
  generateAvatarUrl,
} from "@/src/features/review/model/anonymizeNickname";
import { createClient } from "@/src/shared/utils/supabase/server";

import { formatReviews } from "../model/formatReviews";
import type { Review } from "../model/Review.interface";

/**
 * 특정 리뷰를 ID로 조회합니다.
 * @param reviewId - 조회할 리뷰 ID
 * @returns Promise<Review | null> - 리뷰 데이터 또는 null
 */
export async function getReviewById(reviewId: number): Promise<Review | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      users:user_id (
        *
      )
    `,
    )
    .eq("id", reviewId)
    .single();

  if (error || !data) {
    return null;
  }

  const originalName = data.users?.email?.split("@")[0] || "Anonymous";
  const userId = data.users?.id || data.user_id || "anonymous";

  return {
    ...formatReviews(data),
    author: {
      id: userId,
      name: anonymizeNickname(originalName),
      avatarUrl: generateAvatarUrl(userId),
      profession: formatProfessionForDisplay(
        data.users?.profession || undefined,
      ),
    },
  };
}
