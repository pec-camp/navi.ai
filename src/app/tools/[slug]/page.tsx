import { Button } from "@/shared/ui/button";
import { ToolBadge } from "@/src/entities/tool";
import { ExternalLink, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TOOLS_SLUG_PATHNAME } from "@/shared/config/pathname";

interface ToolDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    tab?: string;
  }>;
}

type TabType = 'features' | 'reviews' | 'similar';

export default async function ToolDetail({ params, searchParams }: ToolDetailPageProps) {
  const { slug } = await params;
  const { tab = 'features' } = await searchParams;
  const currentTab = tab as TabType;

  const tabs = [
    { key: 'features' as const, label: '주요 기능', href: TOOLS_SLUG_PATHNAME(slug) },
    { key: 'reviews' as const, label: '리뷰', href: `${TOOLS_SLUG_PATHNAME(slug)}?tab=reviews` },
    { key: 'similar' as const, label: '유사 도구', href: `${TOOLS_SLUG_PATHNAME(slug)}?tab=similar` },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl py-20">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* 왼쪽 - 스크린샷 섹션 (280px 고정, sticky) */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:h-fit lg:w-[280px] lg:flex-shrink-0">
            {/* 메인 스크린샷 */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
              <Image
                src={`/screenshots/${slug}.jpg`}
                alt={`${slug} 스크린샷`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 280px"
              />
              {/* 폴백 - 이미지가 없을 때 */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
                <div className="text-center text-white">
                  <div className="mb-2 text-4xl font-bold capitalize">
                    {slug}
                  </div>
                  <p className="text-sm opacity-70">스크린샷</p>
                </div>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="space-y-3">
              <Button
                size="lg"
                variant="secondary"
                className="hover:bg-foreground/90 h-12 w-full"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                웹사이트 바로가기
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="hover:bg-foreground/90 h-12 w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                비교목록에 추가
              </Button>
            </div>
          </div>

          {/* 오른쪽 - 정보 섹션 (나머지 공간 차지) */}
          <div className="space-y-4 lg:flex-1">
            {/* 헤더 */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700">
                <span className="text-xl font-bold uppercase text-white">
                  {slug.charAt(0)}
                </span>
              </div>
              <div className="flex-grow">
                <h1 className="mb-1 font-rajdhani text-4xl font-bold uppercase tracking-wide text-foreground">
                  {slug}
                </h1>
              </div>
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2">
              <ToolBadge tags={["대화형 AI", "글쓰기", "분석"]} />
            </div>

            {/* 평점 및 정보 */}
            <div className="flex items-center gap-6 text-sm font-light">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>4.8</span>
              </div>
              <div>월 사용자 100.0M명</div>
              <div>Free + from $20/월</div>
            </div>

            {/* 설명 */}
            <p className="font-base pr-28 leading-relaxed text-muted-foreground">
              ChatGPT는 OpenAI에서 개발한 대화형 AI 어시스턴트로, GPT 아키텍처를
              기반으로 하여 자연스러운 대화를 통해 사용자의 다양한 요청을 처리할
              수 있습니다. 텍스트 생성, 번역, 요약, 코딩 지원 등 폭넓은 작업을
              수행하며, 지속적인 학습을 통해 더욱 정확하고 유용한 답변을
              제공합니다.
            </p>

            {/* 탭 네비게이션 */}
            <div className="pt-10">
              <nav className="mb-6 flex gap-6 border-b border-border" role="tablist">
                {tabs.map(({ key, label, href }) => (
                  <Link
                    key={key}
                    href={href}
                    className={
                      currentTab === key
                        ? "border-b-2 border-secondary px-1 pb-3 text-sm font-medium text-secondary"
                        : "px-1 pb-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    }
                    role="tab"
                    aria-selected={currentTab === key}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* 탭 컨텐츠 */}
              <div className="min-h-[400px]">
                <TabContent tab={currentTab} slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabContent({ tab, slug }: { tab: TabType; slug: string }) {
  switch (tab) {
    case 'features':
      return <FeaturesContent />;
    case 'reviews':
      return <ReviewsContent />;
    case 'similar':
      return <SimilarToolsContent slug={slug} />;
    default:
      return <FeaturesContent />;
  }
}

function FeaturesContent() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          주요 기능
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">
              정확한 텍스트 렌더링
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">
              안전 가이드라인
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">고품질 출력</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">실시간 대화</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          활용 분야
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">
              마케팅 이미지
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">일러스트</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">
              웹사이트 디자인
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">소셜미디어</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">사용자 리뷰</h3>
        <div className="text-sm text-muted-foreground">총 1,234개 리뷰</div>
      </div>
      
      <div className="space-y-4">
        {/* 리뷰 아이템 1 */}
        <div className="border-b border-border pb-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium">김민수</span>
            <span className="text-xs text-muted-foreground">2024.01.15</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            정말 유용한 AI 도구입니다. 특히 글쓰기 작업에서 많은 도움을 받고 있어요. 
            답변 속도도 빠르고 품질도 만족스럽습니다.
          </p>
        </div>

        {/* 리뷰 아이템 2 */}
        <div className="border-b border-border pb-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4].map((star) => (
                <svg
                  key={star}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg
                className="h-4 w-4 fill-gray-300 text-gray-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-sm font-medium">이영희</span>
            <span className="text-xs text-muted-foreground">2024.01.10</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            대체로 만족하지만 가끔 이해하지 못하는 질문들이 있어요. 
            그래도 전반적으로는 추천할 만합니다.
          </p>
        </div>

        {/* 리뷰 아이템 3 */}
        <div className="pb-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium">박철수</span>
            <span className="text-xs text-muted-foreground">2024.01.05</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            업무 효율성이 정말 많이 향상되었습니다. 
            복잡한 문서 작성이나 번역 작업에서 특히 도움이 많이 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

function SimilarToolsContent({ slug }: { slug: string }) {
  const similarTools = [
    {
      name: "Claude",
      description: "Anthropic에서 개발한 AI 어시스턴트",
      features: ["안전한 AI", "긴 컨텍스트", "코드 분석"],
      rating: 4.7,
      pricing: "Free + from $20/월",
      slug: "claude"
    },
    {
      name: "Gemini",
      description: "Google의 차세대 AI 모델",
      features: ["멀티모달", "실시간 정보", "Google 통합"],
      rating: 4.6,
      pricing: "Free + from $20/월",
      slug: "gemini"
    },
    {
      name: "Perplexity",
      description: "검색 기능이 강화된 AI 어시스턴트",
      features: ["실시간 검색", "출처 제공", "정확한 정보"],
      rating: 4.5,
      pricing: "Free + from $20/월",
      slug: "perplexity"
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">유사한 도구</h3>
      
      <div className="grid gap-4">
        {similarTools.map((tool) => (
          <div
            key={tool.slug}
            className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/5"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700">
                    <span className="text-sm font-bold uppercase text-white">
                      {tool.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{tool.name}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>⭐ {tool.rating}</span>
                      <span>{tool.pricing}</span>
                    </div>
                  </div>
                </div>
                
                <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
                
                <div className="mb-3 flex flex-wrap gap-2">
                  {tool.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="ml-4 flex flex-col gap-2">
                <Link
                  href={TOOLS_SLUG_PATHNAME(tool.slug)}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  자세히 보기
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Link
          href="/tools"
          className="text-sm text-primary hover:underline"
        >
          더 많은 AI 도구 보기 →
        </Link>
      </div>
    </div>
  );
}