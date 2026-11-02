/**
 * SocialAuthButton — Reusable OAuth / Google sign-in button
 */

import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../theme';
import { FONT_FAMILY } from '../../constants/typography';
import { fs, ms, mvs } from '../../utils/metrics';
import { Text } from '../common/Text';

interface SocialAuthButtonProps {
  onPress: () => void;
  provider?: 'google' | 'apple';
  label?: string;
  style?: ViewStyle;
}

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  onPress,
  provider = 'google',
  label = 'Continue with Google',
  style,
}) => {
  const { isDark } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isDark ? '#141E3C' : '#FFFFFF',
          borderColor: isDark ? '#22325A' : '#E2E8F0',
          shadowColor: isDark ? '#000000' : '#0F172A',
        },
        pressed && styles.pressed,
        style,
      ]}
    >
      {provider === 'google' ? (
        <FontAwesome
          name="google"
          size={ms(17)}
          color="#EA4335"
          style={styles.icon}
        />
      ) : (
        <FontAwesome
          name="apple"
          size={ms(18)}
          color={isDark ? '#FFFFFF' : '#000000'}
          style={styles.icon}
        />
      )}
      <Text
        variant="button"
        style={[
          styles.buttonText,
          { color: isDark ? '#FFFFFF' : '#1E293B' },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: mvs(46),
    borderWidth: 1,
    borderRadius: ms(12),
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  icon: {
    marginRight: ms(10),
  },
  buttonText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: fs(12.5),
    letterSpacing: 0.2,
  },
});
