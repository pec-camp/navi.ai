"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/ui/lib/utils";

interface Tool {
  id: string;
  name: string;
  logo: string;
}

interface SimpleToolSearchProps {
  selectedTools: string[];
  onToolAdd: (toolName: string) => void;
  onToolRemove: (toolName: string) => void;
  className?: string;
}

// 심플한 도구 데이터
const TOOLS_DATA: Tool[] = [
  { id: "1", name: "ChatGPT", logo: "C" },
  { id: "2", name: "Claude", logo: "CL" },
  { id: "3", name: "Midjourney", logo: "MJ" },
  { id: "4", name: "Stable Diffusion", logo: "SD" },
  { id: "5", name: "DALL-E", logo: "D" },
  { id: "6", name: "Canva", logo: "CV" },
  { id: "7", name: "Figma", logo: "F" },
  { id: "8", name: "Notion", logo: "N" },
  { id: "9", name: "GitHub Copilot", logo: "GH" },
  { id: "10", name: "Perplexity", logo: "P" },
  { id: "11", name: "Cursor", logo: "CS" },
  { id: "12", name: "V0", logo: "V0" },
];

export default function SimpleToolSearch({
  selectedTools,
  onToolAdd,
  onToolRemove,
  className,
}: SimpleToolSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 도구 필터링
  useEffect(() => {
    const available = TOOLS_DATA.filter(
      (tool) => !selectedTools.includes(tool.name)
    );

    if (!searchQuery.trim()) {
      setFilteredTools(available.slice(0, 8));
      return;
    }

    const filtered = available.filter((tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredTools(filtered);
    setHighlightedIndex(-1);
  }, [searchQuery, selectedTools]);

  // 외부 클릭 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleToolSelect = (tool: Tool) => {
    onToolAdd(tool.name);
    setSearchQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredTools.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredTools.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredTools.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleToolSelect(filteredTools[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <label className="text-base font-medium text-foreground">
        함께 사용한 도구 (선택사항)
      </label>

      {/* 검색 입력 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          placeholder="도구 검색..."
          className="pl-10"
        />

        {/* 드롭다운 */}
        {isOpen && filteredTools.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute top-full z-50 mt-1 w-full rounded-lg border border-border bg-popover p-1 shadow-md"
          >
            {filteredTools.map((tool, index) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => handleToolSelect(tool)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors",
                  highlightedIndex === index
                    ? "bg-accent"
                    : "hover:bg-accent/50"
                )}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                  <span className="text-xs font-bold text-primary">
                    {tool.logo}
                  </span>
                </div>
                <span className="text-sm font-medium">{tool.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 선택된 도구 태그 */}
      {selectedTools.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTools.map((toolName) => {
            const tool = TOOLS_DATA.find((t) => t.name === toolName);
            return (
              <div
                key={toolName}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5"
              >
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20">
                  <span className="text-[10px] font-bold text-primary">
                    {tool?.logo || toolName[0]}
                  </span>
                </div>
                <span className="text-sm font-medium">{toolName}</span>
                <button
                  type="button"
                  onClick={() => onToolRemove(toolName)}
                  className="ml-1 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}