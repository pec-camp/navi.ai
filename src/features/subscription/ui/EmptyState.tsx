"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/shared/ui/button";
import { SUBSCRIPTIONS_SUBSCRIBE_PATHNAME } from "@/src/shared/config/pathname";

interface EmptyStateProps {
  onOpenSubscription?: () => void;
  hasCategories?: boolean;
  subscriptionCount?: number;
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function EmptyState({
  onOpenSubscription,

  title = "아직 구독한 AI 도구가 없습니다",
  description = "관심 있는 카테고리를 구독하고 최신 AI 도구들을 빠르게 확인해보세요!",
  buttonText = "카테고리 구독하기",
}: EmptyStateProps) {
  const router = useRouter();

  const handleSubscribe = () => {
    if (onOpenSubscription) {
      onOpenSubscription();
    } else {
      router.push(SUBSCRIPTIONS_SUBSCRIBE_PATHNAME);
    }
  };

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>

        <p className="mb-6 max-w-md text-muted-foreground">{description}</p>

        <Button onClick={handleSubscribe} size="lg" className="h-11 gap-2">
          <Plus className="h-4 w-4" />
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
