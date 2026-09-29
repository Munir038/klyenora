/**
 * Main Tab Navigator (authenticated area)
 *
 * Bottom tabs: Home, Leads, Calendar, Clients, Settings.
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { MainTabParamList } from '../types/navigation';
import { useTheme } from '../theme';
import { FONT_FAMILY, FONT_SIZE } from '../constants/typography';
import { COMPONENT_HEIGHT } from '../constants/dimensions';

// Screens
import { DashboardScreen } from '../screens/dashboard';
import { LeadPipelineScreen } from '../screens/leads';
import { CalendarScreen } from '../screens/calendar';
import { SettingsScreen } from '../screens/settings';
import { ClientListScreen } from '../screens/clients';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.tabBarBackground }} edges={['top']}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#001D67',
          tabBarInactiveTintColor: colors.tabBarInactive,
          tabBarStyle: {
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: insets.bottom + 12,
            backgroundColor: colors.tabBarBackground,
            borderTopWidth: 0,
            height: COMPONENT_HEIGHT.tabBar,
            paddingTop: 6,
            paddingBottom: 6,
            marginHorizontal: 12,
            borderRadius: 100,
          },
          tabBarLabelStyle: {
            fontFamily: FONT_FAMILY.semiBold,
            fontSize: FONT_SIZE.xxs,
          },
          tabBarIcon: ({ color, size }) => {
            const icons = {
              HomeTab: 'home',
              LeadsTab: 'users',
              CalendarTab: 'calendar',
              ClientsTab: 'user',
              SettingsTab: 'settings',
            } as const;

            return <Feather name={icons[route.name]} size={size} color={color} />;
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

export default MainNavigator;
