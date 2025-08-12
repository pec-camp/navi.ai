import { createClient } from "@/shared/utils/supabase/server";

export async function getCategoriesWithTag() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      *,
      subcategories (*)
    `,
    )
    .eq("parent_id", null)
    .order("name");

  if (error) {
    throw new Error("Failed to fetch categories with subcategories");
  }

  return data;
}
