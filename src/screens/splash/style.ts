import { StyleSheet } from 'react-native';
import { FONT_FAMILY } from '../../constants/typography';
import { fs, ms, mvs } from '../../utils/metrics';

export const styles = StyleSheet.create({
  /* ── Root ─────────────────────────────────────────────── */
  container: {
    flex: 1,
    backgroundColor: '#000510',
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

  /* ── Brand group ─────────────────────────────────────── */
  brandGroup: {
    alignItems: 'center',
  },
  logoImage: {
    width: ms(190, 0.35),
    height: ms(190, 0.35),
  },

  /* ── Tagline ─────────────────────────────────────────── */
  subtitle: {
    marginTop: mvs(8),
    color: 'rgba(210, 225, 255, 0.85)',
    fontFamily: FONT_FAMILY.medium,
    fontSize: fs(14.5),
    letterSpacing: 1.2,
  },

  /* ── Shimmer line under tagline ──────────────────────── */
  shimmerLine: {
    marginTop: mvs(16),
    width: ms(80),
    height: ms(2),
    borderRadius: ms(1),
    backgroundColor: 'rgba(80, 150, 255, 0.3)',
    overflow: 'hidden',
  },
  shimmerFill: {
    width: '40%',
    height: '100%',
    borderRadius: ms(1),
  },

  /* ── Version text ────────────────────────────────────── */
  versionText: {
    position: 'absolute',
    bottom: mvs(38),
    color: 'rgba(100, 140, 200, 0.3)',
    fontFamily: FONT_FAMILY.regular,
    fontSize: fs(9),
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  /* ── Decorative orbs — top-right cluster ─────────────── */
  orbTop: {
    position: 'absolute',
    top: mvs(-140),
    right: ms(-110),
    width: ms(230, 0.45),
    height: ms(230, 0.45),
    borderRadius: ms(115, 0.45),
  },
  orbGlow: {
    position: 'absolute',
    top: mvs(-50),
    right: ms(5),
    width: ms(100, 0.45),
    height: ms(100, 0.45),
    borderRadius: ms(50, 0.45),
    overflow: 'hidden',
  },
  orbGlowFill: {
    flex: 1,
    borderRadius: ms(50, 0.45),
  },

  /* ── Secondary top-left orb ──────────────────────────── */
  orbTopLeft: {
    position: 'absolute',
    top: mvs(-60),
    left: ms(-80),
    width: ms(160, 0.45),
    height: ms(160, 0.45),
    borderRadius: ms(80, 0.45),
    backgroundColor: 'rgba(15, 40, 120, 0.2)',
  },

  /* ── Decorative orbs — bottom-left cluster ───────────── */
  orbBottom: {
    position: 'absolute',
    bottom: mvs(-100),
    left: ms(-90),
    width: ms(200, 0.45),
    height: ms(200, 0.45),
    borderRadius: ms(100, 0.45),
    borderWidth: ms(1),
    borderColor: 'rgba(20, 60, 160, 0.2)',
  },
  orbBottomFill: {
    position: 'absolute',
    bottom: mvs(-85),
    left: ms(-55),
    width: ms(130, 0.45),
    height: ms(130, 0.45),
    borderRadius: ms(65, 0.45),
  },

  /* ── Additional bottom-right ambient orb ─────────────── */
  orbBottomRight: {
    position: 'absolute',
    bottom: mvs(-40),
    right: ms(-50),
    width: ms(120, 0.45),
    height: ms(120, 0.45),
    borderRadius: ms(60, 0.45),
    backgroundColor: 'rgba(20, 50, 140, 0.1)',
  },

  /* ── Center radial glow (behind logo) ────────────────── */
  centerGlow: {
    position: 'absolute',
    width: ms(300, 0.4),
    height: ms(300, 0.4),
    borderRadius: ms(150, 0.4),
    backgroundColor: 'rgba(25, 60, 180, 0.06)',
  },

  /* ── Floating accent dots ────────────────────────────── */
  dot: {
    position: 'absolute',
    borderRadius: ms(50),
  },
  dotOne: {
    top: '20%',
    left: '11%',
    width: ms(5),
    height: ms(5),
    backgroundColor: '#5ECEF6',
    opacity: 0.45,
  },
  dotTwo: {
    top: '30%',
    right: '13%',
    width: ms(3.5),
    height: ms(3.5),
    backgroundColor: '#3D8BFF',
    opacity: 0.5,
  },
  dotThree: {
    bottom: '24%',
    right: '16%',
    width: ms(4.5),
    height: ms(4.5),
    backgroundColor: '#5ECEF6',
    opacity: 0.35,
  },
  dotFour: {
    bottom: '32%',
    left: '14%',
    width: ms(3),
    height: ms(3),
    backgroundColor: '#3D8BFF',
    opacity: 0.3,
  },

  /* ── Ring decorations (subtle geometric accents) ──────── */
  ringCenter: {
    position: 'absolute',
    width: ms(340, 0.35),
    height: ms(340, 0.35),
    borderRadius: ms(170, 0.35),
    borderWidth: ms(0.5),
    borderColor: 'rgba(50, 100, 220, 0.06)',
  },
  ringInner: {
    position: 'absolute',
    width: ms(240, 0.35),
    height: ms(240, 0.35),
    borderRadius: ms(120, 0.35),
    borderWidth: ms(0.5),
    borderColor: 'rgba(50, 100, 220, 0.04)',
  },
});
