/**
 * Theme Context & Provider
 *
 * Wrap your app root with <ThemeProvider> to enable `useTheme()`
 * throughout the tree. Supports system-preference detection, user
 * override, and local persistence via AsyncStorage.
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme, Theme, ThemeColors } from './theme';

// ─── Types ───────────────────────────────────────────────────────
export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = '@klyenora/theme_preference';

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
  /** Set an explicit mode and save to local storage */
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
  const [themeMode, setThemeModeState] = useState<ThemeMode>(initialMode);

  // ─── Load saved preference from local storage ─────────────────
  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then(saved => {
        if (isMounted && (saved === 'light' || saved === 'dark' || saved === 'system')) {
          setThemeModeState(saved);
        }
      })
      .catch(err => {
        console.warn('Failed to load theme preference from AsyncStorage:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // ─── Persist preference to local storage ───────────────────────
  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    AsyncStorage.setItem(STORAGE_KEY, mode).catch(err => {
      console.warn('Failed to save theme preference to AsyncStorage:', err);
    });
  }, []);

  // Resolve which theme to use
  const resolvedDark = useMemo(() => {
    if (themeMode === 'system') {
      return systemScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemScheme]);

  const theme = resolvedDark ? darkTheme : lightTheme;

  const toggleTheme = useCallback(() => {
    const nextMode: ThemeMode = resolvedDark ? 'light' : 'dark';
    setThemeMode(nextMode);
  }, [resolvedDark, setThemeMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      colors: theme.colors,
      isDark: resolvedDark,
      themeMode,
      toggleTheme,
      setThemeMode,
    }),
    [theme, resolvedDark, themeMode, toggleTheme, setThemeMode],
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
