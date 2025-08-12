import { createClient } from "@/shared/utils/supabase/server";

export async function getAllToolList() {
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

  return data;
}
