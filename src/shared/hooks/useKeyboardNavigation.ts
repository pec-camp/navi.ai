"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * useKeyboardNavigation 훅의 옵션 인터페이스
 */
export interface UseKeyboardNavigationOptions {
  /** 총 아이템 개수 */
  itemCount: number;
  /** 아이템 선택 시 실행될 콜백 */
  onSelect?: (index: number) => void;
  /** ESC 키 눌렸을 때 실행될 콜백 */
  onEscape?: () => void;
  /** 키보드 네비게이션 활성화 여부 */
  isEnabled?: boolean;
  /** 순환 네비게이션 허용 여부 (끝에서 처음으로) */
  loop?: boolean;
}

/**
 * useKeyboardNavigation 훅의 반환 인터페이스
 */
export interface UseKeyboardNavigationReturn {
  /** 현재 선택된 인덱스 */
  selectedIndex: number;
  /** 선택 인덱스 설정 함수 */
  setSelectedIndex: (index: number) => void;
  /** 선택 인덱스 초기화 */
  resetSelectedIndex: () => void;
}

/**
 * 키보드 네비게이션을 위한 커스텀 훅
 * ArrowUp/ArrowDown으로 이동, Enter로 선택, Escape로 닫기를 처리합니다.
 *
 * @param options - 키보드 네비게이션 옵션
 * @returns 선택된 인덱스와 관련 함수들
 */
export function useKeyboardNavigation({
  itemCount,
  onSelect,
  onEscape,
  isEnabled = true,
  loop = true,
}: UseKeyboardNavigationOptions): UseKeyboardNavigationReturn {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  /**
   * 선택 인덱스 초기화 (헤더를 선택)
   */
  const resetSelectedIndex = useCallback(() => {
    setSelectedIndex(0);
  }, []);

  /**
   * 키보드 이벤트 핸들러
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isEnabled || itemCount === 0) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((prevIndex) => {
            if (prevIndex === itemCount - 1) {
              return loop ? 0 : prevIndex;
            }
            return prevIndex + 1;
          });
          break;

        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((prevIndex) => {
            if (prevIndex <= 0) {
              return loop ? itemCount - 1 : 0;
            }
            return prevIndex - 1;
          });
          break;

        case "Enter":
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < itemCount) {
            onSelect?.(selectedIndex);
          }
          break;

        case "Escape":
          event.preventDefault();
          resetSelectedIndex();
          onEscape?.();
          break;

        default:
          break;
      }
    },
    [
      isEnabled,
      itemCount,
      selectedIndex,
      onSelect,
      onEscape,
      loop,
      resetSelectedIndex,
    ],
  );

  /**
   * 키보드 이벤트 리스너 등록
   */
  useEffect(() => {
    if (!isEnabled) return;

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isEnabled]);

  /**
   * itemCount가 변경되면 선택 인덱스 조정
   */
  useEffect(() => {
    if (selectedIndex >= itemCount && itemCount > 0) {
      setSelectedIndex(itemCount - 1);
    } else if (itemCount === 0) {
      resetSelectedIndex();
    }
  }, [itemCount, selectedIndex, resetSelectedIndex]);

  return {
    selectedIndex,
    setSelectedIndex,
    resetSelectedIndex,
  };
}
