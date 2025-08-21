"use server";

import { createClient } from "@/shared/utils/supabase/server";
import type { Tool } from "@/src/entities/tool/model/Tool.interface";

export async function getToolById(toolId: string): Promise<Tool> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ai_tools")
    .select("*")
    .eq("id", toolId)
    .single();

  if (error) {
    throw new Error("Failed to fetch tool by ID");
  }

  return data as unknown as Tool;
}
