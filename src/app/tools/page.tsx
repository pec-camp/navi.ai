import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Switch } from "@/shared/ui/switch";
import ResultsBar from "@/src/app/tools/ResultsBar";
import type { Category } from "@/src/entities/category/model/Category.interface";
import type { Tool, ToolTag } from "@/src/entities/tool/model/Tool.interface";
import CatalogToolCard from "@/src/entities/tool/ui/CatalogToolCard";

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
  const tab = (searchParams?.tab as "all" | "popular" | "new" | "trending" | undefined) ?? "all";
  const sort = searchParams?.sort ?? "name";
  const freeOnly = searchParams?.freeOnly === "1";
  const withImages = searchParams?.withImages === "1";
  const minRating = Number.isFinite(Number(searchParams?.minRating)) ? Number(searchParams?.minRating) : 0;
  const selectedPlatform = searchParams?.platform ?? "";
  const hasTrial = searchParams?.trial === "1";
  const sortForResults: "name" | "latest" | "rating" =
    sort === "latest" || sort === "rating" || sort === "name" ? (sort as "name" | "latest" | "rating") : "name";

  // Keep server get logic, but comment out for UI-only mock usage
  // const [tools, categories] = await Promise.all([
  //   getAllToolList(),
  //   getCategories(),
  // ]);

  // Mock data (UI only)
  const mockCategories: Category[] = [
    { id: 1, name: "글쓰기", slug: "writing" },
    { id: 2, name: "디자인", slug: "design" },
    { id: 3, name: "개발", slug: "development" },
  ];

  const mockTags: ToolTag[] = [
    { id: 1, name: "대화형 AI", slug: "chat-ai" },
    { id: 2, name: "이미지 생성", slug: "image-generation" },
    { id: 3, name: "코딩", slug: "coding" },
  ];

  const mockTools: Tool[] = [
    {
      id: 101,
      name: "ChatGPT",
      slug: "chatgpt",
      description:
        "자연어 처리 기반의 대화형 AI로 질문 답변, 텍스트 생성, 번역 등 다양한 작업을 수행합니다.",
      logo_url: "/logo.webp",
      website_url: "https://chat.openai.com/",
      created_at: new Date().toISOString(),
      pricing: "paid",
      popularity: 98,
      categories: [mockCategories[0]],
      tags: [mockTags[0]],
      rating: 4.8,
      installs: "100.0M",
      fromPriceMonth: 20,
      platforms: ["웹 앱", "모바일 앱"],
    },
    {
      id: 102,
      name: "Midjourney",
      slug: "midjourney",
      description: "텍스트 프롬프트로 예술적 이미지를 생성하는 AI 도구입니다.",
      logo_url: "/logo.webp",
      website_url: "https://www.midjourney.com/",
      created_at: new Date().toISOString(),
      pricing: "paid",
      popularity: 92,
      categories: [mockCategories[1]],
      tags: [mockTags[1]],
      rating: 4.6,
      installs: "15.0M",
      fromPriceMonth: 10,
      platforms: ["웹 앱"],
    },
    {
      id: 103,
      name: "GitHub Copilot",
      slug: "github-copilot",
      description: "개발자를 위한 코드 자동완성 및 제안을 제공하는 AI 페어 프로그래머.",
      logo_url: "/logo.webp",
      website_url: "https://github.com/features/copilot",
      created_at: new Date().toISOString(),
      pricing: "paid",
      popularity: 95,
      categories: [mockCategories[2]],
      tags: [mockTags[2]],
      rating: 4.4,
      installs: "1.0M",
      fromPriceMonth: 10,
      platforms: ["데스크탑 앱"],
    },
    {
      id: 104,
      name: "Canva AI",
      slug: "canva-ai",
      description: "디자인 작업을 쉽게 해주는 AI 기능.",
      logo_url: "/logo.webp",
      website_url: "https://www.canva.com/",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
      pricing: "free",
      popularity: 80,
      categories: [mockCategories[1]],
      tags: [mockTags[1]],
      rating: 4.5,
      installs: "30.0M",
      fromPriceMonth: 15,
      platforms: ["웹 앱"],
    },
    {
      id: 105,
      name: "Grammarly",
      slug: "grammarly",
      description: "영문 문법 교정 및 글쓰기 보조.",
      logo_url: "/logo.webp",
      website_url: "https://www.grammarly.com/",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
      pricing: "free",
      popularity: 85,
      categories: [mockCategories[0]],
      tags: [mockTags[0]],
      rating: 4.6,
      installs: "30.0M",
      fromPriceMonth: 30,
      platforms: ["웹 앱", "크롬 익스텐션"],
    },
  ];

  const tools: Tool[] = mockTools;
  // const categories: Category[] = mockCategories;

  const filteredTools = tools
    .filter((tool: Tool) => {
      const matchesQuery = query
        ? (tool?.name?.toLowerCase?.() ?? "").includes(query) ||
          (tool?.description?.toLowerCase?.() ?? "").includes(query)
        : true;

      const matchesCategory = selectedCategory
        ? Array.isArray(tool.categories)
          ? tool.categories.some((c) => c.slug === selectedCategory || c.name === selectedCategory)
          : false
        : true;

      const matchesTag = selectedTag
        ? Array.isArray(tool.tags)
          ? tool.tags.some((t) => t.slug === selectedTag || t.name === selectedTag)
          : false
        : true;

      const matchesPricing = pricing ? tool.pricing === pricing : true;
      const matchesFreeOnly = freeOnly ? tool.pricing === "free" : true;
      const matchesWithImages = withImages ? Boolean(tool.image_url || tool.logo_url) : true;
      const matchesMinRating = typeof tool.rating === "number" ? tool.rating >= minRating : minRating <= 0;
      const matchesPlatform = selectedPlatform
        ? Array.isArray(tool.platforms)
          ? tool.platforms.includes(selectedPlatform)
          : false
        : true;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesTag &&
        matchesPricing &&
        matchesFreeOnly &&
        matchesWithImages &&
        matchesMinRating &&
        matchesPlatform
      );
    })
    .sort((a: Tool, b: Tool) => {
      if (tab === "popular" || tab === "trending") {
        return (b.popularity ?? 0) - (a.popularity ?? 0);
      }
      if (tab === "new") {
        const aTime = new Date(a?.created_at ?? 0).getTime();
        const bTime = new Date(b?.created_at ?? 0).getTime();
        return bTime - aTime;
      }
      if (sort === "latest") {
        const aTime = new Date(a?.created_at ?? 0).getTime();
        const bTime = new Date(b?.created_at ?? 0).getTime();
        return bTime - aTime;
      }
      if (sort === "rating") {
        const aRating = typeof a.rating === "number" ? a.rating : 0;
        const bRating = typeof b.rating === "number" ? b.rating : 0;
        return bRating - aRating;
      }
      if (sort === "name") {
        return (a?.name ?? "").localeCompare(b?.name ?? "");
      }
      return 0;
    });

  const buildHref = (updates: Record<string, string | undefined>) => {
    const qp = new URLSearchParams();
    if (query) qp.set("q", query);
    if (selectedCategory) qp.set("category", selectedCategory);
    if (selectedTag) qp.set("tag", selectedTag);
    if (pricing) qp.set("pricing", pricing);
    if (tab) qp.set("tab", tab);
    if (sort) qp.set("sort", sort);
    // freeOnly parameter intentionally not preserved in links (UI removed)
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
          <h1 className="text-[38px] font-bold leading-[1.5] tracking-tight text-secondary">Discover Featured AI Tools</h1>
          <p className="mt-3 text-[16px] font-light leading-[1.5] text-muted-foreground">AI 도구 카탈로그를 탐색해 보세요</p>
          <div className="mx-auto mt-4 h-[2px] w-12 bg-[#6050FF]" />
        </div>
      </div>

      {/* Tabs removed per Figma (no tabs in this section) */}

      {/* Main content with sidebar */}
      <div className="relative z-0 grid gap-6 lg:grid-cols-5">
        {/* Sidebar */}
        <aside className="relative z-20 lg:col-span-2 xl:col-span-1">
          <Card className="border-0">
            <CardContent className="space-y-6 px-5 pt-6 pb-11">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">필터</h3>
                <Link href={buildHref({ q: undefined, category: undefined, tag: undefined, pricing: undefined, freeOnly: undefined, withImages: undefined, minRating: undefined, platform: undefined, tab: undefined })} className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                  초기화
                </Link>
              </div>

              {/* 활성 필터 표시 */}
              {(selectedCategory || selectedTag || pricing || hasTrial || withImages || (minRating > 0) || selectedPlatform) && (
                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">활성 필터</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory && (
                      <Link href={buildHref({ category: undefined })} className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs">
                        <span>카테고리: {selectedCategory}</span>
                        <span aria-hidden>×</span>
                      </Link>
                    )}
                    {selectedTag && (
                      <Link href={buildHref({ tag: undefined })} className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs">
                        <span>태그: {selectedTag}</span>
                        <span aria-hidden>×</span>
                      </Link>
                    )}
                    {pricing && (
                      <Link href={buildHref({ pricing: undefined })} className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs">
                        <span>가격: {pricing === "free" ? "무료" : "프리미엄"}</span>
                        <span aria-hidden>×</span>
                      </Link>
                    )}
                    {hasTrial && (
                      <Link href={buildHref({ trial: undefined })} className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs">
                        <span>무료 체험</span>
                        <span aria-hidden>×</span>
                      </Link>
                    )}
                    {withImages && (
                      <Link href={buildHref({ withImages: undefined })} className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs">
                        <span>이미지 있음</span>
                        <span aria-hidden>×</span>
                      </Link>
                    )}
                    {minRating > 0 && (
                      <Link href={buildHref({ minRating: undefined })} className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs">
                        <span>평점 {minRating}+</span>
                        <span aria-hidden>×</span>
                      </Link>
                    )}
                    {selectedPlatform && (
                      <Link href={buildHref({ platform: undefined })} className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs">
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
                    <Link href={buildHref({ pricing: pricing === "free" ? undefined : "free" })} className="inline-flex">
                      <Switch checked={pricing === "free"} aria-label="무료" />
                    </Link>
                  </div>
                  {/* 프리미엄 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm">프리미엄</span>
                    <Link href={buildHref({ pricing: pricing === "paid" ? undefined : "paid" })} className="inline-flex">
                      <Switch checked={pricing === "paid"} aria-label="프리미엄" />
                    </Link>
                  </div>
                  {/* 무료 체험 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm">무료 체험</span>
                    <Link href={buildHref({ trial: hasTrial ? undefined : "1" })} className="inline-flex">
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
                <div className="text-[13px] text-muted-foreground">태그가 없습니다.</div>
              </div>

              {/* 플랫폼 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="text-sm font-medium">플랫폼</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["웹 앱","크롬 익스텐션","데스크탑 앱","모바일 앱","슬랙 연동","API 전용","워드프레스 플러그인","피그마 플러그인"]
                    .map((p)=> (
                      <Link key={p} href={buildHref({ platform: p })} className={`inline-flex items-center rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1 text-xs ${
                        selectedPlatform === p ? "border-secondary bg-secondary/10 text-secondary" : "text-muted-foreground"
                      }`}>
                        {p}
                      </Link>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3 xl:col-span-4 space-y-6">
          {/* Results bar */}
          <ResultsBar
            resultsCount={filteredTools.length}
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

          {/* Category/Tag rows removed per Figma */}

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredTools.map((tool: Tool) => (
              <CatalogToolCard key={tool.id ?? tool.slug ?? tool.name} tool={tool} />
            ))}
          </div>

          {/* Load more */}
          <div className="flex items-center justify-center">
            <Button className="rounded-[8px] bg-[#F3F4F6] px-8 py-3 text-[16px] text-foreground hover:bg-[#ECEEF1]">Load More Results</Button>
          </div>
        </div>
      </div>

      {filteredTools.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed p-10 text-center">
          <p className="text-sm text-muted-foreground">No tools found. Try adjusting your filters.</p>
    </div>
      )}
    </section>
  );
}