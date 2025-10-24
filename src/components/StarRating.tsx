import { Star, ShieldCheck } from "lucide-react";

interface StarRatingProps {
  rating: number;
  totalReviews?: number;
  source?: string;
  showSource?: boolean;
  size?: "sm" | "md" | "lg";
}

const StarRating = ({ 
  rating, 
  totalReviews, 
  source, 
  showSource = true,
  size = "sm" 
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star 
          key={i} 
          className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} 
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className="relative">
          <Star className={`${sizeClasses[size]} text-gray-300`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
          </div>
        </div>
      );
    } else {
      stars.push(
        <Star 
          key={i} 
          className={`${sizeClasses[size]} text-gray-300`} 
        />
      );
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5">{stars}</div>
        <span className={`${textSizeClasses[size]} font-medium text-foreground`}>
          ({rating}/5)
        </span>
      </div>
      {showSource && source && (
        <div className="flex items-center gap-1 text-muted-foreground">
          <ShieldCheck className="w-3 h-3" />
          <span className="text-xs">
            Verified Brand Rating via {source}
          </span>
        </div>
      )}
    </div>
  );
};

export default StarRating;
