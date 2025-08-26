"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { ToolPalette } from "@/entities/tool";
import { TOOLS_SLUG_PATHNAME } from "@/shared/config/pathname";
import { useClickOutside, useKeyboardNavigation } from "@/shared/hooks";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/ui/lib/utils";
import { SearchSuggestionItem } from "@/src/entities/tool/ui/SearchSuggestionItem";

import { useSearch } from "../hooks";

interface MainSearchBarProps {
  placeholder?: string;
  className?: string;
}

export function MainSearchBar({
  placeholder = "Search AI tools..",
  className,
}: MainSearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // 팔레트 표시 상태
  const [showPalette, setShowPalette] = useState(false);

  // 검색 훅 사용
  const { searchQuery, setSearchQuery, isLoading, results, error } = useSearch({
    debounceMs: 300,
    minQueryLength: 1,
    maxResults: 10,
  });

  // 키보드 네비게이션 훅
  const { selectedIndex, setSelectedIndex, resetSelectedIndex } = useKeyboardNavigation({
    itemCount: results.length,
    onSelect: (index) => {
      // Enter 키로 선택 시 해당 도구 페이지로 이동
      const selectedTool = results[index];
      if (selectedTool) {
        router.push(TOOLS_SLUG_PATHNAME(selectedTool.slug));
        handleClose();
      }
    },
    onEscape: () => {
      // ESC 키로 팔레트 닫기
      handleClose();
    },
    isEnabled: showPalette && results.length > 0,
    loop: true,
  });

  // 팔레트 닫기 함수
  const handleClose = useCallback(() => {
    setShowPalette(false);
    resetSelectedIndex();
  }, [resetSelectedIndex]);

  // 외부 클릭 감지
  const { ref: formRef } = useClickOutside<HTMLFormElement>({
    onClickOutside: handleClose,
    isEnabled: showPalette,
  });


  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Enter 키로 폼 제출 시, 선택된 항목이 있으면 해당 페이지로 이동
    if (selectedIndex >= 0 && results[selectedIndex]) {
      router.push(TOOLS_SLUG_PATHNAME(results[selectedIndex].slug));
      handleClose();
    } else if (results.length > 0) {
      // 선택된 항목이 없으면 첫 번째 결과로 이동
      router.push(TOOLS_SLUG_PATHNAME(results[0].slug));
      handleClose();
    }
  };

  // 입력 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // 입력이 있으면 팔레트 표시
    if (value.trim()) {
      setShowPalette(true);
      resetSelectedIndex();
    } else {
      setShowPalette(false);
    }
  };


  // 결과가 변경되면 선택 인덱스 초기화
  useEffect(() => {
    resetSelectedIndex();
  }, [results, resetSelectedIndex]);

  return (
    <div className={cn("relative w-full max-w-[672px]", className)}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex h-14 w-full items-center rounded-[28px] border border-border bg-background shadow-sm transition-colors focus-within:border-secondary"
      >
        <div className="flex h-5 w-11 items-center justify-start pl-6">
          <Search
            className="h-5 w-5 text-muted-foreground"
            strokeWidth={1.67}
          />
        </div>

        <div className="flex flex-1 items-center px-4">
          <Input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={placeholder}
            name="search"
            className="h-12 border-0 bg-transparent p-0 font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
            autoComplete="off"
            aria-label="Search AI tools"
            aria-autocomplete="list"
            aria-expanded={showPalette}
            aria-controls="search-results"
            role="combobox"
          />
        </div>

        <div className="pr-2">
          <Button
            type="submit"
            className="hover:bg-primary/90 h-11 rounded-full bg-secondary px-6 py-2.5 text-base font-normal text-white"
            disabled={!searchQuery.trim()}
          >
            Search
          </Button>
        </div>
      </form>

      {/* 검색 결과 팔레트 */}
      {showPalette && (searchQuery.trim() || isLoading) && (
        <div
          id="search-results"
          className="absolute left-0 right-0 top-full z-50 mt-2"
        >
          <ToolPalette.Root onMouseLeave={resetSelectedIndex}>
            <ToolPalette.Header searchQuery={searchQuery} />
            <ToolPalette.Results 
              tools={results}
              onItemMouseEnter={setSelectedIndex}
            >
              {(tool, index) => (
                <SearchSuggestionItem
                  key={tool.id}
                  tool={tool}
                  index={index}
                  isSelected={selectedIndex === index}
                  searchQuery={searchQuery}
                />
              )}
            </ToolPalette.Results>
          </ToolPalette.Root>

          {/* 에러 표시 */}
          {error && !isLoading && (
            <div className="border-destructive/50 bg-destructive/10 mt-2 rounded-lg border p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
