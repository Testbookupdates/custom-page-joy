import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Sun, Moon, Menu, ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import testbookLogo from '@/assets/testbook-logo.png';

const TopBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [showEarnings, setShowEarnings] = useState(false);

  return (
    <header className="flex items-center justify-between p-3 md:p-4 border-b border-border bg-gradient-glass backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile: Logo, Desktop: Sidebar trigger */}
        <div className="md:hidden">
          <img src={testbookLogo} alt="Testbook" className="h-8 w-auto" />
        </div>
        <div className="hidden md:block">
          <SidebarTrigger />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile Earnings Toggle */}
        <button
          onClick={() => setShowEarnings(!showEarnings)}
          className="md:hidden flex items-center gap-1 bg-gradient-accent px-2 py-1 rounded-full shadow-accent-glow"
        >
          <span className="font-medium text-xs">₹2.4K</span>
          <ChevronDown className={`h-3 w-3 transition-transform ${showEarnings ? 'rotate-180' : ''}`} />
        </button>

        {/* Desktop Earnings */}
        <div className="hidden md:flex items-center gap-2 bg-gradient-accent px-3 py-1 rounded-full shadow-accent-glow">
          <span className="font-medium text-sm">₹2,450</span>
        </div>

        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleTheme}
          className="p-2"
        >
          {theme === 'dark' ? 
            <Sun className="h-4 w-4 md:h-5 md:w-5" /> : 
            <Moon className="h-4 w-4 md:h-5 md:w-5" />
          }
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative p-2">
          <Bell className="h-4 w-4 md:h-5 md:w-5" />
          <Badge variant="destructive" className="absolute -top-0.5 -right-0.5 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 text-xs bg-gradient-pink">
            3
          </Badge>
        </Button>

        {/* User Profile - Simplified on mobile */}
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7 md:h-8 md:w-8 border-2 border-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">JD</AvatarFallback>
          </Avatar>
          <Badge variant="secondary" className="text-xs bg-gradient-warning hidden sm:inline-flex">
            Gold
          </Badge>
        </div>
      </div>

      {/* Mobile Earnings Dropdown */}
      {showEarnings && (
        <div className="absolute top-full left-0 right-0 bg-gradient-card border-b border-border/50 p-4 md:hidden">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-lg font-bold bg-gradient-success bg-clip-text text-transparent">₹2,450</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
            <div>
              <p className="text-lg font-bold bg-gradient-warning bg-clip-text text-transparent">₹850</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;