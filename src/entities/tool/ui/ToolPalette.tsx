import type { SuggestionTool } from "@/entities/tool";
import { SearchSuggestionItem } from "@/features/search";
import { cn } from "@/shared/ui/lib/utils";

interface ToolPaletteProps {
  /** 도구 목록 */
  tools: SuggestionTool[];
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 선택된 아이템 인덱스 */
  selectedIndex?: number;
  /** 검색어 (하이라이팅용) */
  searchQuery?: string;
  /** 추가 클래스명 */
  className?: string;
  /** 최대 표시 개수 */
  maxResults?: number;
}

/**
 * 검색 결과를 팔레트 형태로 표시하는 컴포넌트
 * 서버 컴포넌트로 구현되어 데이터를 받아 표시만 합니다.
 */
export function ToolPalette({
  tools,
  isLoading = false,
  selectedIndex = -1,
  searchQuery = "",
  className,
  maxResults = 10,
}: ToolPaletteProps) {
  // 표시할 도구 목록 제한
  const displayTools = tools.slice(0, maxResults);

  // 로딩 상태
  if (isLoading) {
    return (
      <div
        className={cn("rounded-lg border bg-popover p-4 shadow-lg", className)}
        role="listbox"
        aria-label="검색 중..."
        aria-busy="true"
      >
        <div className="flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
          <span className="ml-2 text-sm text-muted-foreground">검색 중...</span>
        </div>
      </div>
    );
  }

  // 검색 결과 없음
  if (displayTools.length === 0) {
    return (
      <div
        className={cn("rounded-lg border bg-popover p-4 shadow-lg", className)}
        role="listbox"
        aria-label="검색 결과 없음"
      >
        <div className="text-center">
          <p className="text-sm text-muted-foreground">검색 결과가 없습니다</p>
          {searchQuery && (
            <p className="mt-1 text-xs text-muted-foreground">
              &quot;{searchQuery}&quot;와 일치하는 도구를 찾을 수 없습니다
            </p>
          )}
        </div>
      </div>
    );
  }

  // 검색 결과 표시
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
      <div className="max-h-[400px] overflow-y-auto p-1">
        {displayTools.map((tool, index) => (
          <SearchSuggestionItem
            key={tool.id}
            tool={tool}
            isSelected={selectedIndex === index}
            searchQuery={searchQuery}
            index={index}
          />
        ))}
      </div>

      {/* 결과 개수 표시 (옵션) */}
      {tools.length > maxResults && (
        <div className="border-t px-3 py-2">
          <p className="text-xs text-muted-foreground">
            {tools.length - maxResults}개 더 있습니다
          </p>
        </div>
      )}
    </div>
  );
}
