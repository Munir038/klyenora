import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen, Text } from '../../components/common';
const PendingPaymentsScreen: React.FC = () => (
  <Screen scrollable><View style={s.c}><Text variant="h2">Pending Payments</Text></View></Screen>
);
const s = StyleSheet.create({ c: { flex: 1, paddingTop: 20 } });
export default PendingPaymentsScreen;
