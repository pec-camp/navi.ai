import { getToolBySlug } from "@/src/entities/tool-detail";

import { notFound } from "next/navigation";

interface ToolPricingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolPricingPage({
  params,
}: ToolPricingPageProps) {
  const { slug } = await params;

  const toolData = await getToolBySlug(slug);

  if (!toolData) {
    notFound();
  }

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

      {/* 가격 정보가 없는 경우 메시지 */}
      {(!aiContent?.pricing || aiContent.pricing.length === 0) && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            더 자세한 가격 정보는 공식 웹사이트에서 확인하실 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
