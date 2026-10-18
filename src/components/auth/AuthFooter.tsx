/**
 * AuthFooter — Auth screen switch prompt & trust badge
 */

import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { FONT_FAMILY } from '../../constants/typography';
import { fs, ms, mvs } from '../../utils/metrics';
import { Text } from '../common/Text';

interface AuthFooterProps {
  promptText: string;
  actionText: string;
  onActionPress: () => void;
  showTrustBadge?: boolean;
  trustBadgeText?: string;
  style?: ViewStyle;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({
  promptText,
  actionText,
  onActionPress,
  showTrustBadge = false,
  trustBadgeText = '256-bit SSL encrypted • Enterprise grade',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Switch Action Link Row */}
      <View style={styles.switchRow}>
        <Text variant="caption" style={styles.promptText}>
          {promptText}{' '}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onActionPress}
          hitSlop={8}
        >
          <Text variant="caption" style={styles.actionText}>
            {actionText}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: mvs(18),
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptText: {
    color: '#64748B',
    fontFamily: FONT_FAMILY.regular,
    fontSize: fs(12),
  },
  actionText: {
    color: '#0D81FF',
    fontFamily: FONT_FAMILY.bold,
    fontSize: fs(12),
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(14),
    paddingHorizontal: ms(12),
    paddingVertical: mvs(5),
    borderRadius: ms(16),
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignSelf: 'center',
  },
  secureBadgeText: {
    marginLeft: ms(6),
    color: '#64748B',
    fontFamily: FONT_FAMILY.medium,
    fontSize: fs(9.5),
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
