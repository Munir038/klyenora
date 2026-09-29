/**
 * Responsive Metrics Utility
 *
 * All UI dimensions should be expressed through these helpers
 * so the app looks consistent across phones and tablets.
 *
 * Design base: 375 × 812 (iPhone X / standard Figma artboard)
 */

import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

// ─── Raw screen dimensions ───────────────────────────────────────
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Design-time reference ──────────────────────────────────────
const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

// ─── Percentage-based helpers ────────────────────────────────────
/**
 * Width-percentage: converts a percentage of the design width to
 * the device's actual width.
 *
 * Usage:  `width: wp(90)` → 90 % of screen width
 */
export const wp = (percentage: number): number => {
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * percentage) / 100);
};

/**
 * Height-percentage: converts a percentage of the design height to
 * the device's actual height.
 */
export const hp = (percentage: number): number => {
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * percentage) / 100);
};

// ─── Scale-factor helpers ────────────────────────────────────────
const widthScale = SCREEN_WIDTH / DESIGN_WIDTH;
const heightScale = SCREEN_HEIGHT / DESIGN_HEIGHT;

/**
 * Horizontal scale — use for widths, horizontal paddings/margins, border radii.
 */
export const scale = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * widthScale);
};

/**
 * Vertical scale — use for heights, vertical paddings/margins, line-heights.
 */
export const verticalScale = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * heightScale);
};

/**
 * Moderate scale — a dampened scale that avoids extremes on very
 * large or very small screens.
 *
 * @param size     The design-time value
 * @param factor   Dampening factor (0 = no scaling, 1 = full scaling). Default 0.5
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  return PixelRatio.roundToNearestPixel(size + (scale(size) - size) * factor);
};

/**
 * Moderate vertical scale.
 */
export const moderateVerticalScale = (size: number, factor: number = 0.5): number => {
  return PixelRatio.roundToNearestPixel(size + (verticalScale(size) - size) * factor);
};

// ─── Font scaling ────────────────────────────────────────────────
/**
 * Responsive font size — moderate-scaled so text doesn't blow up
 * on tablets or shrink on small phones.
 */
export const fontScale = (size: number): number => {
  const scaledSize = moderateScale(size, 0.4);
  // Respect the user's OS-level font-size preference
  return PixelRatio.roundToNearestPixel(scaledSize);
};

// ─── Handy constants ─────────────────────────────────────────────
export const METRICS = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  isSmallDevice: SCREEN_WIDTH < 375,
  isLargeDevice: SCREEN_WIDTH >= 768,
  isTablet: SCREEN_WIDTH >= 600,
  statusBarHeight:
    Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 44,
  bottomSpace: Platform.OS === 'ios' ? 34 : 0,
  pixelRatio: PixelRatio.get(),
  fontScaleFactor: PixelRatio.getFontScale(),
} as const;

// ─── Short aliases for convenience ───────────────────────────────
export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;
export const fs = fontScale;
