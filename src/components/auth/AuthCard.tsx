/**
 * AuthCard — Off-White elevated container for authentication forms
 */

import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
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
  return (
    <View style={[styles.card, style]}>
      {title ? (
        <Text variant="h2" style={[styles.title, titleStyle]}>
          {title}
        </Text>
      ) : null}

      {subtitle ? (
        <Text variant="bodySmall" style={[styles.subtitle, subtitleStyle]}>
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
    backgroundColor: '#FAFBFD',
    borderRadius: ms(22),
    paddingHorizontal: ms(22),
    paddingTop: mvs(22),
    paddingBottom: mvs(22),
    alignSelf: 'center',
    shadowColor: '#000826',
    shadowOffset: { width: 0, height: mvs(12) },
    shadowOpacity: 0.3,
    shadowRadius: ms(22),
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.65)',
    zIndex: 10,
  },
  title: {
    color: '#0F172A',
    fontFamily: FONT_FAMILY.bold,
    fontSize: fs(21),
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: mvs(6),
  },
  subtitle: {
    marginTop: mvs(2),
    marginBottom: mvs(16),
    color: '#64748B',
    fontFamily: FONT_FAMILY.regular,
    fontSize: fs(12.5),
    textAlign: 'center',
    letterSpacing: 0.1,
  },
});
