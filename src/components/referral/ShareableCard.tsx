import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Download, Share2 } from 'lucide-react';

interface ShareableCardProps {
  name: string;
  referrals: number;
  earnings: number;
  rank: string;
  badge: string;
}

const ShareableCard = ({ name, referrals, earnings, rank, badge }: ShareableCardProps) => {
  const downloadCard = () => {
    // In a real app, this would generate and download an image
    console.log('Downloading shareable card...');
  };

  const shareCard = () => {
    if (navigator.share) {
      navigator.share({
        title: `I've earned ₹${earnings.toLocaleString()} through Testbook referrals!`,
        text: `I referred ${referrals} students and earned ₹${earnings.toLocaleString()}. Join me on Testbook!`,
        url: window.location.origin
      });
    }
  };

  return (
    <Card className="max-w-md mx-auto bg-gradient-to-br from-midnight-dark via-midnight to-midnight-light border-border/30 text-white overflow-hidden">
      <CardContent className="p-6 relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-primary/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-accent/20 rounded-full blur-lg"></div>
        
        <div className="relative z-10 text-center space-y-4">
          <Avatar className="h-20 w-20 mx-auto border-2 border-primary/30">
            <AvatarImage src="" />
            <AvatarFallback className="text-xl bg-gradient-primary text-white">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30 mt-1">
              {badge} • Rank #{rank}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{referrals}</div>
              <div className="text-sm text-white/70">Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">₹{earnings.toLocaleString()}</div>
              <div className="text-sm text-white/70">Earned</div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-white/80 italic">
              "Sharing knowledge, earning rewards with Testbook!"
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={downloadCard}
            >
              <Download className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-gradient-primary hover:bg-gradient-primary/80"
              onClick={shareCard}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareableCard;