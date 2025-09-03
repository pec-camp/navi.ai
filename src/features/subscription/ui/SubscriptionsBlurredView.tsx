"use client";

import { useRouter } from "next/navigation";

import { SubscriptionListSkeleton } from "@/src/entities/subscription";
import LoginInduceModal from "@/src/features/auth/ui/LoginInduceModal";

export function SubscriptionsBlurredView() {
  const router = useRouter();

  return (
    <>
      {/* 블러 처리된 더미 콘텐츠 */}
      <SubscriptionListSkeleton />

      <LoginInduceModal
        open={true}
        onOpenChange={() => router.push("/")}
        description="구독한 AI 목록을 확인하려면 로그인이 필요해요."
      />
    </>
  );
}
