/**
 * Responsive Helpers
 *
 * Builds on top of `metrics.ts` to provide breakpoint-aware style
 * selection and a hook that re-renders on dimension changes.
 */

import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

// ─── Breakpoints ─────────────────────────────────────────────────
export const BREAKPOINTS = {
  /** Small phone (< 360 dp) */
  xs: 0,
  /** Standard phone (360 – 599 dp) */
  sm: 360,
  /** Large phone / small tablet (600 – 767 dp) */
  md: 600,
  /** Tablet (768 – 1023 dp) */
  lg: 768,
  /** Large tablet / desktop (≥ 1024 dp) */
  xl: 1024,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Returns the current breakpoint key.
 */
export const getCurrentBreakpoint = (
  width: number = Dimensions.get('window').width,
): Breakpoint => {
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  return 'xs';
};

/**
 * Pick a value based on the current screen width.
 *
 * ```ts
 * const padding = responsiveValue({ xs: 12, sm: 16, lg: 24 });
 * ```
 */
export const responsiveValue = <T>(
  values: Partial<Record<Breakpoint, T>>,
  width?: number,
): T | undefined => {
  const bp = getCurrentBreakpoint(width);
  const ordered: Breakpoint[] = ['xl', 'lg', 'md', 'sm', 'xs'];
  const startIdx = ordered.indexOf(bp);
  for (let i = startIdx; i < ordered.length; i++) {
    if (values[ordered[i]] !== undefined) {
      return values[ordered[i]];
    }
  }
  return undefined;
};

// ─── Hook ────────────────────────────────────────────────────────
interface ResponsiveInfo {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  isPortrait: boolean;
  isTablet: boolean;
}

/**
 * A hook that re-renders the component whenever the screen dimensions
 * change (e.g. rotation, split-view on tablets).
 */
export const useResponsive = (): ResponsiveInfo => {
  const [dims, setDims] = useState<ScaledSize>(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setDims(window);
    };
    const sub = Dimensions.addEventListener('change', onChange);
    return () => sub.remove();
  }, []);

  return {
    width: dims.width,
    height: dims.height,
    breakpoint: getCurrentBreakpoint(dims.width),
    isPortrait: dims.height > dims.width,
    isTablet: dims.width >= BREAKPOINTS.md,
  };
};
