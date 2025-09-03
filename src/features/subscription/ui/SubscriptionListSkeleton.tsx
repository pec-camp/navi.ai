import { Settings } from "lucide-react";
import Link from "next/link";

import { Button } from "@/src/shared/ui";

export default function SubscriptionListSkeleton() {
  return (
    <>
      {/* 오른쪽에 설정 링크 - 즉시 표시 */}
      <div className="flex items-end justify-end py-3">
        <Button variant="secondary" size="sm" asChild>
          <Link href="/subscriptions?modal=subscribe">
            <Settings className="h-4 w-4" />
            <span>카테고리 구독하기</span>
          </Link>
        </Button>
      </div>

      {/* 로딩 스켈레톤 */}
      <div className="space-y-6">
        {/* 툴 카드 스켈레톤들 */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-lg border border-border bg-card p-6"
          >
            <div className="flex items-start gap-4">
              {/* 아이콘 스켈레톤 */}
              <div className="h-12 w-12 rounded-lg bg-muted" />
              
              <div className="flex-1 space-y-3">
                {/* 제목 스켈레톤 */}
                <div className="h-6 w-32 rounded bg-muted" />
                
                {/* 설명 스켈레톤 */}
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-3/4 rounded bg-muted" />
                </div>
                
                {/* 태그들 스켈레톤 */}
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-muted" />
                  <div className="h-6 w-20 rounded-full bg-muted" />
                  <div className="h-6 w-12 rounded-full bg-muted" />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* 더보기 버튼 스켈레톤 */}
        <div className="flex justify-center pt-4">
          <div className="h-10 w-24 rounded bg-muted animate-pulse" />
        </div>
      </div>
    </>
  );
}