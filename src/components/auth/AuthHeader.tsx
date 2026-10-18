/**
 * AuthHeader — Branding header with logo, tagline, and optional titles
 */

import React from 'react';
import { Image, ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { FONT_FAMILY } from '../../constants/typography';
import { fs, ms, mvs } from '../../utils/metrics';
import { Text } from '../common/Text';

interface AuthHeaderProps {
  compact?: boolean;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  tagline?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  compact = false,
  style,
  imageStyle,
  tagline = 'Every client, clearly connected.',
}) => {
  return (
    <View style={[styles.headerGroup, style]}>
      <Image
        source={require('../../assets/klyenora-logo.png')}
        style={[
          compact ? styles.logoCompact : styles.logoRegular,
          imageStyle,
        ]}
        resizeMode="contain"
        accessibilityLabel="Klyenora logo"
      />
      {tagline ? (
        <Text variant="caption" style={styles.tagline}>
          {tagline}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  headerGroup: {
    alignItems: 'center',
    marginBottom: mvs(16),
  },
  logoRegular: {
    width: ms(105, 0.3),
    height: ms(105, 0.3),
  },
  logoCompact: {
    width: ms(80, 0.3),
    height: ms(80, 0.3),
  },
  tagline: {
    marginTop: mvs(-2),
    color: 'rgba(215, 232, 255, 0.85)',
    fontFamily: FONT_FAMILY.medium,
    fontSize: fs(13),
    letterSpacing: 0.3,
  },
});
