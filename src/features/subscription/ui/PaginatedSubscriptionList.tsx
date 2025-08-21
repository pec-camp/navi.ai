"use client";

import { useEffect, useState, useTransition } from "react";

import { getSubscriptionToolList } from "@/src/entities/subscription";
import { SubscriptionToolData } from "@/src/entities/subscription/model/SubscriptionTool.interface";
import SubscriptionToolList from "@/src/entities/subscription/ui/SubscriptionToolList";
import { SUBSCRIPTION_PAGE_LIMIT } from "@/src/shared/config/constants";
import { Button } from "@/src/shared/ui";

interface PaginatedSubscriptionListProps {
  initialTools: SubscriptionToolData[];
  userId: string;
  totalCount: number;
}

export default function PaginatedSubscriptionList({
  initialTools,
  userId,
  totalCount,
}: PaginatedSubscriptionListProps) {
  const [tools, setTools] = useState(initialTools);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setTools(initialTools);
  }, [initialTools]);

  const handleLoadMore = () => {
    startTransition(async () => {
      const { tools: moreTools } = await getSubscriptionToolList(
        userId,
        SUBSCRIPTION_PAGE_LIMIT,
        tools.length,
      );
      setTools((prev) => [...prev, ...moreTools]);
    });
  };

  const hasMoreTools = tools.length < totalCount;

  return (
    <div className="space-y-6">
      <SubscriptionToolList subscriptionToolList={tools} />

      {hasMoreTools && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isPending}
            className="px-8"
          >
            {isPending
              ? "로딩 중..."
              : `더보기 (${totalCount - tools.length}개)`}
          </Button>
        </div>
      )}
    </div>
  );
}
