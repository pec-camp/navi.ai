import { getToolBySlug } from "@/src/entities/tool";

interface ToolPricingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolPricingPage({
  params,
}: ToolPricingPageProps) {
  const { slug } = await params;

  const toolData = (await getToolBySlug(slug))!;
  const aiContent = toolData.content;

  const pricingData = aiContent?.pricing || [];

  return (
    <div className="space-y-6">
      {/* 제목 */}
      <h2 className="text-xl font-medium capitalize text-secondary">
        {toolData.name} 가격 정보
      </h2>

      {/* 가격 카드들 - 동적 그리드 */}
      <div
        className={`grid gap-4 ${pricingData.length <= 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2"}`}
      >
        {pricingData.map((plan, index) => (
          <div
            key={index}
            className="rounded-md border border-border bg-background p-6 shadow-sm"
          >
            <div className="mb-4 space-y-2">
              <h4 className="text-xl font-medium text-foreground">
                {plan.name}
              </h4>
              <p className="text-lg font-medium text-primary">{plan.price}</p>
            </div>
            <p className="break-keep text-sm font-light leading-relaxed text-muted-foreground">
              {plan.description}
            </p>
          </div>
        ))}
      </div>

      {/* 완전 무료 표시 - 프리미엄 디자인 */}
      {toolData.isFree && (
        <div className="from-primary/10 via-primary-secondary/10 to-primary/5 relative overflow-hidden rounded-lg bg-gradient-to-br p-8">
          <div className="bg-primary/10 absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl" />
          <div className="bg-primary-secondary/10 absolute -bottom-8 -left-8 h-32 w-32 rounded-full blur-3xl" />

          <div className="relative flex flex-col items-center justify-center text-center">
            {/* 무료 아이콘 */}
            <div className="bg-primary/15 flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* 타이틀 */}
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-primary">100% 무료</h3>
              <p className="text-lg font-medium text-foreground">
                완전 무료로 제공됩니다
              </p>
            </div>

            {/* 혜택 목록 */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-light text-muted-foreground">
                  신용카드 불필요
                </span>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-light text-muted-foreground">
                  숨겨진 비용 없음
                </span>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-light text-muted-foreground">
                  무제한 사용 가능
                </span>
              </div>
            </div>

            {/* 장식 요소 */}
            <div className="bg-primary/10 mt-6 inline-flex items-center rounded-full px-4 py-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Forever Free
              </span>
            </div>
          </div>
        </div>
      )}

      {(!aiContent?.pricing || aiContent.pricing.length === 0) &&
        !toolData.isFree && (
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              더 자세한 가격 정보는 공식 웹사이트에서 확인하실 수 있습니다.
            </p>
          </div>
        )}
    </div>
  );
}
