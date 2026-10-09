import { Platform } from 'react-native';

const developmentApiBaseUrl = Platform.select({
  android: 'http://10.0.2.2:3000/api/v1',
  default: 'http://localhost:3000/api/v1',
}) ?? 'http://localhost:3000/api/v1';

/**
 * App configuration constants
 */

export const APP_CONFIG = {
  name: 'Klyenora',
  version: '0.0.1',
  apiBaseUrl: __DEV__
    ? developmentApiBaseUrl
    : 'https://api.klyenora.app/v1',
  storageKeys: {
    authToken: '@klyenora/auth_token',
    refreshToken: '@klyenora/refresh_token',
    themeMode: '@klyenora/theme_mode',
    onboarded: '@klyenora/onboarded',
  },
  pagination: {
    defaultPageSize: 20,
  },
} as const;
