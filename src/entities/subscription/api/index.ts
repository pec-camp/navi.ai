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
  
  const { data, error } = await supabase
    .rpc('get_user_subscribed_tools', { user_id: userId });

  if (error) {
    console.error('Error fetching subscribed tools:', error);
    return [];
  }

  return data.map((tool: any) => ({
    id: tool.id,
    name: tool.name,
    website_logo: tool.website_logo,
    category: tool.sub_category_name,
    categoryId: tool.sub_category_id.toString(),
    rating: tool.avg_rating || 4.5,
    description: tool.description,
    price: tool.price || '문의',
    date: new Date(tool.original_created_at).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\./g, '.').replace(/\s/g, ''),
    reviewCount: tool.review_count || 0
  }));
}
