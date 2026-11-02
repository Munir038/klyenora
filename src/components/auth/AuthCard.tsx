/**
 * AuthCard — Elevated container for authentication forms with dark/light mode support
 */

import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { FONT_FAMILY } from '../../constants/typography';
import { fs, ms, mvs } from '../../utils/metrics';
import { Text } from '../common/Text';

interface AuthCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  children,
  title,
  subtitle,
  style,
  titleStyle,
  subtitleStyle,
}) => {
  const { isDark } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? '#0E1736' : '#FAFBFD',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.65)',
          shadowColor: isDark ? '#000000' : '#000826',
        },
        style,
      ]}
    >
      {title ? (
        <Text
          variant="h2"
          style={[
            styles.title,
            { color: isDark ? '#FFFFFF' : '#0F172A' },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      ) : null}

      {subtitle ? (
        <Text
          variant="bodySmall"
          style={[
            styles.subtitle,
            { color: isDark ? '#94A3B8' : '#64748B' },
            subtitleStyle,
          ]}
        >
          {subtitle}
        </Text>
      ) : null}

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '92%',
    maxWidth: ms(440),
    borderRadius: ms(22),
    paddingHorizontal: ms(22),
    paddingTop: mvs(22),
    paddingBottom: mvs(22),
    alignSelf: 'center',
    shadowOffset: { width: 0, height: mvs(12) },
    shadowOpacity: 0.35,
    shadowRadius: ms(24),
    elevation: 12,
    borderWidth: 1,
    zIndex: 10,
  },
  title: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: fs(21),
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: mvs(6),
  },
  subtitle: {
    marginTop: mvs(2),
    marginBottom: mvs(16),
    fontFamily: FONT_FAMILY.regular,
    fontSize: fs(12.5),
    textAlign: 'center',
    letterSpacing: 0.1,
  },
});
