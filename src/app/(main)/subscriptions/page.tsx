import { Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getSubscriptionToolList } from "@/src/entities/subscription";
import {
  EmptyState,
  PaginatedSubscriptionList,
} from "@/src/features/subscription";
import { SUBSCRIPTION_PAGE_LIMIT } from "@/src/shared/config/constants";
import { SUBSCRIPTIONS_SUBSCRIBE_PATHNAME } from "@/src/shared/config/pathname";
import { Button } from "@/src/shared/ui";
import { createClient } from "@/src/shared/utils/supabase/server";

export default async function Subscriptions() {
  // Get current user from Supabase session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userId = user.id;

  const { tools: initialTools, totalCount } = await getSubscriptionToolList(
    userId,
    SUBSCRIPTION_PAGE_LIMIT,
  );
  const hasSubscriptionList = totalCount > 0;

  return (
    <section>
      <h2 className="hidden">Subscriptions</h2>

      {hasSubscriptionList ? (
        <>
          {/* 오른쪽에 설정 링크 */}
          <div className="flex items-end justify-end py-3">
            <Button variant="secondary" size="sm" asChild>
              <Link href={SUBSCRIPTIONS_SUBSCRIBE_PATHNAME}>
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
    </section>
  );
}
