import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SoundProvider } from "@/contexts/SoundContext";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import PublicLayout from "@/components/layouts/PublicLayout";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/Login";

// Authenticated pages
import ReferralDashboard from "./pages/ReferralDashboard";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Withdraw from "./pages/Withdraw";
import Challenges from "./pages/Challenges";
import Streaks from "./pages/Streaks";
import Settings from "./pages/Settings";
import Guidelines from "./pages/Guidelines";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";

import ErrorBoundary from "@/components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendering');
  
  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  return (
  <ErrorBoundary>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SoundProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<Index />} />
                  <Route path="login" element={<Login />} />
                  <Route path="guidelines" element={<Guidelines />} />
                </Route>

                {/* Authenticated Routes */}
                <Route path="/app" element={<AuthenticatedLayout />}>
                  <Route index element={<ReferralDashboard />} />
                  <Route path="dashboard" element={<ReferralDashboard />} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="withdraw" element={<Withdraw />} />
                  <Route path="challenges" element={<Challenges />} />
                  <Route path="streaks" element={<Streaks />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="guidelines" element={<Guidelines />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* PWA Install Prompt */}
              <PWAInstallPrompt />
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </SoundProvider>
    </ThemeProvider>
  </QueryClientProvider>
  </ErrorBoundary>
  );
};

export default App;
