"use server";

import { createClient } from "@/shared/utils/supabase/server";

import { FeaturedTool } from "../model/FeaturedTool.interface";
import { formatExtension } from "../model/formatToolData";

/**
 * 메인 AI 도구 카드 목록을 조회합니다.
 * 월간 방문수 순으로 정렬되어 20개의 툴을 반환합니다.
 *
 * @returns 인기 툴 목록 (20개)
 */
export async function getFeaturedToolList(): Promise<FeaturedTool[]> {
  const supabase = await createClient();

  const { data: tools, error } = await supabase
    .from("ai_tools")
    .select(
      `
        id,
        name,
        website_logo,
        description,
        tags,
        slug,
        is_free,
        extension
      `,
    )
    .not("website_logo", "is", null)
    .order("month_visited_count", { ascending: false })
    .limit(20);

  if (error) {
    throw new Error(`추천 툴 목록 조회 실패: ${error.message}`);
  }

  if (!tools || tools.length === 0) {
    return [];
  }

  const featuredTools = tools.map((tool) => ({
    id: tool.id,
    name: tool.name,
    websiteLogo: tool.website_logo || "",
    description: tool.description || "",
    slug: tool.slug,
    isFree: tool.is_free ?? false,
    tags: tool.tags || [],
    extension: formatExtension(tool.extension),
  }));

  return featuredTools;
}
