"use server";

import { createClient } from "@/shared/utils/supabase/server";
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

  // Category filter - will need to be implemented based on your actual schema
  // if (filters?.category) {
  //   query = query.eq("category_slug", filters.category);
  // }

  if (filters?.pricing === "free") {
    query = query.eq("is_free", true);
  } else if (filters?.pricing === "paid") {
    query = query.eq("is_free", false);
  }

  // Rating filter - would need to join with reviews table
  // if (filters?.minRating && filters.minRating > 0) {
  //   query = query.gte("rating", filters.minRating);
  // }

  // Trial filter - field doesn't exist in ai_tools
  // if (filters?.hasTrial) {
  //   query = query.eq("has_trial", true);
  // }

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

  // Format tools data
  const formattedTools = (data || []).map((tool: any) => {
    return formatToolDetail({
      ...tool,
      rating: tool.rating || 0,
      review_count: tool.review_count || 0,
    });
  });

  return {
    tools: formattedTools,
    totalCount: count || 0,
  };
}