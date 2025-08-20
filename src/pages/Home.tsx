import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Trophy, 
  Users, 
  Coins, 
  ArrowRight,
  Star,
  TrendingUp,
  Gift
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Coins,
      title: "Earn Real Money",
      description: "Get ₹50-₹1000+ for every successful referral"
    },
    {
      icon: Trophy,
      title: "Rank Up & Win",
      description: "Bronze to Platinum badges with exclusive rewards"
    },
    {
      icon: Users,
      title: "Build Your Network",
      description: "Help friends succeed while earning together"
    },
    {
      icon: Gift,
      title: "Milestone Rewards",
      description: "Unlock bonuses as you reach new targets"
    }
  ];

  const stats = [
    { label: "Active Referrers", value: "2,500+" },
    { label: "Total Earned", value: "₹15L+" },
    { label: "Success Rate", value: "87%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <Trophy className="h-16 w-16 text-primary relative z-10" />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Turn Your Network Into
              <br />
              <span className="text-primary">Real Earnings</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join Testbook's gamified referral program. Refer friends, climb leaderboards, 
              unlock exclusive badges, and earn up to ₹6000+ monthly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all"
                onClick={() => navigate('/dashboard')}
              >
                Start Earning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6"
              >
                <Star className="mr-2 h-5 w-5" />
                See How It Works
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose Our Referral Program?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            More than just referrals - it's a complete gamified experience designed for winners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Referral Journey?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of successful referrers. Track your progress, celebrate milestones, 
              and earn real money while helping others succeed.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all"
              onClick={() => navigate('/dashboard')}
            >
              Access Your Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}