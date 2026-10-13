import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './style';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // ── Animation values ──────────────────────────────────
  const logoFade = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.65)).current;
  const taglineFade = useRef(new Animated.Value(0)).current;
  const taglineSlide = useRef(new Animated.Value(12)).current;
  const shimmerFade = useRef(new Animated.Value(0)).current;
  const shimmerX = useRef(new Animated.Value(-40)).current;
  const glowPulse = useRef(new Animated.Value(0.6)).current;
  const ringFade = useRef(new Animated.Value(0)).current;
  const ringScale = useRef(new Animated.Value(0.85)).current;
  const versionFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Phase 1: Concentric rings fade in + scale
    const ringEntrance = Animated.parallel([
      Animated.timing(ringFade, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(ringScale, {
        toValue: 1,
        friction: 10,
        tension: 40,
        useNativeDriver: true,
      }),
    ]);

    // Phase 2: Logo entrance (fade + spring scale)
    const logoEntrance = Animated.parallel([
      Animated.timing(logoFade, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
    ]);

    // Phase 3: Tagline slide-up + fade
    const taglineEntrance = Animated.parallel([
      Animated.timing(taglineFade, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(taglineSlide, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    // Phase 4: Shimmer line appears + sweeps
    const shimmerEntrance = Animated.sequence([
      Animated.timing(shimmerFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(shimmerX, {
        toValue: 80,
        duration: 800,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    // Phase 5: Version text
    const versionEntrance = Animated.timing(versionFade, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    });

    // Stagger the phases
    Animated.sequence([
      ringEntrance,
      Animated.delay(80),
      logoEntrance,
      Animated.delay(150),
      taglineEntrance,
      Animated.delay(100),
      shimmerEntrance,
      versionEntrance,
    ]).start();

    // Pulsing glow loop
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glowPulse, {
          toValue: 0.6,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    glowLoop.start();

    // Transition out
    const timer = setTimeout(onFinish, 2800);

    return () => {
      clearTimeout(timer);
      glowLoop.stop();
    };
  }, [
    logoFade, logoScale, taglineFade, taglineSlide,
    shimmerFade, shimmerX, glowPulse, ringFade, ringScale,
    versionFade, onFinish,
  ]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Deep multi-stop gradient background ─────────── */}
      <LinearGradient
        colors={['#001248', '#000D3A', '#00071F', '#000510']}
        locations={[0, 0.3, 0.65, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.background}
      />

      {/* ── Ambient orbs ───────────────────────────────── */}
      <LinearGradient
        colors={['#0A2A80', '#041A55']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.orbTop}
      />
      <View style={styles.orbTopLeft} />
      <Animated.View style={[styles.orbGlow, { opacity: glowPulse }]}>
        <LinearGradient
          colors={['#2855D4', '#153598']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.orbGlowFill}
        />
      </Animated.View>
      <View style={styles.orbBottom} />
      <LinearGradient
        colors={['#0E3590', '#071D55']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.orbBottomFill}
      />
      <View style={styles.orbBottomRight} />

      {/* ── Floating accent dots ───────────────────────── */}
      <View style={[styles.dot, styles.dotOne]} />
      <View style={[styles.dot, styles.dotTwo]} />
      <View style={[styles.dot, styles.dotThree]} />
      <View style={[styles.dot, styles.dotFour]} />

      {/* ── Concentric ring decorations ────────────────── */}
      <SafeAreaView style={styles.content}>
        <Animated.View
          style={[
            styles.ringCenter,
            { opacity: ringFade, transform: [{ scale: ringScale }] },
          ]}
        />
        <Animated.View
          style={[
            styles.ringInner,
            { opacity: ringFade, transform: [{ scale: ringScale }] },
          ]}
        />

        {/* ── Center radial glow ─────────────────────── */}
        <Animated.View style={[styles.centerGlow, { opacity: glowPulse }]} />

        {/* ── Brand group ────────────────────────────── */}
        <Animated.View
          style={[
            styles.brandGroup,
            { opacity: logoFade, transform: [{ scale: logoScale }] },
          ]}
        >
          <Image
            source={require('../../assets/klyenora-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
            accessibilityLabel="Klyenora logo"
          />

          {/* Tagline with staggered entrance */}
          <Animated.Text
            style={[
              styles.subtitle,
              {
                opacity: taglineFade,
                transform: [{ translateY: taglineSlide }],
              },
            ]}
          >
            Every client, clearly connected.
          </Animated.Text>

          {/* Shimmer accent line */}
          <Animated.View style={[styles.shimmerLine, { opacity: shimmerFade }]}>
            <Animated.View
              style={[
                styles.shimmerFill,
                { transform: [{ translateX: shimmerX }] },
              ]}
            >
              <LinearGradient
                colors={['transparent', 'rgba(100, 170, 255, 0.7)', 'transparent']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{ flex: 1 }}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>

        {/* ── Version badge ───────────────────────────── */}
        <Animated.Text style={[styles.versionText, { opacity: versionFade }]}>
          v1.0.0
        </Animated.Text>
      </SafeAreaView>
    </View>
  );
};

export default SplashScreen;
