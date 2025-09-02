"use client";
import dynamic from "next/dynamic";

/**
 * 비교 사이드 시트 클라이언트 래퍼
 *
 * @description CompareSideSheet를 동적으로 로드
 * @note dynamic import로 서버 렌더링 비활성화
 * @reason useSearchParams() 사용 컴포넌트의 Layout 포함으로 인한 전체 페이지 동적 렌더링 방지
 * @result Layout 서버 컴포넌트 유지 및 다른 페이지들의 정적 생성 활성화
 */
const CompareSideSheet = dynamic(() => import("./CompareSideSheet"), {
  ssr: false, // 서버 사이드 렌더링 비활성화
  loading: () => null, // 로딩 중에는 아무것도 표시하지 않음
});

export function CompareClientWrapper() {
  return <CompareSideSheet />;
}
