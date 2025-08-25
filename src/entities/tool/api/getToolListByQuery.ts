"use server";

import { createClient } from "@/shared/utils/supabase/server";
import type { Tool } from "@/src/entities/tool/model/Tool.interface";

export async function getToolListByQuery(query: string): Promise<Tool[]> {
  const supabase = await createClient();

  // If query is empty, return all tools
  if (!query.trim()) {
    const { data, error } = await supabase
      .from("ai_tools")
      .select(
        `
        *,
        ai_tool_categories!inner (
          category_id,
          categories (*)
        ),
        ai_tool_sub_categories (
          sub_category_id,
          sub_categories (*)
        )
      `,
      )
      .order("month_visited_count", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching all tools:", error);
      throw new Error("Failed to fetch tool list");
    }

    return (data ?? []) as unknown as Tool[];
  }

  // Search with query
  const searchQuery = `%${query.toLowerCase()}%`;

  const { data, error } = await supabase
    .from("ai_tools")
    .select(
      `
      *,
      ai_tool_categories!inner (
        category_id,
        categories (*)
      ),
      ai_tool_sub_categories (
        sub_category_id,
        sub_categories (*)
      )
    `,
    )
    .or(
      `name.ilike.${searchQuery},description.ilike.${searchQuery},tags.cs.{${query.toLowerCase()}}`,
    )
    .order("month_visited_count", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error searching tools:", error);
    throw new Error("Failed to search tools");
  }

  return (data ?? []) as unknown as Tool[];
}
