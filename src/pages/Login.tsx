import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Mail, Phone, Shield, ArrowRight } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/app/dashboard');
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpSent) {
      // Send OTP
      setIsOtpSent(true);
    } else {
      // Verify OTP and login
      login();
      navigate('/app/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
      <Card className="w-full max-w-md bg-gradient-glass backdrop-blur-sm border-border/50 shadow-glow">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-neon bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Choose your preferred login method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-gradient-card">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </TabsTrigger>
            </TabsList>

            {/* Email Login */}
            <TabsContent value="email" className="space-y-4">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-gradient-glass border-border/50"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password"
                    className="bg-gradient-glass border-border/50"
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  Sign In with Email
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>

            {/* Phone Login */}
            <TabsContent value="phone" className="space-y-4">
              <form onSubmit={handlePhoneLogin} className="space-y-4">
                {!isOtpSent ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+91 9876543210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-gradient-glass border-border/50"
                        required 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-accent hover:shadow-accent-glow transition-all duration-300"
                    >
                      Send OTP
                      <Shield className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="text-center p-4 bg-gradient-success/10 rounded-lg border border-success/20">
                      <Shield className="h-8 w-8 mx-auto mb-2 text-success" />
                      <p className="text-sm text-success font-medium">
                        OTP sent to {phoneNumber}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Please check your messages
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input 
                        id="otp" 
                        type="text" 
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        className="bg-gradient-glass border-border/50 text-center font-mono text-lg"
                        required 
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        type="button"
                        variant="outline"
                        className="flex-1 bg-gradient-glass border-border/50"
                        onClick={() => setIsOtpSent(false)}
                      >
                        Change Number
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-gradient-success hover:shadow-success-glow transition-all duration-300"
                      >
                        Verify & Login
                      </Button>
                    </div>
                    
                    <Button 
                      type="button" 
                      variant="link" 
                      className="w-full text-sm text-muted-foreground"
                    >
                      Resend OTP (30s)
                    </Button>
                  </>
                )}
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Button variant="link" className="text-sm text-muted-foreground">
              Forgot your password?
            </Button>
          </div>

          {/* Demo Login for Testing */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-center text-xs text-muted-foreground mb-3">
              For demo purposes:
            </p>
            <Button 
              onClick={handleEmailLogin}
              variant="outline" 
              className="w-full bg-gradient-glass border-border/50 hover:bg-gradient-primary hover:text-white transition-all duration-300"
            >
              🚀 Quick Demo Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;