import { Settings } from "lucide-react";
import Link from "next/link";

import { getSubscriptionToolList } from "@/src/entities/tool/api";
import {
  EmptyState,
  PaginatedSubscriptionList,
} from "@/src/features/subscription";
import { SUBSCRIPTION_PAGE_LIMIT } from "@/src/shared/config/constants";
import { Button } from "@/src/shared/ui";

interface SubscriptionContentProps {
  userId: string;
}

export default async function SubscriptionContent({
  userId,
}: SubscriptionContentProps) {
  const { tools: initialTools, totalCount } = await getSubscriptionToolList(
    userId,
    SUBSCRIPTION_PAGE_LIMIT,
  );
  const hasSubscriptionList = totalCount > 0;

  return (
    <>
      {hasSubscriptionList ? (
        <>
          {/* 오른쪽에 설정 링크 */}
          <div className="flex items-end justify-end py-3">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/subscriptions?modal=subscribe">
                <Settings className="h-4 w-4" />
                <span>카테고리 구독하기</span>
              </Link>
            </Button>
          </div>

          {/* 구독 도구 리스트 */}
          <PaginatedSubscriptionList
            initialTools={initialTools}
            userId={userId}
            totalCount={totalCount}
          />
        </>
      ) : (
        /* 구독한 도구가 없을 때 EmptyState */
        <EmptyState />
      )}
    </>
  );
}
