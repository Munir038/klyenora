import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import { AuthStackParamList, RootStackParamList } from '../../../types/navigation';
import { validateOtp } from '../../../utils/validation';
import {
  AuthBackground,
  AuthCard,
  AuthFooter,
  AuthHeader,
  GradientButton,
  Input,
  Text,
} from '../../../components';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'OtpVerification'>;

export const OtpScreen: React.FC<Props> = ({ route, navigation }) => {
  const { phone, email } = route.params ?? {};
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(45);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleVerify = async () => {
    const otpError = validateOtp(otp, 6);
    setError(otpError);
    if (otpError) return;

    setIsSubmitting(true);
    try {
      setTimeout(() => {
        setIsSubmitting(false);
        const rootNav = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
        rootNav?.replace('Main');
      }, 800);
    } catch {
      setIsSubmitting(false);
      Alert.alert('Verification Failed', 'Invalid code. Please try again.');
    }
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(45);
    Alert.alert('Code Sent', 'A new 6-digit code has been sent.');
  };

  const destinationText = phone || email || 'your mobile number';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <AuthBackground />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <AuthHeader compact />

            <AuthCard
              title="Verification"
              subtitle={`We've sent a 6-digit confirmation code to ${destinationText}`}
            >
              <View style={styles.form}>
                {/* OTP Input */}
                <Input
                  label="Verification Code"
                  placeholder="• • • • • •"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={otp}
                  error={error}
                  onChangeText={val => {
                    const cleaned = val.replace(/\D/g, '');
                    setOtp(cleaned);
                    if (error) setError(null);
                  }}
                  onSubmitEditing={handleVerify}
                  leftIcon={<Feather name="key" size={16} color="#0D81FF" />}
                  inputStyle={styles.otpInputText}
                />

                {/* Resend Timer Row */}
                <View style={styles.resendRow}>
                  <Text variant="caption" style={styles.resendPrompt}>
                    Didn't receive the code?{' '}
                  </Text>
                  <Pressable
                    disabled={resendTimer > 0}
                    onPress={handleResend}
                    hitSlop={8}
                  >
                    <Text
                      variant="caption"
                      style={[
                        styles.resendAction,
                        resendTimer > 0 && styles.resendDisabled,
                      ]}
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                    </Text>
                  </Pressable>
                </View>

                {/* Verify Button */}
                <GradientButton
                  title="Verify & Continue"
                  loading={isSubmitting}
                  onPress={handleVerify}
                  style={styles.ctaSpacing}
                  rightIcon={<Feather name="check" size={17} color="#FFFFFF" />}
                />

                {/* Back to Login Footer */}
                <AuthFooter
                  promptText="Want to use a different account?"
                  actionText="Back to Login"
                  onActionPress={() => navigation.navigate('Login')}
                />
              </View>
            </AuthCard>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpScreen;
