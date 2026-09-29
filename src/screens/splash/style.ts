import { StyleSheet } from 'react-native';
import { FONT_FAMILY } from '../../constants/typography';
import { fs, ms, mvs } from '../../utils/metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000B2D',
    overflow: 'hidden',
  },
  background: {
    ...StyleSheet.absoluteFill,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandGroup: {
    alignItems: 'center',
  },
  logoImage: {
    width: ms(220, 0.35),
    height: ms(220, 0.35),
  },
  subtitle: {
    marginTop: mvs(6),
    color: '#FFFFFF',
    fontFamily: FONT_FAMILY.italic,
    fontSize: fs(16),
    letterSpacing: 0,
  },
  orbTop: {
    position: 'absolute',
    top: mvs(-130),
    right: ms(-108),
    width: ms(215, 0.45),
    height: ms(215, 0.45),
    borderRadius: ms(108, 0.45),
  },
  orbGlow: {
    position: 'absolute',
    top: mvs(-58),
    right: ms(-3),
    width: ms(110, 0.45),
    height: ms(110, 0.45),
    borderRadius: ms(55, 0.45),
    overflow: 'hidden',
  },
  orbGlowFill: {
    flex: 1,
    borderRadius: ms(55, 0.45),
  },
  orbBottom: {
    position: 'absolute',
    bottom: mvs(-93),
    left: ms(-88),
    width: ms(190, 0.45),
    height: ms(190, 0.45),
    borderRadius: ms(95, 0.45),
    borderWidth: ms(1),
    borderColor: '#07327F',
  },
  orbBottomFill: {
    position: 'absolute',
    bottom: mvs(-87),
    left: ms(-56),
    width: ms(128, 0.45),
    height: ms(128, 0.45),
    borderRadius: ms(64, 0.45),
  },
  dot: {
    position: 'absolute',
    width: ms(7),
    height: ms(7),
    borderRadius: ms(4),
    backgroundColor: '#B9F5F0',
  },
  dotOne: {
    top: '22%',
    left: '12%',
    opacity: 0.7,
  },
  dotTwo: {
    top: '32%',
    right: '12%',
    width: ms(4),
    height: ms(4),
    backgroundColor: '#159CFF',
    opacity: 0.8,
  },
  dotThree: {
    bottom: '22%',
    right: '17%',
    width: ms(6),
    height: ms(6),
    opacity: 0.65,
  },
});
