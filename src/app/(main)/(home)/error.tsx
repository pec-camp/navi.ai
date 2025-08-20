"use client";

import { ErrorFallback } from "@/src/shared/ui";

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      error={error}
      reset={reset}
      title="AI 도구를 불러오는 중 문제가 발생했습니다"
      description="네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요"
      actionLabel="다시 시도"
    />
  );
}
