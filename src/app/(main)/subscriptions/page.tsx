import { SubscriptionToolList } from "@/src/entities/subscription";
import { getSubscriptionToolList } from "@/src/entities/subscription/api";
import { EmptyState } from "@/src/features/subscription/ui/EmptyState";
import { SUBSCRIPTION_CATEGORY_PATHNAME } from "@/src/shared/config/pathname";
import { Button } from "@/src/shared/ui";
import { Settings } from "lucide-react";
import Link from "next/link";

// Mock 데이터: 구독한 카테고리(writing, design)의 도구들만 표시
// TODO: 실제로는 서버에서 getUserSubscribedTools(userId) 같은 API로 받아올 예정

export default async function Subscriptions() {
  // Get current user from Supabase session
  // const supabase = await createClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (!session?.user) {
  //   redirect("/login");
  // }

  // const userId = session.user.id;

  const userId = "1";

  const subscriptionToolList = await getSubscriptionToolList(userId);
  const hasSubscriptionList = subscriptionToolList.length > 0;

  return (
    <section>
      <h2 className="hidden">Subscriptions</h2>

      {hasSubscriptionList ? (
        <>
          {/* 오른쪽에 설정 링크 */}
          <div className="flex items-end justify-end py-3">
            <Button variant="secondary" size="sm" asChild>
              <Link href={SUBSCRIPTION_CATEGORY_PATHNAME}>
                <Settings className="h-4 w-4" />
                <span>카테고리 구독하기</span>
              </Link>
            </Button>
          </div>

          {/* 구독 도구 리스트 */}
          <SubscriptionToolList subscriptionToolList={subscriptionToolList} />
        </>
      ) : (
        /* 구독한 도구가 없을 때 EmptyState */
        <EmptyState />
      )}
    </section>
  );
}
