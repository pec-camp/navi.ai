import { createClient } from "@/shared/utils/supabase/server";

export async function getToolListBySlug(categorySlug: string) {
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

  return data;
}
