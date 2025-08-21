/**
 * 구독 데이터 검증
 */
export function validateSubscriptionData(
  userId: string,
  subCategoryIds: number[],
): { isValid: boolean; error?: string } {
  if (!userId) {
    return { isValid: false, error: "유효하지 않은 사용자 ID입니다." };
  }

  if (subCategoryIds.some((id) => !Number.isInteger(id) || id <= 0)) {
    return {
      isValid: false,
      error: "유효하지 않은 카테고리 ID가 포함되어 있습니다.",
    };
  }

  return { isValid: true };
}
