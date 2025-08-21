import { TOOLS_SLUG_PATHNAME } from "@/shared/config/pathname";
import { Button } from "@/shared/ui/button";
import { ToolBadge } from "@/src/entities/tool";
import { FAQSection } from "@/src/features/tool-detail/ui";
import {
  ClockIcon,
  ExternalLink,
  PencilLine,
  Plus,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ToolDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    tab?: string;
  }>;
}

type TabType =
  | "features"
  | "pricing"
  | "specs"
  | "faq"
  | "reviews"
  | "alternatives";

export default async function ToolDetail({
  params,
  searchParams,
}: ToolDetailPageProps) {
  const { slug } = await params;
  const { tab = "features" } = await searchParams;
  const currentTab = tab as TabType;

  const tabs = [
    {
      key: "features" as const,
      label: "주요 기능",
      href: TOOLS_SLUG_PATHNAME(slug),
    },
    {
      key: "pricing" as const,
      label: "가격",
      href: `${TOOLS_SLUG_PATHNAME(slug)}?tab=pricing`,
    },
    {
      key: "reviews" as const,
      label: "리뷰",
      href: `${TOOLS_SLUG_PATHNAME(slug)}?tab=reviews`,
    },
    {
      key: "alternatives" as const,
      label: "유사한 도구",
      href: `${TOOLS_SLUG_PATHNAME(slug)}?tab=alternatives`,
    },
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
          <div className="max-w-2xl space-y-4 lg:flex-1">
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

            {/* 설명 - Figma 스타일 적용 */}
            <div className="space-y-6">
              <p className="break-keep text-base font-light text-muted-foreground">
                나노 바나나 AI는 최첨단 AI 기술을 사용하여 텍스트를 놀라운
                비주얼로 즉시 변환하는 고급 AI 기반 이미지 생성 및 편집기입니다.
                사용자는 간단한 텍스트 프롬프트를 사용하여 이미지를 생성, 편집
                및 완벽하게 다듬을 수 있으며, 이미지 생성을 혁신하는 신비로운 AI
                모델을 활용합니다. 이 플랫폼은 자연어 편집, 한 번의 완벽한 결과,
                얼굴 완성, 일관된 캐릭터 편집 등의 기능을 제공하여
                포토리얼리스틱 초상화, 창의적인 예술 스타일, 제품 사진, 복잡한
                장면 및 기존 사진의 향상을 가능하게 합니다.
              </p>

              {/* 카테고리 - Figma 스타일 */}
              <div className="flex items-center gap-2">
                <ToolBadge tags={["대화형 AI", "글쓰기", "분석"]} />
              </div>

              {/* 생성/수정 날짜 - 한국식 스타일 */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground-secondary">
                <ClockIcon className="h-3 w-3 text-muted-foreground-secondary" />
                <span className="font-light">
                  2023년 11월 17일 출시 • 2024년 9월 11일 업데이트
                </span>
              </div>

              {/* 평점 및 지표 */}
              <div className="flex gap-4">
                {/* Rating */}
                <div className="flex-1 rounded-2xl border border-border bg-background p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-border bg-background">
                      <Star className="h-6 w-6 fill-star text-star" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-medium leading-6 text-foreground">
                          4.8
                        </span>
                        <span className="text-xs font-light leading-[22px] text-muted-foreground">
                          (1.2K+ 리뷰)
                        </span>
                      </div>
                      <span className="text-sm font-light leading-5 text-muted-foreground">
                        평점
                      </span>
                    </div>
                  </div>
                </div>

                {/* Monthly Active Users */}
                <div className="flex-1 rounded-2xl border border-border bg-background p-5 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-border bg-background">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-medium leading-6 text-foreground">
                        30.0M+
                      </span>
                      <span className="text-sm font-light leading-5 text-muted-foreground">
                        월간 활성 사용자
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 탭 네비게이션 */}
            <div className="pt-10">
              <nav
                className="scrollbar-hide mb-10 flex gap-6 overflow-x-auto border-b border-border"
                role="tablist"
              >
                {tabs.map(({ key, label, href }) => (
                  <Link
                    key={key}
                    href={href}
                    className={
                      currentTab === key
                        ? "text- flex items-center space-x-1 whitespace-nowrap border-b-2 border-secondary px-1 py-2 font-medium text-secondary sm:space-x-2 sm:text-base"
                        : "flex items-center space-x-1 whitespace-nowrap px-1 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:space-x-2 sm:text-sm"
                    }
                    role="tab"
                    aria-selected={currentTab === key}
                  >
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">
                      {label.length > 4 ? label.slice(0, 3) : label}
                    </span>
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
    case "features":
      return <FeaturesContent slug={slug} />;
    case "pricing":
      return <PricingContent slug={slug} />;
    case "reviews":
      return <ReviewsContent slug={slug} />;
    case "alternatives":
      return <AlternativeToolsContent slug={slug} />;
    default:
      return <FeaturesContent slug={slug} />;
  }
}

function FeaturesContent({ slug }: { slug: string }) {
  return (
    <div className="space-y-10">
      {/* 주요 기능 섹션 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-2xl font-semibold text-secondary">
            주요 기능
          </h3>
          <div className="space-y-3 font-light">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-secondary"></div>
              <span className="text-muted-foreground">
                정확한 텍스트 렌더링
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-secondary"></div>
              <span className="text-muted-foreground">안전 가이드라인</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-secondary"></div>
              <span className="text-muted-foreground">고품질 출력</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-secondary"></div>
              <span className="text-muted-foreground">실시간 대화</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-semibold text-secondary">
            활용 분야
          </h3>
          <div className="space-y-3 font-light">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-secondary"></div>
              <span className="text-muted-foreground">마케팅 이미지</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-secondary"></div>
              <span className="text-muted-foreground">일러스트</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-secondary"></div>
              <span className="text-muted-foreground">웹사이트 디자인</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-secondary"></div>
              <span className="text-muted-foreground">소셜미디어</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ 섹션 */}
      <FAQSection />
    </div>
  );
}

function ReviewsContent({ slug }: { slug: string }) {
  const reviews = [
    {
      id: 1,
      author: "김민수",
      rating: 5,
      date: "2024.01.15",
      content:
        "업무 효율성이 크게 향상되었습니다. 특히 문서 작성과 아이디어 발상에 매우 도움이 됩니다.",
      tools: "Notion AI",
    },
    {
      id: 2,
      author: "이영희",
      rating: 4,
      date: "2024.01.10",
      content:
        "대부분의 질문에 정확한 답변을 제공하지만, 가끔 최신 정보가 부족할 때가 있습니다.",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold capitalize text-secondary">
          {slug} 리뷰
        </h3>

        <Button variant="secondary">
          <PencilLine className="h-4 w-4" />
          리뷰 남기기
        </Button>
      </div>

      {/* 리뷰 목록 */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border border-border bg-card p-6"
          >
            {/* 리뷰 헤더 */}
            <div className="mb-4 flex items-start gap-2">
              {/* 아바타 */}
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                <span className="text-lg font-medium text-muted-foreground">
                  {review.author.charAt(0)}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3">
                {/* 사용자 정보와 별점 */}
                <div className="flex flex-col items-start justify-between">
                  {/* 이름 */}
                  <h4 className="text-sm font-semibold text-secondary">
                    {review.author}
                  </h4>

                  {/* 별점과 날짜 */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-3 w-3 ${
                            index < review.rating
                              ? "fill-star text-star"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#d1d5db]">•</span>
                    <span className="text-xs font-light text-muted-foreground-secondary">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* 리뷰 내용 */}
              <p className="text-sm font-light leading-relaxed text-foreground">
                {review.content}
              </p>

              {/* 함께 사용한 도구 (있는 경우) */}
              {review.tools && (
                <div className="text-xs font-medium text-[#6b7280]">
                  <div className="mb-2">함께 사용한 도구:</div>
                  <span className="rounded-[4px] bg-[#f3f4f6] px-3 py-1 text-xs font-normal text-muted-foreground-secondary">
                    {review.tools}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlternativeToolsContent({ slug }: { slug: string }) {
  const similarTools = [
    {
      name: "Claude",
      description: "Anthropic에서 개발한 AI 어시스턴트",
      features: ["안전한 AI", "긴 컨텍스트", "코드 분석"],
      rating: 4.7,
      pricing: "Free + from $20/월",
      slug: "claude",
    },
    {
      name: "Gemini",
      description: "Google의 차세대 AI 모델",
      features: ["멀티모달", "실시간 정보", "Google 통합"],
      rating: 4.6,
      pricing: "Free + from $20/월",
      slug: "gemini",
    },
    {
      name: "Perplexity",
      description: "검색 기능이 강화된 AI 어시스턴트",
      features: ["실시간 검색", "출처 제공", "정확한 정보"],
      rating: 4.5,
      pricing: "Free + from $20/월",
      slug: "perplexity",
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold capitalize text-foreground">
        {slug} 유사한 도구
      </h3>

      <div className="grid gap-4"></div>

      <div className="text-center">
        <Link href="/tools" className="text-sm text-primary hover:underline">
          더 많은 AI 도구 보기 →
        </Link>
      </div>
    </div>
  );
}

function PricingContent({ slug }: { slug: string }) {
  return (
    <div className="space-y-6">
      {/* 제목 */}
      <h3 className="text-2xl font-semibold capitalize text-secondary">
        {slug} 가격 정보
      </h3>

      {/* 가격 카드들 (2x2 그리드) */}
      <div className="grid grid-cols-2 gap-4">
        {/* 무료 플랜 */}
        <div className="rounded-md border border-border bg-background p-6 shadow-sm">
          <div className="mb-4 space-y-2">
            <h4 className="text-xl font-semibold text-foreground">기본</h4>
            <p className="text-lg font-semibold text-primary">$9.90/월</p>
          </div>
          <p className="break-keep text-sm font-light leading-relaxed text-muted-foreground">
            개인 및 가벼운 사용자에게 적합하며, 월 100 크레딧, 월 50 고화질
            이미지, 모든 스타일 템플릿, 표준 생성 속도, 기본 고객 지원 및
            JPG/PNG 형식 다운로드를 포함합니다.
          </p>
        </div>

        {/* 스타터 플랜 */}
        <div className="rounded-md border border-border bg-background p-6 shadow-sm">
          <div className="mb-4 space-y-1">
            <h4 className="text-xl font-semibold text-foreground">스타터</h4>
            <p className="text-lg font-semibold text-primary">$19.90/월</p>
          </div>
          <p className="break-keep text-sm font-light leading-relaxed text-muted-foreground">
            프리미엄 문자: 75K, 표준 문자: 150K, 텍스트당 문자 수: 3K, 감정 없는
            음성, Gen2 음성 없음, 프롬프트 음성 없음, 사운드 효과 없음, 음성
            클로닝 없음, 광고 제거: 예, 상업적 사용: 예, 배경 오디오: 예, 파일
            기록 없음, API 호출 없음, 매달 초기화, 언제든지 취소 가능
          </p>
        </div>

        {/* 표준 플랜 */}
        <div className="rounded-md border border-border bg-background p-6 shadow-sm">
          <div className="mb-4 space-y-1">
            <h4 className="text-xl font-semibold text-foreground">표준</h4>
            <p className="text-lg font-semibold text-primary">$39.90/월</p>
          </div>
          <p className="break-keep text-sm font-light leading-relaxed text-muted-foreground">
            프리미엄 문자: 200K, 표준 문자: 400K, 텍스트당 문자 수: 10K, 감정
            있는 음성: 예, Gen2 음성: 예, 프롬프트 음성: 예, 사운드 효과: 예,
            음성 클로닝 없음, 광고 제거: 예, 상업적 사용: 예, 배경 오디오: 예,
            파일 기록: 30 분, API 호출 없음, 매달 초기화, 언제든지 취소 가능
          </p>
        </div>

        {/* 프로 플랜 */}
        <div className="rounded-md border border-border bg-background p-6 shadow-sm">
          <div className="mb-4 space-y-1">
            <h4 className="text-xl font-semibold text-foreground">프로</h4>
            <p className="text-lg font-semibold text-primary">$79.90/월</p>
          </div>
          <p className="break-keep text-sm font-light leading-relaxed text-muted-foreground">
            프리미엄 문자: 500K, 표준 문자: 1M, 텍스트당 문자 수: 50K, 감정 있는
            음성: 예, Gen2 음성: 예, 프롬프트 음성: 예, 사운드 효과: 예, 음성
            클로닝: 예, 광고 제거: 예, 상업적 사용: 예, 배경 오디오: 예, 파일
            기록: 2 시간, API 호출: 예, 매달 초기화, 언제든지 취소 가능
          </p>
        </div>
      </div>
    </div>
  );
}
