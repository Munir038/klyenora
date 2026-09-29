import { StyleSheet } from 'react-native';
import { fs, ms, mvs } from '../../utils/metrics';
import { FONT_FAMILY } from '@/constants';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#001142',
  },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    minHeight: '100%',
  },
  signupScrollContent: {
    flexGrow: 1,
    minHeight: '100%',
  },
  background: {
    ...StyleSheet.absoluteFill,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: mvs(2),
    paddingBottom: mvs(86),
  },
  signupContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: mvs(58),
    paddingBottom: mvs(48),
  },
  logoImage: {
    width: ms(130, 0.3),
    height: ms(130, 0.3),
  },
  signupLogoImage: {
    width: ms(106, 0.3),
    height: ms(106, 0.3),
  },
  signupTitle: {
    marginTop: mvs(50),
    color: '#FFFFFF',
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: fs(18),
  },
  tagline: {
    marginTop: mvs(-2),
    color: '#C9D8F2',
    fontFamily: FONT_FAMILY.medium,
    fontSize: fs(15),
  },
  form: {
    width: '90%',
    marginTop: mvs(31),
  },
  signupForm: {
    width: '90%',
    marginTop: mvs(14),
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    height: mvs(50),
    paddingHorizontal: ms(14),
    borderWidth: ms(1),
    borderColor: 'rgba(153, 190, 255, 0.18)',
    borderRadius: ms(10),
    backgroundColor: 'rgba(61, 117, 203, 0.14)',
  },
  passwordField: {
    marginTop: mvs(11),
  },
  fieldError: {
    borderColor: '#FF7480',
  },
  input: {
    flex: 1,
    marginLeft: ms(12),
    paddingVertical: 0,
    color: '#F5F8FF',
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: fs(13),
  },
  eyeButton: {
    padding: ms(3),
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: mvs(10),
  },
  forgotText: {
    color: '#2AA4FF',
    fontFamily: FONT_FAMILY.medium,
    fontSize: fs(11),
  },
  errorText: {
    marginTop: mvs(5),
    color: '#FF9DA5',
    fontFamily: FONT_FAMILY.regular,
    fontSize: fs(11),
  },
  signInButton: {
    height: mvs(48),
    marginTop: mvs(18),
    borderRadius: ms(9),
    overflow: 'hidden',
    shadowColor: '#0877FF',
    shadowOffset: { width: 0, height: mvs(6) },
    shadowOpacity: 0.28,
    shadowRadius: ms(11),
    elevation: 5,
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
    fontSize: fs(13),
  },
  arrow: {
    marginLeft: ms(4),
  },
  buttonPressed: { opacity: 0.84 },
  buttonDisabled: { opacity: 0.72 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: mvs(23),
  },
  divider: {
    flex: 1,
    height: ms(1),
    backgroundColor: 'rgba(180, 207, 248, 0.3)',
  },
  dividerText: {
    marginHorizontal: ms(12),
    color: '#C5D2E9',
    fontFamily: FONT_FAMILY.medium,
    fontSize: fs(10),
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: mvs(43),
    marginTop: mvs(17),
    borderWidth: ms(1),
    borderColor: 'rgba(168, 199, 249, 0.6)',
    borderRadius: ms(9),
    backgroundColor: 'rgba(0, 17, 65, 0.12)',
  },
  googleMark: {
    marginRight: ms(10),
  },
  googleButtonText: {
    color: '#F4F7FF',
    fontFamily: FONT_FAMILY.medium,
    fontSize: fs(12),
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(27),
  },
  signupText: {
    color: '#C1CDE4',
    fontFamily: FONT_FAMILY.regular,
    fontSize: fs(12),
  },
  signupLink: {
    color: '#2AA4FF',
    fontFamily: FONT_FAMILY.bold,
    fontSize: fs(12),
  },
  dot: {
    position: 'absolute',
    width: ms(5),
    height: ms(5),
    borderRadius: ms(3),
    backgroundColor: '#74D8F9',
  },
  dotTop: {
    top: '9%',
    left: '10%',
    opacity: 0.72,
  },
  dotRight: {
    top: '23%',
    right: '10%',
    width: ms(4),
    height: ms(4),
    backgroundColor: '#1598FF',
  },
  bottomRing: {
    position: 'absolute',
    bottom: mvs(-68),
    left: ms(-69),
    width: ms(142, 0.45),
    height: ms(142, 0.45),
    borderRadius: ms(71, 0.45),
    borderWidth: ms(1),
    borderColor: '#0C52C3',
  },
  bottomGlow: {
    position: 'absolute',
    bottom: mvs(-67),
    left: ms(-49),
    width: ms(99, 0.45),
    height: ms(99, 0.45),
    borderRadius: ms(50, 0.45),
    backgroundColor: '#0B3A9F',
  },
});
