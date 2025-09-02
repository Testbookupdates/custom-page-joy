import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, X, Smartphone, Zap, Wifi, Bell } from 'lucide-react';
import { usePWA, shouldShowInstallPrompt } from '@/hooks/usePWA';
import { useSound } from '@/contexts/SoundContext';
import { useToast } from '@/hooks/use-toast';

interface PWAInstallPromptProps {
  className?: string;
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ className }) => {
  const { isInstallable, isInstalled, promptInstall, dismissInstallPrompt } = usePWA();
  const { playSound } = useSound();
  const { toast } = useToast();
  const [showPrompt, setShowPrompt] = useState(false);
  const [isPrompting, setIsPrompting] = useState(false);

  useEffect(() => {
    // Show prompt only if installable and user hasn't dismissed it recently
    if (isInstallable && !isInstalled && shouldShowInstallPrompt()) {
      console.log('PWA: Showing install prompt');
      // Delay showing prompt to avoid being too aggressive
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      console.log('PWA: Not showing prompt', { isInstallable, isInstalled, shouldShow: shouldShowInstallPrompt() });
    }
  }, [isInstallable, isInstalled]);

  const handleInstall = async () => {
    if (!isInstallable) return;

    setIsPrompting(true);
    playSound('click');

    try {
      await promptInstall();
      setShowPrompt(false);
      playSound('success');
      
      // Show success notification
      toast({
        title: "App Installed Successfully! 🎉",
        description: "Testbook Referrals is now installed on your device. You can access it from your home screen.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Installation failed:', error);
      playSound('error');
      
      // Show error notification
      toast({
        title: "Installation Failed",
        description: "There was an issue installing the app. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsPrompting(false);
    }
  };

  const handleDismiss = () => {
    dismissInstallPrompt();
    setShowPrompt(false);
    playSound('whoosh');
  };

  // Don't show if not installable, already installed, or user has dismissed
  if (!showPrompt || !isInstallable || isInstalled) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm ${className}`}>
      <Card className="bg-gradient-card border-border/50 shadow-glow animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Install Testbook Referrals</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  <Download className="h-3 w-3 mr-1" />
                  Free App
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-8 w-8 p-0 hover:bg-muted/50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <CardDescription className="text-sm leading-relaxed">
            Get the full app experience with faster loading, offline access, and push notifications.
          </CardDescription>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col items-center gap-1">
              <div className="p-2 rounded-full bg-success/10">
                <Zap className="h-4 w-4 text-success" />
              </div>
              <span className="text-xs text-muted-foreground">Faster</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="p-2 rounded-full bg-blue-accent/10">
                <Wifi className="h-4 w-4 text-blue-accent" />
              </div>
              <span className="text-xs text-muted-foreground">Offline</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="p-2 rounded-full bg-warning/10">
                <Bell className="h-4 w-4 text-warning" />
              </div>
              <span className="text-xs text-muted-foreground">Alerts</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleInstall}
              disabled={isPrompting}
              className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
              size="sm"
            >
              {isPrompting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                  Installing...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Install App
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleDismiss}
              size="sm"
              className="px-3 border-border/50 hover:bg-muted/50"
            >
              Later
            </Button>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground text-center">
            No data usage • Works offline • Easy to uninstall
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAInstallPrompt;