import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/StatCard";
import { MilestoneCard } from "@/components/MilestoneCard";
import { RankBadge } from "@/components/RankBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Copy, 
  Share, 
  Users, 
  ShoppingCart, 
  Coins, 
  TrendingUp,
  QrCode,
  MessageCircle
} from "lucide-react";

export default function ReferralDashboard() {
  const [referralCode] = useState("TESTBOOK2024");
  const { toast } = useToast();
  
  // Mock data - would come from API
  const userData = {
    name: "Alex Kumar",
    rank: "Gold" as const,
    totalEarnings: 2450,
    totalReferrals: 12,
    confirmedPurchases: 8,
    leaderboardRank: 47
  };

  const milestones = [
    { title: "First Steps", reward: "₹50", current: 12, target: 2, completed: true },
    { title: "Getting Started", reward: "₹100", current: 12, target: 5, completed: true },
    { title: "On Fire!", reward: "₹250", current: 12, target: 10, completed: true },
    { title: "Superstar", reward: "₹500", current: 12, target: 20, completed: false },
    { title: "Legend", reward: "₹1000", current: 12, target: 50, completed: false }
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied! 🎉",
      description: "Referral code copied to clipboard"
    });
  };

  const shareWhatsApp = () => {
    const message = `Hey! Join Testbook with my referral code ${referralCode} and get amazing discounts! 🎓`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Hero Section */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5">
        <CardContent className="p-8">
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="h-16 w-16 ring-4 ring-primary/20">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-lg font-bold">AK</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <RankBadge rank={userData.rank} size="md" />
                <span className="text-muted-foreground">• Rank #{userData.leaderboardRank}</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-3xl font-bold text-primary mb-2">₹{userData.totalEarnings.toLocaleString()}</p>
            <p className="text-muted-foreground">Total Earnings 🔥</p>
          </div>

          <Card className="bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Share className="h-5 w-5" />
                Your Referral Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  value={referralCode} 
                  readOnly 
                  className="font-mono text-center text-lg font-bold"
                />
                <Button onClick={copyReferralCode} variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button onClick={shareWhatsApp} className="flex-1" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" size="icon">
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Referrals"
          value={userData.totalReferrals}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Confirmed Purchases"
          value={userData.confirmedPurchases}
          icon={ShoppingCart}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Cashback Earned"
          value={`₹${userData.totalEarnings}`}
          icon={Coins}
          trend={{ value: 25, isPositive: true }}
        />
        <StatCard
          title="Leaderboard Rank"
          value={`#${userData.leaderboardRank}`}
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Milestones Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏆 Milestone Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {milestones.map((milestone, index) => (
            <MilestoneCard
              key={index}
              title={milestone.title}
              reward={milestone.reward}
              currentProgress={milestone.current}
              targetProgress={milestone.target}
              isCompleted={milestone.completed}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}