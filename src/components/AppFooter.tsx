import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import testbookLogo from "@/assets/testbook-logo.png";

export function AppFooter() {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src={testbookLogo} alt="Testbook" className="h-6 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              Earn as you help others learn.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Dashboard</Link></li>
              <li><Link to="/leaderboard" className="text-muted-foreground hover:text-foreground">Leaderboard</Link></li>
              <li><Link to="/challenges" className="text-muted-foreground hover:text-foreground">Challenges</Link></li>
              <li><Link to="/guidelines" className="text-muted-foreground hover:text-foreground">Guidelines</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">FAQs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Report an issue</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms & Conditions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Refunds</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Testbook. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Version 1.0.0</span>
            <span>•</span>
            <span>Region: India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}