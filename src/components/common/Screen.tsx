/**
 * Screen — Themed wrapper with SafeAreaView, StatusBar, and
 * responsive padding. Use as the root of every screen.
 *
 * Usage:
 * ```tsx
 * <Screen scrollable>
 *   <Text>Hello</Text>
 * </Screen>
 * ```
 */

import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { SPACING } from '../../constants/dimensions';

interface ScreenProps {
  children: React.ReactNode;
  /** Wrap content in a ScrollView */
  scrollable?: boolean;
  /** Extra padding override */
  padding?: number;
  /** Extra styles */
  style?: ViewStyle;
  /** Remove horizontal padding */
  noPadding?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  scrollable = false,
  padding,
  style,
  noPadding = false,
}) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingHorizontal: noPadding ? 0 : (padding ?? SPACING.lg),
  };

  return (
    <View style={[containerStyle, style]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {scrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
});
