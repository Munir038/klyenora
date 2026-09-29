/**
 * Divider / Separator
 */

import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { SPACING } from '../../constants/dimensions';

interface DividerProps {
  vertical?: boolean;
  spacing?: number;
  color?: string;
}

export const Divider: React.FC<DividerProps> = ({
  vertical = false,
  spacing,
  color,
}) => {
  const { colors } = useTheme();

  const style: ViewStyle = vertical
    ? {
        width: 1,
        height: '100%',
        backgroundColor: color ?? colors.divider,
        marginHorizontal: spacing ?? SPACING.md,
      }
    : {
        height: 1,
        width: '100%',
        backgroundColor: color ?? colors.divider,
        marginVertical: spacing ?? SPACING.md,
      };

  return <View style={style} />;
};
