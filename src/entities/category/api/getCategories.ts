import { createClient } from "@/shared/utils/supabase/server";
import type { Category } from "@/src/entities/category/model/Category.interface";

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    throw new Error("Failed to fetch categories");
  }

  return (data ?? []) as unknown as Category[];
}
