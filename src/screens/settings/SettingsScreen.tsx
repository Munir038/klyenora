import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Card, Text, WorkflowScreen } from '../../components/common';
import { useTheme, ThemeMode } from '../../theme';
import { FONT_FAMILY } from '../../constants/typography';
import { RADIUS, SPACING } from '../../constants/dimensions';
import { ms } from '../../utils';

export const SettingsScreen: React.FC = () => {
  const { isDark, themeMode, setThemeMode, colors } = useTheme();

  const getThemeStatusInfo = () => {
    switch (themeMode) {
      case 'system':
        return {
          title: 'System Automatic',
          detail: `Syncs with your device schedule (${isDark ? 'Dark Mode currently active' : 'Light Mode currently active'})`,
          icon: 'smartphone',
        };
      case 'dark':
        return {
          title: 'Dark Mode Active',
          detail: 'Deep OLED-optimized indigo palette for minimal eye strain',
          icon: 'moon',
        };
      case 'light':
        return {
          title: 'Light Mode Active',
          detail: 'Clean, high-contrast porcelain layout for bright daylight viewing',
          icon: 'sun',
        };
    }
  };

  const statusInfo = getThemeStatusInfo();

  return (
    <WorkflowScreen
      title="Settings"
      subtitle="Manage your studio, preferences, and theme."
      sections={[
        {
          title: 'Studio',
          items: ['Studio profile', 'Packages & templates', 'Team members'],
        },
        {
          title: 'App',
          items: ['Notifications', 'Backup & export', 'Help & support'],
        },
      ]}
    >
      {/* ── Visual Theme & Appearance Section ── */}
      <View style={styles.appearanceSection}>
        <Text variant="overline" color={colors.textTertiary} style={styles.sectionTitle}>
          APPEARANCE & THEME
        </Text>

        <Card style={styles.themeCard} elevated={false}>
          {/* Card Title & Subtitle */}
          <View style={styles.headerBlock}>
            <View style={styles.headerRow}>
              <View
                style={[
                  styles.headerIconBadge,
                  {
                    backgroundColor: isDark
                      ? 'rgba(139, 108, 239, 0.15)'
                      : 'rgba(108, 60, 225, 0.08)',
                    borderColor: isDark
                      ? 'rgba(139, 108, 239, 0.3)'
                      : 'rgba(108, 60, 225, 0.2)',
                  },
                ]}
              >
                <Feather
                  name={statusInfo.icon}
                  size={16}
                  color={colors.primary}
                />
              </View>
              <View style={styles.headerTitles}>
                <Text variant="body" color={colors.text} style={styles.cardMainTitle}>
                  Theme & Interface
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.cardSubtitle}>
                  Choose your visual experience
                </Text>
              </View>
            </View>
          </View>

          {/* 3 Interactive Visual Mockup Cards */}
          <View style={styles.previewGrid}>
            {/* 1. Light Mode Card */}
            <Pressable
              onPress={() => setThemeMode('light')}
              style={[
                styles.themeOptionCard,
                {
                  backgroundColor: isDark ? '#0D101C' : '#FFFFFF',
                  borderColor:
                    themeMode === 'light'
                      ? colors.primary
                      : isDark
                      ? 'rgba(255, 255, 255, 0.08)'
                      : '#E2E8F0',
                },
                themeMode === 'light' && styles.themeOptionCardActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Select Light Theme"
            >
              {/* Miniature Light Mockup */}
              <View style={[styles.miniPhone, styles.miniPhoneLight]}>
                <View style={styles.miniHeaderLight} />
                <View style={styles.miniCardLight} />
                <View style={[styles.miniCardLight, { width: '65%' }]} />
                <View style={styles.miniBtnLight} />
              </View>

              {/* Label & Radio Indicator */}
              <View style={styles.optionFooter}>
                <View
                  style={[
                    styles.radioCircle,
                    {
                      borderColor:
                        themeMode === 'light'
                          ? colors.primary
                          : isDark
                          ? '#475569'
                          : '#CBD5E1',
                      backgroundColor:
                        themeMode === 'light' ? colors.primary : 'transparent',
                    },
                  ]}
                >
                  {themeMode === 'light' ? (
                    <Feather name="check" size={9} color="#FFFFFF" />
                  ) : null}
                </View>
                <Text
                  variant="caption"
                  color={themeMode === 'light' ? colors.primary : colors.text}
                  style={[
                    styles.optionLabel,
                    themeMode === 'light' && styles.optionLabelActive,
                  ]}
                >
                  Light
                </Text>
              </View>
            </Pressable>

            {/* 2. Dark Mode Card */}
            <Pressable
              onPress={() => setThemeMode('dark')}
              style={[
                styles.themeOptionCard,
                {
                  backgroundColor: isDark ? '#0D101C' : '#FFFFFF',
                  borderColor:
                    themeMode === 'dark'
                      ? colors.primary
                      : isDark
                      ? 'rgba(255, 255, 255, 0.08)'
                      : '#E2E8F0',
                },
                themeMode === 'dark' && styles.themeOptionCardActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Select Dark Theme"
            >
              {/* Miniature Dark Mockup */}
              <View style={[styles.miniPhone, styles.miniPhoneDark]}>
                <View style={styles.miniHeaderDark} />
                <View style={styles.miniCardDark} />
                <View style={[styles.miniCardDark, { width: '65%' }]} />
                <View style={styles.miniBtnDark} />
              </View>

              {/* Label & Radio Indicator */}
              <View style={styles.optionFooter}>
                <View
                  style={[
                    styles.radioCircle,
                    {
                      borderColor:
                        themeMode === 'dark'
                          ? colors.primary
                          : isDark
                          ? '#475569'
                          : '#CBD5E1',
                      backgroundColor:
                        themeMode === 'dark' ? colors.primary : 'transparent',
                    },
                  ]}
                >
                  {themeMode === 'dark' ? (
                    <Feather name="check" size={9} color="#FFFFFF" />
                  ) : null}
                </View>
                <Text
                  variant="caption"
                  color={themeMode === 'dark' ? colors.primary : colors.text}
                  style={[
                    styles.optionLabel,
                    themeMode === 'dark' && styles.optionLabelActive,
                  ]}
                >
                  Dark
                </Text>
              </View>
            </Pressable>

            {/* 3. System / Auto Card */}
            <Pressable
              onPress={() => setThemeMode('system')}
              style={[
                styles.themeOptionCard,
                {
                  backgroundColor: isDark ? '#0D101C' : '#FFFFFF',
                  borderColor:
                    themeMode === 'system'
                      ? colors.primary
                      : isDark
                      ? 'rgba(255, 255, 255, 0.08)'
                      : '#E2E8F0',
                },
                themeMode === 'system' && styles.themeOptionCardActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Select System Theme"
            >
              {/* Miniature Split Mockup (Half Light, Half Dark) */}
              <View style={[styles.miniPhone, styles.miniPhoneSplit]}>
                <View style={styles.splitHalfLight}>
                  <View style={styles.miniHeaderLight} />
                  <View style={styles.miniCardLight} />
                  <View style={styles.miniBtnLight} />
                </View>
                <View style={styles.splitHalfDark}>
                  <View style={styles.miniHeaderDark} />
                  <View style={styles.miniCardDark} />
                  <View style={styles.miniBtnDark} />
                </View>
              </View>

              {/* Label & Radio Indicator */}
              <View style={styles.optionFooter}>
                <View
                  style={[
                    styles.radioCircle,
                    {
                      borderColor:
                        themeMode === 'system'
                          ? colors.primary
                          : isDark
                          ? '#475569'
                          : '#CBD5E1',
                      backgroundColor:
                        themeMode === 'system' ? colors.primary : 'transparent',
                    },
                  ]}
                >
                  {themeMode === 'system' ? (
                    <Feather name="check" size={9} color="#FFFFFF" />
                  ) : null}
                </View>
                <Text
                  variant="caption"
                  color={themeMode === 'system' ? colors.primary : colors.text}
                  style={[
                    styles.optionLabel,
                    themeMode === 'system' && styles.optionLabelActive,
                  ]}
                >
                  Auto
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Contextual Status Ribbon */}
          <View
            style={[
              styles.infoRibbon,
              {
                backgroundColor: isDark
                  ? 'rgba(139, 108, 239, 0.08)'
                  : 'rgba(108, 60, 225, 0.05)',
                borderColor: isDark
                  ? 'rgba(139, 108, 239, 0.2)'
                  : 'rgba(108, 60, 225, 0.14)',
              },
            ]}
          >
            <View style={styles.infoRibbonContent}>
              <View
                style={[
                  styles.pulseDot,
                  { backgroundColor: colors.primary },
                ]}
              />
              <Text
                variant="caption"
                color={colors.textSecondary}
                style={styles.infoRibbonText}
              >
                {statusInfo.detail}
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </WorkflowScreen>
  );
};

const styles = StyleSheet.create({
  appearanceSection: {
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  sectionTitle: {
    letterSpacing: 1,
    paddingLeft: 2,
  },
  themeCard: {
    padding: ms(16),
    borderRadius: RADIUS.lg,
    gap: ms(14),
  },
  headerBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(10),
  },
  headerIconBadge: {
    width: ms(36),
    height: ms(36),
    borderRadius: ms(10),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitles: {
    gap: 1,
  },
  cardMainTitle: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: ms(14.5),
  },
  cardSubtitle: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: ms(11.5),
  },
  previewGrid: {
    flexDirection: 'row',
    gap: ms(10),
  },
  themeOptionCard: {
    flex: 1,
    borderRadius: ms(14),
    borderWidth: 1.5,
    padding: ms(8),
    alignItems: 'center',
    gap: ms(8),
  },
  themeOptionCardActive: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },

  // ── Miniature Phone Mockup Styles ───────────────────
  miniPhone: {
    width: '100%',
    height: ms(70),
    borderRadius: ms(8),
    borderWidth: 1,
    padding: ms(5),
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  miniPhoneLight: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  miniHeaderLight: {
    width: '100%',
    height: ms(6),
    backgroundColor: '#6C3CE1',
    borderRadius: ms(2),
    marginBottom: ms(4),
  },
  miniCardLight: {
    width: '85%',
    height: ms(10),
    backgroundColor: '#FFFFFF',
    borderRadius: ms(3),
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
    marginBottom: ms(3),
  },
  miniBtnLight: {
    width: '50%',
    height: ms(7),
    backgroundColor: '#6C3CE1',
    borderRadius: ms(2),
    alignSelf: 'flex-end',
  },

  miniPhoneDark: {
    backgroundColor: '#0A0D18',
    borderColor: '#1E2338',
  },
  miniHeaderDark: {
    width: '100%',
    height: ms(6),
    backgroundColor: '#8B5CF6',
    borderRadius: ms(2),
    marginBottom: ms(4),
  },
  miniCardDark: {
    width: '85%',
    height: ms(10),
    backgroundColor: '#161B2E',
    borderRadius: ms(3),
    borderWidth: 0.5,
    borderColor: '#262D4A',
    marginBottom: ms(3),
  },
  miniBtnDark: {
    width: '50%',
    height: ms(7),
    backgroundColor: '#8B5CF6',
    borderRadius: ms(2),
    alignSelf: 'flex-end',
  },

  miniPhoneSplit: {
    flexDirection: 'row',
    padding: 0,
    borderWidth: 1,
    borderColor: '#262D4A',
  },
  splitHalfLight: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: ms(4),
    justifyContent: 'space-between',
    borderRightWidth: 0.5,
    borderColor: '#CBD5E1',
  },
  splitHalfDark: {
    flex: 1,
    backgroundColor: '#0A0D18',
    padding: ms(4),
    justifyContent: 'space-between',
  },

  // ── Option Footer (Radio + Label) ───────────────────
  optionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(6),
  },
  radioCircle: {
    width: ms(15),
    height: ms(15),
    borderRadius: ms(8),
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: ms(11.5),
  },
  optionLabelActive: {
    fontFamily: FONT_FAMILY.semiBold,
  },

  // ── Information Ribbon ──────────────────────────────
  infoRibbon: {
    borderRadius: ms(10),
    borderWidth: 1,
    paddingHorizontal: ms(12),
    paddingVertical: ms(8),
  },
  infoRibbonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(8),
  },
  pulseDot: {
    width: ms(7),
    height: ms(7),
    borderRadius: ms(4),
  },
  infoRibbonText: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: ms(11),
    flex: 1,
  },
});

export default SettingsScreen;
