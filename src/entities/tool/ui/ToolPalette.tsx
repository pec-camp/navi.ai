import Link from "next/link";
import type { ReactNode } from "react";

import type { SuggestionTool } from "@/entities/tool";
import { SelectionButton, SparklesText } from "@/shared/ui";
import { cn } from "@/shared/ui/lib/utils";

interface ToolPaletteRootProps {
  /** 자식 컴포넌트 */
  children: ReactNode;
  /** 추가 클래스명 */
  className?: string;
  /** 마우스 떠날 때 콜백 */
  onMouseLeave?: () => void;
}

interface ToolPaletteHeaderProps {
  /** 검색어 */
  searchQuery: string;
  /** 선택 상태 여부 */
  isSelected?: boolean;
  /** 마우스 진입 시 콜백 */
  onMouseEnter?: () => void;
}

interface ToolPaletteResultsProps {
  /** 도구 목록 */
  tools: SuggestionTool[];
  /** 각 도구 아이템을 렌더링하는 함수 */
  children: (tool: SuggestionTool, index: number) => ReactNode;
  /** 아이템 마우스 진입 시 콜백 */
  onItemMouseEnter?: (index: number) => void;
}

/**
 * 팔레트 루트 컴포넌트
 */
function ToolPaletteRoot({
  children,
  className,
  onMouseLeave,
}: ToolPaletteRootProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-popover shadow-lg",
        className,
      )}
      role="listbox"
      aria-label="검색 결과"
      aria-expanded="true"
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

/**
 * 팔레트 헤더 컴포넌트
 */
function ToolPaletteHeader({
  searchQuery,
  isSelected = false,
  onMouseEnter,
}: ToolPaletteHeaderProps) {
  if (!searchQuery) return null;

  // 검색 결과 페이지 URL
  const searchResultsUrl = `/tools?q=${encodeURIComponent(searchQuery)}`;

  return (
    <div className="px-2 py-2" onMouseEnter={onMouseEnter}>
      {/* 메인 헤더 - 검색어와 화살표 */}
      <Link
        href={searchResultsUrl}
        className={cn(
          "hover:bg-muted/50 group flex min-h-12 items-center justify-between rounded-lg px-2 py-2 transition-colors",
          isSelected && "bg-accent",
        )}
      >
        <div className="flex-1">
          <span className="text-base text-muted-foreground">Show me </span>
          <SparklesText
            className="inline text-base font-medium text-primary"
            sparklesCount={2}
          >
            {searchQuery}
          </SparklesText>
          <span className="text-base text-muted-foreground"> AI tools</span>
        </div>
        {/* 선택된 아이템에만 버튼 표시 */}
        <SelectionButton isSelected={isSelected} />
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
  onItemMouseEnter,
}: ToolPaletteResultsProps) {
  return (
    <div className="bg-muted/30 relative max-h-[400px] overflow-y-auto border-t">
      {/* 검색 결과 갯수 */}
      {tools && tools.length > 0 && (
        <div className="sticky top-0 z-10 mb-2 flex items-center bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">
          <span className="mr-2">🔧</span>
          AI TOOLS ({tools.length})
        </div>
      )}

      {/* 도구 목록 */}
      {tools.map((tool, index) => (
        <div key={tool.id} onMouseEnter={() => onItemMouseEnter?.(index)}>
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
