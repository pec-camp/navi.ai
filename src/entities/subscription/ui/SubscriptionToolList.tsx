import { SubscriptionTool } from "../model/SubscriptionTool.interface";
import SubscriptionToolCard from "./SubscriptionToolCard";

export default function SubscriptionToolList({
  subscriptionToolList,
}: {
  subscriptionToolList: SubscriptionTool[];
}) {
  return (
    <div className="space-y-4">
      {/* 도구 목록 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subscriptionToolList.map((tool) => (
          <SubscriptionToolCard key={tool.id} {...tool} />
        ))}
      </div>
    </div>
  );
}
