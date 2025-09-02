import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Trophy, Clock, Users, Gift } from 'lucide-react';

const Challenges = () => {
  const activeChallenges = [
    {
      id: 1,
      title: 'Weekend Warrior',
      description: 'Refer 5 students this weekend',
      progress: 3,
      target: 5,
      reward: '₹500 Bonus',
      timeLeft: '2 days',
      type: 'weekend'
    },
    {
      id: 2,
      title: 'Monthly Master',
      description: 'Achieve 25 referrals this month',
      progress: 18,
      target: 25,
      reward: 'Gold Badge + ₹1000',
      timeLeft: '12 days',
      type: 'monthly'
    },
    {
      id: 3,
      title: 'First Timer',
      description: 'Get your first successful referral',
      progress: 1,
      target: 1,
      reward: '₹200',
      timeLeft: 'Completed',
      type: 'milestone'
    }
  ];

  const upcomingChallenges = [
    {
      title: 'February Flash',
      description: 'Special Valentine\'s week challenge',
      reward: 'Diamond Badge',
      startsIn: '5 days'
    },
    {
      title: 'Exam Season Sprint',
      description: 'Help students prepare for March exams',
      reward: '₹2000 + Exclusive Rewards',
      startsIn: '15 days'
    }
  ];

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'weekend': return <Clock className="h-5 w-5" />;
      case 'monthly': return <Trophy className="h-5 w-5" />;
      case 'milestone': return <Target className="h-5 w-5" />;
      default: return <Target className="h-5 w-5" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'weekend': return 'default';
      case 'monthly': return 'secondary';
      case 'milestone': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Challenges</h1>
        <p className="text-muted-foreground">
          Complete challenges to earn bonus rewards and unlock achievements.
        </p>
      </div>

      {/* Challenge Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Trophy className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bonus Earned</p>
                <p className="text-2xl font-bold">₹2,400</p>
              </div>
              <Gift className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-2xl font-bold">7 days</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Challenges */}
      <Card>
        <CardHeader>
          <CardTitle>Active Challenges</CardTitle>
          <CardDescription>Challenges you can complete right now</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {activeChallenges.map((challenge) => (
            <div key={challenge.id} className="border rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {getChallengeIcon(challenge.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </div>
                </div>
                <Badge variant={getBadgeVariant(challenge.type)}>
                  {challenge.timeLeft}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{challenge.progress}/{challenge.target}</span>
                </div>
                <Progress 
                  value={(challenge.progress / challenge.target) * 100} 
                  className="h-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary">{challenge.reward}</span>
                </div>
                <Button size="sm" disabled={challenge.progress >= challenge.target}>
                  {challenge.progress >= challenge.target ? 'Completed' : 'View Details'}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Challenges */}
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>Challenges starting soon</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingChallenges.map((challenge, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
                <p className="text-sm font-medium text-primary mt-1">{challenge.reward}</p>
              </div>
              <Badge variant="outline">
                Starts in {challenge.startsIn}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenges;