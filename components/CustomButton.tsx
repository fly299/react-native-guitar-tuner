import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { theme } from '../styles/theme';

type CustomButtonProps = {
  onPress: () => void;
  text: string;
  isActive: boolean;
  isDisabled?: boolean;
};

export function CustomButton({
  onPress,
  text,
  isActive,
  isDisabled = false,
}: CustomButtonProps) {

  if (isActive) {
    return (
      <LinearGradient
        colors={[theme.colors.buttonPressedTop, theme.colors.buttonPressedBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.buttonBase, styles.buttonPressed]}>
        <Text style={[styles.buttonText, styles.textPressed, isDisabled && styles.textDisabled]}>{text}</Text>
      </LinearGradient>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.buttonBase,
        styles.buttonReleased,
        isDisabled && styles.buttonDisabled,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          styles.textReleased,
          isDisabled && styles.textDisabled,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: { width: 55, height: 55, borderRadius: theme.rounding.pill, justifyContent: 'center', alignItems: 'center', margin: theme.spacing.small },
  buttonText: { fontSize: 16 },
  buttonReleased: { backgroundColor: theme.colors.button, elevation: 2, shadowColor: theme.colors.shadowAbsolute, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3 },
  textReleased: { color: theme.colors.textOnLight, fontWeight: '500' },
  buttonPressed: { backgroundColor: theme.colors.buttonPressed, elevation: 0, transform: [{ translateY: 2 }], shadowColor: theme.colors.shadowLight, shadowOffset: { width: -3, height: -3 }, shadowOpacity: 0.3, shadowRadius: 3 },
  textPressed: { color: theme.colors.textOnDark, fontWeight: 'bold' },
  buttonDisabled: { backgroundColor: theme.colors.buttonDisabled, elevation: 0, opacity: 0.7 },
  textDisabled: { color: theme.colors.textSubtle },
});
