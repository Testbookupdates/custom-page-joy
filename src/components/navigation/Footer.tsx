import { Link } from 'react-router-dom';
import testbookLogo from '@/assets/testbook-logo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img 
                src={testbookLogo} 
                alt="Testbook Referrals" 
                className="h-8 md:h-10 w-auto"
              />
            </Link>
            <p className="text-muted-foreground max-w-md text-sm md:text-base">
              Join India's largest test preparation platform and earn rewards while helping others succeed in their competitive exams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-base">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link to="/guidelines" className="text-muted-foreground hover:text-foreground transition-colors">
                  Guidelines
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-base">Legal</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Testbook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;