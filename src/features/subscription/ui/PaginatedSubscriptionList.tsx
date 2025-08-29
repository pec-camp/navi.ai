"use client";

import { useEffect, useState, useTransition } from "react";

import { SubscriptionTool } from "@/src/entities/tool/model/SubscriptionTool.interface";
import SubscriptionToolList from "@/src/entities/tool/ui/SubscriptionToolList";
import { loadSubscriptionToolList } from "@/src/features/subscription/action";
import { SUBSCRIPTION_PAGE_LIMIT } from "@/src/shared/config/constants";
import { ViewMoreButton } from "@/src/shared/ui";

interface PaginatedSubscriptionListProps {
  initialTools: SubscriptionTool[];
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
      const { tools: moreTools } = await loadSubscriptionToolList(
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
      {/* 도구 목록 */}
      <SubscriptionToolList subscriptionToolList={tools} />

      {hasMoreTools && (
        <div className="flex justify-center pt-4">
          <ViewMoreButton
            isPending={isPending}
            handleLoadMore={handleLoadMore}
          />
        </div>
      )}
    </div>
  );
}
