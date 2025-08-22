import { ToolDetailTabs } from "@/features/tool-detail";
import {
  TOOLS_SLUG_FAQ_PATHNAME,
  TOOLS_SLUG_PATHNAME,
  TOOLS_SLUG_PRICING_PATHNAME,
  TOOLS_SLUG_REVIEWS_PATHNAME,
} from "@/shared/config/pathname";
import { Button } from "@/shared/ui/button";
import { getToolBySlug } from "@/src/entities/tool-detail";
import { ToolBadge, ToolLogo } from "@/src/shared/ui";
import {
  ChevronRight,
  ClockIcon,
  ExternalLink,
  Home,
  Plus,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ToolsLayoutProps {
  children: React.ReactNode;
  sheet: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolsLayout({
  children,
  sheet,
  params,
}: ToolsLayoutProps) {
  const { slug } = await params;

  const toolData = await getToolBySlug(slug);

  if (!toolData) {
    notFound();
  }

  return (
    <div className="relative">
      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-7xl py-20">
          {/* 브레드크럼브 네비게이션 */}
          <nav aria-label="Breadcrumb" className="flex h-10 items-center">
            <ol className="flex items-center gap-1 text-xs">
              <li>
                <Link
                  href="/"
                  className="text-muted-foregroundtransition-colors flex items-center gap-1 hover:text-foreground"
                >
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">홈</span>
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
              <li aria-current="page">
                <span className="font-normal capitalize text-muted-foreground">
                  {toolData.name}
                </span>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-12 lg:flex-row">
            {/* 왼쪽 - 스크린샷 섹션 */}
            <aside
              className="space-y-4 lg:sticky lg:top-24 lg:h-fit lg:w-[420px] lg:flex-shrink-0"
              aria-label="도구 미리보기 및 액션"
            >
              {/* 메인 스크린샷 */}
              <figure className="relative aspect-[5/3] overflow-hidden rounded-md border border-border bg-muted">
                {toolData.imageUrl ? (
                  <Image
                    src={toolData.imageUrl}
                    alt={`${toolData.name} 도구의 인터페이스 스크린샷`}
                    fill
                    className="rounded-md object-cover"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
                    <div className="text-center text-white">
                      <div className="mb-2 text-4xl font-bold capitalize">
                        {toolData.name}
                      </div>
                      <p className="text-sm opacity-70">스크린샷</p>
                    </div>
                  </div>
                )}
              </figure>

              {/* 액션 버튼들 */}
              <div className="space-y-3" role="group" aria-label="도구 액션">
                {toolData.website && (
                  <Button
                    size="lg"
                    variant="secondary"
                    className="hover:bg-foreground/90 h-12 w-full"
                    aria-label={`${toolData.name} 공식 웹사이트로 이동`}
                    asChild
                  >
                    <Link
                      href={toolData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      웹사이트 바로가기
                    </Link>
                  </Button>
                )}

                <Button
                  size="lg"
                  variant="outline"
                  className="hover:bg-foreground/90 h-12 w-full"
                  aria-label={`${toolData.name}를 비교목록에 추가`}
                >
                  <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                  비교목록에 추가
                </Button>
              </div>
            </aside>

            {/* 오른쪽 - 정보 섹션 (나머지 공간 차지) */}
            <article className="max-w-4xl space-y-4 lg:flex-1">
              {/* 헤더 */}
              <header className="flex items-center gap-4">
                <ToolLogo
                  websiteLogo={toolData.websiteLogo || ""}
                  name={toolData.name || ""}
                  size="xl"
                />
                <div className="flex-grow">
                  <h1 className="mb-1 font-rajdhani text-4xl font-bold uppercase tracking-wide text-foreground">
                    {toolData.name}
                  </h1>
                </div>
              </header>

              {/* 설명   */}
              <section className="space-y-6">
                <h2 className="sr-only">도구 개요</h2>
                <div>
                  <p className="break-keep text-base font-light leading-7 text-muted-foreground">
                    {toolData.content?.what_is}
                  </p>
                </div>

                {/* 카테고리 */}
                <div
                  className="flex items-center gap-2"
                  aria-label="도구 카테고리"
                >
                  <ToolBadge tags={toolData.tags} maxCount={10} />
                </div>

                {/* 생성/수정 날짜 */}
                <div
                  className="flex items-center gap-2 text-xs text-muted-foreground-secondary"
                  aria-label="출시 및 업데이트 정보"
                >
                  <ClockIcon
                    className="h-3 w-3 text-muted-foreground-secondary"
                    aria-hidden="true"
                  />
                  {toolData.dates.createdAtFormatted && (
                    <>
                      <time
                        dateTime={toolData.dates.createdAt?.toISOString()}
                        className="font-light"
                      >
                        {toolData.dates.createdAtFormatted} 출시
                      </time>
                      {toolData.dates.updatedAtFormatted && (
                        <>
                          <span aria-hidden="true">•</span>
                          <time
                            dateTime={toolData.dates.updatedAt?.toISOString()}
                            className="font-light"
                          >
                            {toolData.dates.updatedAtFormatted} 업데이트
                          </time>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* 평점 및 지표 */}
                <div className="flex gap-6" role="group" aria-label="도구 통계">
                  {/* Rating */}
                  <div className="flex-1 rounded-2xl border border-[#eaecf0] bg-background p-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-[#eaecf0] bg-background"
                        aria-hidden="true"
                      >
                        <Star className="h-6 w-6 fill-star text-star" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                          <span
                            className="text-lg font-medium leading-6 text-foreground"
                            aria-label="평점 4.8점"
                          >
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
                  <div className="flex-1 rounded-2xl border border-[#eaecf0] bg-background p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-[#eaecf0] bg-background"
                        aria-hidden="true"
                      >
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span
                          className="text-lg font-medium leading-6 text-foreground"
                          aria-label="3천만 명 이상의 월간 활성 사용자"
                        >
                          {toolData.monthlyUsers.formatted}
                        </span>
                        <span className="text-sm font-light leading-5 text-muted-foreground">
                          월간 활성 사용자
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 탭 네비게이션 */}
              <section className="pt-10">
                <h2 className="sr-only">도구 상세 정보</h2>
                <ToolDetailTabs
                  tabs={[
                    {
                      key: "info",
                      label: "제품 정보",
                      href: TOOLS_SLUG_PATHNAME(slug),
                    },
                    {
                      key: "pricing",
                      label: "가격",
                      href: TOOLS_SLUG_PRICING_PATHNAME(slug),
                    },
                    {
                      key: "faq",
                      label: "FAQ",
                      href: TOOLS_SLUG_FAQ_PATHNAME(slug),
                    },
                    {
                      key: "reviews",
                      label: "리뷰",
                      href: TOOLS_SLUG_REVIEWS_PATHNAME(slug),
                    },
                  ]}
                />

                {/* 탭 컨텐츠 - children으로 렌더링 */}
                <div className="min-h-[400px]" role="tabpanel">
                  {children}
                </div>
              </section>
            </article>
          </div>
        </div>
      </main>
      {sheet}
    </div>
  );
}
