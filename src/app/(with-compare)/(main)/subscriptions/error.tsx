"use client";

import { Settings } from "lucide-react";
import Link from "next/link";

import { SUBSCRIPTIONS_PATHNAME } from "@/src/shared/config/pathname";
import { Button, ErrorFallback } from "@/src/shared/ui";

export default function SubscriptionsError({
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
      title="구독 정보를 불러오는 중 문제가 발생했습니다"
      description="네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요"
      actionLabel="다시 시도"
    >
      <Button variant="secondary" size="default" asChild>
        <Link href={SUBSCRIPTIONS_PATHNAME} className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          구독 관리
        </Link>
      </Button>
    </ErrorFallback>
  );
}
