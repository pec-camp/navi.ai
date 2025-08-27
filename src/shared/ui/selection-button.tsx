import { ArrowUpRight } from "lucide-react";

import { cn } from "./lib/utils";

interface SelectionButtonProps {
  /** 선택 상태 여부 */
  isSelected: boolean;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 선택된 상태에서 표시되는 화살표 버튼 컴포넌트
 * 모든 variant에서 ArrowUpRight 아이콘과 일관된 사이즈 사용
 */
export function SelectionButton({
  isSelected,
  className,
}: SelectionButtonProps) {
  if (!isSelected) return null;

  return (
    <div
      className={cn(
        "boder flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-secondary transition-all",
        "transition-transform group-hover:translate-x-1",
        className,
      )}
    >
      <ArrowUpRight className="h-5 w-5" />
    </div>
  );
}
