"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/shared/utils/supabase/server";

import { SubscriptionActionState } from "../model/SubscriptionActionState.interface";
import { SubscriptionUpdateRequest } from "../model/SubscriptionUpdateRequest.interface";
import { validateSubscriptionData } from "../model/validateSubscriptionData";

export async function replaceUserSubscriptions(
  request: SubscriptionUpdateRequest,
): Promise<SubscriptionActionState> {
  try {
    const { userId, subCategoryIds: selectedIds } = request;

    if (!userId) {
      return {
        success: false,
        message: "유효한 사용자 ID가 필요합니다.",
      };
    }

    if (!Array.isArray(selectedIds)) {
      return {
        success: false,
        message: "서브카테고리 ID 배열이 필요합니다.",
      };
    }

    // 데이터 검증
    const validation = validateSubscriptionData(userId, selectedIds);
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.error || "잘못된 데이터입니다.",
      };
    }

    const supabase = await createClient();

    // 해당 유저의 모든 구독 삭제
    const { error: deleteError } = await supabase
      .from("user_subscriptions")
      .delete()
      .eq("user_id", userId);

    if (deleteError) {
      console.error("기존 구독 삭제 중 오류:", deleteError);
      return {
        success: false,
        message: "구독 업데이트 중 오류가 발생했습니다.",
      };
    }

    // 선택된 항목들로 새로 생성
    if (selectedIds.length > 0) {
      const subscriptionsToInsert = selectedIds.map((subCategoryId) => ({
        user_id: userId,
        sub_category_id: subCategoryId,
      }));

      const { error: insertError } = await supabase
        .from("user_subscriptions")
        .insert(subscriptionsToInsert);

      if (insertError) {
        console.error("새 구독 추가 중 오류:", insertError);
        return {
          success: false,
          message: "구독 업데이트 중 오류가 발생했습니다.",
        };
      }
    }

    // Revalidate the subscriptions page
    revalidatePath("/subscriptions");

    return {
      success: true,
      message:
        selectedIds.length > 0
          ? `${selectedIds.length}개 세부 항목 구독이 업데이트되었습니다.`
          : "모든 구독이 취소되었습니다.",
      data: {
        subscribedSubCategoryIds: selectedIds,
        totalCount: selectedIds.length,
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
