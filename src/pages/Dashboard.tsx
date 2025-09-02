import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, Users, Gift, Target, LogOut, ArrowUpRight, Calendar, DollarSign, Award, Clock, Copy, Share2, QrCode, Zap, Sparkles, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import MilestoneProgress from '@/components/referral/MilestoneProgress';
import RankBadge from '@/components/referral/RankBadge';
import ShareableCard from '@/components/referral/ShareableCard';

const Dashboard = () => {
  const { logout } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const referralCode = 'TB2024JD';
  const currentReferrals = 23;
  const currentEarnings = 2450;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-midnight-dark/20 to-background/95 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-success/20 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-warning/30 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 right-2/3 w-2 h-2 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-primary/10 rounded-full blur-3xl animate-pulse opacity-70"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-accent/10 rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-success/10 rounded-full blur-2xl animate-pulse opacity-80" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Header Section - Hero Area */}
        <div className="border-b border-border/50 bg-gradient-glass backdrop-blur-xl relative overflow-hidden">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 animate-pulse opacity-50"></div>
          <div className="p-6 md:p-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 animate-fade-in">
              {/* Profile & Achievements */}
              <div className="flex items-center gap-4 group">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-primary/30 transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-glow group-hover:shadow-primary/30">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xl bg-gradient-primary text-white">JD</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-success rounded-full border-2 border-background flex items-center justify-center animate-pulse">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-pulse">Welcome back, John!</h1>
                    <div className="animate-bounce">
                      <RankBadge rank="Gold" size="md" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">You're doing amazing! Keep up the great work</p>
                    <Sparkles className="w-4 h-4 text-warning animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                 </div>
               </div>

               {/* Quick Actions */}
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-gradient-success/20 text-success border-success/30 px-3 py-1 hover:bg-gradient-success/30 transition-all duration-300 hover:scale-105">
                  <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></div>
                  Rank #4
                </Badge>
                <Button 
                  onClick={logout}
                  variant="outline" 
                  size="sm"
                  className="bg-gradient-glass border-border/50 hover:bg-gradient-destructive/10 hover:border-destructive/50 transition-all duration-300 hover:scale-105 hover:shadow-glow hover:shadow-destructive/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Earnings Hero Card */}
            <div className="mt-6">
              <Card className="bg-gradient-to-r from-midnight-dark via-midnight to-midnight-light border-primary/20 text-white overflow-hidden relative group hover:shadow-neon transition-all duration-700 hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary/30 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-accent/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <p className="text-white/80">You've earned so far</p>
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-success rounded-full animate-ping"></div>
                          <div className="w-1 h-1 bg-warning rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-1 h-1 bg-accent rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-success via-warning to-accent bg-clip-text text-transparent animate-pulse">
                        ₹{currentEarnings.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-white/70">From {currentReferrals} successful referrals</p>
                        <Zap className="w-4 h-4 text-warning animate-bounce" />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-glow hover:shadow-white/20">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Link
                      </Button>
                      <Button className="bg-gradient-warning hover:bg-gradient-warning/80 hover:scale-105 transition-all duration-300 hover:shadow-glow hover:shadow-warning/30">
                        <Gift className="h-4 w-4 mr-2" />
                        Show My Card
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Referral Code Quick Access */}
            <div className="mt-4">
              <Card className="bg-gradient-glass border-border/50 hover:bg-gradient-card/80 transition-all duration-500 hover:scale-[1.01] hover:shadow-glow hover:shadow-primary/10 group">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
                        <QrCode className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Your Referral Code</p>
                        <code className="text-lg font-mono text-primary bg-primary/10 px-2 py-1 rounded group-hover:bg-primary/20 transition-all duration-300">{referralCode}</code>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="hover:scale-105 transition-all duration-300 hover:shadow-glow hover:shadow-primary/20">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Total Earnings", value: "₹2,450", icon: DollarSign, change: "+12.5%", progress: 75, color: "success" },
              { title: "Active Referrals", value: "23", icon: Users, change: "+3", progress: 60, color: "primary" },
              { title: "Pending Rewards", value: "₹850", icon: Gift, change: "5 pending", progress: 35, color: "warning" },
              { title: "Current Streak", value: "7 days", icon: Target, change: "Personal best", progress: 90, color: "accent" }
            ].map((kpi, index) => (
              <Card 
                key={kpi.title}
                className={`relative overflow-hidden bg-gradient-glass border-border/50 hover:shadow-glow hover:shadow-${kpi.color}/20 transition-all duration-500 group hover:scale-105 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${kpi.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                  <CardTitle className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">{kpi.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-${kpi.color}/10 border border-${kpi.color}/20 group-hover:bg-${kpi.color}/20 transition-all duration-300 group-hover:scale-110`}>
                    <kpi.icon className={`h-4 w-4 text-${kpi.color}`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 relative z-10">
                  <div className={`text-3xl font-bold bg-gradient-${kpi.color} bg-clip-text text-transparent`}>
                    {kpi.value}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center text-${kpi.color} text-sm font-medium`}>
                      {kpi.change.includes('+') ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : kpi.change.includes('pending') ? (
                        <Clock className="w-4 h-4 mr-1" />
                      ) : (
                        <Award className="w-4 h-4 mr-1" />
                      )}
                      {kpi.change}
                    </div>
                    <span className="text-sm text-muted-foreground">{kpi.change.includes('+') ? 'vs last month' : kpi.change.includes('pending') ? 'rewards' : ''}</span>
                  </div>
                  <Progress value={kpi.progress} className="h-2 bg-muted/30 group-hover:h-3 transition-all duration-300" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-glass border-border/50 h-full hover:bg-gradient-card/60 transition-all duration-700 hover:shadow-glow hover:shadow-primary/10 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        Recent Referrals
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      </CardTitle>
                      <CardDescription className="mt-1">Your latest successful conversions</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:scale-105">
                      5 Active
                    </Badge>
                  </div>
                </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Arjun Sharma", course: "NEET Preparation", amount: 300, time: "2 hours ago", status: "confirmed" },
                  { name: "Priya Patel", course: "JEE Advanced", amount: 250, time: "1 day ago", status: "pending" },
                  { name: "Rohan Gupta", course: "Foundation Course", amount: 200, time: "2 days ago", status: "confirmed" },
                  { name: "Sneha Reddy", course: "NEET Biology", amount: 180, time: "3 days ago", status: "confirmed" }
                  ].map((referral, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-card border border-border/20 hover:bg-gradient-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow hover:shadow-primary/10 group"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-gradient-primary/30 transition-all duration-300 group-hover:scale-110">
                          <span className="text-sm font-semibold text-primary">{referral.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{referral.name}</p>
                          <p className="text-sm text-muted-foreground">{referral.course}</p>
                          <p className="text-xs text-muted-foreground/80">{referral.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-success group-hover:scale-110 transition-transform duration-300">₹{referral.amount}</div>
                        <Badge 
                          variant="secondary" 
                          className={`transition-all duration-300 hover:scale-105 ${referral.status === 'confirmed' 
                            ? "bg-success/20 text-success border-success/30 hover:bg-success/30" 
                            : "bg-warning/20 text-warning border-warning/30 hover:bg-warning/30"
                          }`}
                        >
                          {referral.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4 bg-gradient-glass border-border/50 hover:bg-gradient-primary/10 hover:scale-105 transition-all duration-300 hover:shadow-glow hover:shadow-primary/20">
                    View All Referrals
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Stats */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="bg-gradient-glass border-border/50 hover:bg-gradient-card/60 transition-all duration-700 hover:shadow-glow hover:shadow-accent/10 group">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    Quick Actions
                    <Zap className="w-4 h-4 text-warning animate-pulse" />
                  </CardTitle>
                  <CardDescription>Essential tools and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start h-12 bg-gradient-primary/10 hover:bg-gradient-primary/20 border border-primary/20 hover:shadow-glow hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group" variant="outline">
                    <Gift className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    Share Referral Link
                  </Button>
                  <Button className="w-full justify-start h-12 bg-gradient-accent/10 hover:bg-gradient-accent/20 border border-accent/20 hover:shadow-glow hover:shadow-accent/20 transition-all duration-300 hover:scale-105 group" variant="outline">
                    <Award className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    View Leaderboard
                  </Button>
                  <Button className="w-full justify-start h-12 bg-gradient-success/10 hover:bg-gradient-success/20 border border-success/20 hover:shadow-glow hover:shadow-success/20 transition-all duration-300 hover:scale-105 group" variant="outline">
                    <DollarSign className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    Request Withdrawal
                  </Button>
                </CardContent>
              </Card>

              {/* Performance Insights */}
              <Card className="bg-gradient-glass border-border/50 hover:bg-gradient-card/60 transition-all duration-700 hover:shadow-glow hover:shadow-success/10 group">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    This Month
                    <TrendingUp className="w-4 h-4 text-success animate-bounce" />
                  </CardTitle>
                  <CardDescription>Performance insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 group hover:bg-success/5 p-3 rounded-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Conversion Rate</span>
                      <span className="text-sm font-bold text-success">76%</span>
                    </div>
                    <Progress value={76} className="h-2 group-hover:h-3 transition-all duration-300" />
                  </div>
                  <div className="space-y-3 group hover:bg-primary/5 p-3 rounded-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Goal Progress</span>
                      <span className="text-sm font-bold text-primary">8/10</span>
                    </div>
                    <Progress value={80} className="h-2 group-hover:h-3 transition-all duration-300" />
                  </div>
                  <div className="space-y-3 group hover:bg-accent/5 p-3 rounded-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Streak Target</span>
                      <span className="text-sm font-bold text-accent">7/30</span>
                    </div>
                    <Progress value={23} className="h-2 group-hover:h-3 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;