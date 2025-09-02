import { Outlet, Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/navigation/AppSidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomNav from '@/components/navigation/BottomNav';
import { useAuth } from '@/contexts/AuthContext';

const AuthenticatedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        
        <div className="flex-1 flex flex-col">
          {/* Top Bar - Simplified on mobile */}
          <TopBar />
          
          {/* Main Content with bottom padding for mobile nav */}
          <main className="flex-1 overflow-auto pb-16 md:pb-0">
            <Outlet />
          </main>
          
          {/* Bottom Navigation - Mobile only */}
          <div className="md:hidden">
            <BottomNav />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AuthenticatedLayout;