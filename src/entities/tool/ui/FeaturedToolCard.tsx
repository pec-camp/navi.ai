import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card, CardContent } from "@/shared/ui/card";
import { ArrowUpRight } from "lucide-react";

interface FeaturedToolCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  className?: string;
}

export function FeaturedToolCard({
  title,
  description,
  imageUrl,
  tags,
  className,
}: FeaturedToolCardProps) {
  return (
    <Card
      className={`group relative transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-sm ${className}`}
    >
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center space-x-3">
          <Avatar className="h-[34px] w-[34px] border border-border">
            <AvatarImage src={imageUrl} alt={title} />
            <AvatarFallback className="bg-muted text-xs font-semibold text-foreground">
              {title.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold leading-[27px] text-secondary">
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-sm border border-border bg-transparent px-2 py-1 text-sm font-light text-muted-foreground-secondary shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="line-clamp-3 break-keep text-sm font-light leading-[19.6px] text-muted-foreground">
          {description}
        </p>
      </CardContent>

      {/* 호버 시 나타나는 화살표 버튼 */}
      <div className="absolute right-3 top-3 translate-y-3 translate-x-2 transform opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100">
        <button className="group/button flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white shadow-sm transition-all duration-200 hover:shadow-md">
          <ArrowUpRight className="h-5 w-5 text-secondary transition-colors duration-200 group-hover/button:text-gray-800" />
        </button>
      </div>
    </Card>
  );
}
