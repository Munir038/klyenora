import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthStackParamList, RootStackParamList } from '../../types/navigation';
import { authService } from '../../services/api/authService';
import apiClient from '../../services/api/client';
import { styles } from './loginStyle';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const validateEmail = () => {
    const nextError = emailPattern.test(email.trim())
      ? ''
      : 'Enter a valid work email address.';
    setEmailError(nextError);
    return !nextError;
  };

  const validatePassword = () => {
    const nextError = password.length >= 6
      ? ''
      : 'Password must be at least 6 characters.';
    setPasswordError(nextError);
    return !nextError;
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (!isEmailValid || !isPasswordValid) return;

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
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Multi-layer gradient background ─────────── */}
          <LinearGradient
            colors={['#00144D', '#000E38', '#000824', '#000414']}
            locations={[0, 0.35, 0.7, 1]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={styles.background}
          />

          {/* ── Decorative ambient elements ─────────────── */}
          <View pointerEvents="none" style={styles.decorationsContainer}>
            <View style={[styles.dot, styles.dotTop]} />
            <View style={[styles.dot, styles.dotRight]} />
            <View style={styles.orbTopRight} />
            <View style={styles.orbMidLeft} />
            <View style={styles.bottomRing} />
            <View style={styles.bottomGlow} />
          </View>

          <View style={styles.content}>
            {/* ── Header: Logo & Tagline ─────────────────── */}
            <View style={styles.headerGroup}>
              <Image
                source={require('../../assets/klyenora-logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
                accessibilityLabel="Klyenora logo"
              />
              <Text style={styles.tagline}>Every client, clearly connected.</Text>
            </View>

            {/* ── Elevated Off-White Card ────────────────── */}
            <View style={styles.authCard}>
              <Text style={styles.welcomeHeading}>Welcome back</Text>

              <View style={styles.form}>
                {/* Email Field */}
                <Text style={styles.fieldLabel}>Email address</Text>
                <View
                  style={[
                    styles.field,
                    emailFocused && styles.fieldFocused,
                    emailError ? styles.fieldError : undefined,
                  ]}
                >
                  <Feather name="mail" size={16} color={emailFocused ? '#0D81FF' : '#64748B'} />
                  <TextInput
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    placeholder="your@email.com"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                    value={email}
                    onChangeText={value => {
                      setEmail(value);
                      if (emailError) setEmailError('');
                    }}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    returnKeyType="next"
                  />
                </View>
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                {/* Password Field */}
                <View style={styles.passwordField}>
                  <Text style={styles.fieldLabel}>Password</Text>
                  <View
                    style={[
                      styles.field,
                      passwordFocused && styles.fieldFocused,
                      passwordError ? styles.fieldError : undefined,
                    ]}
                  >
                    <Feather name="lock" size={16} color={passwordFocused ? '#0D81FF' : '#64748B'} />
                    <TextInput
                      autoComplete="current-password"
                      placeholder="••••••••"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!isPasswordVisible}
                      style={styles.input}
                      value={password}
                      onChangeText={value => {
                        setPassword(value);
                        if (passwordError) setPasswordError('');
                      }}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      onSubmitEditing={handleLogin}
                      returnKeyType="done"
                    />
                    <Pressable
                      onPress={() => setIsPasswordVisible(visible => !visible)}
                      hitSlop={10}
                      style={styles.eyeButton}
                    >
                      <Feather
                        name={isPasswordVisible ? 'eye-off' : 'eye'}
                        size={16}
                        color="#64748B"
                      />
                    </Pressable>
                  </View>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                {/* Forgot Password */}
                <Pressable onPress={handleForgotPassword} hitSlop={10} style={styles.forgotButton}>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </Pressable>

                {/* CTA Button */}
                <View style={styles.buttonGlowWrapper}>
                  <View pointerEvents="none" style={styles.buttonGlow} />
                  <Pressable
                    accessibilityRole="button"
                    disabled={isSubmitting}
                    onPress={handleLogin}
                    style={({ pressed }) => [
                      styles.signInButton,
                      pressed && styles.buttonPressed,
                      isSubmitting && styles.buttonDisabled,
                    ]}
                  >
                    <LinearGradient
                      colors={['#0D81FF', '#0865EA', '#0052CC']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.signInGradient}
                    >
                      {isSubmitting ? (
                        <ActivityIndicator color="#FFFFFF" />
                      ) : (
                        <View style={styles.loginButtonContent}>
                          <Text style={styles.signInText}>Log In</Text>
                          <Feather name="arrow-right" size={17} color="#FFFFFF" style={styles.arrow} />
                        </View>
                      )}
                    </LinearGradient>
                  </Pressable>
                </View>

                {/* Divider */}
                <View style={styles.dividerRow}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.divider} />
                </View>

                {/* Google Sign-in */}
                <Pressable
                  accessibilityRole="button"
                  onPress={() => Alert.alert('Google sign-in', 'Google sign-in will be available soon.')}
                  style={({ pressed }) => [styles.googleButton, pressed && styles.buttonPressed]}
                >
                  <FontAwesome name="google" size={17} color="#EA4335" style={styles.googleMark} />
                  <Text style={styles.googleButtonText}>Continue with Google</Text>
                </Pressable>

                {/* Sign-up Link */}
                <View style={styles.signupRow}>
                  <Text style={styles.signupText}>Don't have an account? </Text>
                  <Pressable onPress={() => navigation.navigate('Signup')} hitSlop={8}>
                    <Text style={styles.signupLink}>Sign Up</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
