import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award } from 'lucide-react';

const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, name: 'Raj Kumar', referrals: 156, earnings: 31200, badge: 'Diamond' },
    { rank: 2, name: 'Priya Singh', referrals: 142, earnings: 28400, badge: 'Platinum' },
    { rank: 3, name: 'Amit Sharma', referrals: 128, earnings: 25600, badge: 'Gold' },
    { rank: 4, name: 'You', referrals: 23, earnings: 4600, badge: 'Gold' },
    { rank: 5, name: 'Sarah Khan', referrals: 89, earnings: 17800, badge: 'Silver' },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-orange-500" />;
    return <span className="h-5 w-5 flex items-center justify-center text-sm font-bold">#{rank}</span>;
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'Diamond': return 'default';
      case 'Platinum': return 'secondary';
      case 'Gold': return 'outline';
      case 'Silver': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">
          See how you rank among our top referrers this month.
        </p>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {leaderboardData.slice(0, 3).map((user, index) => (
          <Card key={user.rank} className={user.name === 'You' ? 'ring-2 ring-primary' : ''}>
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">
                {getRankIcon(user.rank)}
              </div>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <Badge variant={getBadgeVariant(user.badge)}>{user.badge}</Badge>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <div>
                <p className="text-2xl font-bold">{user.referrals}</p>
                <p className="text-sm text-muted-foreground">Referrals</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-primary">₹{user.earnings.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Earnings</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Full Rankings</CardTitle>
          <CardDescription>Complete leaderboard for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  user.name === 'You' ? 'bg-primary/5 border-primary/20' : 'bg-card'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getRankIcon(user.rank)}
                    <span className="font-medium">#{user.rank}</span>
                  </div>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <Badge variant={getBadgeVariant(user.badge)} className="text-xs">
                      {user.badge}
                    </Badge>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">{user.referrals} referrals</p>
                  <p className="text-sm text-muted-foreground">₹{user.earnings.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;