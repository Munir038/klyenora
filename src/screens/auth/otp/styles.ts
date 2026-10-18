import { StyleSheet } from 'react-native';
import { FONT_FAMILY } from '../../../constants/typography';
import { fs, ms, mvs } from '../../../utils/metrics';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000F38',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: '100%',
    paddingBottom: mvs(28),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: mvs(12),
    paddingBottom: mvs(20),
  },
  form: {
    width: '100%',
  },
  otpInputText: {
    letterSpacing: ms(6),
    fontSize: fs(18),
    fontFamily: FONT_FAMILY.bold,
    textAlign: 'center',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(12),
  },
  resendPrompt: {
    color: '#64748B',
    fontFamily: FONT_FAMILY.regular,
    fontSize: fs(12),
  },
  resendAction: {
    color: '#0D81FF',
    fontFamily: FONT_FAMILY.bold,
    fontSize: fs(12),
  },
  resendDisabled: {
    color: '#94A3B8',
  },
  ctaSpacing: {
    marginTop: mvs(16),
  },
});
