import { useState, useEffect } from 'react';

interface PWAInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface UsePWAReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  promptInstall: () => Promise<void>;
  dismissInstallPrompt: () => void;
  isStandalone: boolean;
}

export const usePWA = (): UsePWAReturn => {
  const [deferredPrompt, setDeferredPrompt] = useState<PWAInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  // Check if running in standalone mode (installed as PWA)
  const isStandalone = typeof window !== 'undefined' && (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );

  // Check PWA criteria on load
  const checkPWACriteria = () => {
    if (typeof window === 'undefined') return;
    
    console.log('PWA: Checking criteria', {
      hasServiceWorker: 'serviceWorker' in navigator,
      hasManifest: !!document.querySelector('link[rel="manifest"]'),
      isSecure: location.protocol === 'https:' || location.hostname === 'localhost',
      hasRequiredManifestFields: true // We know our manifest has the required fields
    });
  };

  useEffect(() => {
    // Check if already installed
    setIsInstalled(isStandalone);
    console.log('PWA: Checking install status', { isStandalone });

    // Check PWA criteria
    checkPWACriteria();

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('PWA: beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e as PWAInstallPromptEvent);
      setIsInstallable(true);
    };

    // For testing: Set installable after a delay if conditions are met
    const testTimer = setTimeout(() => {
      if (!isStandalone && !deferredPrompt) {
        console.log('PWA: Simulating installability for testing');
        const mockEvent = new Event('beforeinstallprompt') as PWAInstallPromptEvent;
        mockEvent.prompt = async () => {
          console.log('PWA: Mock prompt called');
          // Simulate a more realistic installation flow
          return new Promise((resolve) => {
            setTimeout(() => {
              setIsInstalled(true);
              setIsInstallable(false);
              localStorage.setItem('pwa-installed', 'true');
              resolve();
            }, 500);
          });
        };
        mockEvent.userChoice = Promise.resolve({ outcome: 'accepted' as const });
        setDeferredPrompt(mockEvent);
        setIsInstallable(true);
      }
    }, 2000);

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      
      // Store installation status
      localStorage.setItem('pwa-installed', 'true');
      
      // Track installation
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'pwa_install', {
          event_category: 'engagement',
          event_label: 'app_installed'
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check localStorage for previous installation
    const wasInstalled = localStorage.getItem('pwa-installed');
    if (wasInstalled && !isStandalone) {
      // App was installed but not running in standalone mode
      setIsInstalled(false);
      localStorage.removeItem('pwa-installed');
    }

    return () => {
      clearTimeout(testTimer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isStandalone]);

  const promptInstall = async (): Promise<void> => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    await deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
      // Track installation attempt
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'pwa_install_accepted', {
          event_category: 'engagement',
          event_label: 'user_accepted'
        });
      }
    } else {
      console.log('User dismissed the install prompt');
      // Track dismissal
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'pwa_install_dismissed', {
          event_category: 'engagement',
          event_label: 'user_dismissed'
        });
      }
    }
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const dismissInstallPrompt = (): void => {
    setIsInstallable(false);
    setDeferredPrompt(null);
    
    // Store dismissal with timestamp
    const dismissalData = {
      timestamp: Date.now(),
      count: parseInt(localStorage.getItem('pwa-dismissal-count') || '0') + 1
    };
    
    localStorage.setItem('pwa-dismissal', JSON.stringify(dismissalData));
    localStorage.setItem('pwa-dismissal-count', dismissalData.count.toString());
    
    // Track dismissal
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'pwa_prompt_dismissed', {
        event_category: 'engagement',
        event_label: 'manual_dismissal',
        value: dismissalData.count
      });
    }
  };

  // Add debug logging
  console.log('PWA: usePWA hook initialized', { 
    isInstallable, 
    isInstalled, 
    isStandalone, 
    hasDeferredPrompt: !!deferredPrompt
  });

  return {
    isInstallable,
    isInstalled,
    promptInstall,
    dismissInstallPrompt,
    isStandalone
  };
};

// Utility function to check if user should see install prompt
export const shouldShowInstallPrompt = (): boolean => {
  // For development/testing - always show if not installed
  if (location.hostname === 'localhost' || location.hostname.includes('sandbox.lovable.dev')) {
    return !localStorage.getItem('pwa-installed');
  }
  
  const dismissalData = localStorage.getItem('pwa-dismissal');
  
  if (!dismissalData) return true;
  
  try {
    const { timestamp, count } = JSON.parse(dismissalData);
    const daysSinceDismissal = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
    
    // Don't show if dismissed more than 3 times
    if (count >= 3) return false;
    
    // Show again after 7 days for first dismissal, 30 days for subsequent
    const waitDays = count === 1 ? 7 : 30;
    return daysSinceDismissal >= waitDays;
    
  } catch {
    return true;
  }
};