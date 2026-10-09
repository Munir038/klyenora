/**
 * Color Palette — Klyenora Design System
 *
 * All raw colour tokens live here.  Screens and components should
 * consume colours through the theme (see `theme.ts`), never import
 * this file directly.
 */

export const PALETTE = {
  // ── Primary ──────────────────────────────────────
  primary: {
    50: '#EDE7F6',
    100: '#D1C4E9',
    200: '#B39DDB',
    300: '#9575CD',
    400: '#7E57C2',
    500: '#6C3CE1', // main brand
    600: '#5E35B1',
    700: '#512DA8',
    800: '#4527A0',
    900: '#311B92',
  },

  // ── Secondary / Accent ───────────────────────────
  secondary: {
    50: '#E0F7FA',
    100: '#B2EBF2',
    200: '#80DEEA',
    300: '#4DD0E1',
    400: '#26C6DA',
    500: '#00BCD4',
    600: '#00ACC1',
    700: '#0097A7',
    800: '#00838F',
    900: '#006064',
  },

  // ── Semantic ─────────────────────────────────────
  success: {
    light: '#66BB6A',
    main: '#2E7D32',
    dark: '#1B5E20',
  },
  warning: {
    light: '#FFA726',
    main: '#F57C00',
    dark: '#E65100',
  },
  error: {
    light: '#EF5350',
    main: '#D32F2F',
    dark: '#B71C1C',
  },
  info: {
    light: '#42A5F5',
    main: '#1976D2',
    dark: '#0D47A1',
  },

  // ── Neutrals ─────────────────────────────────────
  white: '#FFFFFF',
  black: '#000000',
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // ── Transparent helpers ──────────────────────────
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;
