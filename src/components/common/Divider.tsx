/**
 * Divider / Separator
 *
 * Supports horizontal/vertical rules and optional centered label text (e.g. "OR").
 */

import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { SPACING } from '../../constants/dimensions';
import { FONT_FAMILY } from '../../constants/typography';
import { fs, ms } from '../../utils/metrics';
import { Text } from './Text';

export interface DividerProps {
  vertical?: boolean;
  spacing?: number;
  color?: string;
  label?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const Divider: React.FC<DividerProps> = ({
  vertical = false,
  spacing,
  color,
  label,
  style,
  labelStyle,
}) => {
  const { colors } = useTheme();
  const dividerColor = color ?? colors.divider;

  if (vertical) {
    return (
      <View
        style={[
          styles.verticalLine,
          {
            backgroundColor: dividerColor,
            marginHorizontal: spacing ?? SPACING.md,
          },
          style,
        ]}
      />
    );
  }

  if (label) {
    return (
      <View
        style={[
          styles.labeledRow,
          { marginVertical: spacing ?? SPACING.md },
          style,
        ]}
      >
        <View style={[styles.flexLine, { backgroundColor: dividerColor }]} />
        <Text
          variant="caption"
          style={[styles.labelText, labelStyle]}
        >
          {label}
        </Text>
        <View style={[styles.flexLine, { backgroundColor: dividerColor }]} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.line,
        {
          backgroundColor: dividerColor,
          marginVertical: spacing ?? SPACING.md,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '100%',
  },
  flexLine: {
    flex: 1,
    height: 1,
  },
  verticalLine: {
    width: 1,
    height: '100%',
  },
  labeledRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  labelText: {
    marginHorizontal: ms(12),
    color: '#94A3B8',
    fontFamily: FONT_FAMILY.medium,
    fontSize: fs(10),
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
