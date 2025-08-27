"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/shared/utils/supabase/server";
import {
  CreateReviewData,
  CreateReviewResult,
} from "../model/ReviewMutation.interface";

/**
 * 새로운 리뷰를 생성하는 서버 액션
 * @param reviewData 리뷰 생성 데이터
 * @returns 생성 결과
 */
export async function addReview(
  reviewData: CreateReviewData,
): Promise<CreateReviewResult> {
  try {
    const supabase = await createClient();

    // 현재 사용자 정보 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        error: "로그인이 필요합니다.",
      };
    }

    // 중복 리뷰 확인
    const { data: existingReview } = await supabase
      .from("reviews")
      .select("id")
      .eq("ai_tool_id", reviewData.ai_tool_id)
      .eq("user_id", user.id)
      .single();

    if (existingReview) {
      return {
        success: false,
        error: "이미 이 도구에 대한 리뷰를 작성하셨습니다.",
      };
    }

    // 리뷰 생성
    const { error } = await supabase.from("reviews").insert({
      ai_tool_id: reviewData.ai_tool_id,
      user_id: user.id,
      rating: reviewData.rating,
      review_text: reviewData.review_text,
      recommend: reviewData.recommend ?? true,
      used_with_tool_id: reviewData.used_with_tool_id,
    });

    if (error) {
      console.error("Error creating review:", error);
      return {
        success: false,
        error: "리뷰 생성에 실패했습니다.",
      };
    }

    // 성공시 관련 페이지 캐시 무효화
    revalidatePath("/tools");
    revalidatePath(`/tools`, "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error in addReview:", error);
    return {
      success: false,
      error: "서버 오류가 발생했습니다.",
    };
  }
}
