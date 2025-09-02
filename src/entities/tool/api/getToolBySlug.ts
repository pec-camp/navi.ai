import { cache } from "react";

import { createClient } from "@/shared/utils/supabase/server";

import { formatToolDetail } from "../model/formatToolData";

/**
 * 상세 페이지용 도구 정보 조회
 * React cache를 사용하여 단일 요청 내에서 중복 쿼리 방지
 * - layout.tsx와 nested pages(reviews, pricing 등) 간 데이터 공유
 * - 같은 slug에 대한 DB 쿼리는 요청당 1회만 실행
 */
export const getToolBySlug = cache(async (slug: string) => {
  const supabase = await createClient();

  // Use proper JOIN with exact foreign key constraint name
  const { data, error } = await supabase
    .from("ai_tools")
    .select(
      `
      *,
      reviews!reviews_ai_tool_id_fkey(rating)
    `,
    )
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching tool by slug:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  return formatToolDetail(data);
});
