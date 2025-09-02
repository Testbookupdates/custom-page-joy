import { NavLink, useLocation } from 'react-router-dom';
import { Home, Trophy, User, Wallet, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { 
      path: '/app/dashboard', 
      icon: Home, 
      label: 'Home',
      badge: null
    },
    { 
      path: '/app/leaderboard', 
      icon: Trophy, 
      label: 'Ranks',
      badge: null
    },
    { 
      path: '/app/share', 
      icon: Plus, 
      label: 'Share',
      badge: null,
      special: true
    },
    { 
      path: '/app/withdrawals', 
      icon: Wallet, 
      label: 'Wallet',
      badge: '₹2.4K'
    },
    { 
      path: '/app/profile', 
      icon: User, 
      label: 'Profile',
      badge: null
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/app/dashboard' && location.pathname === '/app');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-glass backdrop-blur-md border-t border-border/50 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          if (item.special) {
            return (
              <Button
                key={item.path}
                asChild
                className="h-12 w-12 rounded-full bg-gradient-primary shadow-glow hover:shadow-neon transition-all duration-300"
              >
                <NavLink to={item.path}>
                  <Icon className="h-5 w-5" />
                </NavLink>
              </Button>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center min-w-0 flex-1 py-1 px-1 rounded-lg transition-all duration-200 relative
                ${active 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }
              `}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 mb-1 ${active ? 'scale-110' : ''} transition-transform duration-200`} />
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-6 text-xs px-1 py-0 h-4 min-w-0 bg-gradient-success"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs font-medium truncate ${active ? 'scale-105' : ''} transition-transform duration-200`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;