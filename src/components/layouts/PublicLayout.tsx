import { Outlet } from 'react-router-dom';
import PublicNav from '@/components/navigation/PublicNav';
import Footer from '@/components/navigation/Footer';

const PublicLayout = () => {
  console.log('PublicLayout rendering');
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;