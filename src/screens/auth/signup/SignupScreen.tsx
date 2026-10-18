import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import { AuthStackParamList } from '../../../types/navigation';
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from '../../../utils/validation';
import {
  AuthBackground,
  AuthCard,
  AuthFooter,
  AuthHeader,
  Divider,
  GradientButton,
  Input,
  SocialAuthButton,
} from '../../../components';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    const errName = validateName(name);
    const errPhone = validatePhone(phone);
    const errEmail = validateEmail(email);
    const errPass = validatePassword(password);
    const errConfirm = validateConfirmPassword(password, confirmPassword);

    setNameError(errName);
    setPhoneError(errPhone);
    setEmailError(errEmail);
    setPasswordError(errPass);
    setConfirmError(errConfirm);

    if (errName || errPhone || errEmail || errPass || errConfirm) return;

    setIsSubmitting(true);
    try {
      navigation.navigate('OtpVerification', {
        email: email.trim(),
        phone: phone.trim(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {/* Header: Compact Logo */}
            <AuthHeader compact />

            {/* Elevated Card */}
            <AuthCard
              title="Create account"
              subtitle="Manage enquiries, shoots & payments effortlessly."
            >
              <View style={styles.form}>
                {/* Full Name */}
                <Input
                  label="Full Name"
                  placeholder="Rahul Sharma"
                  autoCapitalize="words"
                  autoComplete="name"
                  returnKeyType="next"
                  value={name}
                  error={nameError}
                  onChangeText={val => {
                    setName(val);
                    if (nameError) setNameError(null);
                  }}
                  leftIcon={<Feather name="user" size={16} color="#0D81FF" />}
                />

                {/* Mobile Number */}
                <Input
                  label="Mobile Number"
                  placeholder="+91 98765 43210"
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  value={phone}
                  error={phoneError}
                  containerStyle={styles.fieldSpacing}
                  onChangeText={val => {
                    setPhone(val);
                    if (phoneError) setPhoneError(null);
                  }}
                  leftIcon={<Feather name="phone" size={16} color="#0D81FF" />}
                />

                {/* Email Address */}
                <Input
                  label="Work Email"
                  placeholder="rahul@example.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  value={email}
                  error={emailError}
                  containerStyle={styles.fieldSpacing}
                  onChangeText={val => {
                    setEmail(val);
                    if (emailError) setEmailError(null);
                  }}
                  leftIcon={<Feather name="mail" size={16} color="#0D81FF" />}
                />

                {/* Password */}
                <Input
                  label="Password"
                  placeholder="••••••••"
                  isPassword
                  returnKeyType="next"
                  value={password}
                  error={passwordError}
                  containerStyle={styles.fieldSpacing}
                  onChangeText={val => {
                    setPassword(val);
                    if (passwordError) setPasswordError(null);
                  }}
                  leftIcon={<Feather name="lock" size={16} color="#0D81FF" />}
                />

                {/* Confirm Password */}
                <Input
                  label="Confirm Password"
                  placeholder="••••••••"
                  isPassword
                  returnKeyType="done"
                  value={confirmPassword}
                  error={confirmError}
                  containerStyle={styles.fieldSpacing}
                  onChangeText={val => {
                    setConfirmPassword(val);
                    if (confirmError) setConfirmError(null);
                  }}
                  onSubmitEditing={handleSignup}
                  leftIcon={<Feather name="shield" size={16} color="#0D81FF" />}
                />

                {/* Primary CTA */}
                <GradientButton
                  title="Create Account"
                  loading={isSubmitting}
                  onPress={handleSignup}
                  style={styles.ctaSpacing}
                  rightIcon={<Feather name="arrow-right" size={17} color="#FFFFFF" />}
                />

                {/* Divider */}
                <Divider label="or" style={styles.dividerSpacing} />

                {/* Google Sign-in */}
                <SocialAuthButton
                  provider="google"
                  label="Continue with Google"
                  onPress={() =>
                    Alert.alert('Google sign-in', 'Google sign-in will be available soon.')
                  }
                />

                {/* Footer Switch Link & Trust Badge */}
                <AuthFooter
                  promptText="Already have an account?"
                  actionText="Log In"
                  onActionPress={() => navigation.navigate('Login')}
                  showTrustBadge
                />
              </View>
            </AuthCard>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
