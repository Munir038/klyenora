/**
 * Themed Reusable TextInput Component
 *
 * Supports left & right icons, password visibility toggling,
 * focus transitions, validation error messages, and theme awareness.
 */

import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '../../theme';
import { FONT_FAMILY } from '../../constants/typography';
import { fs, ms, mvs } from '../../utils/metrics';
import { Text } from './Text';

export interface InputProps extends RNTextInputProps {
  label?: string;
  error?: string | null;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  isPassword = false,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  labelStyle,
  secureTextEntry,
  onFocus,
  onBlur,
  ...rest
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus: RNTextInputProps['onFocus'] = e => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur: RNTextInputProps['onBlur'] = e => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const isSecured = isPassword ? !showPassword : secureTextEntry;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        <Text
          variant="caption"
          style={[styles.label, labelStyle]}
        >
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: isFocused ? '#FFFFFF' : '#F8FAFC',
            borderColor: error
              ? '#EF4444'
              : isFocused
              ? '#0D81FF'
              : '#E2E8F0',
          },
          isFocused && styles.inputFocused,
          error ? styles.inputError : undefined,
          inputContainerStyle,
        ]}
      >
        {leftIcon ? <View style={styles.leftIconContainer}>{leftIcon}</View> : null}

        <RNTextInput
          style={[
            styles.textInput,
            { color: '#0F172A' },
            inputStyle,
          ]}
          placeholderTextColor="#94A3B8"
          secureTextEntry={isSecured}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {isPassword ? (
          <Pressable
            hitSlop={10}
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.eyeButton}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            <Feather
              name={showPassword ? 'eye-off' : 'eye'}
              size={ms(16)}
              color="#64748B"
            />
          </Pressable>
        ) : rightIcon ? (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        ) : null}
      </View>

      {error ? (
        <Text variant="caption" style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    marginBottom: mvs(5),
    marginLeft: ms(2),
    color: '#334155',
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: fs(11),
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: mvs(47),
    paddingHorizontal: ms(13),
    borderWidth: 1,
    borderRadius: ms(11),
  },
  inputFocused: {
    shadowColor: '#0D81FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontFamily: FONT_FAMILY.medium,
    fontSize: fs(13.5),
    paddingVertical: 0,
    marginLeft: ms(8),
  },
  leftIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeButton: {
    padding: ms(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: mvs(4),
    marginLeft: ms(2),
    color: '#EF4444',
    fontFamily: FONT_FAMILY.regular,
    fontSize: fs(10.5),
  },
});
