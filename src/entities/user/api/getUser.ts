import { createClient } from "@/shared/utils/supabase/server";

export async function getUser(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error("Failed to fetch user information");
  }

  return data;
}
