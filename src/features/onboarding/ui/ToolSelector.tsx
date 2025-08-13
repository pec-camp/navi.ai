"use client";

import { Check, X } from "lucide-react";
import * as React from "react";

import { OnboardingTool } from "@/features/onboarding/model/onboarding.types";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/ui/lib/utils";

interface ToolSelectorProps {
  tools: OnboardingTool[];
  selectedTools: string[]; // selected tool names
  onChange: (names: string[]) => void;
}

export default function ToolSelector({ tools, selectedTools, onChange }: ToolSelectorProps) {
  const [query, setQuery] = React.useState<string>("");

  // 항상 전체 목록을 노출합니다. 입력은 새 도구 추가용으로만 사용합니다.
  const displayTools = tools;

  const toggleByName = (name: string) => {
    if (selectedTools.includes(name)) {
      onChange(selectedTools.filter((v) => v !== name));
      return;
    }
    onChange([...selectedTools, name]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newName = query.trim();

      if (selectedTools.includes(newName)) return;

      onChange([...selectedTools, newName]);
      setQuery("");
    };
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-foreground">사용 중인 AI 도구를 입력하거나 선택하세요</h2>
      <p className="text-sm text-muted-foreground">엔터를 눌러 새 도구를 추가할 수 있어요.</p>
      <Input
        placeholder="직접 입력하기"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mt-2"
      />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {displayTools.map((tool: OnboardingTool) => {
          const selected = selectedTools.includes(tool.name);
          return (
            <button
              key={tool.key}
              type="button"
              onClick={() => toggleByName(tool.name)}
              aria-pressed={selected}
              className={cn(
                "relative rounded-xl border border-transparent p-4 text-left shadow-sm transition",
                selected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/40 shadow-md scale-[1.01]"
                  : "hover:bg-accent",
              )}
            >
              {selected ? (
                <Check className="absolute right-3 top-3 h-4 w-4 text-primary" />
              ) : null}
              <div className="text-base font-medium text-foreground">{tool.name}</div>
            </button>
          );
        })}
      </div>
      {selectedTools.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedTools.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm text-foreground"
            >
              <span className="truncate">{name}</span>
              <button
                type="button"
                onClick={() => onChange(selectedTools.filter((v) => v !== name))}
                aria-label={`${name} 제거`}
                className="ml-1 grid h-5 w-5 place-items-center rounded-full text-muted-foreground hover:bg-muted"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
