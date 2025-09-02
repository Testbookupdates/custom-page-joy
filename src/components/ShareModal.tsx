import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RankBadge } from "@/components/RankBadge";
import { useToast } from "@/hooks/use-toast";
import {
  Download,
  Share2,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Copy
} from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    rank: "Bronze" | "Silver" | "Gold" | "Platinum";
    totalEarnings: number;
    totalReferrals: number;
    leaderboardRank: number;
  };
  referralCode: string;
}

export default function ShareModal({ isOpen, onClose, userData, referralCode }: ShareModalProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const shareMessage = `🎉 I've earned ₹${userData.totalEarnings.toLocaleString()} through Testbook referrals! 
💰 ${userData.totalReferrals} successful referrals
🏆 ${userData.rank} rank (#${userData.leaderboardRank})

Join me with code: ${referralCode}
Get amazing discounts on test prep! 🎓`;

  const downloadCard = async () => {
    setIsGenerating(true);
    try {
      // Simulate download generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Card Downloaded! 📥",
        description: "Your referral card has been saved to downloads"
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to generate card. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const shareToSocial = (platform: string) => {
    const encodedMessage = encodeURIComponent(shareMessage);
    const baseUrl = window.location.origin;
    
    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodedMessage}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${baseUrl}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${baseUrl}&quote=${encodedMessage}`;
        break;
      case "instagram":
        // Instagram doesn't support direct URL sharing, copy to clipboard instead
        navigator.clipboard.writeText(shareMessage);
        toast({
          title: "Copied for Instagram! 📋",
          description: "Message copied to clipboard. Paste it in your Instagram story/post!"
        });
        return;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(shareMessage);
    toast({
      title: "Copied! 📋",
      description: "Share message copied to clipboard"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 gap-0 bg-background border-border">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-center text-lg font-semibold">
            Share Your Success! 🎉
          </DialogTitle>
        </DialogHeader>

        {/* Beautiful User Card */}
        <div className="p-6">
          <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 border border-primary/30 overflow-hidden relative">
            <CardContent className="p-6 text-center space-y-4">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent/30 to-primary/30 rounded-full blur-lg"></div>
              
              <div className="relative z-10 space-y-4">
                {/* Avatar */}
                <Avatar className="h-16 w-16 mx-auto border-2 border-primary/40 shadow-lg">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                {/* Name & Rank */}
                <div>
                  <h3 className="text-xl font-bold text-foreground">{userData.name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <RankBadge rank={userData.rank} size="sm" />
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      Rank #{userData.leaderboardRank}
                    </Badge>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userData.totalReferrals}</div>
                    <div className="text-sm text-muted-foreground">Referrals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">₹{userData.totalEarnings.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Earned</div>
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-background/50 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-sm text-muted-foreground italic">
                    "Sharing knowledge, earning rewards with Testbook!"
                  </p>
                </div>

                {/* Referral Code */}
                <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                  <p className="text-xs text-muted-foreground mb-1">Use my referral code:</p>
                  <p className="font-mono text-sm font-bold text-primary">{referralCode}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-0 space-y-4">
          {/* Download & Copy */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={downloadCard}
              disabled={isGenerating}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Save Card"}
            </Button>
            <Button 
              variant="outline" 
              onClick={copyMessage}
              className="flex-1"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Text
            </Button>
          </div>

          {/* Social Share */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">Share on social media</p>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="default" 
                onClick={() => shareToSocial("whatsapp")}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button 
                variant="default" 
                onClick={() => shareToSocial("instagram")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Instagram className="h-4 w-4 mr-2" />
                Instagram
              </Button>
              <Button 
                variant="default" 
                onClick={() => shareToSocial("facebook")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button 
                variant="default" 
                onClick={() => shareToSocial("twitter")}
                className="bg-sky-500 hover:bg-sky-600 text-white"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}