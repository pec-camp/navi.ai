import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/ui/lib/utils";

interface JobRoleSelectorProps {
  value: string | null;
  onChange: (value: string) => void;
}

const ROLES: { key: string; label: string; description: string }[] = [
  { key: "pm", label: "PM/PO", description: "제품 기획 및 우선순위 설정" },
  { key: "designer", label: "디자이너", description: "UI/UX 및 브랜딩" },
  { key: "engineer-fe", label: "프론트엔드 개발자", description: "웹/앱 UI 개발" },
  { key: "engineer-be", label: "백엔드 개발자", description: "API/DB 및 서버 개발" },
  { key: "engineer-ai", label: "AI 엔지니어", description: "LLM/모델/파이프라인" },
  { key: "data-analyst", label: "데이터 분석가", description: "분석/리포팅" },
  { key: "data-scientist", label: "데이터 사이언티스트", description: "모델링/실험" },
  { key: "marketer", label: "마케터", description: "그로스/콘텐츠 마케팅" },
  { key: "researcher", label: "리서처", description: "사용자/시장 조사" },
  { key: "ops", label: "운영", description: "CS/프로세스 운영" },
];

export default function JobRoleSelector({ value, onChange }: JobRoleSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold text-foreground">직군/역할을 선택해 주세요</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ROLES.map((role) => {
          const selected = value === role.key;
          return (
            <button
              key={role.key}
              type="button"
              onClick={() => onChange(role.key)}
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
              <div className="text-base font-medium text-foreground">
                {role.label}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {role.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
