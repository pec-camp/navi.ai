import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import type { SuggestionTool } from "@/entities/tool";
import { cn } from "@/shared/ui/lib/utils";

interface ToolPaletteRootProps {
  /** 자식 컴포넌트 */
  children: ReactNode;
  /** 추가 클래스명 */
  className?: string;
}

interface ToolPaletteHeaderProps {
  /** 검색어 */
  searchQuery: string;
}

interface ToolPaletteResultsProps {
  /** 도구 목록 */
  tools: SuggestionTool[];
  /** 각 도구 아이템을 렌더링하는 함수 */
  children: (tool: SuggestionTool, index: number) => ReactNode;
}

/**
 * 팔레트 루트 컴포넌트
 */
function ToolPaletteRoot({ children, className }: ToolPaletteRootProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-popover shadow-lg",
        className,
      )}
      role="listbox"
      aria-label="검색 결과"
      aria-expanded="true"
    >
      {children}
    </div>
  );
}

/**
 * 팔레트 헤더 컴포넌트
 */
function ToolPaletteHeader({ searchQuery }: ToolPaletteHeaderProps) {
  if (!searchQuery) return null;

  // 검색 결과 페이지 URL
  const searchResultsUrl = `/tools?q=${encodeURIComponent(searchQuery)}`;

  return (
    <div className="bg-muted/30 border-b px-4 py-3">
      {/* 메인 헤더 - 검색어와 화살표 */}
      <Link
        href={searchResultsUrl}
        className="hover:bg-muted/50 group flex items-center justify-between rounded-lg px-2 py-2 transition-colors"
      >
        <div className="flex-1">
          <span className="text-sm text-muted-foreground">Search for </span>
          <span className="font-medium text-foreground">{searchQuery}</span>
          <span className="text-sm text-muted-foreground"> using AI</span>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1">
          <ArrowRight className="h-4 w-4" />
        </div>
      </Link>
    </div>
  );
}

/**
 * 팔레트 결과 목록 컴포넌트
 */
function ToolPaletteResults({
  tools,
  children,
}: ToolPaletteResultsProps) {
  return (
    <div className="max-h-[400px] overflow-y-auto p-1">
      {/* 검색 결과 갯수 */}
      {tools && tools.length > 0 && (
        <div className="mt-2 flex items-center text-xs font-medium text-muted-foreground">
          <span className="mr-2">🔧</span>
          AI TOOLS ({tools.length})
        </div>
      )}

      {/* 도구 목록 */}
      {tools.map((tool, index) => (
        <div key={tool.id}>
          {children(tool, index)}
        </div>
      ))}
    </div>
  );
}

/**
 * 컴파운드 컴포넌트 패턴의 ToolPalette
 */
export const ToolPalette = {
  Root: ToolPaletteRoot,
  Header: ToolPaletteHeader,
  Results: ToolPaletteResults,
};
