import { Star } from "lucide-react";
import Image from "next/image";

import type { AlternativeTool } from "../model/AlternativeTool.interface";

interface AlternativeCardProps {
  alternativeTool: AlternativeTool;
}

export default function AlternativeCard({
  alternativeTool,
}: AlternativeCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-md">
      {/* Tool Screenshot/Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {alternativeTool.imageUrl ? (
          <Image
            src={alternativeTool.imageUrl}
            alt={`${alternativeTool.name} screenshot`}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
            <div className="text-center text-white">
              <div className="text-2xl font-bold">{alternativeTool.name}</div>
              <p className="text-sm opacity-70">No Image</p>
            </div>
          </div>
        )}
      </div>

      {/* Tool Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-medium text-card-foreground group-hover:text-primary">
            {alternativeTool.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-muted-foreground">
              {alternativeTool.avgRating}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({alternativeTool.reviewCount} reviews)
          </span>
        </div>

        {/* Similarity Score */}
        {alternativeTool.similarityScore && (
          <div className="mt-2">
            <span className="text-xs text-muted-foreground">
              {Math.round(alternativeTool.similarityScore * 100)}% similar
            </span>
          </div>
        )}
      </div>
    </div>
  );
}