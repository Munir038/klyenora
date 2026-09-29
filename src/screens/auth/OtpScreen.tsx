import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen, Text } from '../../components/common';

const OtpScreen: React.FC = () => {
  return (
    <Screen scrollable>
      <View style={styles.center}>
        <Text variant="h2">OTP Verification</Text>
        <Text variant="bodySmall" color="#999">Build OTP / Google Login UI here</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default OtpScreen;
