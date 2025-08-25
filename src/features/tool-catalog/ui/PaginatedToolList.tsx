"use client";

import { useEffect, useState, useTransition } from "react";

import { formatToolDetail, ToolFilters } from "@/entities/tool";
import { ViewMoreButton } from "@/shared/ui";

import { loadMoreTools } from "../actions/loadMoreTools";
import ToolCard from "./ToolCard";

interface PaginatedToolListProps {
  initialTools: ReturnType<typeof formatToolDetail>[];
  totalCount: number;
  filters?: ToolFilters;
  pageLimit?: number;
}

export default function PaginatedToolList({
  initialTools,
  totalCount,
  filters,
  pageLimit = 12,
}: PaginatedToolListProps) {
  const [tools, setTools] = useState(initialTools);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setTools(initialTools);
  }, [initialTools]);

  const handleLoadMore = () => {
    startTransition(async () => {
      const { tools: moreTools } = await loadMoreTools(
        pageLimit,
        tools.length,
        filters
      );
      setTools((prev) => [...prev, ...moreTools]);
    });
  };

  const hasMoreTools = tools.length < totalCount;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

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