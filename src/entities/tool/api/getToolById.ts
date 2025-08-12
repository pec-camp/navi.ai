import { createClient } from "@/shared/utils/supabase/server";

export async function getToolById(toolId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tools")
    .select(
      `
      *,
      categories (*),
      tags (*),
      reviews (*)
    `,
    )
    .eq("id", toolId)
    .single();

  if (error) {
    throw new Error("Failed to fetch tool by ID");
  }

  return data;
}
