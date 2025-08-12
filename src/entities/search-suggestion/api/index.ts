import { createClient } from "@/shared/utils/supabase/server";

export async function getSuggestByQuery(query: string) {
  const supabase = await createClient();

  // 검색 제안 로직 구현
  const { data, error } = await supabase
    .from("search_suggestions")
    .select("*")
    .ilike("query", `%${query}%`)
    .limit(10);

  if (error) {
    throw new Error("Failed to fetch search suggestions");
  }

  return data;
}
