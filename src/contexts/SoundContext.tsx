import * as React from 'react';
const { createContext, useContext, useState, useCallback } = React;

interface SoundContextType {
  isSoundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playSound: (soundType: SoundType) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export type SoundType = 
  | 'notification' 
  | 'success' 
  | 'coin' 
  | 'levelUp' 
  | 'milestone' 
  | 'error' 
  | 'click'
  | 'whoosh';

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved ? JSON.parse(saved) : true;
  });

  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem('soundVolume');
    return saved ? parseFloat(saved) : 0.7;
  });

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setIsSoundEnabled(enabled);
    localStorage.setItem('soundEnabled', JSON.stringify(enabled));
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    localStorage.setItem('soundVolume', newVolume.toString());
  }, []);

  // Sound generation using Web Audio API
  const playSound = useCallback((soundType: SoundType) => {
    if (!isSoundEnabled) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configure sound based on type
      const soundConfig = getSoundConfig(soundType);
      
      oscillator.type = soundConfig.type;
      oscillator.frequency.setValueAtTime(soundConfig.frequency, audioContext.currentTime);
      
      if (soundConfig.frequencyEnd) {
        oscillator.frequency.exponentialRampToValueAtTime(
          soundConfig.frequencyEnd, 
          audioContext.currentTime + soundConfig.duration
        );
      }

      gainNode.gain.setValueAtTime(volume * soundConfig.volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001, 
        audioContext.currentTime + soundConfig.duration
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + soundConfig.duration);

      // Multiple tones for complex sounds
      if (soundConfig.additionalTones) {
        soundConfig.additionalTones.forEach((tone, index) => {
          setTimeout(() => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.type = tone.type || 'sine';
            osc.frequency.setValueAtTime(tone.frequency, audioContext.currentTime);
            gain.gain.setValueAtTime(volume * tone.volume, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + tone.duration);
            
            osc.start();
            osc.stop(audioContext.currentTime + tone.duration);
          }, tone.delay || 0);
        });
      }
    } catch (error) {
      console.warn('Could not play sound:', error);
    }
  }, [isSoundEnabled, volume]);

  return (
    <SoundContext.Provider value={{
      isSoundEnabled,
      setSoundEnabled,
      playSound,
      volume,
      setVolume
    }}>
      {children}
    </SoundContext.Provider>
  );
};

interface SoundConfig {
  type: OscillatorType;
  frequency: number;
  frequencyEnd?: number;
  duration: number;
  volume: number;
  additionalTones?: Array<{
    type?: OscillatorType;
    frequency: number;
    duration: number;
    volume: number;
    delay?: number;
  }>;
}

const getSoundConfig = (soundType: SoundType): SoundConfig => {
  const configs: Record<SoundType, SoundConfig> = {
    notification: {
      type: 'sine',
      frequency: 800,
      frequencyEnd: 600,
      duration: 0.3,
      volume: 0.3
    },
    success: {
      type: 'sine',
      frequency: 523.25, // C5
      duration: 0.15,
      volume: 0.4,
      additionalTones: [
        { frequency: 659.25, duration: 0.15, volume: 0.3, delay: 100 }, // E5
        { frequency: 783.99, duration: 0.3, volume: 0.2, delay: 200 }   // G5
      ]
    },
    coin: {
      type: 'square',
      frequency: 1000,
      frequencyEnd: 1500,
      duration: 0.1,
      volume: 0.3,
      additionalTones: [
        { type: 'sine', frequency: 2000, duration: 0.05, volume: 0.2, delay: 50 }
      ]
    },
    levelUp: {
      type: 'sine',
      frequency: 261.63, // C4
      duration: 0.2,
      volume: 0.5,
      additionalTones: [
        { frequency: 329.63, duration: 0.2, volume: 0.4, delay: 100 }, // E4
        { frequency: 392.00, duration: 0.2, volume: 0.3, delay: 200 }, // G4
        { frequency: 523.25, duration: 0.4, volume: 0.6, delay: 300 }  // C5
      ]
    },
    milestone: {
      type: 'sine',
      frequency: 440,     // A4
      duration: 0.3,
      volume: 0.5,
      additionalTones: [
        { frequency: 554.37, duration: 0.3, volume: 0.4, delay: 150 }, // C#5
        { frequency: 659.25, duration: 0.3, volume: 0.3, delay: 300 }, // E5
        { frequency: 880.00, duration: 0.6, volume: 0.4, delay: 450 }  // A5
      ]
    },
    error: {
      type: 'sawtooth',
      frequency: 200,
      frequencyEnd: 150,
      duration: 0.4,
      volume: 0.3
    },
    click: {
      type: 'sine',
      frequency: 1200,
      duration: 0.05,
      volume: 0.2
    },
    whoosh: {
      type: 'sawtooth',
      frequency: 300,
      frequencyEnd: 100,
      duration: 0.2,
      volume: 0.2
    }
  };

  return configs[soundType];
};