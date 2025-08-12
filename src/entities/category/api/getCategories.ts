import { createClient } from "@/shared/utils/supabase/server";

export async function getCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("parent_id", null)
    .order("name");

  if (error) {
    throw new Error("Failed to fetch categories");
  }

  return data;
}
