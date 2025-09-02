import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import testbookLogo from '@/assets/testbook-logo.png';
import { TrendingUp, Users, Gift, Star, ArrowRight, BookOpen, Trophy, Target, Clock, Zap, Award, Brain, CheckCircle, Play, Shield, Smartphone, Globe, Lightbulb } from 'lucide-react';

const Index = () => {
  console.log('Index component rendering');
  
  const features = [
    {
      icon: Trophy,
      title: 'Gamified Learning',
      description: 'Turn your study sessions into exciting challenges with rewards, badges, and leaderboards',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of aspirants sharing knowledge and supporting each other',
      gradient: 'bg-gradient-accent'
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set personalized goals and track your progress with detailed analytics',
      gradient: 'bg-gradient-success'
    },
    {
      icon: Zap,
      title: 'Quick Results',
      description: 'Get instant feedback and improve faster with our AI-powered assessments',
      gradient: 'bg-gradient-warning'
    }
  ];

  const benefits = [
    'Earn while you learn through our referral program',
    'Access to 50,000+ practice questions',
    'Live classes by expert instructors',
    'Personalized study plans',
    'Mock tests with detailed analysis',
    'Mobile app for learning on the go'
  ];

  const stats = [
    { label: 'Active Learners', value: '2M+', icon: Users },
    { label: 'Success Rate', value: '95%', icon: TrendingUp },
    { label: 'Practice Questions', value: '50K+', icon: BookOpen },
    { label: 'Rewards Earned', value: '₹10M+', icon: Gift }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Banking Aspirant',
      content: "Testbook's comprehensive platform helped me crack SBI PO. The referral earnings were a bonus that funded my preparation!",
      rating: 5,
      earnings: '₹15,000',
      image: '/placeholder.svg'
    },
    {
      name: 'Priya Sharma',
      role: 'SSC Candidate', 
      content: "The daily challenges and mock tests are perfectly designed. I cleared SSC CGL in my first attempt!",
      rating: 5,
      earnings: '₹8,500',
      image: '/placeholder.svg'
    },
    {
      name: 'Amit Patel',
      role: 'Railway Exam Prep',
      content: "Outstanding question quality and detailed explanations. Got selected in RRB NTPC with top scores.",
      rating: 5,
      earnings: '₹12,200',
      image: '/placeholder.svg'
    },
    {
      name: 'Neha Singh',
      role: 'UPSC Aspirant',
      content: "The study material and current affairs section are exceptionally good. Highly recommend for serious aspirants.",
      rating: 5,
      earnings: '₹18,750',
      image: '/placeholder.svg'
    },
    {
      name: 'Rohan Gupta',
      role: 'CAT Preparation',
      content: "Adaptive learning technology is amazing. It identified my weak areas and helped me improve systematically.",
      rating: 5,
      earnings: '₹9,300',
      image: '/placeholder.svg'
    },
    {
      name: 'Kavya Reddy',
      role: 'Bank PO Candidate',
      content: "The live classes and doubt resolution sessions are incredibly helpful. Worth every penny!",
      rating: 5,
      earnings: '₹14,600',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Mobile First */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-midnight-primary via-primary to-midnight-accent px-4 py-16">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-blue-bright/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 md:w-48 md:h-48 bg-accent/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto text-center text-white max-w-4xl">
          {/* Small Logo Text */}
          <div className="mb-6">
            <span className="text-lg md:text-xl font-bold text-white/80 tracking-wide">TESTBOOK</span>
            <span className="block text-sm md:text-base text-accent font-medium">REFERRAL PROGRAM</span>
          </div>

          {/* Compelling Badge */}
          <Badge className="mb-6 px-4 py-2 bg-success/20 text-success border-success/30 text-sm md:text-base font-medium backdrop-blur-sm">
            💰 Students Earned Over ₹10 Crores
          </Badge>

          {/* Simplified Headlines */}
          <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-bright to-white bg-clip-text text-transparent">
              Earn While You Learn
            </span>
          </h1>

          {/* Simplified Story */}
          <p className="mb-8 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            Refer friends to Testbook and earn ₹100-500 per referral. 
            <span className="text-accent font-semibold"> Join 50,000+ students already earning.</span>
          </p>

          {/* Social Proof Numbers */}
          <div className="mb-8 flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">₹2.5L</div>
              <div className="text-white/70">Highest Monthly Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">15,000+</div>
              <div className="text-white/70">Active Referrers</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">24 hrs</div>
              <div className="text-white/70">Payment Processing</div>
            </div>
          </div>

          {/* Mobile-First CTA */}
          <div className="space-y-4 md:space-y-0 md:flex md:gap-4 md:justify-center mb-8">
            <Button size="lg" className="w-full md:w-auto px-8 py-4 text-base md:text-lg bg-white text-midnight-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <Gift className="mr-2 h-5 w-5" />
              Start Earning Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="w-full md:w-auto px-8 py-4 text-base md:text-lg border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
              <Users className="mr-2 h-5 w-5" />
              See Success Stories
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs md:text-sm text-white/70">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>100% Legitimate</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>Instant Payouts</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>50K+ Success Stories</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Mobile First */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-2 border-primary/30 text-primary text-sm md:text-base font-medium">
              Simple 3-Step Process
            </Badge>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              How Students Are Earning
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Real students, real earnings, real impact on their lives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-6 md:p-8 bg-gradient-card border-0 hover:shadow-xl transition-all duration-300">
              <div className="mb-4 mx-auto w-12 h-12 md:w-16 md:h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-card-foreground">Share Your Link</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Get your unique referral code and share it with friends who need test prep
              </p>
            </Card>

            <Card className="text-center p-6 md:p-8 bg-gradient-card border-0 hover:shadow-xl transition-all duration-300">
              <div className="mb-4 mx-auto w-12 h-12 md:w-16 md:h-16 bg-gradient-success rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-card-foreground">Friend Joins</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                When they purchase any Testbook course, you both win
              </p>
            </Card>

            <Card className="text-center p-6 md:p-8 bg-gradient-card border-0 hover:shadow-xl transition-all duration-300">
              <div className="mb-4 mx-auto w-12 h-12 md:w-16 md:h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                <Gift className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-card-foreground">Get Paid</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Earn ₹100-500 per referral, paid directly to your account within 24 hours
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Real Success Stories Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 via-accent/5 to-success/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 px-3 py-2 bg-success/15 text-success border-success/30 text-sm md:text-base font-medium">
              Real Stories, Real Impact
            </Badge>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Students Who Changed
              <span className="block text-primary">Their Lives</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              These aren't fake testimonials - these are real students earning real money
            </p>
          </div>

           {/* Compact Auto-sliding Testimonials */}
          <div className="relative overflow-hidden max-w-6xl mx-auto">
            <div className="flex animate-scroll-x gap-3 md:gap-4" style={{ 
              width: `${testimonials.length * 2 * 320}px`,
              animation: 'scroll-x 25s linear infinite'
            }}>
              {/* First set of testimonials */}
              {testimonials.map((testimonial, index) => (
                <Card key={`first-${index}`} className="w-[280px] md:w-[320px] lg:w-[360px] flex-shrink-0 bg-white dark:bg-card border border-border/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-foreground truncate">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{testimonial.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-success font-bold text-sm">{testimonial.earnings}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial, index) => (
                <Card key={`second-${index}`} className="w-[280px] md:w-[320px] lg:w-[360px] flex-shrink-0 bg-white dark:bg-card border border-border/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-foreground truncate">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{testimonial.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-success font-bold text-sm">{testimonial.earnings}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </section>

      {/* Compact CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-midnight-primary via-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-bright/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          {/* Compact Heading */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-white via-blue-bright to-white bg-clip-text text-transparent">
              Future?
            </span>
          </h2>

          {/* Simplified Subtitle */}
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join over 2 million students who chose success with Testbook.
          </p>

          {/* Compact CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="px-8 py-3 text-base bg-white text-midnight-primary hover:bg-white/90 shadow-xl transition-all duration-300">
              <Smartphone className="mr-2 h-5 w-5" />
              Start Free Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-base border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
              <BookOpen className="mr-2 h-5 w-5" />
              Download App
            </Button>
          </div>

          {/* Compact Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>2M+ Students</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>95% Success Rate</span>
            </div>
            <div className="flex items-center gap-1">
              <Smartphone className="h-4 w-4" />
              <span>Free App</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
