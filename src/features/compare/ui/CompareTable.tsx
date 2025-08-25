"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Check } from "lucide-react";

import { formatToolDetail } from "@/entities/tool";
import { ToolLogo } from "@/shared/ui/ToolLogo";
import { Button } from "@/shared/ui/button";
import { createClient } from "@/shared/utils/supabase/client";

export default function CompareTable() {
  const searchParams = useSearchParams();
  const [tools, setTools] = useState<ReturnType<typeof formatToolDetail>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      const toolSlugs = searchParams.get("tools")?.split(",") || [];
      
      if (toolSlugs.length === 0) {
        setLoading(false);
        return;
      }

      const supabase = createClient();
      
      const { data, error } = await supabase
        .from("ai_tools")
        .select("*")
        .in("slug", toolSlugs);

      if (error) {
        console.error("Error fetching tools:", error);
        setLoading(false);
        return;
      }

      // Format the data
      const formattedTools = data?.map(tool => formatToolDetail({
        ...tool,
        rating: 0,
        review_count: 0,
      })) || [];
      
      setTools(formattedTools);
      setLoading(false);
    };

    fetchTools();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">비교 데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-muted-foreground">비교할 도구가 없습니다</p>
        <Button asChild>
          <Link href="/tools">
            <ArrowLeft className="mr-2 h-4 w-4" />
            도구 둘러보기
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border shadow-lg bg-card">
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr className="bg-muted/30">
            <th className="sticky left-0 z-10 bg-muted/30 border-r border-b border-border p-4 text-left w-[180px]">
              <span className="text-base font-bold text-foreground">비교 항목</span>
            </th>
            {tools.map((tool) => (
              <th key={tool.id} className="border-b border-r border-border p-4">
                <div className="flex flex-col items-center space-y-3">
                  <ToolLogo
                    websiteLogo={tool.websiteLogo || ""}
                    name={tool.name}
                    size="lg"
                  />
                  <h3 className="font-bold text-base text-foreground text-center px-2 break-words">{tool.name}</h3>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* 가격 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="sticky left-0 z-10 bg-muted/50 border-r border-b border-border p-4 w-[180px]">
              <span className="text-sm font-semibold text-foreground">가격</span>
            </td>
            {tools.map((tool) => (
              <td key={tool.id} className="border-b border-r border-border p-4 text-center">
                <div className="flex justify-center">
                  {tool.isFree ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                      무료
                    </span>
                  ) : (
                    <div className="text-base">
                      <span className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground">
                        유료
                      </span>
                      {tool.pricing?.fromPriceMonth && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          ${tool.pricing.fromPriceMonth}/월부터
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </td>
            ))}
          </tr>

          {/* 평점 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="sticky left-0 z-10 bg-muted/50 border-r border-b border-border p-4 w-[180px]">
              <span className="text-sm font-semibold text-foreground">평점</span>
            </td>
            {tools.map((tool) => (
              <td key={tool.id} className="border-b border-r border-border p-4 text-center">
                {tool.rating ? (
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{tool.rating.toFixed(1)}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">정보 없음</span>
                )}
              </td>
            ))}
          </tr>

          {/* 사용자 수 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="sticky left-0 z-10 bg-muted/50 border-r border-b border-border p-4 w-[180px]">
              <span className="text-sm font-semibold text-foreground">사용자 수</span>
            </td>
            {tools.map((tool) => (
              <td key={tool.id} className="border-b border-r border-border p-4 text-center">
                <div className="text-base">
                  {tool.extension?.userNumRaw ? (
                    <div>
                      <p className="font-medium">{tool.extension.userNum}</p>
                      <p className="text-xs text-muted-foreground">활성 사용자</p>
                    </div>
                  ) : tool.monthlyUsers?.formatted ? (
                    <div>
                      <p className="font-medium">{tool.monthlyUsers.formatted}</p>
                      <p className="text-xs text-muted-foreground">월간 방문</p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">정보 없음</span>
                  )}
                </div>
              </td>
            ))}
          </tr>

          {/* 카테고리/태그 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="sticky left-0 z-10 bg-muted/50 border-r border-b border-border p-4 w-[180px]">
              <span className="text-sm font-semibold text-foreground">카테고리</span>
            </td>
            {tools.map((tool) => (
              <td key={tool.id} className="border-b border-r border-border p-4">
                <div className="flex flex-wrap gap-1 justify-center">
                  {tool.tags && tool.tags.length > 0 ? (
                    tool.tags.slice(0, 3).map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-md border border-border bg-muted px-3 py-1.5 text-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">정보 없음</span>
                  )}
                </div>
              </td>
            ))}
          </tr>

          {/* 주요 기능 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="sticky left-0 z-10 bg-muted/50 border-r border-b border-border p-4 w-[180px]">
              <span className="text-sm font-semibold text-foreground">주요 기능</span>
            </td>
            {tools.map((tool) => (
              <td key={tool.id} className="border-b border-r border-border p-4">
                {tool.content?.core_features && tool.content.core_features.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {tool.content.core_features.slice(0, 4).map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-muted-foreground text-sm">정보 없음</span>
                )}
              </td>
            ))}
          </tr>

          {/* 플랫폼 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="sticky left-0 z-10 bg-muted/50 border-r border-b border-border p-4 w-[180px]">
              <span className="text-sm font-semibold text-foreground">플랫폼</span>
            </td>
            {tools.map((tool) => (
              <td key={tool.id} className="border-b border-r border-border p-4 text-center">
                <div className="flex justify-center gap-2">
                  {tool.website && (
                    <span className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm font-medium">
                      웹
                    </span>
                  )}
                  {tool.extension && (
                    <span className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm font-medium">
                      확장 프로그램
                    </span>
                  )}
                  {!tool.website && !tool.extension && (
                    <span className="text-muted-foreground text-sm">정보 없음</span>
                  )}
                </div>
              </td>
            ))}
          </tr>

          {/* 설명 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="sticky left-0 z-10 bg-muted/50 border-r border-b border-border p-4 w-[180px]">
              <span className="text-sm font-semibold text-foreground">설명</span>
            </td>
            {tools.map((tool) => (
              <td key={tool.id} className="border-b border-r border-border p-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {tool.whatIsSummary || tool.description || "설명이 없습니다"}
                </p>
              </td>
            ))}
          </tr>

          {/* 웹사이트 링크 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="sticky left-0 z-10 bg-muted/50 border-r border-border p-4 w-[180px]">
              <span className="text-sm font-semibold text-foreground">링크</span>
            </td>
            {tools.map((tool) => (
              <td key={tool.id} className="border-r border-border p-4 text-center">
                <div className="flex justify-center gap-2">
                  {tool.website && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={tool.website} target="_blank" rel="noopener noreferrer">
                        웹사이트 방문
                      </Link>
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/tools/${tool.slug}`}>
                      상세 정보
                    </Link>
                  </Button>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}