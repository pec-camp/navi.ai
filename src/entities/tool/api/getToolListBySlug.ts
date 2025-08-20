"use server";

import { createClient } from "@/shared/utils/supabase/server";
import type { Tool } from "@/src/entities/tool/model/Tool.interface";

export async function getToolListBySlug(categorySlug: string): Promise<Tool[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tools")
    .select(
      `
      *,
      categories!inner (*)
    `,
    )
    .eq("categories.slug", categorySlug)
    .order("name");

  if (error) {
    throw new Error("Failed to fetch tools by category");
  }

  return (data ?? []) as unknown as Tool[];
}
