import SubscriptionToolCard from "./SubscriptionToolCard";

interface ToolData {
  id: number;
  name: string;
  category: string;
  categoryId: string;
  rating: number;
  description: string;
  price: string;
  date: string;
  reviewCount: number;
}

export default function SubscriptionToolList({
  subscribedTools,
}: {
  subscribedTools: ToolData[];
}) {
  return (
    <div className="space-y-4">
      {/* 도구 목록 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subscribedTools.map((tool) => (
          <SubscriptionToolCard
            key={tool.id}
            name={tool.name}
            price={tool.price}
            date={tool.date}
            category={tool.category}
            rating={tool.rating}
            reviewCount={tool.reviewCount}
            description={tool.description}
          />
        ))}
      </div>
    </div>
  );
}
