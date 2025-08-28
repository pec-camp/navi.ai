import Link from "next/link";

import { AddToCompareButton } from "@/src/features/compare";
import { TOOLS_SLUG_PATHNAME } from "@/src/shared/config/pathname";

import { SubscriptionToolData } from "../model/SubscriptionTool.interface";
import SubscriptionToolCard from "./SubscriptionToolCard";

export default function SubscriptionToolList({
  subscriptionToolList,
}: {
  subscriptionToolList: SubscriptionToolData[];
}) {
  return (
    <div className="space-y-4">
      {/* 도구 목록 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subscriptionToolList.map((tool) => (
          <div key={tool.id} className="relative">
            <Link href={TOOLS_SLUG_PATHNAME(tool.slug)}>
              <SubscriptionToolCard {...tool} />
            </Link>
            <div className="absolute right-4 top-4 z-10">
              <AddToCompareButton tool={tool} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
