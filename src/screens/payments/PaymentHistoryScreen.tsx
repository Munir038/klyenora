import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen, Text } from '../../components/common';
const PaymentHistoryScreen: React.FC = () => (
  <Screen scrollable><View style={s.c}><Text variant="h2">Payment History</Text></View></Screen>
);
const s = StyleSheet.create({ c: { flex: 1, paddingTop: 20 } });
export default PaymentHistoryScreen;
