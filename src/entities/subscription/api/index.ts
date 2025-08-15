import {
  CategorySubscription,
  SubscriptionTool,
} from "../model/CategorySubscription.interface";
import {
  MOCK_CATEGORY_SUBSCRIPTIONS,
  MOCK_SUBSCRIPTION_TOOL_LIST,
} from "../model/constants";

/**
 * 유저의 구독 카테고리 목록 조회
 */
export async function getSubscriptionsCategories(
  userId: string,
): Promise<CategorySubscription[]> {
  // TODO: 실제로는 데이터베이스에서 userId로 조회
  // const subscriptions = await db.userSubscriptions.findMany({ where: { userId } });

  return MOCK_CATEGORY_SUBSCRIPTIONS;
}

/**
 * 유저의 구독 도구 목록 조회
 */
export async function getSubscriptionToolList(
  userId: string,
): Promise<SubscriptionTool[]> {
  return MOCK_SUBSCRIPTION_TOOL_LIST;
}
