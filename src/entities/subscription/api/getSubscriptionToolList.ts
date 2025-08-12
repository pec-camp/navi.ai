import { createClient } from "@/shared/utils/supabase/server";

export async function getSubscriptionToolList(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select(
      `
      *,
      tools (*)
    `,
    )
    .eq("user_id", userId)
    .eq("status", "active");

  if (error) {
    throw new Error("Failed to fetch subscription tool list");
  }

  return data;
}
