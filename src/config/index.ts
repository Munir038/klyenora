import { Platform } from 'react-native';

const developmentApiBaseUrl = Platform.select({
  android: 'http://10.0.2.2:3000/api/v1',
  default: 'http://localhost:3000/api/v1',
}) ?? 'http://localhost:3000/api/v1';

/**
 * App configuration constants
 */

export const APP_CONFIG = {
  name: 'ClientNest',
  version: '0.0.1',
  apiBaseUrl: __DEV__
    ? developmentApiBaseUrl
    : 'https://api.clientnest.app/v1',
  storageKeys: {
    authToken: '@clientnest/auth_token',
    refreshToken: '@clientnest/refresh_token',
    themeMode: '@clientnest/theme_mode',
    onboarded: '@clientnest/onboarded',
  },
  pagination: {
    defaultPageSize: 20,
  },
} as const;
