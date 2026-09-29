/**
 * Theme Definitions — Light & Dark
 *
 * Each theme maps semantic keys to concrete palette values.
 * Components consume `theme.colors.xxx` so they adapt automatically.
 */

import { PALETTE } from '../constants/colors';

// ─── Semantic colour map shape ───────────────────────────────────
export interface ThemeColors {
  // Backgrounds
  background: string;
  surface: string;
  surfaceVariant: string;
  card: string;

  // Text
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  // Brand
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;

  // Semantic
  success: string;
  warning: string;
  error: string;
  info: string;

  // UI elements
  border: string;
  borderLight: string;
  divider: string;
  placeholder: string;
  disabled: string;
  icon: string;
  iconSecondary: string;

  // Overlays
  overlay: string;
  backdrop: string;

  // Status bar
  statusBar: string;

  // Input
  inputBackground: string;
  inputBorder: string;
  inputText: string;

  // Tab bar / navigation
  tabBarBackground: string;
  tabBarActive: string;
  tabBarInactive: string;

  // Misc
  skeleton: string;
  ripple: string;
  shadow: string;
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
}

// ─── Light Theme ─────────────────────────────────────────────────
export const lightTheme: Theme = {
  dark: false,
  colors: {
    background: PALETTE.grey[50],
    surface: PALETTE.white,
    surfaceVariant: PALETTE.grey[100],
    card: PALETTE.white,

    text: PALETTE.grey[900],
    textSecondary: PALETTE.grey[600],
    textTertiary: PALETTE.grey[400],
    textInverse: PALETTE.white,

    primary: PALETTE.primary[500],
    primaryLight: PALETTE.primary[100],
    primaryDark: PALETTE.primary[700],
    secondary: PALETTE.secondary[500],
    secondaryLight: PALETTE.secondary[100],

    success: PALETTE.success.main,
    warning: PALETTE.warning.main,
    error: PALETTE.error.main,
    info: PALETTE.info.main,

    border: PALETTE.grey[300],
    borderLight: PALETTE.grey[200],
    divider: PALETTE.grey[200],
    placeholder: PALETTE.grey[400],
    disabled: PALETTE.grey[300],
    icon: PALETTE.grey[700],
    iconSecondary: PALETTE.grey[400],

    overlay: 'rgba(0, 0, 0, 0.5)',
    backdrop: 'rgba(0, 0, 0, 0.3)',

    statusBar: PALETTE.white,

    inputBackground: PALETTE.grey[100],
    inputBorder: PALETTE.grey[300],
    inputText: PALETTE.grey[900],

    tabBarBackground: PALETTE.white,
    tabBarActive: PALETTE.primary[500],
    tabBarInactive: PALETTE.grey[400],

    skeleton: PALETTE.grey[200],
    ripple: 'rgba(108, 60, 225, 0.12)',
    shadow: PALETTE.black,
  },
};

// ─── Dark Theme ──────────────────────────────────────────────────
export const darkTheme: Theme = {
  dark: true,
  colors: {
    background: '#0F0F14',
    surface: '#1A1A24',
    surfaceVariant: '#22222E',
    card: '#1E1E2A',

    text: '#EEEEF0',
    textSecondary: '#9E9EA8',
    textTertiary: '#6B6B78',
    textInverse: PALETTE.grey[900],

    primary: '#8B6CEF',
    primaryLight: '#2D2548',
    primaryDark: '#A78BFA',
    secondary: '#22D3EE',
    secondaryLight: '#164E56',

    success: '#4ADE80',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',

    border: '#2E2E3A',
    borderLight: '#25252F',
    divider: '#25252F',
    placeholder: '#6B6B78',
    disabled: '#3A3A46',
    icon: '#C4C4CC',
    iconSecondary: '#6B6B78',

    overlay: 'rgba(0, 0, 0, 0.7)',
    backdrop: 'rgba(0, 0, 0, 0.5)',

    statusBar: '#0F0F14',

    inputBackground: '#22222E',
    inputBorder: '#2E2E3A',
    inputText: '#EEEEF0',

    tabBarBackground: '#1A1A24',
    tabBarActive: '#8B6CEF',
    tabBarInactive: '#6B6B78',

    skeleton: '#2E2E3A',
    ripple: 'rgba(139, 108, 239, 0.2)',
    shadow: '#000000',
  },
};
