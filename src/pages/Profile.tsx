import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RankBadge } from "@/components/RankBadge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Share, 
  Trophy, 
  CheckCircle, 
  Clock, 
  XCircle,
  TrendingUp,
  Calendar
} from "lucide-react";

interface ReferralActivity {
  id: string;
  date: string;
  status: "pending" | "confirmed" | "failed";
  reason?: string;
  amount?: number;
}

const mockProfile = {
  name: "Alex Kumar",
  rank: "Gold" as const,
  joinDate: "January 2024",
  totalEarnings: 2450,
  totalReferrals: 12,
  badges: ["Bronze", "Silver", "Gold", "Referral Pro"],
  rankHistory: [
    { month: "Jan", rank: 1 },
    { month: "Feb", rank: 2 },
    { month: "Mar", rank: 3 },
    { month: "Apr", rank: 2 },
    { month: "May", rank: 1 }
  ]
};

const recentActivity: ReferralActivity[] = [
  { id: "1", date: "2024-05-15", status: "confirmed", amount: 150 },
  { id: "2", date: "2024-05-12", status: "pending" },
  { id: "3", date: "2024-05-10", status: "confirmed", amount: 200 },
  { id: "4", date: "2024-05-08", status: "failed", reason: "Friend didn't complete purchase within 7 days" },
  { id: "5", date: "2024-05-05", status: "confirmed", amount: 180 },
];

function getStatusIcon(status: string) {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "pending":
      return <Clock className="h-4 w-4 text-warning" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-destructive" />;
    default:
      return null;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "confirmed":
      return "bg-success/10 text-success border-success/20";
    case "pending":
      return "bg-warning/10 text-warning border-warning/20";
    case "failed":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted";
  }
}

export default function Profile() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-glow/5" />
        <CardContent className="relative p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-2xl font-bold">AK</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-3xl font-bold">{mockProfile.name}</h1>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Member since {mockProfile.joinDate}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <RankBadge rank={mockProfile.rank} size="lg" />
                <div className="text-2xl font-bold text-primary">
                  ₹{mockProfile.totalEarnings.toLocaleString()}
                </div>
                <span className="text-muted-foreground">earned</span>
              </div>
            </div>
            
            <Button variant="outline" className="gap-2">
              <Share className="h-4 w-4" />
              Share My Journey
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rank History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Rank History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProfile.rankHistory.map((entry, index) => (
                <div key={entry.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{entry.month}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">#{entry.rank}</span>
                    {index > 0 && (
                      <span className={`text-xs ${
                        entry.rank < mockProfile.rankHistory[index - 1].rank
                          ? "text-success" : entry.rank > mockProfile.rankHistory[index - 1].rank
                          ? "text-destructive" : "text-muted-foreground"
                      }`}>
                        {entry.rank < mockProfile.rankHistory[index - 1].rank
                          ? "↗" : entry.rank > mockProfile.rankHistory[index - 1].rank
                          ? "↘" : "→"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Badge Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Badge Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {mockProfile.badges.map((badge) => (
                <div 
                  key={badge}
                  className="flex flex-col items-center p-4 rounded-lg border bg-gradient-to-b from-muted/50 to-muted/20"
                >
                  <div className="text-2xl mb-2">
                    {badge === "Bronze" && "🥉"}
                    {badge === "Silver" && "🥈"}
                    {badge === "Gold" && "🥇"}
                    {badge === "Referral Pro" && "💎"}
                  </div>
                  <span className="text-sm font-medium text-center">{badge}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Referral Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={activity.id}>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(activity.status)}
                    <div>
                      <p className="font-medium">
                        Referral #{activity.id}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                      {activity.reason && (
                        <p className="text-xs text-destructive mt-1">
                          {activity.reason}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {activity.amount && (
                      <span className="font-bold text-success">
                        +₹{activity.amount}
                      </span>
                    )}
                    <Badge variant="outline" className={getStatusColor(activity.status)}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                {index < recentActivity.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}