import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Trophy,
  User,
  Wallet,
  Target,
  Flame,
  Settings,
  FileText,
  Home
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';

const navigation = [
  { title: 'Dashboard', url: '/app/dashboard', icon: Home },
  { title: 'Leaderboard', url: '/app/leaderboard', icon: Trophy },
  { title: 'Profile', url: '/app/profile', icon: User },
  { title: 'Withdrawals', url: '/app/withdrawals', icon: Wallet },
  { title: 'Challenges', url: '/app/challenges', icon: Target },
  { title: 'Streaks', url: '/app/streaks', icon: Flame },
  { title: 'Settings', url: '/app/settings', icon: Settings },
  { title: 'Guidelines', url: '/app/guidelines', icon: FileText },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={isCollapsed ? 'w-[72px]' : 'w-64'} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground">
            {!isCollapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`
                      ${isActive(item.url) 
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                      }
                      transition-colors duration-200
                    `}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;