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
  const fadeIn = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.72)).current;
  const glow = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 7,
        tension: 55,
        useNativeDriver: true,
      }),
    ]).start();

    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0.7,
          duration: 1400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    glowAnimation.start();
    const timer = setTimeout(onFinish, 2200);

    return () => {
      clearTimeout(timer);
      glowAnimation.stop();
    };
  }, [fadeIn, glow, logoScale, onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#00266E', '#001650', '#000B2D']}
        locations={[0, 0.48, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.86, y: 1 }}
        style={styles.background}
      />
      <LinearGradient
        colors={['#092B83', '#03154B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.orbTop}
      />
      <Animated.View style={[styles.orbGlow, { opacity: glow }]}>
        <LinearGradient
          colors={['#315FE7', '#173AA8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.orbGlowFill}
        />
      </Animated.View>
      <View style={styles.orbBottom} />
      <LinearGradient
        colors={['#113C9E', '#06194F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.orbBottomFill}
      />
      <View style={[styles.dot, styles.dotOne]} />
      <View style={[styles.dot, styles.dotTwo]} />
      <View style={[styles.dot, styles.dotThree]} />

      <SafeAreaView style={styles.content}>
        <Animated.View
          style={[
            styles.brandGroup,
            { opacity: fadeIn, transform: [{ scale: logoScale }] },
          ]}>
          <Image
            source={require('../../assets/klyenora-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
            accessibilityLabel="Client Nest logo"
          />
          <Text style={styles.subtitle}>Every client, clearly connected.</Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default SplashScreen;
