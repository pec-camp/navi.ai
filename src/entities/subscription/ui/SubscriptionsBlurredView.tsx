"use client";

import { useRouter } from "next/navigation";

import { LoginInduceModal } from "@/src/features/auth";

export function SubscriptionsBlurredView() {
  const router = useRouter();

  return (
    <>
      {/* 블러 처리된 더미 콘텐츠 */}
      <div className="pointer-events-none w-screen max-w-screen-lg select-none blur-sm">
        {/* 더미 구독 카드 그리드 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="relative h-full w-full max-w-sm overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="flex h-full flex-col p-0">
                {/* 헤더 섹션 */}
                <div className="flex items-center space-x-3 p-4">
                  <div className="h-9 w-9 rounded-2xl bg-gray-200" />
                  <div className="flex-1 space-y-1">
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-3 w-3/4 rounded bg-gray-100" />
                  </div>
                </div>

                {/* 메인 이미지 */}
                <div className="px-4 pb-4">
                  <div className="h-40 w-full rounded-xl border border-gray-200 bg-gray-100" />
                </div>

                {/* 평점 및 리뷰 */}
                <div className="px-4 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-12 rounded bg-gray-100" />
                    <div className="h-3 w-8 rounded bg-gray-100" />
                  </div>
                </div>

                {/* 설명 텍스트 */}
                <div className="flex-1 px-4 pb-4">
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-gray-100" />
                    <div className="h-3 w-full rounded bg-gray-100" />
                    <div className="h-3 w-3/4 rounded bg-gray-100" />
                  </div>
                </div>

                {/* 가격 및 날짜 */}
                <div className="mt-auto border-t border-gray-100 bg-gray-50/30 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-16 rounded bg-gray-100" />
                    <div className="h-3 w-12 rounded bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LoginInduceModal
        open={true}
        onOpenChange={() => router.push("/")}
        description="구독한 AI 목록을 확인하려면 로그인이 필요해요."
      />
    </>
  );
}
