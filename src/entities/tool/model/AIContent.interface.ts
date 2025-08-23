// AI Tools의 ai_content JSONB 컬럼 구조 정의

export interface FAQItem {
  q: string; // 질문
  a: string; // 답변
}

export interface PricingPlan {
  name: string; // 플랜 이름 (예: "시작자 플랜", "전문 플랜")
  price: string; // 가격 (예: "$39/월", "맞춤 가격")
  description: string; // 플랜 설명
}

export interface ProsAndCons {
  pros: string[]; // 장점 목록
  cons: string[]; // 단점 목록
}

// AI Content JSONB 전체 구조
export interface AIContent {
  // 구조화된 필드들
  faq?: FAQItem[];
  pricing?: PricingPlan[];
  pros_and_cons?: ProsAndCons; // 장단점

  // 문자열 배열 필드들 (실제 데이터 구조)
  tags?: string[];
  best_for?: string[]; // 적합한 사용자 유형
  use_cases?: string[]; // 사용 사례
  core_features?: string[]; // 핵심 기능 목록

  // 텍스트 필드들
  what_is?: string; // 도구 설명
  what_is_summary?: string; // 요약 설명
  how_to_use?: string; // 사용 방법
  website_name?: string; // 웹사이트 이름

  // 확장 가능한 구조를 위해 추가 필드 허용
  [key: string]: unknown;
}

// 기존 타입과의 호환성을 위한 유니온 타입
export type AIContentData = AIContent | Record<string, unknown> | null;
