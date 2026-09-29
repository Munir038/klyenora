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
          <LinearGradient
            colors={['#001D67', '#00144E', '#00092C']}
            locations={[0, 0.52, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.88, y: 1 }}
            style={styles.background}
          />
          <View style={[styles.dot, styles.dotTop]} />
          <View style={[styles.dot, styles.dotRight]} />
          <View style={styles.bottomRing} />
          <View style={styles.bottomGlow} />

          <View style={styles.content}>
            <Image
              source={require('../../assets/klyenora-logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
              accessibilityLabel="Klyenora logo"
            />
            <Text style={styles.tagline}>Every client, clearly connected.</Text>

            <View style={styles.form}>
              <View style={[styles.field, emailError ? styles.fieldError : undefined]}>
                <Feather name="user" size={18} color="#AFC5EB" />
                <TextInput
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  placeholder="Email address"
                  placeholderTextColor="#B9C9E6"
                  style={styles.input}
                  value={email}
                  onChangeText={value => {
                    setEmail(value);
                    if (emailError) setEmailError('');
                  }}
                  returnKeyType="next"
                />
              </View>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

              <View style={[styles.field, styles.passwordField, passwordError ? styles.fieldError : undefined]}>
                <Feather name="lock" size={18} color="#AFC5EB" />
                <TextInput
                  autoComplete="current-password"
                  placeholder="Password"
                  placeholderTextColor="#B9C9E6"
                  secureTextEntry={!isPasswordVisible}
                  style={styles.input}
                  value={password}
                  onChangeText={value => {
                    setPassword(value);
                    if (passwordError) setPasswordError('');
                  }}
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
                    size={18}
                    color="#AFC5EB"
                  />
                </Pressable>
              </View>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

              <Pressable onPress={handleForgotPassword} hitSlop={10} style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>

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
                  colors={['#0D81FF', '#0865EA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.signInGradient}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <View style={styles.loginButtonContent}>
                      <Text style={styles.signInText}>Log In</Text>
                      <Feather name="arrow-right" size={19} color="#FFFFFF" style={styles.arrow} />
                    </View>
                  )}
                </LinearGradient>
              </Pressable>
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => Alert.alert('Google sign-in', 'Google sign-in will be available soon.')}
              style={({ pressed }) => [styles.googleButton, pressed && styles.buttonPressed]}
            >
              <FontAwesome name="google" size={19} color="#FFFFFF" style={styles.googleMark} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </Pressable>

            <View style={styles.signupRow}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <Pressable onPress={() => navigation.navigate('Signup')} hitSlop={8}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
