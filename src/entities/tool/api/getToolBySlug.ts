"use server";

import { createClient } from "@/shared/utils/supabase/server";

import { formatToolDetail } from "../model/formatToolData";

/**
 * 상세 페이지용 도구 정보 조회
 */
export async function getToolBySlug(slug: string) {
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
}
