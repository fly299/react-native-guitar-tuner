import { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TunerGauge } from '../components/TunerGauge';
import { ControlPanel } from '../components/ControlPanel';
import { usePitchAnalysis } from '../hooks/usePitchAnalysis';
import { TUNING_PROFILES } from '../data/tunings';
import { useTuningLogic } from '../hooks/useTuningLogic';
import { theme } from '../styles/theme';

export default function TunerScreen() {

  const [activeTuningKey, setActiveTuningKey] = useState('std_e');
  const [targetNoteKey, setTargetNoteKey] = useState<string | null>(null);

  const activeTuning = TUNING_PROFILES[activeTuningKey];
  const isManualMode = targetNoteKey !== null;

  const tone = usePitchAnalysis();
  const tuningInfo = useTuningLogic(
    tone,
    activeTuning.notes,
    targetNoteKey,
    activeTuning.name
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.mainContainer}>

        <View style={styles.presentationZone}>
          <TunerGauge tuningInfo={tuningInfo} />
        </View>

        <View style={styles.controlZoneContainer}>
          <ControlPanel
            activeTuning={activeTuning}
            activeTuningKey={activeTuningKey}
            targetNoteKey={targetNoteKey}
            isManualMode={isManualMode}

            onSetTuning={(key) => {
              setActiveTuningKey(key);
            }}
            onSetTargetNote={(key) => {
              setTargetNoteKey(key);
            }}
            onToggleManualMode={(isManual) => {
              setTargetNoteKey(isManual ? '6' : null);
            }}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.backgroundDark },
  mainContainer: { flex: 1, flexDirection: 'column' },
  presentationZone: { flex: 1, justifyContent: 'center', padding: theme.spacing.large },
  controlZoneContainer: { height: 320, backgroundColor: theme.colors.backgroundLight, borderTopLeftRadius: theme.rounding.pill, borderTopRightRadius: theme.rounding.pill, elevation: 16, shadowColor: theme.colors.shadowAbsolute, shadowOffset: { width: 0, height: -6 }, shadowOpacity: 0.4, shadowRadius: 10 },
});
