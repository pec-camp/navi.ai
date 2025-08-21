export * from "./getSubscriptionCategories";
import { SubscriptionTool } from "../model/CategorySubscription.interface";
import { MOCK_SUBSCRIPTION_TOOL_LIST } from "../model/constants";

/**
 * 유저의 구독 도구 목록 조회
 */
export async function getSubscriptionToolList(
  userId: string,
): Promise<SubscriptionTool[]> {
  return MOCK_SUBSCRIPTION_TOOL_LIST;
}
