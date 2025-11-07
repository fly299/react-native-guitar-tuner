import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TuningProfile, TUNING_PROFILES } from '../data/tunings';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../styles/theme';
import { CustomSwitch } from './CustomSwitch';
import { CustomButton } from './CustomButton';

type ControlPanelProps = {
  activeTuning: TuningProfile;
  activeTuningKey: string;
  targetNoteKey: string | null;
  isManualMode: boolean;
  onSetTuning: (key: string) => void;
  onSetTargetNote: (key: string) => void;
  onToggleManualMode: (isManual: boolean) => void;
};

export function ControlPanel({
  activeTuning,
  activeTuningKey,
  targetNoteKey,
  isManualMode,
  onSetTuning,
  onSetTargetNote,
  onToggleManualMode,
}: ControlPanelProps) {

  return (
    <View style={styles.container}>

      <View style={styles.section}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {Object.keys(TUNING_PROFILES).map((key) => {
            const tuning = TUNING_PROFILES[key];
            return (
              <CustomButton
                key={key}
                text={tuning.shortName}
                isActive={key === activeTuningKey}
                onPress={() => onSetTuning(key)}
              />
            );
          })}
        </ScrollView>
      </View>



      <View style={styles.dividerSection}>
        <LinearGradient
          colors={[theme.colors.trackGradientTop, theme.colors.trackGradientBottom]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.divider}
        />
      </View>

      <View style={[styles.section, styles.switchSection]}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Manual Mode</Text>
          <View style={styles.switchControl}>
            <Text style={styles.onOffLabel}>
              {isManualMode ? "ON" : "OFF"}
            </Text>
            <CustomSwitch
              value={isManualMode}
              onValueChange={onToggleManualMode}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {Object.keys(activeTuning.notes).reverse().map((stringKey) => {
            const note = activeTuning.notes[stringKey];
            return (
              <CustomButton
                key={stringKey}
                text={note.name}
                isActive={isManualMode && stringKey === targetNoteKey}
                isDisabled={!isManualMode}
                onPress={() => onSetTargetNote(stringKey)}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: theme.spacing.small, justifyContent: 'flex-start' },
  section: { justifyContent: 'center', minHeight: 90 },
  scrollContent: { flexGrow: 1, paddingVertical: theme.spacing.large, paddingHorizontal: theme.spacing.medium, alignItems: 'center', justifyContent: 'center' },
  dividerSection: { paddingHorizontal: theme.spacing.medium, marginVertical: theme.spacing.medium },
  divider: { height: 8, width: '80%', borderRadius: 4, alignSelf: 'center', backgroundColor: theme.colors.divider, elevation: 4, shadowColor: theme.colors.shadowLight, shadowOffset: { width: -2, height: -2 }, shadowOpacity: 1, shadowRadius: 2 },
  switchSection: { minHeight: 50, justifyContent: 'center', alignItems: 'center', paddingHorizontal: theme.spacing.medium, marginVertical: theme.spacing.small }, // Added marginVertical
  switchRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  switchLabel: { fontSize: 16, color: theme.colors.textOnLight, fontWeight: '500' },
  switchControl: { flexDirection: 'row', alignItems: 'center' },
  onOffLabel: { fontSize: 16, color: theme.colors.textOnLight, fontWeight: 'bold', minWidth: 40, textAlign: 'right', marginRight: theme.spacing.small },
});
