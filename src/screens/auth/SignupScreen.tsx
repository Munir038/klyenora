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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthStackParamList } from '../../types/navigation';
import { styles } from './loginStyle';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Focus states
  const [nameFocused, setNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  const validateName = () => {
    const nextError = name.trim().length >= 2 ? '' : 'Enter your full name.';
    setNameError(nextError);
    return !nextError;
  };

  const validatePhone = () => {
    const nextError = phone.replace(/\D/g, '').length >= 10 ? '' : 'Enter a valid 10-digit mobile number.';
    setPhoneError(nextError);
    return !nextError;
  };

  const validateEmail = () => {
    const nextError = emailPattern.test(email.trim()) ? '' : 'Enter a valid work email address.';
    setEmailError(nextError);
    return !nextError;
  };

  const validatePassword = () => {
    const nextError = password.length >= 6 ? '' : 'Password must be at least 6 characters.';
    setPasswordError(nextError);
    return !nextError;
  };

  const validateConfirmPassword = () => {
    const nextError = password === confirmPassword ? '' : 'Passwords do not match.';
    setConfirmPasswordError(nextError);
    return !nextError;
  };

  const handleSignup = async () => {
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    if (!isNameValid || !isPhoneValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) return;

    setIsSubmitting(true);
    try {
      navigation.navigate('OtpVerification', { email: email.trim(), phone });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.signupScrollContent}
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

          <View style={styles.signupContent}>
            {/* ── Header: Logo ─────────────────────────── */}
            <View style={styles.headerGroup}>
              <Image
                source={require('../../assets/klyenora-logo.png')}
                style={styles.signupLogoImage}
                resizeMode="contain"
                accessibilityLabel="Klyenora logo"
              />
              <Text style={styles.tagline}>Every client, clearly connected.</Text>
            </View>

            {/* ── Elevated Off-White Card ────────────────── */}
            <View style={styles.authCard}>
              <Text style={styles.signupTitle}>Create your account</Text>

              <View style={styles.signupForm}>
                {/* Full name */}
                <Text style={styles.fieldLabel}>Full Name</Text>
                <View
                  style={[
                    styles.field,
                    nameFocused && styles.fieldFocused,
                    nameError ? styles.fieldError : undefined,
                  ]}
                >
                  <Feather name="user" size={16} color={nameFocused ? '#0D81FF' : '#64748B'} />
                  <TextInput
                    placeholder="John Doe"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                    value={name}
                    onChangeText={value => { setName(value); if (nameError) setNameError(''); }}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => { setNameFocused(false); validateName(); }}
                    autoComplete="name"
                    returnKeyType="next"
                  />
                </View>
                {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

                {/* Phone */}
                <View style={styles.passwordField}>
                  <Text style={styles.fieldLabel}>Phone</Text>
                  <View
                    style={[
                      styles.field,
                      phoneFocused && styles.fieldFocused,
                      phoneError ? styles.fieldError : undefined,
                    ]}
                  >
                    <Feather name="phone" size={16} color={phoneFocused ? '#0D81FF' : '#64748B'} />
                    <TextInput
                      placeholder="+91 98765 43210"
                      placeholderTextColor="#94A3B8"
                      style={styles.input}
                      value={phone}
                      onChangeText={value => { setPhone(value); if (phoneError) setPhoneError(''); }}
                      onFocus={() => setPhoneFocused(true)}
                      onBlur={() => { setPhoneFocused(false); validatePhone(); }}
                      autoComplete="tel"
                      keyboardType="phone-pad"
                      returnKeyType="next"
                    />
                  </View>
                </View>
                {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

                {/* Email */}
                <View style={styles.passwordField}>
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
                      placeholder="your@email.com"
                      placeholderTextColor="#94A3B8"
                      style={styles.input}
                      value={email}
                      onChangeText={value => { setEmail(value); if (emailError) setEmailError(''); }}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => { setEmailFocused(false); validateEmail(); }}
                      autoCapitalize="none"
                      autoComplete="email"
                      keyboardType="email-address"
                      returnKeyType="next"
                    />
                  </View>
                </View>
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                {/* Password */}
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
                      placeholder="••••••••"
                      placeholderTextColor="#94A3B8"
                      style={styles.input}
                      value={password}
                      onChangeText={value => { setPassword(value); if (passwordError) setPasswordError(''); }}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => { setPasswordFocused(false); validatePassword(); }}
                      secureTextEntry={!isPasswordVisible}
                      autoComplete="new-password"
                      returnKeyType="next"
                    />
                    <Pressable onPress={() => setIsPasswordVisible(v => !v)} hitSlop={10} style={styles.eyeButton}>
                      <Feather name={isPasswordVisible ? 'eye-off' : 'eye'} size={16} color="#64748B" />
                    </Pressable>
                  </View>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                {/* Confirm password */}
                <View style={styles.passwordField}>
                  <Text style={styles.fieldLabel}>Confirm Password</Text>
                  <View
                    style={[
                      styles.field,
                      confirmFocused && styles.fieldFocused,
                      confirmPasswordError ? styles.fieldError : undefined,
                    ]}
                  >
                    <Feather name="shield" size={16} color={confirmFocused ? '#0D81FF' : '#64748B'} />
                    <TextInput
                      placeholder="••••••••"
                      placeholderTextColor="#94A3B8"
                      style={styles.input}
                      value={confirmPassword}
                      onChangeText={value => { setConfirmPassword(value); if (confirmPasswordError) setConfirmPasswordError(''); }}
                      onFocus={() => setConfirmFocused(true)}
                      onBlur={() => { setConfirmFocused(false); validateConfirmPassword(); }}
                      secureTextEntry={!isPasswordVisible}
                      onSubmitEditing={handleSignup}
                      returnKeyType="done"
                    />
                  </View>
                </View>
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

                {/* CTA button with glow */}
                <View style={styles.buttonGlowWrapper}>
                  <View pointerEvents="none" style={styles.buttonGlow} />
                  <Pressable
                    accessibilityRole="button"
                    disabled={isSubmitting}
                    onPress={handleSignup}
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
                          <Text style={styles.signInText}>Create Account</Text>
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

                {/* Google sign-up */}
                <Pressable
                  accessibilityRole="button"
                  onPress={() => Alert.alert('Google sign-up', 'Google sign-up will be available soon.')}
                  style={({ pressed }) => [styles.googleButton, pressed && styles.buttonPressed]}
                >
                  <FontAwesome name="google" size={17} color="#EA4335" style={styles.googleMark} />
                  <Text style={styles.googleButtonText}>Continue with Google</Text>
                </Pressable>

                {/* Back to Login link */}
                <View style={styles.signupRow}>
                  <Text style={styles.signupText}>Already have an account? </Text>
                  <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
                    <Text style={styles.signupLink}>Log In</Text>
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

export default SignupScreen;
