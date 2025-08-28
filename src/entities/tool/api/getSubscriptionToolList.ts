"use server";

import { createClient } from "@/shared/utils/supabase/server";

import {
  SubscriptionTool,
  SubscriptionToolData,
} from "../model/SubscriptionTool.interface";

/**
 * 구독 도구 목록 및 총 개수 조회
 */
export async function getSubscriptionToolList(
  userId: string,
  limit?: number,
  offset?: number,
): Promise<SubscriptionTool> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_user_subscribed_tools", {
    input_user_id: userId,
    input_limit: limit,
    input_offset: offset,
  });

  if (error) {
    console.error("Error fetching subscribed tools:", error);
    return { tools: [], totalCount: 0 };
  }

  type SubscribedTool = typeof data.tools[0];
  const tools: SubscriptionToolData[] = data.tools.map((tool: SubscribedTool) => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.website_name,
    websiteLogo: tool.website_logo,
    imageUrl: tool.image_url,
    website: tool.website,
    category: tool.sub_category_name,
    categoryId: tool.sub_category_id,
    rating: tool.avg_rating || 4.5,
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

  return {
    tools,
    totalCount: data.totalCount,
  } as SubscriptionTool;
}
