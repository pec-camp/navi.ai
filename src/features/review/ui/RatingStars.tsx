import { Star } from "lucide-react";
import { cn } from "@/shared/ui/lib/utils";

interface RatingStarsProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  error?: string;
}

export default function RatingStars({ rating, onRatingChange, error }: RatingStarsProps) {
  return (
    <div className="space-y-3">
      <label className="text-base font-medium text-foreground">
        평점 *
      </label>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="transition-colors hover:scale-110"
          >
            <Star
              strokeWidth={1}
              className={cn(
                "h-7 w-7",
                star <= rating
                  ? "fill-star text-star"
                  : "fill-none text-muted-foreground",
              )}
            />
          </button>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
