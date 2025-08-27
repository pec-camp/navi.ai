import { AIContent } from "./AIContent.interface";
import { AiToolRawData } from "./AiTool.interface";

const NUMBER_UNITS = {
  BILLION: 100_000_000, // 억
  TEN_MILLION: 10_000_000, // 천만
  MILLION: 1_000_000, // 백만
  HUNDRED_K: 100_000, // 십만
  TEN_K: 10_000, // 만
  THOUSAND: 1_000, // 천
} as const;

/**
 * 숫자를 영어 약어로 변환 (예: 30000000 → "30M")
 */
export function formatNumberToAbbreviation(num: number): string {
  if (num === 0) {
    return "0";
  }

  if (num >= NUMBER_UNITS.BILLION) {
    const value = num / NUMBER_UNITS.BILLION;
    return value % 1 === 0 ? `${value}B` : `${value.toFixed(1)}B`;
  } else if (num >= NUMBER_UNITS.MILLION) {
    const value = num / NUMBER_UNITS.MILLION;
    return value % 1 === 0 ? `${value}M` : `${value.toFixed(1)}M`;
  } else if (num >= NUMBER_UNITS.THOUSAND) {
    const value = num / NUMBER_UNITS.THOUSAND;
    return value % 1 === 0 ? `${value}K` : `${value.toFixed(1)}K`;
  }

  return num.toString();
}

/**
 * 날짜를 한국어 포맷으로 변환
 */
export function formatDateToKorean(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 월간 사용자 수 포맷팅
 */
export function formatMonthlyUsers(monthVisitedCount: number | null) {
  const count = monthVisitedCount || 0;
  const formatted = count > 0 ? formatNumberToAbbreviation(count) + "+" : "N/A";

  return {
    count,
    formatted,
  };
}

/**
 * 익스텐션 데이터 포맷팅 (활성 사용자 포함)
 */
export function formatExtension(extensionData: unknown) {
  if (!extensionData || typeof extensionData !== "string") {
    return null;
  }

  try {
    const parsed = JSON.parse(extensionData) as {
      user_num: number;
      avatar: string;
    };

    return {
      userNum: formatNumberToAbbreviation(parsed.user_num),
      userNumRaw: parsed.user_num,
      avatar: parsed.avatar,
    };
  } catch {
    return null;
  }
}

/**
 * 날짜 데이터 포맷팅
 */
export function formatDates(
  createdAt: string | null,
  updatedAt: string | null,
) {
  return {
    createdAt: createdAt ? new Date(createdAt) : null,
    updatedAt: updatedAt ? new Date(updatedAt) : null,
    createdAtFormatted: createdAt ? formatDateToKorean(createdAt) : null,
    updatedAtFormatted: updatedAt ? formatDateToKorean(updatedAt) : null,
  };
}

/**
 * AI Content JSONB 데이터를 구조화된 형태로 변환
 */
export function formatAIContent(rawContent: unknown): AIContent {
  // 타입 가드: rawContent가 객체인지 확인
  if (!rawContent || typeof rawContent !== "object") {
    return {};
  }

  const content = rawContent as Record<string, unknown>;

  // 안전한 타입 변환 (실제 데이터 구조대로)
  const aiContent: AIContent = {
    // 구조화된 필드들
    faq: Array.isArray(content.faq) ? content.faq : undefined,
    pricing: Array.isArray(content.pricing) ? content.pricing : undefined,
    pros_and_cons:
      content.pros_and_cons && typeof content.pros_and_cons === "object"
        ? (content.pros_and_cons as AIContent["pros_and_cons"])
        : undefined,

    // 문자열 배열 필드들 (그대로 유지)
    tags: Array.isArray(content.tags) ? content.tags : undefined,
    best_for: Array.isArray(content.best_for) ? content.best_for : undefined,
    use_cases: Array.isArray(content.use_cases) ? content.use_cases : undefined,
    core_features: Array.isArray(content.core_features)
      ? content.core_features
      : undefined,

    // 텍스트 필드들
    what_is: typeof content.what_is === "string" ? content.what_is : undefined,
    what_is_summary:
      typeof content.what_is_summary === "string"
        ? content.what_is_summary
        : undefined,
    how_to_use:
      typeof content.how_to_use === "string" ? content.how_to_use : undefined,
    website_name:
      typeof content.website_name === "string"
        ? content.website_name
        : undefined,
  };

  return aiContent;
}

// 가격 정보 파싱
const getPricingLabel = (attributeHandles: string[] | null): string => {
  if (!attributeHandles || attributeHandles.length === 0) {
    return "가격 문의";
  }

  if (attributeHandles.includes("pricing-freemium")) {
    return "무료 + 유료 플랜";
  }

  if (attributeHandles.includes("pricing-free-trial")) {
    return "무료 체험 + 유료 플랜";
  }

  if (attributeHandles.includes("pricing-free")) {
    return "무료 플랜";
  }

  if (attributeHandles.includes("pricing-paid")) {
    return "유료 플랜";
  }

  if (attributeHandles.includes("pricing-contact-for-pricing")) {
    return "가격문의";
  }

  return "가격문의";
};

// 리뷰 평점 계산
function formatRating(reviews: { rating: number }[]) {
  return reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 5; // Default to 5 stars when no reviews
}

/**
 * 기본 도구 정보 포맷팅 (리스트용)
 */
export function formatToolBasic(rawData: AiToolRawData) {
  return {
    id: rawData.id,
    name: rawData.name,
    websiteName: rawData.website_name,
    slug: rawData.slug,
    description: rawData.description,
    whatIsSummary: rawData.what_is_summary,
    whatIs: rawData.what_is,
    tags: rawData.tags || [],
    website: rawData.website,
    imageUrl: rawData.image_url,
    websiteLogo: rawData.website_logo,
    isFree: rawData.is_free ?? false,
    attributeHandles: rawData.attribute_handles || [],
    pricingLabel: getPricingLabel(rawData.attribute_handles),
    extension: formatExtension(rawData.extension),
    monthlyUsers: formatMonthlyUsers(rawData.month_visited_count),
    avgRating: Math.round(formatRating(rawData.reviews) * 10) / 10,
    reviewCount: rawData.reviews.length,
  };
}

/**
 * 상세 도구 정보 포맷팅
 */
export function formatToolDetail(rawData: AiToolRawData) {
  return {
    ...formatToolBasic(rawData),
    dates: formatDates(
      rawData.original_created_at,
      rawData.original_updated_at,
    ),
    content: formatAIContent(rawData.ai_content),
  };
}
