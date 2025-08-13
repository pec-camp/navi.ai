"use server";

import { revalidatePath } from "next/cache";
import { type UserSubscription } from "@/src/entities/subscription/model/constants";

/**
 * 유저의 구독 카테고리 업데이트 (변경 작업)
 */
export async function updateUserSubscriptions(subscriptions: UserSubscription[]) {
  try {
    // TODO: 실제로는 데이터베이스 업데이트
    // await db.userSubscriptions.deleteMany({ where: { userId } });
    // await db.userSubscriptions.createMany({ data: subscriptions.map(sub => ({ ...sub, userId })) });
    
    // Mock: 실제로는 여기서 데이터베이스를 업데이트함
    console.log("구독 상태 업데이트:", subscriptions);
    
    // 구독 페이지 리프레시
    revalidatePath("/subscriptions");
    
    return { success: true };
  } catch (error) {
    console.error("구독 업데이트 실패:", error);
    return { success: false, error: "구독 업데이트에 실패했습니다." };
  }
}