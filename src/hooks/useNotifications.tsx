import { useState, useEffect, useCallback } from 'react';
import { useSound } from '@/contexts/SoundContext';

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  silent?: boolean;
  soundType?: 'notification' | 'success' | 'error' | 'milestone' | 'coin';
  data?: any;
}

export interface NotificationPermissionState {
  permission: NotificationPermission;
  isSupported: boolean;
  canRequest: boolean;
}

export interface UseNotificationsReturn {
  permission: NotificationPermissionState;
  requestPermission: () => Promise<NotificationPermission>;
  showNotification: (options: NotificationOptions) => Promise<void>;
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
  subscribe: () => Promise<PushSubscription | null>;
  unsubscribe: () => Promise<boolean>;
  isSubscribed: boolean;
}

export const useNotifications = (): UseNotificationsReturn => {
  const { playSound } = useSound();
  const [permission, setPermission] = useState<NotificationPermissionState>({
    permission: 'default',
    isSupported: 'Notification' in window,
    canRequest: true
  });
  
  const [isEnabled, setIsEnabled] = useState(() => {
    const saved = localStorage.getItem('notifications-enabled');
    return saved ? JSON.parse(saved) : false;
  });

  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(prev => ({
        ...prev,
        permission: Notification.permission,
        canRequest: Notification.permission === 'default'
      }));

      // Check if we have an active subscription
      checkSubscriptionStatus();
    }
  }, []);

  const checkSubscriptionStatus = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          const subscription = await registration.pushManager.getSubscription();
          setIsSubscribed(!!subscription);
        }
      } catch (error) {
        console.warn('Error checking subscription status:', error);
      }
    }
  };

  const setEnabled = useCallback((enabled: boolean) => {
    setIsEnabled(enabled);
    localStorage.setItem('notifications-enabled', JSON.stringify(enabled));
  }, []);

  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications');
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      throw new Error('Notification permission denied');
    }

    try {
      const result = await Notification.requestPermission();
      
      setPermission(prev => ({
        ...prev,
        permission: result,
        canRequest: result === 'default'
      }));

      if (result === 'granted') {
        setEnabled(true);
        playSound('success');
      } else {
        playSound('error');
      }

      // Track permission result
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'notification_permission', {
          event_category: 'engagement',
          event_label: result
        });
      }

      return result;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      playSound('error');
      throw error;
    }
  }, [playSound, setEnabled]);

  const showNotification = useCallback(async (options: NotificationOptions): Promise<void> => {
    if (!isEnabled || permission.permission !== 'granted') {
      console.warn('Notifications not enabled or permission not granted');
      return;
    }

    // Play sound first
    if (options.soundType && !options.silent) {
      playSound(options.soundType);
    }

    try {
      // Try to use service worker notification first
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.showNotification(options.title, {
            body: options.body,
            icon: options.icon || '/pwa-192x192.png',
            badge: options.badge || '/pwa-192x192.png',
            tag: options.tag,
            silent: options.silent,
            data: options.data,
            timestamp: Date.now(),
            requireInteraction: false
          } as any);
          return;
        }
      }

      // Fallback to regular notification
      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/pwa-192x192.png',
        tag: options.tag,
        silent: options.silent,
        data: options.data
      });

      // Auto-close after 6 seconds
      setTimeout(() => {
        notification.close();
      }, 6000);

      // Handle click
      notification.onclick = () => {
        window.focus();
        notification.close();
        
        // Handle custom click action
        if (options.data?.url) {
          window.location.href = options.data.url;
        }
      };

    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }, [isEnabled, permission.permission, playSound]);

  const subscribe = useCallback(async (): Promise<PushSubscription | null> => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      throw new Error('Push notifications not supported');
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) {
        throw new Error('Service worker not registered');
      }

      // Check if already subscribed
      let subscription = await registration.pushManager.getSubscription();
      
      if (!subscription) {
        // Create new subscription
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(getVapidPublicKey())
        });
      }

      setIsSubscribed(true);
      
      // Send subscription to server
      await sendSubscriptionToServer(subscription);
      
      return subscription;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      playSound('error');
      throw error;
    }
  }, [playSound]);

  const unsubscribe = useCallback(async (): Promise<boolean> => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) return false;

      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) return true;

      const successful = await subscription.unsubscribe();
      setIsSubscribed(!successful);
      
      if (successful) {
        // Remove subscription from server
        await removeSubscriptionFromServer(subscription);
        playSound('success');
      }
      
      return successful;
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      playSound('error');
      return false;
    }
  }, [playSound]);

  return {
    permission,
    requestPermission,
    showNotification,
    isEnabled,
    setEnabled,
    subscribe,
    unsubscribe,
    isSubscribed
  };
};

// Helper functions
const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const getVapidPublicKey = (): string => {
  // This should be your VAPID public key
  // For demo purposes, using a placeholder
  return 'BEl62iUYgUivxIkv69yViEuiBIa40HI80NqIkYy5Xa-LLPFEjktqkD0DVv4L7-mDjvNJh7Y8J_FiJXG8ZNMx-74';
};

const sendSubscriptionToServer = async (subscription: PushSubscription): Promise<void> => {
  try {
    // In a real app, send this to your backend
    console.log('Push subscription:', JSON.stringify(subscription));
    
    // Store locally for demo
    localStorage.setItem('push-subscription', JSON.stringify(subscription));
    
    // Track subscription
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'push_subscription_created', {
        event_category: 'engagement',
        event_label: 'user_subscribed'
      });
    }
  } catch (error) {
    console.error('Error sending subscription to server:', error);
  }
};

const removeSubscriptionFromServer = async (subscription: PushSubscription): Promise<void> => {
  try {
    // In a real app, remove this from your backend
    console.log('Removing push subscription:', JSON.stringify(subscription));
    
    // Remove from local storage
    localStorage.removeItem('push-subscription');
    
    // Track unsubscription
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'push_subscription_removed', {
        event_category: 'engagement',
        event_label: 'user_unsubscribed'
      });
    }
  } catch (error) {
    console.error('Error removing subscription from server:', error);
  }
};

// Notification presets for common scenarios
export const NotificationPresets = {
  referralSuccess: (referrerName: string, amount: number): NotificationOptions => ({
    title: '🎉 New Referral!',
    body: `${referrerName} joined through your link. You earned ₹${amount}!`,
    soundType: 'coin',
    tag: 'referral-success',
    data: { url: '/app/dashboard' }
  }),

  milestoneReached: (milestone: string, reward: number): NotificationOptions => ({
    title: '🏆 Milestone Achieved!',
    body: `You've reached ${milestone} and earned ₹${reward} bonus!`,
    soundType: 'milestone',
    tag: 'milestone',
    data: { url: '/app/dashboard' }
  }),

  withdrawalProcessed: (amount: number): NotificationOptions => ({
    title: '💰 Withdrawal Processed',
    body: `Your withdrawal of ₹${amount} has been processed successfully!`,
    soundType: 'success',
    tag: 'withdrawal',
    data: { url: '/app/withdrawals' }
  }),

  challengeCompleted: (challengeName: string, reward: number): NotificationOptions => ({
    title: '⚡ Challenge Complete!',
    body: `You completed "${challengeName}" and earned ₹${reward}!`,
    soundType: 'success',
    tag: 'challenge',
    data: { url: '/app/challenges' }
  }),

  streakMaintained: (days: number): NotificationOptions => ({
    title: '🔥 Streak Alive!',
    body: `Amazing! You've maintained your ${days}-day referral streak!`,
    soundType: 'notification',
    tag: 'streak',
    data: { url: '/app/streaks' }
  })
};