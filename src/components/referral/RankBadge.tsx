import { Badge } from '@/components/ui/badge';
import { Crown, Award, Medal, Trophy } from 'lucide-react';

interface RankBadgeProps {
  rank: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const RankBadge = ({ rank, size = 'md', showIcon = true }: RankBadgeProps) => {
  const getRankConfig = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'diamond':
        return {
          variant: 'default' as const,
          className: 'bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-cyan-300',
          icon: Crown,
          color: 'text-cyan-400'
        };
      case 'platinum':
        return {
          variant: 'secondary' as const,
          className: 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 border-gray-300',
          icon: Trophy,
          color: 'text-gray-400'
        };
      case 'gold':
        return {
          variant: 'default' as const,
          className: 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-yellow-300',
          icon: Award,
          color: 'text-yellow-400'
        };
      case 'silver':
        return {
          variant: 'outline' as const,
          className: 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 border-gray-300',
          icon: Medal,
          color: 'text-gray-400'
        };
      case 'bronze':
        return {
          variant: 'outline' as const,
          className: 'bg-gradient-to-r from-orange-300 to-orange-400 text-orange-800 border-orange-300',
          icon: Medal,
          color: 'text-orange-400'
        };
      default:
        return {
          variant: 'outline' as const,
          className: 'bg-muted text-muted-foreground border-border',
          icon: Medal,
          color: 'text-muted-foreground'
        };
    }
  };

  const config = getRankConfig(rank);
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <Badge 
      variant={config.variant}
      className={`${config.className} ${sizeClasses[size]} font-semibold flex items-center gap-1`}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {rank}
    </Badge>
  );
};

export default RankBadge;