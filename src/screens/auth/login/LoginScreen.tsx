import React, { useState } from 'react';
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
import { authService } from '../../../services/api/authService';
import apiClient from '../../../services/api/client';
import { validateEmail, validatePassword } from '../../../utils/validation';
import {
  AuthBackground,
  AuthCard,
  AuthFooter,
  AuthHeader,
  Divider,
  GradientButton,
  Input,
  SocialAuthButton,
  Text,
} from '../../../components';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    const errEmail = validateEmail(email);
    const errPass = validatePassword(password);

    setEmailError(errEmail);
    setPasswordError(errPass);

    if (errEmail || errPass) return;

    setIsSubmitting(true);
    try {
      const response = await authService.login({ email: email.trim(), password });
      if (!response.success) {
        throw new Error(response.message ?? 'Unable to sign in.');
      }
      apiClient.setAuthToken(response.data.token);
      const rootNavigation = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
      rootNavigation?.replace('Main');
    } catch {
      Alert.alert(
        'Unable to sign in',
        'Please check your email and password, then try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Password recovery',
      'Password recovery will be available in the next authentication step.',
    );
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
            {/* Header: Logo & Tagline */}
            <AuthHeader />

            {/* Elevated Auth Card */}
            <AuthCard title="Welcome back">
              <View style={styles.form}>
                {/* Email Field */}
                <Input
                  label="Email address"
                  placeholder="your@email.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  value={email}
                  error={emailError}
                  onChangeText={val => {
                    setEmail(val);
                    if (emailError) setEmailError(null);
                  }}
                  leftIcon={
                    <Feather name="mail" size={16} color="#0D81FF" />
                  }
                />

                {/* Password Field */}
                <Input
                  label="Password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  returnKeyType="done"
                  isPassword
                  value={password}
                  error={passwordError}
                  containerStyle={styles.fieldSpacing}
                  onChangeText={val => {
                    setPassword(val);
                    if (passwordError) setPasswordError(null);
                  }}
                  onSubmitEditing={handleLogin}
                  leftIcon={
                    <Feather name="lock" size={16} color="#0D81FF" />
                  }
                />

                {/* Forgot Password */}
                <Pressable
                  onPress={handleForgotPassword}
                  hitSlop={10}
                  style={styles.forgotButton}
                >
                  <Text variant="caption" style={styles.forgotText}>
                    Forgot password?
                  </Text>
                </Pressable>

                {/* Primary CTA Button */}
                <GradientButton
                  title="Log In"
                  loading={isSubmitting}
                  onPress={handleLogin}
                  style={styles.ctaSpacing}
                  rightIcon={<Feather name="arrow-right" size={17} color="#FFFFFF" />}
                />

                {/* Separator */}
                <Divider label="or" style={styles.dividerSpacing} />

                {/* Social Sign-in */}
                <SocialAuthButton
                  provider="google"
                  label="Continue with Google"
                  onPress={() =>
                    Alert.alert('Google sign-in', 'Google sign-in will be available soon.')
                  }
                />

                {/* Footer Switch Link */}
                <AuthFooter
                  promptText="Don't have an account?"
                  actionText="Sign Up"
                  onActionPress={() => navigation.navigate('Signup')}
                />
              </View>
            </AuthCard>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
