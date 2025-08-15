"use server";

import { revalidatePath } from "next/cache";

export interface SubscriptionActionState {
  success: boolean;
  message: string;
  data?: any;
}

export async function upsertUserSubscription(
  _prevState: SubscriptionActionState,
  formData: FormData,
): Promise<SubscriptionActionState> {
  try {
    const userId = formData.get("userId") as string;
    const tagIds = formData.getAll("tagIds") as string[];
    const unsubscribeTagIds = formData.getAll("unsubscribeTagIds") as string[];

    console.log("Server Action 호출됨:", {
      userId,
      tagIds,
      unsubscribeTagIds,
    });

    if (!userId) {
      return {
        success: false,
        message: "사용자 ID가 필요합니다.",
      };
    }

    // Convert string IDs to numbers
    const subscribeIds = tagIds.map((id) => parseInt(id, 10));
    const unsubscribeIds = unsubscribeTagIds.map((id) => parseInt(id, 10));

    // TODO: 실제 데이터베이스 작업
    // 현재는 mock으로 처리
    
    let message = "";
    if (subscribeIds.length > 0) {
      message += `${subscribeIds.length}개 태그 구독 추가`;
    }
    if (unsubscribeIds.length > 0) {
      if (message) message += ", ";
      message += `${unsubscribeIds.length}개 태그 구독 해제`;
    }

    // Revalidate the subscriptions page
    revalidatePath("/subscriptions");

    return {
      success: true,
      message: message || "변경사항이 저장되었습니다.",
      data: { 
        subscribedTagIds: subscribeIds,
        unsubscribedTagIds: unsubscribeIds
      },
    };
  } catch (error) {
    console.error("구독 처리 중 오류:", error);
    return {
      success: false,
      message: "구독 처리 중 오류가 발생했습니다.",
    };
  }
}
