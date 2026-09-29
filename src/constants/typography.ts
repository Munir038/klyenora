/**
 * Typography tokens — responsive font sizes, weights, and
 * pre-built text-style presets.
 */

import { TextStyle } from 'react-native';
import { fontScale, moderateScale } from '../utils/metrics';

// ─── Font Family ─────────────────────────────────────────────────
export const FONT_FAMILY = {
  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  bold: 'Montserrat-Bold',
  semiBold: 'Montserrat-SemiBold',
  italic: 'Montserrat-MediumItalic',
} as const;

// ─── Font Sizes (responsive) ────────────────────────────────────
export const FONT_SIZE = {
  /** 10 dp */
  xxs: fontScale(10),
  /** 12 dp */
  xs: fontScale(12),
  /** 14 dp */
  sm: fontScale(14),
  /** 16 dp */
  md: fontScale(16),
  /** 18 dp */
  lg: fontScale(18),
  /** 20 dp */
  xl: fontScale(20),
  /** 24 dp */
  xxl: fontScale(24),
  /** 28 dp */
  xxxl: fontScale(28),
  /** 32 dp */
  display: fontScale(32),
  /** 40 dp */
  hero: fontScale(40),
} as const;

// ─── Line Heights (responsive) ──────────────────────────────────
export const LINE_HEIGHT = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

// ─── Letter Spacing ──────────────────────────────────────────────
export const LETTER_SPACING = {
  tight: moderateScale(-0.5),
  normal: 0,
  wide: moderateScale(0.5),
  wider: moderateScale(1),
} as const;

// ─── Pre-built Text Style Presets ────────────────────────────────
export const TEXT_STYLES: Record<string, TextStyle> = {
  hero: {
    fontSize: FONT_SIZE.hero,
    fontWeight: '700',
    letterSpacing: LETTER_SPACING.tight,
    lineHeight: FONT_SIZE.hero * LINE_HEIGHT.tight,
  },
  h1: {
    fontSize: FONT_SIZE.display,
    fontWeight: '700',
    letterSpacing: LETTER_SPACING.tight,
    lineHeight: FONT_SIZE.display * LINE_HEIGHT.tight,
  },
  h2: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: '700',
    lineHeight: FONT_SIZE.xxxl * LINE_HEIGHT.tight,
  },
  h3: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '600',
    lineHeight: FONT_SIZE.xxl * LINE_HEIGHT.tight,
  },
  h4: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '600',
    lineHeight: FONT_SIZE.xl * LINE_HEIGHT.normal,
  },
  h5: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    lineHeight: FONT_SIZE.lg * LINE_HEIGHT.normal,
  },
  body: {
    fontSize: FONT_SIZE.md,
    fontWeight: '400',
    lineHeight: FONT_SIZE.md * LINE_HEIGHT.normal,
  },
  bodySmall: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '400',
    lineHeight: FONT_SIZE.sm * LINE_HEIGHT.normal,
  },
  caption: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '400',
    lineHeight: FONT_SIZE.xs * LINE_HEIGHT.normal,
  },
  overline: {
    fontSize: FONT_SIZE.xxs,
    fontWeight: '600',
    letterSpacing: LETTER_SPACING.wider,
    textTransform: 'uppercase',
    lineHeight: FONT_SIZE.xxs * LINE_HEIGHT.normal,
  },
  button: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    letterSpacing: LETTER_SPACING.wide,
    lineHeight: FONT_SIZE.md * LINE_HEIGHT.normal,
  },
  link: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    textDecorationLine: 'underline',
    lineHeight: FONT_SIZE.md * LINE_HEIGHT.normal,
  },
} as const;
