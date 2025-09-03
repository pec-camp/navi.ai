import { Settings } from "lucide-react";
import Link from "next/link";

import { Button, Card, CardContent } from "@/src/shared/ui";

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

      {/* 로딩 스켈레톤 - 실제 그리드 구조와 동일 */}
      <div className="space-y">
        {/* 도구 목록 그리드 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card
              key={index}
              className="group relative h-full min-w-[356px] cursor-pointer overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
            >
              <CardContent className="flex h-full flex-col p-0">
                {/* 헤더 섹션 */}
                <div className="flex items-center space-x-3 p-4">
                  {/* 도구 아이콘 스켈레톤 */}
                  <div className="h-9 w-9 rounded-2xl bg-muted" />

                  {/* 도구명 및 카테고리 스켈레톤 */}
                  <div className="flex flex-1 flex-col space-y-1">
                    <div className="h-4 w-24 rounded bg-muted" />
                    <div className="h-3 w-16 rounded bg-muted" />
                  </div>
                </div>

                {/* 메인 이미지 스켈레톤 */}
                <div className="px-4 pb-4">
                  <div className="h-40 w-full overflow-hidden rounded-xl border border-border bg-surface">
                    {/* {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`${name} preview`}
                width={400}
                height={160}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted">
                <span className="text-sm text-muted-foreground">{name}</span>
              </div>
            )} */}
                  </div>
                </div>

                {/* 평점 및 리뷰 스켈레톤 */}
                <div className="px-4 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-12 rounded bg-muted" />
                    <div className="h-3 w-8 rounded bg-muted" />
                  </div>
                </div>

                {/* 설명 텍스트 스켈레톤 */}
                <div className="flex-1 px-4 pb-4">
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-3/4 rounded bg-muted" />
                  </div>
                </div>

                {/* 가격 및 날짜 스켈레톤 */}
                <div className="bg-muted/30 mt-auto border-t border-muted px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-16 rounded bg-muted" />
                    <div className="h-3 w-12 rounded bg-muted" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 더보기 버튼 스켈레톤 */}
        <div className="flex justify-center pt-4">
          <div className="h-10 w-24 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </>
  );
}
