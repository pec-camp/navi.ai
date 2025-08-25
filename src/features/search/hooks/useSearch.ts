"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import type { SuggestionTool } from "@/entities/tool";

import { useDebounce } from "@/shared/hooks";
import type { UseSearchOptions, UseSearchReturn } from "../model/useSearch.types";

/**
 * 실시간 검색을 위한 커스텀 훅
 * 디바운싱, 로딩 상태 관리, API 호출을 처리합니다.
 *
 * @param options - 검색 옵션 설정
 * @returns 검색 상태와 제어 함수들
 */
export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const { debounceMs = 300, minQueryLength = 2, maxResults = 5 } = options;

  // React 18 useTransition으로 논블로킹 상태 업데이트
  const [isPending, startTransition] = useTransition();

  // 상태 관리
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<SuggestionTool[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 네트워크 요청 취소를 위한 AbortController
  const abortControllerRef = useRef<AbortController | null>(null);

  // 디바운싱된 검색어
  const debouncedQuery = useDebounce(searchQuery, debounceMs);

  /**
   * 실제 검색을 수행하는 함수
   */
  const performSearch = useCallback(
    async (query: string) => {
      // 이전 요청이 있다면 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // 새로운 AbortController 생성
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        // getToolSuggestionList 직접 임포트 (클라이언트에서 사용 가능)
        const { getToolSuggestionList } = await import(
          "@/entities/tool/api/getToolSuggestionList"
        );
        const searchResults = await getToolSuggestionList(query, maxResults);

        // 요청이 취소되지 않았다면 결과 업데이트
        if (!controller.signal.aborted) {
          startTransition(() => {
            setResults(searchResults);
            setError(null);
          });
        }
      } catch (err) {
        // AbortError가 아닌 경우에만 에러 처리
        if (err instanceof Error && err.name !== "AbortError") {
          startTransition(() => {
            setError("검색 중 오류가 발생했습니다.");
            setResults([]);
          });
        }
      }
    },
    [maxResults],
  );

  /**
   * 검색 결과 초기화
   */
  const clearResults = useCallback(() => {
    // 진행 중인 요청 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    startTransition(() => {
      setResults([]);
      setError(null);
    });
  }, []);

  /**
   * 디바운싱된 쿼리에 따른 검색 실행
   */
  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (trimmedQuery.length >= minQueryLength) {
      performSearch(trimmedQuery);
    } else {
      // 최소 길이보다 짧으면 결과 초기화
      startTransition(() => {
        setResults([]);
        setError(null);
      });
    }
  }, [debouncedQuery, minQueryLength, performSearch]);

  /**
   * 컴포넌트 언마운트 시 정리
   */
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    isLoading: isPending, // useTransition의 isPending 사용
    results,
    error,
    clearResults,
  };
}
