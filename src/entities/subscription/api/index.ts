import {
  MOCK_USER_SUBSCRIPTIONS,
  type UserSubscription,
} from "../model/constants";

/**
 * 유저의 구독 카테고리 목록 조회 (읽기 전용)
 */
export async function getUserSubscriptions(): Promise<UserSubscription[]> {
  // TODO: 실제로는 데이터베이스에서 userId로 조회
  // const subscriptions = await db.userSubscriptions.findMany({ where: { userId } });

  return MOCK_USER_SUBSCRIPTIONS;
}
