import { Star, ShieldCheck, Award } from "lucide-react";
import allureBadge from "@/assets/allure-badge.png";

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

  const isAllureAward = source?.toLowerCase().includes('allure');

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5">{stars}</div>
        <span className={`${textSizeClasses[size]} font-medium text-foreground`}>
          ({rating}/5)
        </span>
      </div>
      {showSource && source && (
        <>
          {isAllureAward ? (
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 px-2.5 py-1.5 rounded-md border border-red-200 dark:border-red-800/50">
              <img src={allureBadge} alt="Allure Award" className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-semibold text-red-700 dark:text-red-400">
                {source}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-muted-foreground">
              <ShieldCheck className="w-3 h-3" />
              <span className="text-xs">
                Verified Brand Rating via {source}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StarRating;
