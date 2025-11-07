import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { TuningInfo } from '../hooks/useTuningLogic';
import { theme } from '../styles/theme';
import { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.6;
const INDICATOR_SIZE = 20;
const MAX_DEGREES = 90;
const DIGITAL_READOUT_HEIGHT = 160;

export function TunerGauge({ tuningInfo }: { tuningInfo: TuningInfo }) {
  const { note, message, frequency, degrees, tuningName } = tuningInfo;
  const rotation = useSharedValue(0);

  const targetAngle = Math.max(-MAX_DEGREES, Math.min(MAX_DEGREES, degrees));

  useEffect(() => {
    rotation.value = withSpring(targetAngle, { damping: 100, stiffness: 100 });
  }, [targetAngle]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const animatedGradientStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-rotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.gaugeBase}>

        <Animated.View style={[styles.indicatorContainer, animatedContainerStyle]}>
          <Animated.View style={[styles.indicatorWrapper, animatedGradientStyle]}>
            <LinearGradient
              colors={[theme.colors.buttonPressedTop, theme.colors.buttonPressedBottom]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.indicator}
            />
          </Animated.View>
        </Animated.View>

      </View>

      <View style={styles.digitalReadout}>
        <View style={styles.topRow}>
          <Text style={styles.scaleLabelLeft}>-50</Text>
          <Text style={styles.tuningNameText} numberOfLines={1} ellipsizeMode="tail">{tuningName}</Text>
          <Text style={styles.scaleLabelRight}>+50</Text>
        </View>

        <View style={styles.infoGroup}>
          <Text
            style={styles.noteText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            maxFontSizeMultiplier={1.0}
          >
            {note}
          </Text>
          <Text style={styles.messageText} numberOfLines={1}>{message}</Text>
        </View>

        <Text style={styles.scaleLabelCenter}>{frequency}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 400 },
  gaugeBase: { width: CIRCLE_SIZE, height: CIRCLE_SIZE, borderRadius: CIRCLE_SIZE / 2, backgroundColor: theme.colors.button, elevation: 4, shadowColor: theme.colors.shadowAbsolute, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 0.3, shadowRadius: 5, position: 'relative', alignItems: 'center', overflow: 'hidden' },
  indicatorContainer: { width: CIRCLE_SIZE, height: CIRCLE_SIZE, position: 'absolute', alignItems: 'center' },
  indicatorWrapper: { position: 'absolute', top: 10 },
  indicator: { width: INDICATOR_SIZE, height: INDICATOR_SIZE, borderRadius: INDICATOR_SIZE / 2, elevation: 8, shadowColor: theme.colors.shadowDark, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.8, shadowRadius: 3 },
  digitalReadout: { width: CIRCLE_SIZE, height: DIGITAL_READOUT_HEIGHT, marginTop: theme.spacing.large, padding: theme.spacing.medium, backgroundColor: theme.colors.shadowAbsolute, borderRadius: theme.rounding.large, elevation: 4, justifyContent: 'space-between' },
  topRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 },
  tuningNameText: { color: theme.colors.textOnDark, fontSize: 16, fontWeight: 'normal', textAlign: 'center', flex: 1, marginHorizontal: 5 },
  infoGroup: { alignItems: 'center', width: '100%', flexGrow: 1, justifyContent: 'center' },
  noteText: { fontSize: 52, fontWeight: 'bold', color: theme.colors.textOnDark, textAlign: 'center', width: '100%', height: 60, lineHeight: 60 },
  messageText: { fontSize: 18, color: theme.colors.textOnDark, textAlign: 'center', height: 24, lineHeight: 24 },
  scaleLabelLeft: { color: theme.colors.textOnDark, fontSize: 14 },
  scaleLabelCenter: { color: theme.colors.textOnDark, fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  scaleLabelRight: { color: theme.colors.textOnDark, fontSize: 14 },
});
