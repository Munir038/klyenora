/**
 * Spacing, border-radius, shadow, and elevation tokens.
 */

import { moderateScale, verticalScale } from '../utils/metrics';

// ─── Spacing (used for margin / padding) ─────────────────────────
export const SPACING = {
  /** 4 dp */
  xs: moderateScale(4),
  /** 8 dp */
  sm: moderateScale(8),
  /** 12 dp */
  md: moderateScale(12),
  /** 16 dp */
  lg: moderateScale(16),
  /** 20 dp */
  xl: moderateScale(20),
  /** 24 dp */
  xxl: moderateScale(24),
  /** 32 dp */
  xxxl: moderateScale(32),
  /** 40 dp */
  huge: moderateScale(40),
  /** 48 dp */
  massive: moderateScale(48),
} as const;

// ─── Border Radius ───────────────────────────────────────────────
export const RADIUS = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(12),
  lg: moderateScale(16),
  xl: moderateScale(20),
  xxl: moderateScale(24),
  round: 9999,
} as const;

// ─── Shadows / Elevation ────────────────────────────────────────
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
} as const;

// ─── Icon sizes (responsive) ─────────────────────────────────────
export const ICON_SIZE = {
  xs: moderateScale(14),
  sm: moderateScale(18),
  md: moderateScale(24),
  lg: moderateScale(32),
  xl: moderateScale(40),
} as const;

// ─── Hit-slop (touch targets) ────────────────────────────────────
export const HIT_SLOP = {
  sm: { top: 8, right: 8, bottom: 8, left: 8 },
  md: { top: 12, right: 12, bottom: 12, left: 12 },
  lg: { top: 16, right: 16, bottom: 16, left: 16 },
} as const;

// ─── Component-specific heights ──────────────────────────────────
export const COMPONENT_HEIGHT = {
  inputField: verticalScale(48),
  button: verticalScale(48),
  buttonSmall: verticalScale(36),
  header: verticalScale(56),
  tabBar: verticalScale(64),
  card: verticalScale(120),
} as const;
