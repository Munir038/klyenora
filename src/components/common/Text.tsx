/**
 * Themed Text component — picks the right colour automatically.
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { useTheme } from '../../theme';
import { FONT_FAMILY, TEXT_STYLES } from '../../constants/typography';

type Variant = keyof typeof TEXT_STYLES;

interface TextProps extends RNTextProps {
  variant?: Variant;
  color?: string;
  align?: TextStyle['textAlign'];
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  align,
  style,
  children,
  ...rest
}) => {
  const { colors } = useTheme();

  const textStyle: TextStyle = {
    ...TEXT_STYLES[variant],
    fontFamily: FONT_FAMILY.regular,
    color: color ?? colors.text,
    textAlign: align,
  };

  return (
    <RNText style={[textStyle, style]} {...rest}>
      {children}
    </RNText>
  );
};
