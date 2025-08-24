import { createClient } from "@/shared/utils/supabase/server";

import { AlternativeTool } from "../model/AlternativeTool.interface";

/**
 * 대안 도구 추천 함수 (RPC 기반)
 * Supabase RPC 함수를 호출하여 유사도 기반 대안 도구를 추천합니다.
 *
 * @param targetSlug 현재 도구의 슬러그
 * @param limit 추천할 도구의 개수 (기본값: 3, 최대 3개)
 * @returns 대안 도구 배열
 */
export async function getAlternativeToolList(
  targetSlug: string,
  limit: number = 3,
): Promise<AlternativeTool[]> {
  const supabase = await createClient();

  try {
    // RPC 함수 호출 (get_similar_tools_v1) - 최대 3개 제한
    const { data: alternativeTools, error } = await supabase.rpc(
      "get_similar_tools_v1",
      {
        target_slug: targetSlug,
        limit_count: Math.min(limit, 3), // 최대 3개 제한
      },
    );

    if (error) {
      console.error("Error calling get_similar_tools_v1 RPC:", error);
      return [];
    }

    if (!alternativeTools || alternativeTools.length === 0) {
      return [];
    }

    // 응답 데이터 포맷팅
    const formattedTools: AlternativeTool[] = alternativeTools.map((tool: any) => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.description || "",
      similarityScore: tool.similarity_score,
      imageUrl: tool.image_url,
      logoUrl: tool.website_logo,
      website: tool.website,
      isFree: tool.is_free,
      monthVisitedCount: tool.month_visited_count,
      rating: tool.avg_rating || 0,
      reviewCount: tool.review_count || 0,
    }));

    return formattedTools;
  } catch (error) {
    console.error("Error in getAlternativeTools RPC:", error);
    return [];
  }
}
