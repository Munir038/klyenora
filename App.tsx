/**
 * Klyenora — App Entry
 *
 * Wraps the entire tree in ThemeProvider and SafeAreaProvider.
 *
 * @format
 */

import React, { useCallback, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/theme';
import SplashScreen from './src/screens/splash/SplashScreen';

import { RootNavigator } from './src/navigation';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const finishSplash = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider initialMode="system">
        {showSplash ? <SplashScreen onFinish={finishSplash} /> : <AppContent />}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
