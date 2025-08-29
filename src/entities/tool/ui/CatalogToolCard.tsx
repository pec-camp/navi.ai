import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { AddToCompareButton } from "@/features/compare";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card, CardContent } from "@/shared/ui/card";
import type { Tool } from "@/src/entities/tool/model/Tool.interface";

interface CatalogToolCardProps {
  tool: Tool;
}

export default function CatalogToolCard({ tool }: CatalogToolCardProps) {
  const title = tool?.name ?? "Untitled";
  const description = tool?.description ?? "";
  const imageUrl = tool?.image_url ?? tool?.logo_url ?? "/logo.webp";
  const tags: string[] = Array.isArray(tool.tags)
    ? tool.tags.map((t) => t.name).filter(Boolean)
    : [];
  const href = tool?.slug ? `/tools/${tool.slug}` : "#";

  return (
    <Card className="group relative z-10 h-full rounded-[24px] border transition-all duration-200 hover:z-20 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
      <CardContent className="flex h-full flex-col gap-4 px-5 py-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-[46px] w-[46px] border border-border">
            <AvatarImage src={imageUrl} alt={title} />
            <AvatarFallback className="bg-muted text-xs font-semibold text-foreground">
              {title.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h3 className="truncate text-[16px] font-semibold leading-[1.25] text-secondary">
              {title}
            </h3>
            {tool?.categories?.[0]?.name ? (
              <p className="truncate text-[12px] text-muted-foreground">
                {tool.categories[0].name}
              </p>
            ) : null}
          </div>
        </div>

        {tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-[4px] border border-border bg-transparent px-2 py-0.5 text-[12px] text-muted-foreground-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {description ? (
          <p className="line-clamp-3 flex-1 text-[14px] leading-[1.43] text-muted-foreground">
            {description}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        {/* Pricing text row */}
        {(tool.pricing || tool.fromPriceMonth) && (
          <div className="flex items-center justify-between text-[12px] text-secondary">
            <span>
              {tool.pricing === "free" && tool.fromPriceMonth
                ? `Free + from $${tool.fromPriceMonth}/월`
                : tool.fromPriceMonth
                  ? `From $${tool.fromPriceMonth}/월`
                  : tool.pricing === "free"
                    ? "Free"
                    : "Paid"}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-[12px] text-muted-foreground">
          <div className="flex items-center gap-3">
            {typeof tool.rating === "number" && (
              <span className="inline-flex items-center gap-1">
                <span>⭐</span>
                <span>{tool.rating.toFixed(1)}</span>
              </span>
            )}
            {tool.installs && (
              <span className="inline-flex items-center gap-1">
                <span>⬇️</span>
                <span>{tool.installs}</span>
              </span>
            )}
          </div>
          <div className="absolute right-3 top-3">
            <AddToCompareButton tool={tool} size="small" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View detail
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          {tool?.website_url ? (
            <Link
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              Visit site
            </Link>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
