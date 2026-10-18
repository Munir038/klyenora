import { StyleSheet } from 'react-native';
import { mvs } from '../../../utils/metrics';

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
    paddingBottom: mvs(36),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: mvs(18),
    paddingBottom: mvs(24),
  },
  form: {
    width: '100%',
  },
  fieldSpacing: {
    marginTop: mvs(12),
  },
  ctaSpacing: {
    marginTop: mvs(16),
  },
  dividerSpacing: {
    marginTop: mvs(18),
    marginBottom: mvs(14),
  },
});
