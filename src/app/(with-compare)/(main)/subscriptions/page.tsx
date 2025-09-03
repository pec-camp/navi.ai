import { Suspense } from "react";

import { SubscriptionListSkeleton } from "@/src/entities/subscription";
import { getCurrentUser } from "@/src/features/auth";
import { SubscriptionsBlurredView } from "@/src/features/subscription";
import { CategorySideSheetAsync, SubscriptionContent } from "@/src/widgets/subscription";

interface SubscriptionsProps {
  searchParams: Promise<{ modal?: string }>;
}

export default async function Subscriptions({
  searchParams,
}: SubscriptionsProps) {
  const user = await getCurrentUser();
  const resolvedSearchParams = await searchParams;
  const showSubscribeModal = resolvedSearchParams.modal === "subscribe";

  // 사용자가 로그인하지 않은 경우 블러 처리된 UI 표시
  if (!user) {
    return (
      <section>
        <h2 className="hidden">Subscriptions</h2>
        <SubscriptionsBlurredView />
      </section>
    );
  }

  const userId = user.id;

  return (
    <section>
      <h2 className="hidden">Subscriptions</h2>

      {/* 구독 리스트 */}
      <Suspense fallback={<SubscriptionListSkeleton />}>
        <SubscriptionContent userId={userId} />
      </Suspense>

      {/* 카테고리 */}
      <CategorySideSheetAsync userId={userId} isOpen={showSubscribeModal} />
    </section>
  );
}
