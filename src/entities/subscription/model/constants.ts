import {
  CategorySubscription,
  SubscriptionTool,
} from "./CategorySubscription.interface";

// 카테고리 마스터 데이터
export const CATEGORIES = [
  {
    id: 1,
    name: "글쓰기·콘텐츠",
    subCategories: ["AI 글쓰기", "콘텐츠 생성", "번역 도구", "문법 검사"],
  },
  {
    id: 2,
    name: "디자인·비주얼",
    subCategories: ["AI 아트", "사진 편집", "일러스트", "UI/UX 디자인"],
  },
  {
    id: 3,
    name: "개발·코드",
    subCategories: ["코드 생성", "디버깅", "문서화", "테스트"],
  },
  {
    id: 4,
    name: "비즈니스·마케팅",
    subCategories: ["마케팅 자동화", "고객 분석", "경쟁사 분석", "성과 측정"],
  },
  {
    id: 5,
    name: "생산성·도구",
    subCategories: ["프로젝트 관리", "협업 도구", "시간 관리", "자동화"],
  },
  {
    id: 6,
    name: "영상·오디오",
    subCategories: ["비디오 편집", "음성 생성", "음악 제작", "자막 생성"],
  },
  {
    id: 7,
    name: "데이터·분석",
    subCategories: [
      "데이터 시각화",
      "예측 분석",
      "보고서 생성",
      "인사이트 도출",
    ],
  },
  {
    id: 8,
    name: "교육·학습",
    subCategories: ["개인 맞춤 학습", "퀴즈 생성", "강의 요약", "언어 학습"],
  },
];

// Mock 사용자 구독 카테고리 목록
export const MOCK_CATEGORY_SUBSCRIPTIONS: CategorySubscription[] = [
  {
    id: 1,
    categoryId: 1,
    subCategoryIds: [1, 2],
  },
  {
    id: 2,
    categoryId: 2,
    subCategoryIds: [3, 4],
  },
];

// Mock 사용자 구독 도구 목록
export const MOCK_SUBSCRIPTION_TOOL_LIST: SubscriptionTool[] = [
  {
    id: 2,
    name: "ChatGPT",
    category: "대화형 AI",
    categoryId: "writing",
    rating: 4.8,
    description:
      "자연어 처리 기반의 대화형 AI로 질문 답변, 텍스트 생성, 번역 등 다양한 작업을 수행할 수 있습니다.",
    price: "$20/월부터",
    date: "2025.01.02",
    reviewCount: 10,
  },
  {
    id: 5,
    name: "Claude",
    category: "대화형 AI",
    categoryId: "writing",
    rating: 4.6,
    description: "Anthropic에서 개발한 안전하고 유용한 AI 어시스턴트입니다.",
    price: "$20/월부터",
    date: "2025.01.05",
    reviewCount: 9,
  },
  {
    id: 8,
    name: "Grammarly",
    category: "글쓰기",
    categoryId: "writing",
    rating: 4.5,
    description: "AI 기반 영어 문법 검사기 및 글쓰기 개선 도구입니다.",
    price: "$12/월부터",
    date: "2025.01.08",
    reviewCount: 18,
  },
  // Design 카테고리 도구들
  {
    id: 1,
    name: "Midjourney",
    category: "이미지 생성",
    categoryId: "design",
    rating: 4.6,
    description:
      "텍스트 프롬프트를 통해 고품질의 예술적 이미지를 생성하는 AI 도구입니다.",
    price: "$10~60/월부터",
    date: "2025.01.01",
    reviewCount: 3,
  },
  {
    id: 6,
    name: "Canva AI",
    category: "디자인",
    categoryId: "design",
    rating: 4.4,
    description:
      "AI 기반 디자인 도구로 로고, 포스터, 소셜미디어 콘텐츠를 쉽게 제작할 수 있습니다.",
    price: "$12.99/월부터",
    date: "2025.01.06",
    reviewCount: 12,
  },
  {
    id: 9,
    name: "DALL-E 3",
    category: "이미지 생성",
    categoryId: "design",
    rating: 4.7,
    description:
      "OpenAI의 최신 이미지 생성 AI로 고품질의 창의적인 이미지를 생성합니다.",
    price: "$20/월부터",
    date: "2025.01.09",
    reviewCount: 20,
  },
  {
    id: 10,
    name: "Stable Diffusion",
    category: "이미지 생성",
    categoryId: "design",
    rating: 4.4,
    description:
      "오픈소스 이미지 생성 AI로 다양한 스타일의 이미지를 생성할 수 있습니다.",
    price: "무료",
    date: "2025.01.10",
    reviewCount: 22,
  },
];
