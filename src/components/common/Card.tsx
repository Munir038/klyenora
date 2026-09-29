/**
 * Themed Card component
 */

import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { RADIUS, SHADOWS, SPACING } from '../../constants/dimensions';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  elevated = true,
}) => {
  const { colors } = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: colors.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...(elevated ? SHADOWS.md : {}),
    borderWidth: elevated ? 0 : 1,
    borderColor: colors.borderLight,
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          cardStyle,
          pressed && { opacity: 0.92 },
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <Pressable style={[cardStyle, style]} disabled>
      {children}
    </Pressable>
  );
};
