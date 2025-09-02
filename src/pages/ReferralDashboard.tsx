import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/StatCard";
import { MilestoneCard } from "@/components/MilestoneCard";
import { RankBadge } from "@/components/RankBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShareModal from "@/components/ShareModal";
import { useToast } from "@/hooks/use-toast";
import { 
  Copy, 
  Share, 
  Users, 
  ShoppingCart, 
  Coins, 
  TrendingUp,
  QrCode,
  MessageCircle,
  Share2
} from "lucide-react";

export default function ReferralDashboard() {
  const [referralCode] = useState("TESTBOOK2024");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
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
    <div className="min-h-screen bg-background relative">
      {/* Floating Share Button */}
      <Button
        onClick={() => setIsShareModalOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        size="icon"
      >
        <Share2 className="h-6 w-6" />
      </Button>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        userData={userData}
        referralCode={referralCode}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 p-4 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16 ring-4 ring-primary/20">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="text-lg font-bold bg-primary/20">AK</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{userData.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <RankBadge rank={userData.rank} size="sm" />
              <span className="text-sm text-muted-foreground">Rank #{userData.leaderboardRank}</span>
            </div>
          </div>
        </div>
        
        {/* Dynamic Earnings Card */}
        <Card className="bg-gradient-to-r from-primary to-primary-glow text-white border-0 shadow-lg mb-4">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🔥</span>
              <p className="text-lg font-medium">You've earned</p>
            </div>
            <p className="text-4xl font-bold mb-1">₹{userData.totalEarnings.toLocaleString()}</p>
            <p className="text-white/80 text-sm">so far!</p>
          </CardContent>
        </Card>

        {/* Referral Code Share */}
        <Card className="bg-background/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Share className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Your Referral Code</span>
            </div>
            <div className="flex gap-2 mb-3">
              <Input 
                value={referralCode} 
                readOnly 
                className="font-mono text-center font-bold text-primary"
              />
              <Button onClick={copyReferralCode} variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button onClick={shareWhatsApp} variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-1" />
                WhatsApp
              </Button>
              <Button variant="outline" size="sm">
                <QrCode className="h-4 w-4 mr-1" />
                QR Code
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-1" />
                Share Card
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard
            title="Total Referrals"
            value={userData.totalReferrals}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            className="p-4"
          />
          <StatCard
            title="Confirmed"
            value={userData.confirmedPurchases}
            icon={ShoppingCart}
            trend={{ value: 8, isPositive: true }}
            className="p-4"
          />
          <StatCard
            title="Cashback"
            value={`₹${userData.totalEarnings}`}
            icon={Coins}
            trend={{ value: 25, isPositive: true }}
            className="p-4"
          />
          <StatCard
            title="Rank"
            value={`#${userData.leaderboardRank}`}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            className="p-4"
          />
        </div>
      </div>

      {/* Milestones Section */}
      <div className="px-4">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              🏆 Milestone Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {milestones.map((milestone, index) => (
              <MilestoneCard
                key={index}
                title={milestone.title}
                reward={milestone.reward}
                currentProgress={milestone.current}
                targetProgress={milestone.target}
                isCompleted={milestone.completed}
                className="p-4"
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}