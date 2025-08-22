import { getToolBySlug } from "@/src/entities/tool-detail";
import { CheckCircle, XCircle } from "lucide-react";
import { notFound } from "next/navigation";

interface ToolInfoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolInfoPage({ params }: ToolInfoPageProps) {
  const { slug } = await params;

  const toolData = await getToolBySlug(slug);

  if (!toolData) {
    notFound();
  }

  const aiContent = toolData.content;

  const featureList = aiContent?.core_features || [];
  const bestForList = aiContent?.best_for || [];
  const prosAndCons = aiContent?.pros_and_cons;

  return (
    <section className="space-y-14">
      {/** how to use */}
      <div>
        <h2 className="mb-3 text-xl font-medium capitalize text-secondary">
          {toolData.name} 사용 방법
        </h2>
        <p className="font-base break-keep font-light leading-7 text-muted-foreground">
          {toolData.content.how_to_use}
        </p>
      </div>

      {/* 주요 기능 섹션 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-xl font-medium text-secondary">주요 기능</h3>
          <div className="space-y-4 font-light">
            {featureList.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary-secondary"></div>
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xl font-medium text-secondary">
            주요 활용 분야
          </h4>
          <div className="space-y-4 font-light">
            {bestForList.map((bestFor, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary-secondary"></div>
                <span className="text-muted-foreground">{bestFor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 장단점 섹션 */}
      <div>
        <h5 className="mb-3 text-xl font-medium text-secondary">장단점</h5>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 장점 섹션 */}
          <div className="space-y-4">
            <ul className="space-y-4">
              {prosAndCons?.pros?.map((pro, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span className="font-light text-muted-foreground">
                    {pro}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 단점 섹션 */}
          <div className="space-y-4">
            <ul className="space-y-2">
              {prosAndCons?.cons?.map((con, index) => (
                <li key={index} className="flex items-center gap-3">
                  <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                  <span className="font-light text-muted-foreground">
                    {con}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
