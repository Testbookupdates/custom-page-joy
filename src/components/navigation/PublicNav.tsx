import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import testbookLogo from '@/assets/testbook-logo.png';

const PublicNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-gradient-glass backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={testbookLogo} 
              alt="Testbook" 
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-primary text-sm">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-gradient-glass">
            <div className="flex flex-col space-y-3">
              <Button 
                variant="ghost" 
                asChild 
                className="justify-start text-base py-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button 
                asChild 
                className="bg-gradient-primary text-base py-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicNav;