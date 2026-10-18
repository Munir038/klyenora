/**
 * Form and Input Validation Utilities
 *
 * Centralized pure functions for input validation across the app.
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[0-9]{10,12}$/;

/**
 * Validates an email address.
 * Returns an error message string or null if valid.
 */
export const validateEmail = (email: string): string | null => {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Email address is required.';
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Enter a valid work email address.';
  }
  return null;
};

/**
 * Validates a user's password.
 * Returns an error message string or null if valid.
 */
export const validatePassword = (password: string, minLength: number = 6): string | null => {
  if (!password) {
    return 'Password is required.';
  }
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters.`;
  }
  return null;
};

/**
 * Validates a full name.
 * Returns an error message string or null if valid.
 */
export const validateName = (name: string): string | null => {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Full name is required.';
  }
  if (trimmed.length < 2) {
    return 'Enter your full name (minimum 2 characters).';
  }
  return null;
};

/**
 * Validates a mobile phone number.
 * Returns an error message string or null if valid.
 */
export const validatePhone = (phone: string): string | null => {
  const digits = phone.replace(/\D/g, '');
  if (!digits) {
    return 'Phone number is required.';
  }
  if (digits.length < 10) {
    return 'Enter a valid 10-digit mobile number.';
  }
  return null;
};

/**
 * Validates password confirmation match.
 * Returns an error message string or null if valid.
 */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string | null => {
  if (!confirmPassword) {
    return 'Please confirm your password.';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return null;
};

/**
 * Validates an OTP code.
 * Returns an error message string or null if valid.
 */
export const validateOtp = (otp: string, length: number = 6): string | null => {
  const digits = otp.replace(/\D/g, '');
  if (digits.length !== length) {
    return `Enter the full ${length}-digit verification code.`;
  }
  return null;
};
