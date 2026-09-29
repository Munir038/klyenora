/**
 * Themed Button component with loading state.
 */

import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { RADIUS, SHADOWS, SPACING, COMPONENT_HEIGHT } from '../../constants/dimensions';
import { TEXT_STYLES } from '../../constants/typography';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = true,
  style,
}) => {
  const { colors } = useTheme();

  const getContainerStyle = (): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: RADIUS.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      height: size === 'sm' ? COMPONENT_HEIGHT.buttonSmall : COMPONENT_HEIGHT.button,
      paddingHorizontal: SPACING.xl,
      ...(fullWidth ? {} : { alignSelf: 'flex-start' }),
    };

    switch (variant) {
      case 'primary':
        return { ...base, backgroundColor: colors.primary, ...SHADOWS.sm };
      case 'secondary':
        return { ...base, backgroundColor: colors.primaryLight };
      case 'outline':
        return { ...base, borderWidth: 1.5, borderColor: colors.primary, backgroundColor: 'transparent' };
      case 'ghost':
        return { ...base, backgroundColor: 'transparent' };
      case 'danger':
        return { ...base, backgroundColor: colors.error };
      default:
        return base;
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'primary':
      case 'danger':
        return '#FFFFFF';
      case 'secondary':
      case 'outline':
      case 'ghost':
        return colors.primary;
      default:
        return colors.text;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        getContainerStyle(),
        disabled && s.disabled,
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            variant="button"
            color={getTextColor()}
            style={icon ? { marginLeft: SPACING.sm } : undefined}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};

const s = StyleSheet.create({
  disabled: { opacity: 0.5 },
});
