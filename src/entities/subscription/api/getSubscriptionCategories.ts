"use server";

import { randomUUID } from "crypto";

import { createClient } from "@/shared/utils/supabase/server";

import {
  CategorySubscription,
  SubscriptionCategoryResponse,
} from "../model/CategorySubscription.interface";

/**
 * 유저의 구독 카테고리 목록 조회
 *
 * @param userId 유저 ID
 * @returns 구독 카테고리 목록
 */
export async function getSubscriptionsCategories(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_subscriptions")
    .select(
      `
      sub_category_id,
      sub_categories!inner (
        id,
        category_id,
        categories!inner (
          id,
          name,
          slug
        )
      )
    `,
    )
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to fetch user subscriptions: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  const categoryMap = new Map<
    number,
    {
      categoryId: number;
      subCategoryIds: number[];
    }
  >();

  // 카테고리별로 그룹화
  data.forEach((subscription: SubscriptionCategoryResponse) => {
    const categoryId = subscription.sub_categories.category_id;
    const subCategoryId = subscription.sub_category_id;

    if (!categoryMap.has(categoryId)) {
      categoryMap.set(categoryId, {
        categoryId,
        subCategoryIds: [],
      });
    }

    categoryMap.get(categoryId)?.subCategoryIds.push(subCategoryId);
  });

  const result: CategorySubscription[] = Array.from(categoryMap.values()).map(
    (categoryData) => ({
      id: randomUUID(),
      categoryId: categoryData.categoryId,
      subCategoryIds: categoryData.subCategoryIds,
    }),
  );

  return result;
}
