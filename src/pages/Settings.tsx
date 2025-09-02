import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Shield, CreditCard, Moon, Sun, Volume2, VolumeX, Smartphone, Wifi } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useSound } from '@/contexts/SoundContext';
import { useNotifications } from '@/hooks/useNotifications';
import { usePWA } from '@/hooks/usePWA';
import { useState } from 'react';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { isSoundEnabled, setSoundEnabled, volume, setVolume, playSound } = useSound();
  const { permission, requestPermission, isEnabled: notificationsEnabled, setEnabled: setNotificationsEnabled } = useNotifications();
  const { isInstallable, promptInstall, isInstalled, isStandalone } = usePWA();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    referralUpdates: true,
    withdrawalAlerts: true,
    challenges: false,
  });

  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled);
    playSound(enabled ? 'success' : 'error');
  };

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled && permission.permission !== 'granted') {
      try {
        await requestPermission();
      } catch (error) {
        console.error('Failed to request notification permission:', error);
        return;
      }
    }
    setNotificationsEnabled(enabled);
  };

  const handleInstallApp = async () => {
    if (isInstallable) {
      try {
        await promptInstall();
      } catch (error) {
        console.error('Failed to install app:', error);
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card className="lg:col-span-2 bg-gradient-glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+91 9876543210" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea 
                id="bio" 
                className="w-full p-2 border rounded-md bg-background min-h-[100px]"
                placeholder="Tell us about yourself..."
              />
            </div>

            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Quick Settings */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Quick Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* PWA Debug Info */}
            <div className="p-3 bg-muted/20 rounded-lg text-xs space-y-1">
              <p><strong>PWA Debug:</strong></p>
              <p>Installable: {isInstallable ? '✅' : '❌'}</p>
              <p>Installed: {isInstalled ? '✅' : '❌'}</p>
              <p>Standalone: {isStandalone ? '✅' : '❌'}</p>
              {isInstallable && (
                <Button 
                  size="sm" 
                  onClick={handleInstallApp}
                  className="mt-2 bg-gradient-primary hover:shadow-glow"
                >
                  🚀 Force Install PWA
                </Button>
              )}
            </div>
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-muted-foreground">
                    {theme === 'dark' ? 'Dark theme active' : 'Light theme active'}
                  </p>
                </div>
              </div>
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={toggleTheme}
              />
            </div>

            <Separator />

            {/* Sound Settings */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isSoundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                <div>
                  <p className="font-medium">Sound Effects</p>
                  <p className="text-sm text-muted-foreground">
                    Notification sounds and feedback
                  </p>
                </div>
              </div>
              <Switch 
                checked={isSoundEnabled} 
                onCheckedChange={handleSoundToggle}
              />
            </div>

            {isSoundEnabled && (
              <div className="ml-8 space-y-2">
                <Label className="text-sm">Volume: {Math.round(volume * 100)}%</Label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}

            <Separator />

            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    {permission.permission === 'granted' ? 'Enabled' : 
                     permission.permission === 'denied' ? 'Blocked' : 'Not enabled'}
                  </p>
                </div>
              </div>
              <Switch 
                checked={notificationsEnabled && permission.permission === 'granted'} 
                onCheckedChange={handleNotificationToggle}
                disabled={permission.permission === 'denied'}
              />
            </div>

            {!isInstalled && isInstallable && (
              <>
                <Separator />
                
                {/* PWA Install */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Install App</p>
                      <p className="text-sm text-muted-foreground">
                        Get the native app experience
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={handleInstallApp}
                    className="bg-gradient-primary hover:shadow-glow"
                  >
                    Install
                  </Button>
                </div>
              </>
            )}

            <Separator />

            {/* Other Quick Actions */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-gradient-glass border-border/50">
                <Shield className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start bg-gradient-glass border-border/50">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Methods
              </Button>
              <Button variant="outline" className="w-full justify-start bg-gradient-glass border-border/50">
                <Bell className="h-4 w-4 mr-2" />
                Notification Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Preferences */}
      <Card className="bg-gradient-glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Communication Methods */}
            <div>
              <h4 className="font-semibold mb-4">Communication Methods</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch 
                    checked={notifications.email} 
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, email: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Browser notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.push} 
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, push: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Text message alerts</p>
                  </div>
                  <Switch 
                    checked={notifications.sms} 
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, sms: checked}))}
                  />
                </div>
              </div>
            </div>

            {/* Notification Types */}
            <div>
              <h4 className="font-semibold mb-4">Notification Types</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Referral Updates</p>
                    <p className="text-sm text-muted-foreground">New referrals and conversions</p>
                  </div>
                  <Switch 
                    checked={notifications.referralUpdates} 
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, referralUpdates: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Withdrawal Alerts</p>
                    <p className="text-sm text-muted-foreground">Payment processing updates</p>
                  </div>
                  <Switch 
                    checked={notifications.withdrawalAlerts} 
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, withdrawalAlerts: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Challenges</p>
                    <p className="text-sm text-muted-foreground">New challenges and rewards</p>
                  </div>
                  <Switch 
                    checked={notifications.challenges} 
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, challenges: checked}))}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Button className="bg-gradient-success hover:shadow-success-glow transition-all duration-300">
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-gradient-glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="bg-gradient-glass border-border/50">
              Change Password
            </Button>
            <Button variant="outline" className="bg-gradient-glass border-border/50">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="bg-gradient-glass border-border/50">
              Download My Data
            </Button>
            <Button variant="destructive" className="md:col-span-2 bg-gradient-pink hover:shadow-neon">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
