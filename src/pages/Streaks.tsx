import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Calendar, Target, TrendingUp, Trophy } from 'lucide-react';

const Streaks = () => {
  const currentStreak = 7;
  const longestStreak = 23;
  const weeklyData = [
    { day: 'Mon', referrals: 2, active: true },
    { day: 'Tue', referrals: 1, active: true },
    { day: 'Wed', referrals: 3, active: true },
    { day: 'Thu', referrals: 0, active: false },
    { day: 'Fri', referrals: 2, active: true },
    { day: 'Sat', referrals: 1, active: true },
    { day: 'Sun', referrals: 4, active: true },
  ];

  const streakMilestones = [
    { days: 7, reward: '₹100 Bonus', achieved: true },
    { days: 14, reward: 'Silver Badge', achieved: false },
    { days: 30, reward: '₹500 + Gold Badge', achieved: false },
    { days: 60, reward: 'Platinum Status', achieved: false },
    { days: 100, reward: '₹2000 + Diamond Badge', achieved: false },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Streaks</h1>
        <p className="text-muted-foreground">
          Maintain your daily activity to unlock rewards and build momentum.
        </p>
      </div>

      {/* Streak Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <Flame className="h-12 w-12 text-orange-500" />
            </div>
            <CardTitle className="text-2xl">{currentStreak} Days</CardTitle>
            <CardDescription>Current Streak</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              Keep Streak Alive!
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <Trophy className="h-12 w-12 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl">{longestStreak} Days</CardTitle>
            <CardDescription>Longest Streak</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your personal best!
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <Target className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">14 Days</CardTitle>
            <CardDescription>Next Milestone</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {14 - currentStreak} days to go
            </p>
          </CardContent>
        </Card>
      </div>

      {/* This Week's Activity */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Activity</CardTitle>
          <CardDescription>Your daily referral activity for the current week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="text-center">
                <div className={`
                  h-16 w-full rounded-lg flex items-center justify-center mb-2 
                  ${day.active 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  <div className="text-center">
                    <div className="font-bold text-lg">{day.referrals}</div>
                  </div>
                </div>
                <p className="text-sm font-medium">{day.day}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Badge variant={currentStreak > 0 ? "default" : "secondary"}>
              {currentStreak > 0 ? `${currentStreak} Day Streak Active` : 'No Active Streak'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Streak Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>Streak Rewards</CardTitle>
          <CardDescription>Unlock rewards by maintaining your streak</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {streakMilestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`
                  flex items-center justify-between p-4 rounded-lg border
                  ${milestone.achieved 
                    ? 'bg-primary/5 border-primary/20' 
                    : currentStreak >= milestone.days 
                      ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
                      : 'bg-card'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    h-10 w-10 rounded-full flex items-center justify-center
                    ${milestone.achieved 
                      ? 'bg-primary text-primary-foreground' 
                      : currentStreak >= milestone.days
                        ? 'bg-green-500 text-white'
                        : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{milestone.days} Day Streak</p>
                    <p className="text-sm text-muted-foreground">
                      Reward: {milestone.reward}
                    </p>
                  </div>
                </div>
                
                <Badge 
                  variant={
                    milestone.achieved 
                      ? "default" 
                      : currentStreak >= milestone.days 
                        ? "default"
                        : "outline"
                  }
                >
                  {milestone.achieved 
                    ? "Claimed" 
                    : currentStreak >= milestone.days 
                      ? "Ready to Claim!"
                      : `${milestone.days - currentStreak} days left`
                  }
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Streak Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">How to maintain streaks:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Make at least one referral daily</li>
                <li>• Share your link on social media</li>
                <li>• Engage with study groups</li>
                <li>• Set daily reminders</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Streak benefits:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Higher conversion rates</li>
                <li>• Exclusive bonuses</li>
                <li>• Priority support</li>
                <li>• Leaderboard boost</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Streaks;