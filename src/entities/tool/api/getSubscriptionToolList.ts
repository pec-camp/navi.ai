import { createClient } from "@/shared/utils/supabase/server";

import { formatToolBasic } from "../model/formatToolData";
import {
  SubscriptionTool,
  SubscriptionToolListResponse,
} from "../model/SubscriptionTool.interface";

/**
 * 구독 도구 목록 조회 (RPC - 테이블 형태)
 * @param userId 사용자 ID
 * @param limit 조회할 도구 개수 제한
 * @param offset 페이지네이션 오프셋
 * @returns 포맷된 구독 도구 목록과 총 개수
 */
export async function getSubscriptionToolList(
  userId: string,
  limit: number = 10,
  offset: number = 0,
): Promise<SubscriptionToolListResponse> {
  const supabase = await createClient();

  const toolsResult = await supabase.rpc("get_user_subscribed_tools_v2", {
    input_user_id: userId,
    input_limit: limit,
    input_offset: offset,
  });

  if (toolsResult.error) {
    console.error("Error fetching subscription tools:", toolsResult.error);
    return { tools: [], totalCount: 0 };
  }

  const toolsData = toolsResult.data || [];
  const totalCount = toolsData.length > 0 ? toolsData[0].total_count : 0;

  const formattedTools: SubscriptionTool[] = toolsData.map((tool) => {
    return {
      ...formatToolBasic({
        ...tool,
      }),
      avgRating: tool.avg_rating || 5,
      reviewCount: tool.review_count || 0,
      subcategoryId: tool.sub_category_id,
      subcategoryName: tool.sub_category_name,
    };
  });

  return {
    tools: formattedTools,
    totalCount,
  };
}
