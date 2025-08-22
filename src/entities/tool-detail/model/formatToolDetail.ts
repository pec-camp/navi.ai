import { Database } from "@/src/shared/utils/supabase";
import { AIContent } from "./AIContent.interface";

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
function formatNumberToKorean(num: number): string {
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
function formatDateToKorean(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * AI Content JSONB 데이터를 구조화된 형태로 변환
 * 서버에서 포맷팅하여 클라이언트는 타입 안전한 데이터만 받음
 */
function formatAIContent(rawContent: unknown): AIContent {
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

export function formatToolDetail(
  rawData: Database["public"]["Tables"]["ai_tools"]["Row"],
) {
  // AI Content 파싱 및 포맷팅
  const aiContent = formatAIContent(rawData.ai_content);

  const description = rawData.description;

  // 월간 사용자 수 포맷팅
  const monthlyUsersCount = rawData.month_visited_count || 0;
  const monthlyUsersFormatted =
    monthlyUsersCount > 0
      ? formatNumberToKorean(monthlyUsersCount) + "+"
      : "N/A";

  // 날짜 포맷팅
  const createdAt = rawData.original_created_at
    ? new Date(rawData.original_created_at)
    : null;
  const updatedAt = rawData.original_updated_at
    ? new Date(rawData.original_updated_at)
    : null;
  const createdAtFormatted = rawData.original_created_at
    ? formatDateToKorean(rawData.original_created_at)
    : null;
  const updatedAtFormatted = rawData.original_updated_at
    ? formatDateToKorean(rawData.original_updated_at)
    : null;

  return {
    id: rawData.id,
    name: rawData.website_name,
    slug: rawData.slug,
    description,
    tags: rawData.tags || [],
    website: rawData.website,
    imageUrl: rawData.image_url,
    websiteLogo: rawData.website_logo,
    isFree: rawData.is_free ?? false,
    monthlyUsers: {
      count: monthlyUsersCount,
      formatted: monthlyUsersFormatted,
    },
    dates: {
      createdAt,
      updatedAt,
      createdAtFormatted,
      updatedAtFormatted,
    },
    // 포맷팅된 AI Content만 전달 (raw JSONB는 전달하지 않음)
    content: aiContent,
  };
}
