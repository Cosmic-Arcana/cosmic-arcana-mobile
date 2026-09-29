import { Platform } from 'react-native';

export const GRAPHICS_MODES = ['light', 'medium', 'heavy'] as const;
export type GraphicsMode = (typeof GRAPHICS_MODES)[number];

export type MobileGraphicsCapability = {
  allowMotion: boolean;
  maxMode: GraphicsMode;
  reason: string;
};

const major = (): number => {
  const raw = Platform.Version;
  const parsed = typeof raw === 'string' ? parseInt(raw, 10) : Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const assessMobileGraphics = (): MobileGraphicsCapability => {
  const version = major();
  if (Platform.OS === 'android' && version > 0 && version < 26) {
    return {
      allowMotion: false,
      maxMode: 'light',
      reason: 'This Android version is treated as too old for card motion.',
    };
  }
  if (Platform.OS === 'ios' && version > 0 && version < 13) {
    return {
      allowMotion: false,
      maxMode: 'light',
      reason: 'This iOS version is treated as too old for card motion.',
    };
  }
  return {
    allowMotion: true,
    maxMode: 'heavy',
    reason: 'This OS version should handle light, medium, or heavy card motion.',
  };
};
