"use client";

import Link from "next/link";
import React from "react";

import { Checkbox } from "@/shared/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

type SortType = "name" | "latest" | "rating";

interface BaseParams {
  q?: string;
  category?: string;
  tag?: string;
  pricing?: "free" | "paid" | "";
  tab?: "all" | "popular" | "new" | "trending";
  sort?: SortType;
  withImages?: boolean;
  minRating?: number;
  platform?: string;
}

function buildHref(base: BaseParams, updates: Record<string, string | undefined>) {
  const qp = new URLSearchParams();
  if (base.q) qp.set("q", base.q);
  if (base.category) qp.set("category", base.category);
  if (base.tag) qp.set("tag", base.tag);
  if (base.pricing) qp.set("pricing", base.pricing);
  if (base.tab) qp.set("tab", base.tab);
  if (base.sort) qp.set("sort", base.sort);
  if (base.withImages) qp.set("withImages", "1");
  if (base.minRating && base.minRating > 0) qp.set("minRating", String(base.minRating));
  if (base.platform) qp.set("platform", base.platform);
  for (const [k, v] of Object.entries(updates)) {
    if (!v) qp.delete(k);
    else qp.set(k, v);
  }
  const s = qp.toString();
  return `/tools${s ? `?${s}` : ""}`;
}

interface ResultsBarProps {
  resultsCount: number;
  baseParams: BaseParams;
}

export function ResultsBar({ resultsCount, baseParams }: ResultsBarProps) {
  return (
    <div className="z-20 flex items-center justify-between border-b border-[#F3F4F6] bg-background py-4">
      <div className="flex items-center gap-3">
        <div className="text-[14px] font-medium text-foreground">{resultsCount.toLocaleString()} results</div>
        <div className="flex items-center gap-2">
          <Link href={buildHref(baseParams, { withImages: baseParams.withImages ? undefined : "1" })} className="inline-flex items-center gap-2 text-[14px] text-[#374151]">
            <Checkbox checked={!!baseParams.withImages} aria-label="With images" />
            <span>With images</span>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* 평점 필터 Select */}
        <Select
          value={String(baseParams.minRating ?? 0)}
          onValueChange={(val) => {
            window.location.href = buildHref(baseParams, { minRating: val });
          }}
        >
          <SelectTrigger className="w-[160px] rounded-[8px] border border-[#E5E7EB] bg-white py-[9px] text-[14px]">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">평점</span>
            </div>
            <SelectValue aria-label="평점" />
          </SelectTrigger>
          <SelectContent>
            {[0, 3, 4, 4.5].map((r) => (
              <SelectItem key={r} value={String(r)}>
                <span className="inline-flex items-center gap-1">
                  <span className="text-[#F7900A]">⭐</span> {r.toFixed(1)}+
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 정렬 Select */}
        <Select
          value={baseParams.sort ?? "name"}
          onValueChange={(val) => {
            window.location.href = buildHref(baseParams, { sort: val });
          }}
        >
          <SelectTrigger className="w-[160px] rounded-[8px] border border-[#E5E7EB] bg-white py-[9px] text-[14px]">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">정렬</span>
            </div>
            <SelectValue aria-label="정렬" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="rating">별점순</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}


