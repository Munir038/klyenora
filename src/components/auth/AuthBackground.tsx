/**
 * AuthBackground — Multi-layered gradient with floating ambient decorations
 *
 * Provides the signature deep-indigo ambient aesthetic for all authentication screens.
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ms, mvs } from '../../utils/metrics';

interface AuthBackgroundProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const AuthBackground: React.FC<AuthBackgroundProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* ── Multi-layer gradient background ─────────── */}
      <LinearGradient
        colors={['#00144D', '#000E38', '#000824', '#000414']}
        locations={[0, 0.35, 0.7, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* ── Decorative ambient elements ─────────────── */}
      <View pointerEvents="none" style={styles.decorationsContainer}>
        <View style={[styles.dot, styles.dotTop]} />
        <View style={[styles.dot, styles.dotRight]} />
        <View style={styles.orbTopRight} />
        <View style={styles.orbMidLeft} />
        <View style={styles.bottomRing} />
        <View style={styles.bottomGlow} />
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  decorationsContainer: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
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
