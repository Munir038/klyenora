import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen, Text } from '../../components/common';

const FollowUpsScreen: React.FC = () => (
  <Screen scrollable><View style={s.c}><Text variant="h2">Follow-ups</Text></View></Screen>
);
const s = StyleSheet.create({ c: { flex: 1, paddingTop: 20 } });
export default FollowUpsScreen;
