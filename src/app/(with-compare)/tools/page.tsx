import Link from "next/link";

import { getAllToolsWithPagination } from "@/entities/tool";
import { ResultsBar } from "@/features/search";
import { PaginatedToolList } from "@/features/tool-catalog";
import { Card, CardContent } from "@/shared/ui/card";
import { Switch } from "@/shared/ui/switch";

const TOOLS_PAGE_LIMIT = 12;

interface ToolsPageProps {
  searchParams?: {
    q?: string;
    category?: string;
    tag?: string;
    pricing?: "free" | "paid";
    tab?: "all" | "popular" | "new" | "trending";
    sort?: string;
    freeOnly?: "1";
    withImages?: "1";
    minRating?: string;
    platform?: string;
    trial?: "1";
  };
}

export default async function Tools({ searchParams }: ToolsPageProps) {
  const query = searchParams?.q?.trim()?.toLowerCase() ?? "";
  const selectedCategory = searchParams?.category ?? "";
  const selectedTag = searchParams?.tag ?? "";
  const pricing = (searchParams?.pricing as "free" | "paid" | "") ?? "";
  const tab =
    (searchParams?.tab as "all" | "popular" | "new" | "trending" | undefined) ??
    "all";
  const sort = searchParams?.sort ?? "name";
  const freeOnly = searchParams?.freeOnly === "1";
  const withImages = searchParams?.withImages === "1";
  const minRating = Number.isFinite(Number(searchParams?.minRating))
    ? Number(searchParams?.minRating)
    : 0;
  const selectedPlatform = searchParams?.platform ?? "";
  const hasTrial = searchParams?.trial === "1";
  const sortForResults: "name" | "latest" | "rating" =
    sort === "latest" || sort === "rating" || sort === "name"
      ? (sort as "name" | "latest" | "rating")
      : "name";

  // Map tab to sort
  let sortParam: "name" | "latest" | "rating" | "popularity" = "name";
  if (tab === "popular" || tab === "trending") {
    sortParam = "popularity";
  } else if (tab === "new") {
    sortParam = "latest";
  } else if (sort === "rating") {
    sortParam = "rating";
  } else if (sort === "latest") {
    sortParam = "latest";
  }

  // Get tools from database with filters
  const { tools: initialTools, totalCount } = await getAllToolsWithPagination(
    TOOLS_PAGE_LIMIT,
    0,
    {
      query: query || undefined,
      category: selectedCategory || undefined,
      tag: selectedTag || undefined,
      pricing:
        pricing || freeOnly
          ? freeOnly
            ? "free"
            : (pricing as "free" | "paid")
          : undefined,
      minRating: minRating > 0 ? minRating : undefined,
      hasTrial: hasTrial || undefined,
      sort: sortParam,
    },
  );

  const buildHref = (updates: Record<string, string | undefined>) => {
    const qp = new URLSearchParams();
    if (query) qp.set("q", query);
    if (selectedCategory) qp.set("category", selectedCategory);
    if (selectedTag) qp.set("tag", selectedTag);
    if (pricing) qp.set("pricing", pricing);
    if (tab) qp.set("tab", tab);
    if (sort) qp.set("sort", sort);
    if (withImages) qp.set("withImages", "1");
    if (minRating) qp.set("minRating", String(minRating));
    if (selectedPlatform) qp.set("platform", selectedPlatform);
    for (const [k, v] of Object.entries(updates)) {
      if (!v) qp.delete(k);
      else qp.set(k, v);
    }
    const s = qp.toString();
    return `/tools${s ? `?${s}` : ""}`;
  };

  return (
    <section className="relative z-10 flex w-full flex-col gap-6 bg-transparent">
      <div className="flex w-full justify-center pt-14">
        <div className="max-w-[880px] text-center">
          <h1 className="text-[38px] font-bold leading-[1.5] tracking-tight text-secondary">
            Discover Featured AI Tools
          </h1>
          <p className="mt-3 text-[16px] font-light leading-[1.5] text-muted-foreground">
            AI 도구 카탈로그를 탐색해 보세요
          </p>
          <div className="mx-auto mt-4 h-[2px] w-12 bg-[#6050FF]" />
        </div>
      </div>

      {/* Main content with sidebar */}
      <div className="relative z-0 grid gap-6 lg:grid-cols-5">
        {/* Sidebar */}
        <aside className="relative z-20 lg:col-span-2 xl:col-span-1">
          <Card className="border-0">
            <CardContent className="space-y-6 px-5 pb-11 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">필터</h3>
                <Link
                  href={buildHref({
                    q: undefined,
                    category: undefined,
                    tag: undefined,
                    pricing: undefined,
                    freeOnly: undefined,
                    withImages: undefined,
                    minRating: undefined,
                    platform: undefined,
                    tab: undefined,
                  })}
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  초기화
                </Link>
              </div>

              {/* 활성 필터 표시 */}
              {(selectedCategory ||
                selectedTag ||
                pricing ||
                hasTrial ||
                withImages ||
                minRating > 0 ||
                selectedPlatform) && (
                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">
                    활성 필터
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory && (
                      <Link
                        href={buildHref({ category: undefined })}
                        className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs"
                      >
                        <span>카테고리: {selectedCategory}</span>
                        <span aria-hidden>×</span>
                      </Link>
                    )}
                    {selectedTag && (
                      <Link
                        href={buildHref({ tag: undefined })}
                        className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs"
                      >
                        <span>태그: {selectedTag}</span>
                        <span aria-hidden>×</span>
                      </Link>
                    )}
                    {pricing && (
                      <Link
                        href={buildHref({ pricing: undefined })}
                        className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs"
                      >
                        <span>
                          가격: {pricing === "free" ? "무료" : "프리미엄"}
                        </span>
                        <span aria-hidden>×</span>
                      </Link>
                    )}
                    {hasTrial && (
                      <Link
                        href={buildHref({ trial: undefined })}
                        className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs"
                      >
                        <span>무료 체험</span>
                        <span aria-hidden>×</span>
                      </Link>
                    )}
                    {withImages && (
                      <Link
                        href={buildHref({ withImages: undefined })}
                        className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs"
                      >
                        <span>이미지 있음</span>
                        <span aria-hidden>×</span>
                      </Link>
                    )}
                    {minRating > 0 && (
                      <Link
                        href={buildHref({ minRating: undefined })}
                        className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs"
                      >
                        <span>평점 {minRating}+</span>
                        <span aria-hidden>×</span>
                      </Link>
                    )}
                    {selectedPlatform && (
                      <Link
                        href={buildHref({ platform: undefined })}
                        className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs"
                      >
                        <span>플랫폼: {selectedPlatform}</span>
                        <span aria-hidden>×</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* 가격 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="text-sm font-medium">가격</div>
                </div>
                <div className="space-y-3">
                  {/* 무료 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm">무료</span>
                    <Link
                      href={buildHref({
                        pricing: pricing === "free" ? undefined : "free",
                      })}
                      className="inline-flex"
                    >
                      <Switch checked={pricing === "free"} aria-label="무료" />
                    </Link>
                  </div>
                  {/* 프리미엄 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm">프리미엄</span>
                    <Link
                      href={buildHref({
                        pricing: pricing === "paid" ? undefined : "paid",
                      })}
                      className="inline-flex"
                    >
                      <Switch
                        checked={pricing === "paid"}
                        aria-label="프리미엄"
                      />
                    </Link>
                  </div>
                  {/* 무료 체험 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm">무료 체험</span>
                    <Link
                      href={buildHref({ trial: hasTrial ? undefined : "1" })}
                      className="inline-flex"
                    >
                      <Switch checked={hasTrial} aria-label="무료 체험" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 태그 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="text-sm font-medium">태그</div>
                </div>
                <div className="text-[13px] text-muted-foreground">
                  태그가 없습니다.
                </div>
              </div>

              {/* 플랫폼 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="text-sm font-medium">플랫폼</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "웹 앱",
                    "크롬 익스텐션",
                    "데스크탑 앱",
                    "모바일 앱",
                    "슬랙 연동",
                    "API 전용",
                    "워드프레스 플러그인",
                    "피그마 플러그인",
                  ].map((p) => (
                    <Link
                      key={p}
                      href={buildHref({ platform: p })}
                      className={`inline-flex items-center rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1 text-xs ${
                        selectedPlatform === p
                          ? "bg-secondary/10 border-secondary text-secondary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Content */}
        <div className="space-y-6 lg:col-span-3 xl:col-span-4">
          {/* Results bar */}
          <ResultsBar
            resultsCount={totalCount}
            baseParams={{
              q: query,
              category: selectedCategory,
              tag: selectedTag,
              pricing,
              tab,
              sort: sortForResults,
              withImages,
              minRating,
              platform: selectedPlatform,
            }}
          />

          {/* Tools grid with load more */}
          {totalCount > 0 ? (
            <PaginatedToolList
              initialTools={initialTools}
              totalCount={totalCount}
              filters={{
                query: query || undefined,
                category: selectedCategory || undefined,
                tag: selectedTag || undefined,
                pricing:
                  pricing || freeOnly
                    ? freeOnly
                      ? "free"
                      : (pricing as "free" | "paid")
                    : undefined,
                minRating: minRating > 0 ? minRating : undefined,
                hasTrial: hasTrial || undefined,
                sort: sortParam,
              }}
              pageLimit={TOOLS_PAGE_LIMIT}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed p-10 text-center">
              <p className="text-sm text-muted-foreground">
                No tools found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
