export * from "./getSubscriptionCategories";
import { createClient } from "@/shared/utils/supabase/server";
import { SubscriptionTool } from "../model/SubscriptionTool.interface";

/**
 * 유저의 구독 도구 목록 조회
 */
export async function getSubscriptionToolList(
  userId: number,
): Promise<SubscriptionTool[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_user_subscribed_tools", {
    input_user_id: userId,
  });

  if (error) {
    console.error("Error fetching subscribed tools:", error);
    return [];
  }

  return data.map((tool: any) => ({
    id: tool.id,
    name: tool.website_name,
    website_logo: tool.website_logo,
    image_url: tool.image_url,
    website: tool.website,
    category: tool.sub_category_name,
    categoryId: tool.sub_category_id.toString(),
    rating: tool.avg_rating,
    summary: tool.what_is_summary,
    isFreePlan: tool.is_free_plan,
    isPaidPlan: tool.is_paid_plan,
    isFreemium: tool.is_freemium,
    hasTrial: tool.has_trial,
    isContact: tool.is_contact,
    date: new Date(tool.original_created_at)
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, ".")
      .replace(/\s/g, ""),
    reviewCount: tool.review_count || 0,
  }));
}
