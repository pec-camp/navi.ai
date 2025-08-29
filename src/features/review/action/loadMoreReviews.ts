"use server";

import { getReviewsByTool } from "@/entities/review/api/getToolReviews";

export async function loadMoreReviews(
  toolId: number,
  limit: number = 5,
  offset: number = 0
) {
  "use server";
  
  return await getReviewsByTool(toolId, limit, offset);
}