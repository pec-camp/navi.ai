import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/shared/ui/card";
import { ToolBadge, ToolLogo } from "@/src/shared/ui";

import { TOOLS_SLUG_PATHNAME } from "@/src/shared/config/pathname";
import { FeaturedTool } from "../model/FeaturedTool.interface";

export default function FeaturedToolCard({
  name,
  websiteLogo,
  whatIsSummary,
  extension,
  tags,
  slug,
  isFree,
  className,
}: FeaturedTool & {
  className?: string;
}) {
  return (
    <Link href={TOOLS_SLUG_PATHNAME(slug)}>
      <Card
        className={`group relative h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-sm ${className}`}
      >
        <CardContent className="flex h-full flex-col justify-between p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ToolLogo
                  websiteLogo={websiteLogo || extension?.avatar}
                  name={name}
                />
                <h3 className="text-lg font-medium leading-[27px] text-secondary">
                  {name}
                </h3>
              </div>
              {/* Free Badge */}
              {isFree && (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  Free
                </span>
              )}
            </div>

            {/* 태그 */}
            <ToolBadge tags={tags} />
          </div>

          {/* 요약 - 항상 하단에 고정 */}
          <p className="mt-4 line-clamp-3 break-keep text-sm font-light leading-[19.6px] text-muted-foreground">
            {whatIsSummary}
          </p>
        </CardContent>

        {/* 호버 시 나타나는 화살표 버튼 */}
        <div className="absolute right-3 top-3 translate-x-2 translate-y-3 transform opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="group/button flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white shadow-sm transition-all duration-200 hover:shadow-md">
            <ArrowUpRight className="h-5 w-5 text-secondary transition-colors duration-200 group-hover/button:text-gray-800" />
          </button>
        </div>
      </Card>
    </Link>
  );
}
