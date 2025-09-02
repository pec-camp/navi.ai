"use server";

import { getSubscriptionToolList } from "@/entities/tool/api/getSubscriptionToolList";
import { SubscriptionToolListResponse } from "@/entities/tool/model/SubscriptionTool.interface";

/**
 * 구독 도구 목록 조회 - 클라이언트 컴포넌트용 서버 액션
 * @param userId 사용자 ID
 * @param limit 조회할 도구 개수 제한
 * @param offset 페이지네이션 오프셋
 * @returns 포맷된 구독 도구 목록과 총 개수
 */
export async function loadSubscriptionToolList(
  userId: string,
  limit: number = 10,
  offset: number = 0,
): Promise<SubscriptionToolListResponse> {
  return await getSubscriptionToolList(userId, limit, offset);
}
