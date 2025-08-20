import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Target, 
  Flame, 
  Trophy, 
  Calendar, 
  CheckCircle,
  Clock,
  Zap,
  Gift
} from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly";
  target: number;
  current: number;
  reward: string;
  expiresIn: string;
  isCompleted: boolean;
  isActive: boolean;
}

const challenges: Challenge[] = [
  {
    id: "daily-1",
    title: "Daily Referrer",
    description: "Refer 2 friends today",
    type: "daily",
    target: 2,
    current: 1,
    reward: "₹50 Bonus",
    expiresIn: "8 hours",
    isCompleted: false,
    isActive: true
  },
  {
    id: "daily-2", 
    title: "Social Sharer",
    description: "Share your referral code on 3 platforms",
    type: "daily",
    target: 3,
    current: 3,
    reward: "₹25 Bonus",
    expiresIn: "12 hours",
    isCompleted: true,
    isActive: false
  },
  {
    id: "weekly-1",
    title: "Weekly Warrior",
    description: "Achieve 10 confirmed referrals this week",
    type: "weekly",
    target: 10,
    current: 6,
    reward: "₹200 Bonus",
    expiresIn: "3 days",
    isCompleted: false,
    isActive: true
  },
  {
    id: "weekly-2",
    title: "Streak Master",
    description: "Maintain a 7-day referral streak",
    type: "weekly",
    target: 7,
    current: 4,
    reward: "₹150 Bonus + Badge",
    expiresIn: "5 days",
    isCompleted: false,
    isActive: true
  }
];

const streakData = {
  currentStreak: 4,
  longestStreak: 12,
  streakBonus: 25
};

export default function Challenges() {
  const [activeTab, setActiveTab] = useState("active");
  const { toast } = useToast();

  const handleClaimReward = (challengeId: string, reward: string) => {
    toast({
      title: "Reward Claimed! 🎉",
      description: `You've earned ${reward} for completing the challenge!`
    });
  };

  const activeChallenges = challenges.filter(c => c.isActive);
  const completedChallenges = challenges.filter(c => c.isCompleted);

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Target className="h-8 w-8 text-primary" />
          Challenges
        </h1>
        <p className="text-muted-foreground">
          Complete challenges to earn bonus rewards and badges
        </p>
      </div>

      {/* Streak Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Flame className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  {streakData.currentStreak} Day Streak! 
                  <span className="text-2xl">🔥</span>
                </h3>
                <p className="text-muted-foreground">
                  Personal best: {streakData.longestStreak} days • +{streakData.streakBonus}% bonus on next referral
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Streak Master
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Challenge Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="gap-2">
            <Zap className="h-4 w-4" />
            Active Challenges
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            <Trophy className="h-4 w-4" />
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeChallenges.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Challenges</h3>
                <p className="text-muted-foreground">
                  New challenges will appear here. Check back soon!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activeChallenges.map((challenge) => (
                <Card key={challenge.id} className="relative overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          challenge.type === "daily" 
                            ? "bg-warning/20 text-warning" 
                            : "bg-success/20 text-success"
                        }`}>
                          {challenge.type === "daily" ? (
                            <Calendar className="h-4 w-4" />
                          ) : (
                            <Target className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{challenge.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {challenge.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant={challenge.type === "daily" ? "outline" : "secondary"}>
                        {challenge.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">
                          {challenge.current} / {challenge.target}
                        </span>
                      </div>
                      <Progress 
                        value={(challenge.current / challenge.target) * 100}
                        className="h-2"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">{challenge.reward}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {challenge.expiresIn}
                      </div>
                    </div>
                    
                    {challenge.current >= challenge.target && (
                      <Button 
                        onClick={() => handleClaimReward(challenge.id, challenge.reward)}
                        className="w-full gap-2"
                      >
                        <Trophy className="h-4 w-4" />
                        Claim Reward
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedChallenges.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Completed Challenges</h3>
                <p className="text-muted-foreground">
                  Complete your first challenge to see it here!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {completedChallenges.map((challenge) => (
                <Card key={challenge.id} className="relative overflow-hidden opacity-75">
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-success/20 text-success">
                        <Trophy className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Progress value={100} className="h-2" />
                      <div className="text-center">
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Completed • {challenge.reward}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}