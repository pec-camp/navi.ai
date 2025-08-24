// 대안 도구 추천 관련 인터페이스

export interface AlternativeTool {
  id: number;
  name: string;
  slug: string;
  description: string;
  similarityScore?: number; // RPC 함수에서 계산된 유사도 점수
  imageUrl?: string | null;
  logoUrl?: string | null;
  website?: string | null;
  isFree?: boolean;
  monthVisitedCount?: number;
  rating?: number; // 평균 평점 (reviews 테이블에서 계산)
  reviewCount?: number; // 리뷰 개수
}
