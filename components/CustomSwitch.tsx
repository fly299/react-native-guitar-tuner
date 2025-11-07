import { Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../styles/theme';

type CustomSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const SWITCH_WIDTH = 52;
const KNOB_SIZE = 24;
const PADDING = 2;
const TRANSLATE_X_ON = SWITCH_WIDTH - KNOB_SIZE - PADDING * 2;
const TRANSLATE_X_OFF = 0;

export function CustomSwitch({ value, onValueChange }: CustomSwitchProps) {

  const knobStyle = {
    transform: [{ translateX: value ? TRANSLATE_X_ON : TRANSLATE_X_OFF }],
  };

  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <LinearGradient
        colors={[theme.colors.trackGradientTop, theme.colors.trackGradientBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.track, styles.trackStyle]}
      >

        <View style={[styles.knob, knobStyle]} />
      </LinearGradient>
    </Pressable >
  );
}

const styles = StyleSheet.create({
  track: { width: SWITCH_WIDTH, height: KNOB_SIZE + PADDING * 2, borderRadius: (KNOB_SIZE + PADDING * 2) / 2, justifyContent: 'center', padding: PADDING },
  trackStyle: { backgroundColor: theme.colors.buttonPressed, elevation: 2, shadowColor: theme.colors.shadowLight, shadowOffset: { width: -2, height: -2 }, shadowOpacity: 1, shadowRadius: 2 },
  knob: { width: KNOB_SIZE, height: KNOB_SIZE, borderRadius: KNOB_SIZE / 2, backgroundColor: theme.colors.backgroundLight, elevation: 2, shadowColor: theme.colors.shadowDark, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.8, shadowRadius: 3 },
});
