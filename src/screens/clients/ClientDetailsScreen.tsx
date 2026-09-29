import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen, Text } from '../../components/common';

const ClientDetailsScreen: React.FC = () => (
  <Screen scrollable><View style={s.c}><Text variant="h2">Client Details</Text></View></Screen>
);
const s = StyleSheet.create({ c: { flex: 1, paddingTop: 20 } });
export default ClientDetailsScreen;
