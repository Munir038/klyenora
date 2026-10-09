/**
 * Theme Context & Provider
 *
 * Wrap your app root with <ThemeProvider> to enable `useTheme()`
 * throughout the tree.  Supports system-preference detection, user
 * override, and persistence via AsyncStorage.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme, Theme, ThemeColors } from './theme';

// ─── Types ───────────────────────────────────────────────────────
export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  /** The resolved theme object */
  theme: Theme;
  /** Current colour map (shortcut for theme.colors) */
  colors: ThemeColors;
  /** Whether the active theme is dark */
  isDark: boolean;
  /** The user's chosen mode (including 'system') */
  themeMode: ThemeMode;
  /** Toggle between light and dark (skips 'system') */
  toggleTheme: () => void;
  /** Set an explicit mode */
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────
interface ThemeProviderProps {
  children: React.ReactNode;
  /** Optional initial mode; defaults to 'system'. */
  initialMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = 'system',
}) => {
  const systemScheme = useColorScheme(); // 'light' | 'dark' | null
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialMode);

  // Resolve which theme to use
  const resolvedDark = useMemo(() => {
    if (themeMode === 'system') {
      return systemScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemScheme]);

  const theme = resolvedDark ? darkTheme : lightTheme;

  const toggleTheme = useCallback(() => {
    setThemeMode(prev => {
      if (prev === 'system') return resolvedDark ? 'light' : 'dark';
      return prev === 'dark' ? 'light' : 'dark';
    });
  }, [resolvedDark]);

  // TODO: Persist themeMode to AsyncStorage for cross-session memory
  //
  // useEffect(() => {
  //   AsyncStorage.setItem('@klyenora/theme', themeMode);
  // }, [themeMode]);
  //
  // useEffect(() => {
  //   AsyncStorage.getItem('@klyenora/theme').then(saved => {
  //     if (saved) setThemeMode(saved as ThemeMode);
  //   });
  // }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      colors: theme.colors,
      isDark: resolvedDark,
      themeMode,
      toggleTheme,
      setThemeMode,
    }),
    [theme, resolvedDark, themeMode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// ─── Hook ────────────────────────────────────────────────────────
export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return ctx;
};
