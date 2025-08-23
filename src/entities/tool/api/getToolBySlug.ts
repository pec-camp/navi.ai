import { createClient } from "@/shared/utils/supabase/server";

import { formatToolDetail } from "../model/formatToolData";

export async function getToolBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ai_tools")
    .select("*")
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
