/**
 * GradientButton — Premium glowing gradient action button
 *
 * Supports linear gradients, ambient bottom glow, activity spinner,
 * and tactile press animations.
 */

import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FONT_FAMILY } from '../../constants/typography';
import { fs, ms, mvs } from '../../utils/metrics';
import { Text } from './Text';

export interface GradientButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  colors?: string[];
  gradientLocations?: number[];
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  textStyle?: TextStyle;
  glow?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  colors = ['#0D81FF', '#0865EA', '#0052CC'],
  gradientLocations,
  icon,
  rightIcon,
  style,
  contentContainerStyle,
  textStyle,
  glow = true,
}) => {
  const isActionDisabled = disabled || loading;

  return (
    <View style={[styles.glowWrapper, style]}>
      {glow && !isActionDisabled ? (
        <View pointerEvents="none" style={styles.ambientGlow} />
      ) : null}

      <Pressable
        accessibilityRole="button"
        disabled={isActionDisabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.pressable,
          pressed && styles.pressed,
          isActionDisabled && styles.disabled,
        ]}
      >
        <LinearGradient
          colors={colors}
          locations={gradientLocations}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, contentContainerStyle]}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <View style={styles.contentRow}>
              {icon ? <View style={styles.leftIcon}>{icon}</View> : null}
              <Text variant="button" style={[styles.title, textStyle]}>
                {title}
              </Text>
              {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}
            </View>
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  glowWrapper: {
    position: 'relative',
    width: '100%',
  },
  ambientGlow: {
    position: 'absolute',
    bottom: mvs(-5),
    left: '12%',
    right: '12%',
    height: mvs(16),
    borderRadius: ms(30),
    backgroundColor: 'rgba(13, 129, 255, 0.22)',
  },
  pressable: {
    height: mvs(47),
    borderRadius: ms(11),
    overflow: 'hidden',
    shadowColor: '#0D81FF',
    shadowOffset: { width: 0, height: mvs(6) },
    shadowOpacity: 0.32,
    shadowRadius: ms(12),
    elevation: 6,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.65,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: FONT_FAMILY.bold,
    fontSize: fs(13.5),
    letterSpacing: 0.5,
  },
  leftIcon: {
    marginRight: ms(8),
  },
  rightIcon: {
    marginLeft: ms(6),
  },
});
