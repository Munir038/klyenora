import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { SPACING } from '../../constants/dimensions';
import { Button } from './Button';
import { Card } from './Card';
import { Screen } from './Screen';
import { Text } from './Text';
import { FONT_FAMILY } from '@/constants';
import { ms } from '@/utils';
import { useTheme } from '../../theme';

export interface WorkflowSection {
  title: string;
  items: string[];
}

export interface WorkflowScreenProps {
  title: string;
  subtitle: string;
  actionLabel?: string;
  onActionPress?: () => void;
  metrics?: Array<{ label: string; value: string }>;
  sections?: WorkflowSection[];
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
}

interface ParsedItem {
  title: string;
  subtitle?: string;
  tag?: string;
  amount?: string;
  isOverdue?: boolean;
  time?: string;
  iconName?: string;
  avatarText?: string;
}

export const WorkflowScreen: React.FC<WorkflowScreenProps> = ({
  title,
  subtitle,
  actionLabel,
  onActionPress,
  metrics = [],
  sections = [],
  headerRight,
  children,
}) => {
  const { colors, isDark } = useTheme();

  // ── Metric Icon & Accent Map ────────────────────────────────────
  const getMetricVisuals = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes('expected')) {
      return { icon: 'trending-up', color: '#8B5CF6', bg: 'rgba(139, 108, 239, 0.12)' };
    }
    if (lower.includes('received')) {
      return { icon: 'check-circle', color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)' };
    }
    if (lower.includes('pending')) {
      return { icon: 'clock', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' };
    }
    if (lower.includes('new')) {
      return { icon: 'sparkles', color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.12)' };
    }
    if (lower.includes('follow')) {
      return { icon: 'phone-call', color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.12)' };
    }
    if (lower.includes('booked')) {
      return { icon: 'award', color: '#EC4899', bg: 'rgba(236, 72, 153, 0.12)' };
    }
    return { icon: 'bar-chart-2', color: colors.primary, bg: 'rgba(139, 108, 239, 0.1)' };
  };

  // ── Smart Item Parser ───────────────────────────────────────────
  const parseItem = (raw: string): ParsedItem => {
    // 1. Settings predefined items
    const settingsMap: Record<string, { desc: string; icon: string }> = {
      'Studio profile': { desc: 'Bio, address, logo & public portal', icon: 'camera' },
      'Packages & templates': { desc: 'Quotation formats & deliverables', icon: 'layers' },
      'Team members': { desc: 'Staff roles, crew assignees & rates', icon: 'users' },
      'Notifications': { desc: 'Push reminders, WhatsApp & email alerts', icon: 'bell' },
      'Backup & export': { desc: 'Download booking records & CSV ledgers', icon: 'database' },
      'Help & support': { desc: 'Guides, live chat & FAQs', icon: 'help-circle' },
    };

    if (settingsMap[raw]) {
      return {
        title: raw,
        subtitle: settingsMap[raw].desc,
        iconName: settingsMap[raw].icon,
      };
    }

    // 2. CRM / Event / Shoot / Payment items with '·'
    const parts = raw.split('·').map(s => s.trim());

    let amount: string | undefined;
    let isOverdue = false;
    let time: string | undefined;
    let tag: string | undefined;
    let clientName: string | undefined;

    // Detect price (₹...)
    const priceMatch = raw.match(/₹[\d,.]+[L|K|Cr]?/i);
    if (priceMatch) {
      amount = priceMatch[0];
    }

    // Detect overdue
    if (raw.toLowerCase().includes('overdue')) {
      isOverdue = true;
    }

    // Detect time (e.g. 10:00, 14:30, 4:00 PM)
    const timeMatch = raw.match(/\b\d{1,2}:\d{2}(\s*(?:AM|PM))?\b/i);
    if (timeMatch) {
      time = timeMatch[0];
    }

    // Event tags
    const eventKeywords = ['Wedding', 'Pre-wedding', 'Engagement', 'Quote sent', 'Follow up'];
    for (const kw of eventKeywords) {
      if (raw.toLowerCase().includes(kw.toLowerCase())) {
        tag = kw;
        break;
      }
    }

    // Determine client / primary name
    // If format like: "₹35,000 overdue · Aman & Riya" -> Aman & Riya is client
    if (parts.length >= 2) {
      const nonNumericParts = parts.filter(
        p => !p.includes('₹') && !p.toLowerCase().includes('overdue') && !/\b\d{1,2}:\d{2}/.test(p)
      );
      if (nonNumericParts.length > 0) {
        clientName = nonNumericParts[0];
        if (nonNumericParts.length > 1 && !tag) {
          tag = nonNumericParts[1];
        }
      }
    }

    const titleText = clientName || parts[0];
    const initials = titleText
      .split('&')
      .map(part => part.trim().charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);

    return {
      title: titleText,
      subtitle: parts.length > 1 && clientName !== parts[0] ? parts[0] : undefined,
      tag: tag || (parts.length > 1 ? parts[1] : undefined),
      amount,
      isOverdue,
      time,
      avatarText: initials.length > 0 ? initials : undefined,
      iconName: raw.toLowerCase().includes('shoot')
        ? 'camera'
        : raw.toLowerCase().includes('payment')
        ? 'credit-card'
        : raw.toLowerCase().includes('wedding')
        ? 'heart'
        : undefined,
    };
  };

  return (
    <Screen scrollable>
      <View style={styles.content}>
        {/* ── Top Header Bar ── */}
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            <Text variant="bodySmall" style={styles.subtitle} color={colors.textSecondary}>
              {subtitle}
            </Text>
          </View>

          {headerRight ? (
            <View style={styles.headerRightContainer}>{headerRight}</View>
          ) : (
            <View style={styles.headerActions}>
              <View
                style={[
                  styles.headerActionCircle,
                  {
                    backgroundColor: isDark
                      ? 'rgba(255, 255, 255, 0.06)'
                      : 'rgba(0, 0, 0, 0.04)',
                    borderColor: colors.borderLight,
                  },
                ]}
              >
                <Feather
                  name="bell"
                  size={16}
                  color={colors.textSecondary}
                />
              </View>
            </View>
          )}
        </View>

        {/* ── Primary Action Button ── */}
        {actionLabel ? (
          <View style={styles.actionWrapper}>
            <Button
              title={actionLabel}
              onPress={onActionPress ?? (() => undefined)}
              icon={<Feather name="plus-circle" size={18} color="#FFFFFF" />}
              style={styles.actionBtnStyle}
            />
          </View>
        ) : null}

        {/* ── Metric Summary Tiles ── */}
        {metrics.length ? (
          <View style={styles.metrics}>
            {metrics.map(metric => {
              const visual = getMetricVisuals(metric.label);
              return (
                <Card
                  key={metric.label}
                  style={[
                    styles.metric,
                    {
                      backgroundColor: isDark ? '#141828' : '#FFFFFF',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0',
                    },
                  ]}
                  elevated={false}
                >
                  <View style={styles.metricTop}>
                    <Text variant="overline" color={colors.textTertiary} style={styles.metricLabel}>
                      {metric.label}
                    </Text>
                    <View style={[styles.metricIconBox, { backgroundColor: visual.bg }]}>
                      <Feather name={visual.icon} size={13} color={visual.color} />
                    </View>
                  </View>
                  <Text variant="h3" color={colors.text} style={styles.metricValue}>
                    {metric.value}
                  </Text>
                </Card>
              );
            })}
          </View>
        ) : null}

        {/* ── Sections & Rich Item Cards ── */}
        {sections.map(section => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text variant="overline" color={colors.textTertiary} style={styles.sectionTitle}>
                {section.title}
              </Text>
              <Text variant="caption" color={colors.textTertiary} style={styles.sectionCount}>
                {section.items.length}
              </Text>
            </View>

            {section.items.map(item => {
              const parsed = parseItem(item);

              return (
                <Pressable
                  key={item}
                  style={({ pressed }) => [
                    styles.itemCard,
                    {
                      backgroundColor: isDark ? '#141828' : '#FFFFFF',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.07)' : '#E2E8F0',
                    },
                    pressed && { opacity: 0.88, transform: [{ scale: 0.995 }] },
                  ]}
                >
                  <View style={styles.itemInner}>
                    {/* Left Icon or Initials Avatar */}
                    {parsed.avatarText ? (
                      <View
                        style={[
                          styles.avatarBox,
                          {
                            backgroundColor: isDark
                              ? 'rgba(139, 108, 239, 0.16)'
                              : 'rgba(108, 60, 225, 0.08)',
                            borderColor: isDark
                              ? 'rgba(139, 108, 239, 0.3)'
                              : 'rgba(108, 60, 225, 0.15)',
                          },
                        ]}
                      >
                        <Text
                          variant="caption"
                          color={colors.primary}
                          style={styles.avatarText}
                        >
                          {parsed.avatarText}
                        </Text>
                      </View>
                    ) : parsed.iconName ? (
                      <View
                        style={[
                          styles.avatarBox,
                          {
                            backgroundColor: isDark
                              ? 'rgba(56, 189, 248, 0.14)'
                              : 'rgba(13, 129, 255, 0.08)',
                            borderColor: isDark
                              ? 'rgba(56, 189, 248, 0.28)'
                              : 'rgba(13, 129, 255, 0.15)',
                          },
                        ]}
                      >
                        <Feather
                          name={parsed.iconName}
                          size={16}
                          color={isDark ? '#38BDF8' : '#0D81FF'}
                        />
                      </View>
                    ) : null}

                    {/* Middle: Title & Subtitle / Tags */}
                    <View style={styles.itemMeta}>
                      <Text
                        variant="body"
                        color={colors.text}
                        style={styles.itemTitle}
                        numberOfLines={1}
                      >
                        {parsed.title}
                      </Text>

                      <View style={styles.itemSubRow}>
                        {parsed.subtitle ? (
                          <Text
                            variant="caption"
                            color={colors.textSecondary}
                            style={styles.itemSubtitle}
                            numberOfLines={1}
                          >
                            {parsed.subtitle}
                          </Text>
                        ) : null}

                        {parsed.tag ? (
                          <View
                            style={[
                              styles.chipTag,
                              {
                                backgroundColor: isDark
                                  ? 'rgba(255, 255, 255, 0.06)'
                                  : '#F1F5F9',
                              },
                            ]}
                          >
                            <Text
                              variant="caption"
                              color={colors.textSecondary}
                              style={styles.chipTagText}
                            >
                              {parsed.tag}
                            </Text>
                          </View>
                        ) : null}

                        {parsed.time ? (
                          <View
                            style={[
                              styles.chipTag,
                              {
                                backgroundColor: isDark
                                  ? 'rgba(245, 158, 11, 0.12)'
                                  : 'rgba(245, 158, 11, 0.1)',
                              },
                            ]}
                          >
                            <Feather name="clock" size={10} color="#F59E0B" />
                            <Text
                              variant="caption"
                              color={isDark ? '#FCD34D' : '#D97706'}
                              style={styles.chipTagText}
                            >
                              {parsed.time}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    </View>

                    {/* Right: Amount & Status Badge & Chevron */}
                    <View style={styles.itemRight}>
                      {parsed.amount ? (
                        <View
                          style={[
                            styles.amountBadge,
                            {
                              backgroundColor: parsed.isOverdue
                                ? 'rgba(239, 68, 68, 0.12)'
                                : isDark
                                ? 'rgba(16, 185, 129, 0.12)'
                                : 'rgba(16, 185, 129, 0.08)',
                              borderColor: parsed.isOverdue
                                ? 'rgba(239, 68, 68, 0.3)'
                                : isDark
                                ? 'rgba(16, 185, 129, 0.25)'
                                : 'rgba(16, 185, 129, 0.2)',
                            },
                          ]}
                        >
                          <Text
                            variant="caption"
                            color={parsed.isOverdue ? '#EF4444' : '#10B981'}
                            style={styles.amountText}
                          >
                            {parsed.amount}
                          </Text>
                        </View>
                      ) : null}

                      {parsed.isOverdue ? (
                        <View style={styles.overdueBadge}>
                          <Text variant="caption" style={styles.overdueBadgeText}>
                            OVERDUE
                          </Text>
                        </View>
                      ) : null}

                      <Feather
                        name="chevron-right"
                        size={16}
                        color={isDark ? '#64748B' : '#94A3B8'}
                        style={styles.chevron}
                      />
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}

        {children}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: { gap: ms(20), paddingBottom: SPACING.massive + 40 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: ms(4),
  },
  headerText: {
    flex: 1,
  },
  headerRightContainer: {
    marginLeft: SPACING.md,
    alignSelf: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActionCircle: {
    width: ms(36),
    height: ms(36),
    borderRadius: ms(18),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: ms(22),
    letterSpacing: -0.4,
  },
  subtitle: {
    marginTop: 3,
    fontFamily: FONT_FAMILY.medium,
    fontSize: ms(13),
  },

  // ── Action Button ────────────────────────────────────
  actionWrapper: {
    marginTop: ms(-4),
    marginBottom: ms(2),
  },
  actionBtnStyle: {
    borderRadius: ms(14),
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },

  // ── Metric Tiles ─────────────────────────────────────
  metrics: {
    flexDirection: 'row',
    gap: ms(10),
  },
  metric: {
    flex: 1,
    borderRadius: ms(14),
    borderWidth: 1,
    padding: ms(13),
    justifyContent: 'space-between',
    gap: ms(8),
  },
  metricTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: ms(9.5),
    letterSpacing: 0.8,
  },
  metricIconBox: {
    width: ms(24),
    height: ms(24),
    borderRadius: ms(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricValue: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: ms(18),
    letterSpacing: -0.3,
  },

  // ── Section & Rich Item Cards ────────────────────────
  section: {
    gap: ms(8),
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ms(2),
  },
  sectionTitle: {
    letterSpacing: 1.1,
    fontFamily: FONT_FAMILY.bold,
  },
  sectionCount: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: ms(10.5),
  },
  itemCard: {
    borderRadius: ms(14),
    borderWidth: 1,
    paddingVertical: ms(13),
    paddingHorizontal: ms(14),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  itemInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(12),
  },
  avatarBox: {
    width: ms(38),
    height: ms(38),
    borderRadius: ms(11),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: ms(12.5),
    letterSpacing: 0.2,
  },
  itemMeta: {
    flex: 1,
    gap: 3,
  },
  itemTitle: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: ms(13.5),
  },
  itemSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(6),
    flexWrap: 'wrap',
  },
  itemSubtitle: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: ms(11.5),
  },
  chipTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: ms(7),
    paddingVertical: ms(2),
    borderRadius: ms(6),
  },
  chipTagText: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: ms(10.5),
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(8),
  },
  amountBadge: {
    paddingHorizontal: ms(8),
    paddingVertical: ms(3),
    borderRadius: ms(8),
    borderWidth: 1,
  },
  amountText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: ms(11.5),
  },
  overdueBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: ms(6),
    paddingVertical: ms(2),
    borderRadius: ms(4),
  },
  overdueBadgeText: {
    color: '#FFFFFF',
    fontFamily: FONT_FAMILY.bold,
    fontSize: ms(8.5),
    letterSpacing: 0.5,
  },
  chevron: {
    marginLeft: ms(2),
  },
});
