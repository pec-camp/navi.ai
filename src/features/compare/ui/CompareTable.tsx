"use client";

import { ArrowLeft, Check, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  AiToolDetail,
  formatToolDetail,
} from "@/entities/tool/model/formatToolData";
import { Button } from "@/shared/ui/button";
import { ToolLogo } from "@/shared/ui/ToolLogo";
import { createClient } from "@/shared/utils/supabase/client";

interface CompareTableProps {
  tools?: string;
}

/**
 * AI 도구 비교 테이블 컴포넌트
 *
 * @note 리팩토링: useSearchParams() 대신 props로 searchParams 전달받도록 변경
 * @reason useSearchParams()가 Next.js 15 정적 생성 시 CSR bailout 발생시킴
 */
export default function CompareTable({ tools: toolsParam }: CompareTableProps) {
  const [tools, setTools] = useState<AiToolDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      const toolSlugs = toolsParam?.split(",") || [];

      if (toolSlugs.length === 0) {
        setLoading(false);
        return;
      }

      const supabase = createClient();

      // Fetch tools data
      const { data: toolsData, error: toolsError } = await supabase
        .from("ai_tools")
        .select("*")
        .in("slug", toolSlugs);

      if (toolsError) {
        console.error("Error fetching tools:", toolsError);
        setLoading(false);
        return;
      }

      // Format the data and get ratings
      const formattedTools: AiToolDetail[] = await Promise.all(
        (toolsData || []).map(async (tool) => {
          // Fetch average rating for each tool
          const { data } = await supabase
            .from("reviews")
            .select("rating")
            .eq("ai_tool_id", tool.id);

          return formatToolDetail({ ...tool, ...data });
        }),
      );

      setTools(formattedTools);
      setLoading(false);
    };

    fetchTools();
  }, [toolsParam]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-muted-foreground">
          비교 데이터를 불러오는 중...
        </div>
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-4">
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
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-card shadow-lg">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-muted/30">
            <th className="bg-muted/30 sticky left-0 z-10 w-[180px] border-b border-r border-border p-4 text-left">
              <span className="text-base font-bold text-foreground">
                비교 항목
              </span>
            </th>
            {tools.map((tool) => (
              <th key={tool.id} className="border-b border-r border-border p-4">
                <div className="flex flex-col items-center space-y-3">
                  <ToolLogo
                    websiteLogo={tool.websiteLogo || ""}
                    name={tool.name || ""}
                    size="lg"
                  />
                  <h3 className="break-words px-2 text-center text-base font-bold text-foreground">
                    {tool.name}
                  </h3>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* 가격 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="bg-muted/50 sticky left-0 z-10 w-[180px] border-b border-r border-border p-4">
              <span className="text-sm font-semibold text-foreground">
                가격
              </span>
            </td>
            {tools.map((tool) => (
              <td
                key={tool.id}
                className="border-b border-r border-border p-4 text-center"
              >
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
                    </div>
                  )}
                </div>
              </td>
            ))}
          </tr>

          {/* 평점 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="bg-muted/50 sticky left-0 z-10 w-[180px] border-b border-r border-border p-4">
              <span className="text-sm font-semibold text-foreground">
                평점
              </span>
            </td>
            {tools.map((tool) => (
              <td
                key={tool.id}
                className="border-b border-r border-border p-4 text-center"
              >
                {tool.avgRating ? (
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-medium">
                      {tool.avgRating.toFixed(1)}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    리뷰 없음
                  </span>
                )}
              </td>
            ))}
          </tr>

          {/* 사용자 수 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="bg-muted/50 sticky left-0 z-10 w-[180px] border-b border-r border-border p-4">
              <span className="text-sm font-semibold text-foreground">
                사용자 수
              </span>
            </td>
            {tools.map((tool) => (
              <td
                key={tool.id}
                className="border-b border-r border-border p-4 text-center"
              >
                <div className="text-base">
                  {tool.extension?.userNumRaw ? (
                    <div>
                      <p className="font-medium">{tool.extension.userNum}</p>
                      <p className="text-xs text-muted-foreground">
                        활성 사용자
                      </p>
                    </div>
                  ) : tool.monthlyUsers?.formatted ? (
                    <div>
                      <p className="font-medium">
                        {tool.monthlyUsers.formatted}
                      </p>
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
            <td className="bg-muted/50 sticky left-0 z-10 w-[180px] border-b border-r border-border p-4">
              <span className="text-sm font-semibold text-foreground">
                카테고리
              </span>
            </td>
            {tools.map((tool) => (
              <td key={tool.id} className="border-b border-r border-border p-4">
                <div className="flex flex-wrap justify-center gap-1">
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
                    <span className="text-sm text-muted-foreground">
                      정보 없음
                    </span>
                  )}
                </div>
              </td>
            ))}
          </tr>

          {/* 주요 기능 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="bg-muted/50 sticky left-0 z-10 w-[180px] border-b border-r border-border p-4">
              <span className="text-sm font-semibold text-foreground">
                주요 기능
              </span>
            </td>
            {tools.map((tool) => (
              <td key={tool.id} className="border-b border-r border-border p-4">
                {tool.content?.core_features &&
                tool.content.core_features.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {tool.content.core_features
                      .slice(0, 4)
                      .map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    정보 없음
                  </span>
                )}
              </td>
            ))}
          </tr>

          {/* 플랫폼 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="bg-muted/50 sticky left-0 z-10 w-[180px] border-b border-r border-border p-4">
              <span className="text-sm font-semibold text-foreground">
                플랫폼
              </span>
            </td>
            {tools.map((tool) => (
              <td
                key={tool.id}
                className="border-b border-r border-border p-4 text-center"
              >
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
                    <span className="text-sm text-muted-foreground">
                      정보 없음
                    </span>
                  )}
                </div>
              </td>
            ))}
          </tr>

          {/* 설명 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="bg-muted/50 sticky left-0 z-10 w-[180px] border-b border-r border-border p-4">
              <span className="text-sm font-semibold text-foreground">
                설명
              </span>
            </td>
            {tools.map((tool) => (
              <td key={tool.id} className="border-b border-r border-border p-4">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {tool.whatIsSummary || tool.description || "설명이 없습니다"}
                </p>
              </td>
            ))}
          </tr>

          {/* 웹사이트 링크 */}
          <tr className="hover:bg-muted/10 transition-colors">
            <td className="bg-muted/50 sticky left-0 z-10 w-[180px] border-r border-border p-4">
              <span className="text-sm font-semibold text-foreground">
                링크
              </span>
            </td>
            {tools.map((tool) => (
              <td
                key={tool.id}
                className="border-r border-border p-4 text-center"
              >
                <div className="flex justify-center gap-2">
                  {tool.website && (
                    <Button size="sm" variant="outline" asChild>
                      <Link
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        웹사이트 방문
                      </Link>
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/tools/${tool.slug}`}>상세 정보</Link>
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
