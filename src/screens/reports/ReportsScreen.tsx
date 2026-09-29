import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen, Text } from '../../components/common';
const ReportsScreen: React.FC = () => (
  <Screen><View style={s.c}><Text variant="h2">Reports</Text></View></Screen>
);
const s = StyleSheet.create({ c: { flex: 1, justifyContent: 'center', alignItems: 'center' } });
export default ReportsScreen;
