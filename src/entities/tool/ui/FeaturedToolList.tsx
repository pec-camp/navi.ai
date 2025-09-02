import { getFeaturedToolList } from "../api";
import FeaturedToolCard from "./FeaturedToolCard";

export default async function FeaturedToolList() {
  const featuredTools = await getFeaturedToolList();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {featuredTools.map((tool, index) => (
        <FeaturedToolCard key={index} {...tool} className="h-full" />
      ))}
    </div>
  );
}
