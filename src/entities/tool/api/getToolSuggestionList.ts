"use server";

import { createClient } from "@/shared/utils/supabase/server";

import type { SuggestionTool } from "../model/SuggestionTool.interface";

/**
 * 실시간 자동완성용 최적화된 검색
 * 메인 검색바의 자동완성 기능에 사용됩니다.
 *
 * @param query - 검색어 (최소 1자 이상)
 * @param limit - 반환할 최대 결과 수 (기본: 5, 최대: 10)
 * @returns 자동완성용 도구 목록
 */
export async function getToolSuggestionList(
  query: string,
  limit: number = 5,
): Promise<SuggestionTool[]> {
  // 자동완성은 1자부터 시작
  const trimmedQuery = query.trim();
  if (!trimmedQuery || trimmedQuery.length < 1) {
    return [];
  }

  // 제한 설정 (자동완성은 최대 10개까지만)
  const finalLimit = Math.min(limit, 10);
  const sanitizedQuery = trimmedQuery.slice(0, 30); // 자동완성은 더 짧은 쿼리

  try {
    const supabase = await createClient();

    // 자동완성 최적화 쿼리
    // 1. name prefix 매칭 우선
    // 2. 인기도 높은 순서
    const { data, error } = await supabase
      .from("ai_tools")
      .select("id, slug, website_logo, name")
      .ilike("name", `${sanitizedQuery}%`) // prefix 매칭만 (빠른 응답)
      .order("month_visited_count", { ascending: false, nullsFirst: false })
      .limit(finalLimit);

    if (error) {
      console.error("Error in quick search:", error);
      return [];
    }

    // 결과가 부족하면 contains 검색 추가
    let results = data ?? [];
    if (results.length < finalLimit && sanitizedQuery.length >= 2) {
      // 추가 검색: name contains (prefix 제외)
      const { data: additionalData } = await supabase
        .from("ai_tools")
        .select("id, slug, website_logo, name")
        .ilike("name", `%${sanitizedQuery}%`)
        .not("name", "ilike", `${sanitizedQuery}%`) // prefix 결과 제외
        .order("month_visited_count", { ascending: false, nullsFirst: false })
        .limit(finalLimit - results.length);

      if (additionalData) {
        results = [...results, ...additionalData];
      }
    }

    // 포맷팅 및 중복 제거
    const seen = new Set<number>();
    return results
      .filter((tool) => {
        if (seen.has(tool.id)) return false;
        seen.add(tool.id);
        return true;
      })
      .map((tool) => ({
        id: tool.id,
        slug: tool.slug,
        websiteLogo: tool.website_logo || null,
        name: tool.name,
      }))
      .slice(0, finalLimit);
  } catch (error) {
    console.error("Unexpected error in getToolSuggestionList:", error);
    return [];
  }
}
