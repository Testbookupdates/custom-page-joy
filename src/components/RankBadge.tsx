import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RankBadgeProps {
  rank: "Bronze" | "Silver" | "Gold" | "Platinum";
  size?: "sm" | "md" | "lg";
}

const rankConfig = {
  Bronze: {
    gradient: "from-amber-600 to-amber-800",
    icon: "🥉",
    bgColor: "bg-gradient-to-r from-amber-600 to-amber-800"
  },
  Silver: {
    gradient: "from-slate-400 to-slate-600", 
    icon: "🥈",
    bgColor: "bg-gradient-to-r from-slate-400 to-slate-600"
  },
  Gold: {
    gradient: "from-yellow-400 to-yellow-600",
    icon: "🥇", 
    bgColor: "bg-gradient-to-r from-yellow-400 to-yellow-600"
  },
  Platinum: {
    gradient: "from-indigo-400 to-purple-600",
    icon: "💎",
    bgColor: "bg-gradient-to-r from-indigo-400 to-purple-600"
  }
};

export function RankBadge({ rank, size = "md" }: RankBadgeProps) {
  const config = rankConfig[rank];
  
  return (
    <Badge 
      className={cn(
        "font-semibold text-white border-0 shadow-lg",
        config.bgColor,
        {
          "px-2 py-1 text-xs": size === "sm",
          "px-3 py-1.5 text-sm": size === "md", 
          "px-4 py-2 text-base": size === "lg"
        }
      )}
    >
      <span className="mr-1">{config.icon}</span>
      {rank}
    </Badge>
  );
}