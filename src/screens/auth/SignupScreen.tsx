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
        <ScrollView contentContainerStyle={styles.signupScrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <LinearGradient colors={['#001D67', '#00144E', '#00092C']} locations={[0, 0.52, 1]} start={{ x: 0, y: 0 }} end={{ x: 0.88, y: 1 }} style={styles.background} />
          <View style={[styles.dot, styles.dotTop]} />
          <View style={[styles.dot, styles.dotRight]} />
          <View style={styles.bottomRing} />
          <View style={styles.bottomGlow} />

          <View style={styles.signupContent}>
            <Image source={require('../../assets/klyenora-logo.png')} style={styles.signupLogoImage} resizeMode="contain" accessibilityLabel="Klyenora logo" />
            <Text style={styles.signupTitle}>Create your account</Text>
            <Text style={styles.tagline}>Start managing every client in one place.</Text>

            <View style={styles.signupForm}>
              <View style={[styles.field, nameError ? styles.fieldError : undefined]}>
                <Feather name="user" size={18} color="#AFC5EB" />
                <TextInput placeholder="Full name" placeholderTextColor="#B9C9E6" style={styles.input} value={name} onChangeText={value => { setName(value); if (nameError) setNameError(''); }} onBlur={validateName} autoComplete="name" returnKeyType="next" />
              </View>
              {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
              <View style={[styles.field, styles.passwordField, phoneError ? styles.fieldError : undefined]}>
                <Feather name="phone" size={18} color="#AFC5EB" />
                <TextInput placeholder="Phone number" placeholderTextColor="#B9C9E6" style={styles.input} value={phone} onChangeText={value => { setPhone(value); if (phoneError) setPhoneError(''); }} onBlur={validatePhone} autoComplete="tel" keyboardType="phone-pad" returnKeyType="next" />
              </View>
              {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
              <View style={[styles.field, styles.passwordField, emailError ? styles.fieldError : undefined]}>
                <Feather name="mail" size={18} color="#AFC5EB" />
                <TextInput placeholder="Email address" placeholderTextColor="#B9C9E6" style={styles.input} value={email} onChangeText={value => { setEmail(value); if (emailError) setEmailError(''); }} onBlur={validateEmail} autoCapitalize="none" autoComplete="email" keyboardType="email-address" returnKeyType="next" />
              </View>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              <View style={[styles.field, styles.passwordField, passwordError ? styles.fieldError : undefined]}>
                <Feather name="lock" size={18} color="#AFC5EB" />
                <TextInput placeholder="Password" placeholderTextColor="#B9C9E6" style={styles.input} value={password} onChangeText={value => { setPassword(value); if (passwordError) setPasswordError(''); }} onBlur={validatePassword} secureTextEntry={!isPasswordVisible} autoComplete="new-password" returnKeyType="next" />
                <Pressable onPress={() => setIsPasswordVisible(visible => !visible)} hitSlop={10} style={styles.eyeButton}>
                  <Feather name={isPasswordVisible ? 'eye-off' : 'eye'} size={18} color="#AFC5EB" />
                </Pressable>
              </View>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
              <View style={[styles.field, styles.passwordField, confirmPasswordError ? styles.fieldError : undefined]}>
                <Feather name="shield" size={18} color="#AFC5EB" />
                <TextInput placeholder="Confirm password" placeholderTextColor="#B9C9E6" style={styles.input} value={confirmPassword} onChangeText={value => { setConfirmPassword(value); if (confirmPasswordError) setConfirmPasswordError(''); }} onBlur={validateConfirmPassword} secureTextEntry={!isPasswordVisible} onSubmitEditing={handleSignup} returnKeyType="done" />
              </View>
              {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
              <Pressable accessibilityRole="button" disabled={isSubmitting} onPress={handleSignup} style={({ pressed }) => [styles.signInButton, pressed && styles.buttonPressed, isSubmitting && styles.buttonDisabled]}>
                <LinearGradient colors={['#0D81FF', '#0865EA']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.signInGradient}>
                  {isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <View style={styles.loginButtonContent}><Text style={styles.signInText}>Create account</Text><Feather name="arrow-right" size={19} color="#FFFFFF" style={styles.arrow} /></View>}
                </LinearGradient>
              </Pressable>
            </View>

            <View style={styles.dividerRow}><View style={styles.divider} /><Text style={styles.dividerText}>OR</Text><View style={styles.divider} /></View>
            <Pressable accessibilityRole="button" onPress={() => Alert.alert('Google sign-up', 'Google sign-up will be available soon.')} style={({ pressed }) => [styles.googleButton, pressed && styles.buttonPressed]}>
              <FontAwesome name="google" size={19} color="#FFFFFF" style={styles.googleMark} /><Text style={styles.googleButtonText}>Continue with Google</Text>
            </Pressable>
            <View style={styles.signupRow}><Text style={styles.signupText}>Already have an account? </Text><Pressable onPress={() => navigation.goBack()} hitSlop={8}><Text style={styles.signupLink}>Log In</Text></Pressable></View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
