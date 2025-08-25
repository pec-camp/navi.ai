"use server";

import { createClient } from "@/shared/utils/supabase/server";
import { Database } from "@/shared/utils/supabase";
import { formatToolDetail } from "../model/formatToolData";

export interface ToolsResult {
  tools: ReturnType<typeof formatToolDetail>[];
  totalCount: number;
}

export interface ToolFilters {
  category?: string;
  tag?: string;
  pricing?: "free" | "paid";
  query?: string;
  minRating?: number;
  platform?: string;
  hasTrial?: boolean;
  sort?: "name" | "latest" | "rating" | "popularity";
}

export async function getAllToolsWithPagination(
  limit: number = 12,
  offset: number = 0,
  filters?: ToolFilters
): Promise<ToolsResult> {
  const supabase = await createClient();

  // Start building the query
  let query = supabase
    .from("ai_tools")
    .select(
      `*`,
      { count: "exact" }
    );

  // Apply filters
  if (filters?.query) {
    query = query.or(
      `website_name.ilike.%${filters.query}%,description.ilike.%${filters.query}%,what_is_summary.ilike.%${filters.query}%,name.ilike.%${filters.query}%`
    );
  }

  if (filters?.pricing === "free") {
    query = query.eq("is_free", true);
  } else if (filters?.pricing === "paid") {
    query = query.eq("is_free", false);
  }

  // Apply sorting
  switch (filters?.sort) {
    case "latest":
      query = query.order("original_created_at", { ascending: false, nullsFirst: false });
      break;
    case "rating":
      query = query.order("month_visited_count", { ascending: false, nullsFirst: false });
      break;
    case "popularity":
      query = query.order("month_visited_count", { ascending: false, nullsFirst: false });
      break;
    case "name":
    default:
      query = query.order("name", { ascending: true, nullsFirst: false });
      break;
  }

  // Apply pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching tools:", error);
    return { tools: [], totalCount: 0 };
  }

  const formattedTools: ReturnType<typeof formatToolDetail>[] = data.map((tool) => {
    return formatToolDetail(tool);
  });

  return {
    tools: formattedTools,
    totalCount: count || 0,
  };
}