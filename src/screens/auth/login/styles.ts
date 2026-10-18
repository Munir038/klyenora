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
  fieldSpacing: {
    marginTop: mvs(12),
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: mvs(8),
    marginBottom: mvs(2),
    paddingVertical: mvs(2),
  },
  forgotText: {
    color: '#0D81FF',
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: fs(11.5),
  },
  ctaSpacing: {
    marginTop: mvs(16),
  },
  dividerSpacing: {
    marginTop: mvs(18),
    marginBottom: mvs(14),
  },
});
