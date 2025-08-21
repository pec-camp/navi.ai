interface ToolBadgeProps {
  tags?: string[];
  maxCount?: number;
}

export default function ToolBadge({ tags, maxCount = 3 }: ToolBadgeProps) {
  if (!tags) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.slice(0, maxCount).map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center rounded-sm border border-border bg-transparent px-2 py-1 text-sm font-light text-muted-foreground-secondary shadow-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
