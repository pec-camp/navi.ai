import { FeaturedTool } from "../model/FeaturedTool.interface";
import FeaturedToolCard from "./FeaturedToolCard";

interface FeaturedToolListProps {
  featuredTools: FeaturedTool[];
}

export default function FeaturedToolList({
  featuredTools,
}: FeaturedToolListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {featuredTools.map((tool, index) => (
        <FeaturedToolCard key={index} {...tool} className="h-full" />
      ))}
    </div>
  );
}
