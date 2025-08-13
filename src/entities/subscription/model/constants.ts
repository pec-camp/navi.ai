// Mock 구독 데이터 상수

export interface UserSubscription {
  categoryId: string;
  categoryName: string;
  subCategories: string[];
}

export interface Category {
  id: string;
  name: string;
  subCategories: string[];
}

// 카테고리 마스터 데이터
export const CATEGORIES: Category[] = [
  {
    id: "writing",
    name: "글쓰기·콘텐츠", 
    subCategories: ["AI 글쓰기", "콘텐츠 생성", "번역 도구", "문법 검사"],
  },
  {
    id: "design",
    name: "디자인·비주얼",
    subCategories: ["AI 아트", "사진 편집", "일러스트", "UI/UX 디자인"],
  },
  {
    id: "development", 
    name: "개발·코드",
    subCategories: ["코드 생성", "디버깅", "문서화", "테스트"],
  },
  {
    id: "business",
    name: "비즈니스·마케팅",
    subCategories: ["마케팅 자동화", "고객 분석", "경쟁사 분석", "성과 측정"],
  },
  {
    id: "productivity",
    name: "생산성·도구",
    subCategories: ["프로젝트 관리", "협업 도구", "시간 관리", "자동화"],
  },
  {
    id: "media",
    name: "영상·오디오", 
    subCategories: ["비디오 편집", "음성 생성", "음악 제작", "자막 생성"],
  },
  {
    id: "data",
    name: "데이터·분석",
    subCategories: ["데이터 시각화", "예측 분석", "보고서 생성", "인사이트 도출"],
  },
  {
    id: "education",
    name: "교육·학습",
    subCategories: ["개인 맞춤 학습", "퀴즈 생성", "강의 요약", "언어 학습"],
  },
];

// Mock 사용자 구독 상태 (실제로는 서버에서 가져올 데이터)
export const MOCK_USER_SUBSCRIPTIONS: UserSubscription[] = [
  {
    categoryId: "writing",
    categoryName: "글쓰기·콘텐츠",
    subCategories: ["AI 글쓰기", "콘텐츠 생성"],
  },
  {
    categoryId: "design", 
    categoryName: "디자인·비주얼",
    subCategories: ["AI 아트", "사진 편집"],
  },
];

// 유틸리티 함수
export const getCategoryName = (categoryId: string): string => {
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  return category?.name || categoryId;
};