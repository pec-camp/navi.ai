export default function AlternativeToolSkeleton() {
  return (
    <div className="container mx-auto max-w-7xl">
      {/* 카드 그리드 스켈레톤 */}
      <div className="grid min-h-[480px] gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="relative h-full overflow-hidden rounded-lg border border-border bg-card shadow-sm"
          >
            <div className="flex h-full flex-col p-0">
              {/* 헤더 섹션 스켈레톤 */}
              <div className="flex items-center space-x-3 p-4">
                {/* 아이콘 */}
                <div className="h-9 w-9 animate-pulse rounded-2xl bg-muted"></div>

                {/* 도구명 및 유사도 */}
                <div className="flex flex-1 flex-col">
                  <div className="mb-2 h-4 w-32 animate-pulse rounded bg-muted"></div>
                  <div className="h-3 w-20 animate-pulse rounded bg-muted"></div>
                </div>
              </div>

              {/* 메인 이미지 스켈레톤 */}
              <div className="px-4 pb-4">
                <div className="h-40 w-full animate-pulse rounded-xl bg-muted"></div>
              </div>

              {/* 설명 텍스트 스켈레톤 */}
              <div className="flex-1 px-4 pb-4">
                <div className="space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-muted"></div>
                  <div className="h-3 w-4/5 animate-pulse rounded bg-muted"></div>
                  <div className="h-3 w-3/4 animate-pulse rounded bg-muted"></div>
                </div>
              </div>

              {/* 가격 및 날짜 스켈레톤 */}
              <div className="bg-muted/30 mt-auto border-t border-muted px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
                  <div className="h-3 w-20 animate-pulse rounded bg-muted"></div>
                </div>
              </div>
            </div>

            {/* 비교 버튼 위치 스켈레톤 */}
            <div className="absolute right-4 top-4 z-10">
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
            </div>
          </div>
        ))}
      </div>

      {/* View more 링크 스켈레톤 */}
      <div className="mt-8 text-center">
        <div className="mx-auto h-5 w-24 animate-pulse rounded bg-muted"></div>
      </div>
    </div>
  );
}
