/**
 * Main Tab Navigator (authenticated area)
 *
 * Bottom tabs: Home, Leads, Calendar, Clients, Settings.
 */

import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { MainTabParamList } from '../types/navigation';
import { useTheme } from '../theme';
import { FONT_FAMILY } from '../constants/typography';

// Screens
import { DashboardScreen } from '../screens/dashboard';
import { LeadPipelineScreen } from '../screens/leads';
import { CalendarScreen } from '../screens/calendar';
import { SettingsScreen } from '../screens/settings';
import { ClientListScreen } from '../screens/clients';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();

  // Responsive floating dock width: centered on tablets, comfortable on mobile
  const isWide = screenWidth >= 600;
  const dockWidth = isWide ? Math.min(screenWidth * 0.7, 480) : screenWidth - 28;
  const horizontalMargin = Math.max(14, (screenWidth - dockWidth) / 2);

  const activeColor = isDark ? '#A78BFA' : '#6C3CE1';
  const inactiveColor = isDark ? '#7E869E' : '#64748B';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#0F101A' : '#F8FAFC' }} edges={['top']}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          tabBarStyle: {
            position: 'absolute',
            left: horizontalMargin,
            right: horizontalMargin,
            bottom: insets.bottom > 0 ? insets.bottom + 8 : 14,
            backgroundColor: isDark ? '#141829' : '#FFFFFF',
            borderTopWidth: 0,
            borderWidth: 1.2,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
            height: 66,
            paddingTop: 6,
            paddingBottom: 6,
            borderRadius: 22,
            shadowColor: isDark ? '#000000' : '#0F172A',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: isDark ? 0.5 : 0.1,
            shadowRadius: 18,
            elevation: 12,
          },
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 2,
          },
          tabBarLabelStyle: {
            fontFamily: FONT_FAMILY.semiBold,
            fontSize: 10.5,
            marginTop: 2,
          },
          tabBarIcon: ({ color, focused }) => {
            const icons = {
              HomeTab: 'home',
              LeadsTab: 'users',
              CalendarTab: 'calendar',
              ClientsTab: 'user',
              SettingsTab: 'settings',
            } as const;

            return (
              <View
                style={[
                  styles.tabIconPill,
                  focused && {
                    backgroundColor: isDark
                      ? 'rgba(167, 139, 250, 0.18)'
                      : 'rgba(108, 60, 225, 0.1)',
                  },
                ]}
              >
                <Feather name={icons[route.name]} size={20} color={color} />
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="HomeTab" component={DashboardScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="LeadsTab" component={LeadPipelineScreen} options={{ title: 'Leads' }} />
        <Tab.Screen name="CalendarTab" component={CalendarScreen} options={{ title: 'Calendar' }} />
        <Tab.Screen name="ClientsTab" component={ClientListScreen} options={{ title: 'Clients' }} />
        <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabIconPill: {
    width: 44,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainNavigator;
