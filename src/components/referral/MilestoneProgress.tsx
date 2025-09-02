import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Coins, Crown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Milestone {
  id: number;
  referrals: number;
  reward: number;
  title: string;
  icon: React.ElementType;
  unlocked: boolean;
}

const MilestoneProgress = ({ currentReferrals = 23 }: { currentReferrals?: number }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const milestones: Milestone[] = [
    { id: 1, referrals: 2, reward: 50, title: 'First Steps', icon: Target, unlocked: currentReferrals >= 2 },
    { id: 2, referrals: 5, reward: 100, title: 'Getting Started', icon: Trophy, unlocked: currentReferrals >= 5 },
    { id: 3, referrals: 10, reward: 250, title: 'Rising Star', icon: Coins, unlocked: currentReferrals >= 10 },
    { id: 4, referrals: 25, reward: 600, title: 'Elite Referrer', icon: Crown, unlocked: currentReferrals >= 25 },
    { id: 5, referrals: 50, reward: 1500, title: 'Master', icon: Crown, unlocked: currentReferrals >= 50 },
  ];

  const nextMilestone = milestones.find(m => !m.unlocked);
  const progress = nextMilestone ? (currentReferrals / nextMilestone.referrals) * 100 : 100;

  useEffect(() => {
    // Check if user just hit a milestone
    const justUnlocked = milestones.find(m => m.unlocked && currentReferrals === m.referrals);
    if (justUnlocked) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [currentReferrals]);

  return (
    <Card className="relative overflow-hidden bg-gradient-glass border-border/50">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-bounce">
            🎉
          </div>
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">Referral Journey</h3>
            <p className="text-sm text-muted-foreground">
              {nextMilestone 
                ? `${nextMilestone.referrals - currentReferrals} more referrals to unlock ₹${nextMilestone.reward}!`
                : "🎉 All milestones completed!"
              }
            </p>
          </div>

          {nextMilestone && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>{currentReferrals} referrals</span>
                <span>{nextMilestone.referrals} target</span>
              </div>
              <Progress 
                value={progress} 
                className="h-3 bg-midnight-light/20"
              />
            </div>
          )}

          <div className="grid grid-cols-5 gap-2">
            {milestones.map((milestone) => {
              const Icon = milestone.icon;
              return (
                <div
                  key={milestone.id}
                  className={`text-center p-2 rounded-lg transition-all duration-300 ${
                    milestone.unlocked
                      ? 'bg-gradient-success/20 border border-success/30'
                      : 'bg-muted/30 border border-border/20'
                  }`}
                >
                  <Icon className={`h-6 w-6 mx-auto mb-1 ${
                    milestone.unlocked ? 'text-success' : 'text-muted-foreground'
                  }`} />
                  <div className="text-xs font-medium">₹{milestone.reward}</div>
                  <div className="text-xs text-muted-foreground">{milestone.referrals}</div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {currentReferrals} / 50 Total Referrals
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneProgress;