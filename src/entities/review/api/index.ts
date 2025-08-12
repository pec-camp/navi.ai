import { createClient } from "@/shared/utils/supabase/server";

export async function getReview(reviewId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      users (*),
      tools (*)
    `,
    )
    .eq("id", reviewId)
    .single();

  if (error) {
    throw new Error("Failed to fetch review");
  }

  return data;
}

export async function getReviewsByToolId(toolId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      users (*)
    `,
    )
    .eq("tool_id", toolId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch reviews by tool ID");
  }

  return data;
}
