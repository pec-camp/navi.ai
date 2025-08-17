import { createClient } from "@/shared/utils/supabase/server";
import type { Tool } from "@/src/entities/tool/model/Tool.interface";

export async function getAllToolList(): Promise<Tool[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tools")
    .select(
      `
      *,
      categories (*),
      tags (*)
    `,
    )
    .order("name");

  if (error) {
    throw new Error("Failed to fetch tool list");
  }

  return (data ?? []) as unknown as Tool[];
}
