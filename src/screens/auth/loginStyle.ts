import { StyleSheet } from 'react-native';
import { fs, ms, mvs } from '../../utils/metrics';
import { FONT_FAMILY } from '@/constants';

export const styles = StyleSheet.create({
  /* ── Layout ──────────────────────────────────────────── */
  safeArea: {
    flex: 1,
    backgroundColor: '#000F38',
  },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    minHeight: '100%',
    paddingBottom: mvs(28),
  },
  signupScrollContent: {
    flexGrow: 1,
    minHeight: '100%',
    paddingBottom: mvs(36),
  },

  /* ── Background ──────────────────────────────────────── */
  background: {
    ...StyleSheet.absoluteFill,
  },

  /* ── Content wrappers ────────────────────────────────── */
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: mvs(12),
    paddingBottom: mvs(20),
  },
  signupContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: mvs(20),
    paddingBottom: mvs(20),
  },

  /* ── Header / Logo section ────────────────────────────── */
  headerGroup: {
    alignItems: 'center',
    marginBottom: mvs(16),
  },
  logoImage: {
    width: ms(105, 0.3),
    height: ms(105, 0.3),
  },
  signupLogoImage: {
    width: ms(80, 0.3),
    height: ms(80, 0.3),
  },
  tagline: {
    marginTop: mvs(-2),
    color: 'rgba(215, 232, 255, 0.85)',
    fontFamily: FONT_FAMILY.medium,
    fontSize: fs(13),
    letterSpacing: 0.3,
  },

  /* ── Off-White Card Container ────────────────────────── */
  authCard: {
    width: '92%',
    maxWidth: ms(440),
    backgroundColor: '#FAFBFD',
    borderRadius: ms(22),
    paddingHorizontal: ms(22),
    paddingTop: mvs(22),
    paddingBottom: mvs(22),
    alignSelf: 'center',
    shadowColor: '#000826',
    shadowOffset: { width: 0, height: mvs(12) },
    shadowOpacity: 0.3,
    shadowRadius: ms(22),
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.65)',
    zIndex: 10,
  },
  decorationsContainer: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },

  /* ── Card Titles ─────────────────────────────────────── */
  welcomeHeading: {
    color: '#0F172A',
    fontFamily: FONT_FAMILY.bold,
    fontSize: fs(21),
    textAlign: 'center',
    marginBottom: mvs(6),
    letterSpacing: 0.2,
  },
  welcomeSubtitle: {
    marginTop: mvs(4),
    marginBottom: mvs(18),
    color: '#64748B',
    fontFamily: FONT_FAMILY.regular,
    fontSize: fs(12.5),
    letterSpacing: 0.1,
  },
  signupTitle: {
    color: '#0F172A',
    fontFamily: FONT_FAMILY.bold,
    fontSize: fs(21),
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: mvs(6),
  },
  signupSubtitle: {
    marginTop: mvs(4),
    marginBottom: mvs(16),
    color: '#64748B',
    fontFamily: FONT_FAMILY.regular,
    fontSize: fs(12.5),
    letterSpacing: 0.1,
  },

  /* ── Form ────────────────────────────────────────────── */
  form: {
    width: '100%',
  },
  signupForm: {
    width: '100%',
  },

  /* ── Field labels ────────────────────────────────────── */
  fieldLabel: {
    marginBottom: mvs(5),
    marginLeft: ms(2),
    color: '#334155',
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: fs(11),
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  /* ── Inputs ──────────────────────────────────────────── */
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    height: mvs(47),
    paddingHorizontal: ms(13),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: ms(11),
    backgroundColor: '#F8FAFC',
  },
  fieldFocused: {
    borderColor: '#0D81FF',
    backgroundColor: '#FFFFFF',
    shadowColor: '#0D81FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  passwordField: {
    marginTop: mvs(13),
  },
  fieldError: {
    borderColor: '#EF4444',
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: ms(10),
    paddingVertical: 0,
    color: '#0F172A',
    fontFamily: FONT_FAMILY.medium,
    fontSize: fs(13.5),
  },
  eyeButton: {
    padding: ms(4),
  },
  errorText: {
    marginTop: mvs(4),
    marginLeft: ms(2),
    color: '#EF4444',
    fontFamily: FONT_FAMILY.regular,
    fontSize: fs(10.5),
  },

  /* ── Forgot password ─────────────────────────────────── */
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: mvs(10),
    paddingVertical: mvs(2),
  },
  forgotText: {
    color: '#0D81FF',
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: fs(11.5),
  },

  /* ── Primary CTA button ──────────────────────────────── */
  signInButton: {
    height: mvs(47),
    marginTop: mvs(18),
    borderRadius: ms(11),
    overflow: 'hidden',
    shadowColor: '#0D81FF',
    shadowOffset: { width: 0, height: mvs(6) },
    shadowOpacity: 0.32,
    shadowRadius: ms(12),
    elevation: 6,
  },
  signInGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signInText: {
    color: '#FFFFFF',
    fontFamily: FONT_FAMILY.bold,
    fontSize: fs(13.5),
    letterSpacing: 0.5,
  },
  arrow: {
    marginLeft: ms(6),
  },
  buttonPressed: { opacity: 0.88 },
  buttonDisabled: { opacity: 0.65 },
  buttonGlowWrapper: {
    position: 'relative',
  },
  buttonGlow: {
    position: 'absolute',
    bottom: mvs(-5),
    left: '12%',
    right: '12%',
    height: mvs(16),
    borderRadius: ms(30),
    backgroundColor: 'rgba(13, 129, 255, 0.22)',
  },

  /* ── Divider ─────────────────────────────────────────── */
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: mvs(20),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: ms(12),
    color: '#94A3B8',
    fontFamily: FONT_FAMILY.medium,
    fontSize: fs(10),
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },

  /* ── Google button ───────────────────────────────────── */
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: mvs(45),
    marginTop: mvs(14),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: ms(11),
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  googleMark: {
    marginRight: ms(10),
  },
  googleButtonText: {
    color: '#1E293B',
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: fs(12.5),
    letterSpacing: 0.2,
  },

  /* ── Switch link row ─────────────────────────────────── */
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(20),
  },
  signupText: {
    color: '#64748B',
    fontFamily: FONT_FAMILY.regular,
    fontSize: fs(12),
  },
  signupLink: {
    color: '#0D81FF',
    fontFamily: FONT_FAMILY.bold,
    fontSize: fs(12),
  },

  /* ── Trust badge ─────────────────────────────────────── */
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(16),
    paddingHorizontal: ms(12),
    paddingVertical: mvs(5),
    borderRadius: ms(16),
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignSelf: 'center',
  },
  secureBadgeText: {
    marginLeft: ms(6),
    color: '#64748B',
    fontFamily: FONT_FAMILY.medium,
    fontSize: fs(9.5),
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  /* ── Ambient background decorations ──────────────────── */
  dot: {
    position: 'absolute',
    borderRadius: ms(50),
  },
  dotTop: {
    top: '7%',
    left: '8%',
    width: ms(6),
    height: ms(6),
    backgroundColor: '#5ECEF6',
    opacity: 0.55,
  },
  dotRight: {
    top: '18%',
    right: '8%',
    width: ms(4),
    height: ms(4),
    backgroundColor: '#3D8BFF',
    opacity: 0.45,
  },
  orbTopRight: {
    position: 'absolute',
    top: '2%',
    right: '-10%',
    width: ms(200, 0.4),
    height: ms(200, 0.4),
    borderRadius: ms(100, 0.4),
    backgroundColor: 'rgba(30, 80, 220, 0.1)',
  },
  orbMidLeft: {
    position: 'absolute',
    top: '36%',
    left: '-14%',
    width: ms(220, 0.4),
    height: ms(220, 0.4),
    borderRadius: ms(110, 0.4),
    backgroundColor: 'rgba(60, 110, 240, 0.08)',
  },
  bottomRing: {
    position: 'absolute',
    bottom: mvs(-70),
    left: ms(-70),
    width: ms(150, 0.45),
    height: ms(150, 0.45),
    borderRadius: ms(75, 0.45),
    borderWidth: ms(1.2),
    borderColor: 'rgba(30, 80, 200, 0.22)',
  },
  bottomGlow: {
    position: 'absolute',
    bottom: mvs(-55),
    left: ms(-40),
    width: ms(100, 0.45),
    height: ms(100, 0.45),
    borderRadius: ms(50, 0.45),
    backgroundColor: 'rgba(20, 60, 180, 0.18)',
  },
});
