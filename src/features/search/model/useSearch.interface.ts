import type { SuggestionTool } from "@/entities/tool";

/**
 * useSearch 훅의 옵션 인터페이스
 */
export interface UseSearchOptions {
  /** 디바운스 지연 시간 (밀리초, 기본값: 300) */
  debounceMs?: number;
  /** 검색을 시작할 최소 문자 수 (기본값: 2) */
  minQueryLength?: number;
  /** 최대 검색 결과 수 (기본값: 5) */
  maxResults?: number;
}

/**
 * useSearch 훅의 반환 인터페이스
 */
export interface UseSearchReturn {
  /** 현재 검색어 */
  searchQuery: string;
  /** 검색어 설정 함수 */
  setSearchQuery: (query: string) => void;
  /** 로딩 상태 (useTransition의 isPending) */
  isLoading: boolean;
  /** 검색 결과 배열 */
  results: SuggestionTool[];
  /** 에러 메시지 */
  error: string | null;
  /** 결과 초기화 함수 */
  clearResults: () => void;
}
