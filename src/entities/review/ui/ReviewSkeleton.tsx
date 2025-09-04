export default function ReviewSkeleton() {
  return (
    <section className="mt-24">
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-6">
          {/* 헤더 스켈레톤 */}
          <div className="flex items-center justify-between">
            <div className="h-8 w-40 animate-pulse rounded bg-muted"></div>
            <div className="h-10 w-24 animate-pulse rounded bg-muted"></div>
          </div>

          {/* 통계 정보 스켈레톤 */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-6 w-32 animate-pulse rounded bg-muted"></div>
          </div>

          {/* 리뷰 목록 스켈레톤 */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-background p-6"
              >
                <div className="flex items-start gap-4">
                  {/* 아바타 스켈레톤 */}
                  <div className="h-12 w-12 animate-pulse rounded-full bg-muted"></div>

                  <div className="flex-1 space-y-3">
                    {/* 사용자 정보 및 평점 스켈레톤 */}
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-24 animate-pulse rounded bg-muted"></div>
                      <div className="h-4 w-20 animate-pulse rounded bg-muted"></div>
                    </div>

                    {/* 리뷰 텍스트 스켈레톤 */}
                    <div className="space-y-2">
                      <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                      <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                    </div>

                    {/* 날짜 스켈레톤 */}
                    <div className="h-3 w-20 animate-pulse rounded bg-muted"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 더보기 버튼 스켈레톤 */}
          <div className="flex justify-center">
            <div className="h-10 w-28 animate-pulse rounded bg-muted"></div>
          </div>
        </div>
      </div>
    </section>
  );
}