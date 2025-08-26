"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { SuggestionTool } from "@/entities/tool";
import { TOOLS_SLUG_PATHNAME } from "@/shared/config/pathname";
import { SelectionButton } from "@/shared/ui";
import { cn } from "@/src/shared/ui/lib/utils";

interface SearchSuggestionItemProps {
  /** 도구 정보 */
  tool: SuggestionTool;
  /** 선택 상태 여부 */
  isSelected?: boolean;
  /** 검색어 (하이라이팅용) */
  searchQuery?: string;
  /** 아이템 인덱스 (하이라이팅 ID 구분용) */
  index?: number;
  /** 마우스 진입 시 콜백 */
  onMouseEnter?: () => void;
}

/**
 * 검색 자동완성 제안 아이템 컴포넌트
 * 도구 정보를 표시하고 검색어를 하이라이트합니다.
 */
export function SearchSuggestionItem({
  tool,
  isSelected = false,
  index = 0,
  onMouseEnter,
}: SearchSuggestionItemProps) {
  const nameRef = useRef<HTMLSpanElement>(null);
  const itemRef = useRef<HTMLAnchorElement>(null);

  // 선택된 아이템을 뷰포트에 스크롤
  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [isSelected]);

  return (
    <Link
      ref={itemRef}
      href={TOOLS_SLUG_PATHNAME(tool.slug)}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5",
        "transition-all duration-200",
        "hover:bg-muted/60",
        isSelected && "bg-accent",
        "focus:ring-primary/30 focus:outline-none focus:ring-2",
        "group",
      )}
      aria-selected={isSelected}
      role="option"
      onMouseEnter={onMouseEnter}
    >
      {/* 도구 로고 */}
      <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-md bg-background">
        {tool.websiteLogo ? (
          <Image
            src={tool.websiteLogo}
            alt={`${tool.name} logo`}
            fill
            className="object-contain p-0.5"
            sizes="32px"
            priority={index < 3} // 상위 3개는 우선 로딩
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-xs font-medium text-muted-foreground">
              {tool.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* 도구 정보 */}
      <div className="flex-1 text-left">
        <span
          ref={nameRef}
          className={cn(
            "block text-sm font-medium",
            isSelected ? "text-foreground" : "text-foreground/90",
            "group-hover:text-foreground",
          )}
        >
          {tool.name}
        </span>
      </div>

      {/* 선택된 아이템에만 버튼 표시 */}
      <SelectionButton isSelected={isSelected} />
    </Link>
  );
}
