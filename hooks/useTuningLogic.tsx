import { useMemo } from 'react';
import { TuningNote } from '../data/tunings';

export interface TuningInfo {
  note: string;
  message: string;
  frequency: string;
  cents: number;
  degrees: number;
  tuningName: string;
}

type TuningNotesRecord = Record<string, TuningNote>;

const MAX_CENTS_DEVIATION = 50;
const MAX_DEGREES = 90;
const CENTS_IDEAL_TOLERANCE = 15;

export function useTuningLogic(
  frequency: number | null,
  tuningNotes: TuningNotesRecord,
  targetNoteKey: string | null,
  activeTuningName: string
): TuningInfo {

  return useMemo(() => {

    if (!frequency) {
      if (targetNoteKey && tuningNotes[targetNoteKey]) {
        return {
          note: tuningNotes[targetNoteKey].name,
          message: 'TUNING',
          frequency: ' ',
          cents: 0,
          degrees: 0,
          tuningName: activeTuningName,
        };
      } else {
        return { note: ' ', message: '', frequency: ' ', cents: 0, degrees: 0, tuningName: activeTuningName };
      }
    }

    let bestNoteName = '';
    let targetFreq = 0;

    if (targetNoteKey) {
      const targetNote = tuningNotes[targetNoteKey];
      if (targetNote) {
        bestNoteName = targetNote.name;
        targetFreq = targetNote.frequency;
      }
    } else {
      let minDifference = Infinity;
      for (const stringKey in tuningNotes) {
        const note = tuningNotes[stringKey];
        const difference = Math.abs(frequency - note.frequency);
        if (difference < minDifference) {
          minDifference = difference;
          bestNoteName = note.name;
          targetFreq = note.frequency;
        }
      }
    }

    if (targetFreq === 0) {
      return { note: ' ', message: 'ERROR', frequency: ' ', cents: 0, degrees: 0, tuningName: activeTuningName };
    }

    const freq_octave_down = frequency / 2;
    const freq_octave_up = frequency * 2;

    const diff_current = Math.abs(frequency - targetFreq);
    const diff_down = Math.abs(freq_octave_down - targetFreq);
    const diff_up = Math.abs(freq_octave_up - targetFreq);

    let correctedFrequency = frequency;
    if (diff_down < diff_current && diff_down < diff_up) {
      correctedFrequency = freq_octave_down;
    } else if (diff_up < diff_current && diff_up < diff_down) {
      correctedFrequency = freq_octave_up;
    }

    const cents = 1200 * Math.log2(correctedFrequency / targetFreq);

    const centsClamped = Math.max(-MAX_CENTS_DEVIATION, Math.min(MAX_CENTS_DEVIATION, cents));
    const degrees = (centsClamped / MAX_CENTS_DEVIATION) * MAX_DEGREES;

    let message = '';
    if (cents > CENTS_IDEAL_TOLERANCE) {
      message = 'TOO HIGH';
    } else if (cents < -CENTS_IDEAL_TOLERANCE) {
      message = 'TOO LOW';
    } else {
      message = 'PERFECT';
    }

    return {
      note: bestNoteName,
      message: message,
      frequency: correctedFrequency.toFixed(2) + ' Hz',
      cents: cents,
      degrees: degrees,
      tuningName: activeTuningName,
    };

  }, [frequency, tuningNotes, targetNoteKey, activeTuningName]);
}
