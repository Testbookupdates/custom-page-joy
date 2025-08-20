import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar?: string;
  cashbackEarned: number;
  referrals: number;
  bonusPoints: number;
  rankMovement: "up" | "down" | "same";
  movementValue: number;
}

const mockUsers: LeaderboardUser[] = [
  { rank: 1, name: "Priya Sharma", cashbackEarned: 8500, referrals: 45, bonusPoints: 1200, rankMovement: "up", movementValue: 2 },
  { rank: 2, name: "Rahul Kumar", cashbackEarned: 7800, referrals: 42, bonusPoints: 1100, rankMovement: "down", movementValue: 1 },
  { rank: 3, name: "Anita Singh", cashbackEarned: 7200, referrals: 38, bonusPoints: 950, rankMovement: "up", movementValue: 3 },
  { rank: 4, name: "Vikash Gupta", cashbackEarned: 6800, referrals: 35, bonusPoints: 890, rankMovement: "same", movementValue: 0 },
  { rank: 5, name: "Deepika Raj", cashbackEarned: 6200, referrals: 32, bonusPoints: 820, rankMovement: "up", movementValue: 1 },
];

function getRankIcon(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}

function getRankMovementIcon(movement: string, value: number) {
  if (movement === "up") return <TrendingUp className="h-4 w-4 text-success" />;
  if (movement === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
}

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState("monthly");

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Trophy className="h-8 w-8 text-primary" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground">
          Top performers in our referral community
        </p>
      </div>

      {/* Time Filter Tabs */}
      <Tabs value={timeFilter} onValueChange={setTimeFilter} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="alltime">All-time</TabsTrigger>
        </TabsList>

        <TabsContent value={timeFilter} className="space-y-4">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {mockUsers.slice(0, 3).map((user, index) => (
              <Card key={user.rank} className={`text-center ${index === 0 ? 'ring-2 ring-primary bg-gradient-to-br from-primary/5 to-primary-glow/5' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="text-4xl mb-2">{getRankIcon(user.rank)}</div>
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-lg font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">Rank #{user.rank}</p>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-2xl font-bold text-primary">₹{user.cashbackEarned.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{user.referrals} referrals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Remaining Users List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Top 100 Referrers
                <Badge variant="secondary">{timeFilter}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockUsers.slice(3).map((user) => (
                <div 
                  key={user.rank} 
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg w-8 text-center">#{user.rank}</span>
                      {getRankMovementIcon(user.rankMovement, user.movementValue)}
                    </div>
                    
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user.referrals} referrals • {user.bonusPoints} bonus points
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">₹{user.cashbackEarned.toLocaleString()}</p>
                    {user.rankMovement !== "same" && (
                      <p className={`text-sm ${
                        user.rankMovement === "up" ? "text-success" : "text-destructive"
                      }`}>
                        {user.rankMovement === "up" ? "+" : "-"}{user.movementValue} positions
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Want to be here?</h3>
              <p className="text-muted-foreground mb-4">
                Start referring friends and climb the leaderboard!
              </p>
              <Button className="gap-2">
                Start Referring
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}