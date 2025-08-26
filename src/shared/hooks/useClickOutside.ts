"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * useClickOutside 훅의 옵션 인터페이스
 */
export interface UseClickOutsideOptions {
  /** 외부 클릭 시 실행될 콜백 */
  onClickOutside: () => void;
  /** 훅 활성화 여부 */
  isEnabled?: boolean;
}

/**
 * useClickOutside 훅의 반환 인터페이스
 */
export interface UseClickOutsideReturn<T extends HTMLElement = HTMLElement> {
  /** 감지할 요소의 ref */
  ref: RefObject<T>;
}

/**
 * 외부 클릭 감지를 위한 커스텀 훅
 * 지정된 요소 외부를 클릭했을 때 콜백을 실행합니다.
 *
 * @param options - 외부 클릭 감지 옵션
 * @returns 감지할 요소의 ref
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>({
  onClickOutside,
  isEnabled = true,
}: UseClickOutsideOptions): UseClickOutsideReturn<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isEnabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    // click 이벤트로 변경하여 링크 클릭이 정상 작동하도록 함
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClickOutside, isEnabled]);

  return { ref };
}