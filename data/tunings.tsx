export interface TuningNote {
  name: string;
  frequency: number;
}

export interface TuningProfile {
  name: string;
  shortName: string;
  description: string;
  notes: Record<string, TuningNote>;
}

type TuningDB = Record<string, TuningProfile>;

export const TUNING_PROFILES: TuningDB = {

  std_e: {
    name: 'Standard E',
    description: 'E A D G B e',
    shortName: 'E',
    notes: {
      '6': { name: 'E', frequency: 82.41 },
      '5': { name: 'A', frequency: 110.0 },
      '4': { name: 'D', frequency: 146.83 },
      '3': { name: 'G', frequency: 196.0 },
      '2': { name: 'B', frequency: 246.94 },
      '1': { name: 'e', frequency: 329.63 },
    },
  },

  std_eb: {
    name: 'Standard E♭',
    description: 'E♭ A♭ D♭ G♭ B♭ e♭',
    shortName: 'E♭',
    notes: {
      '6': { name: 'E♭', frequency: 77.78 },
      '5': { name: 'A♭', frequency: 103.83 },
      '4': { name: 'D♭', frequency: 138.59 },
      '3': { name: 'G♭', frequency: 185.00 },
      '2': { name: 'B♭', frequency: 233.08 },
      '1': { name: 'e♭', frequency: 311.13 },
    },
  },

  std_csharp: {
    name: 'Standard C♯',
    description: 'C♯ F♯ B E G♯ c♯',
    shortName: 'C♯',
    notes: {
      '6': { name: 'C♯', frequency: 69.30 },
      '5': { name: 'F♯', frequency: 92.50 },
      '4': { name: 'B', frequency: 123.47 },
      '3': { name: 'E', frequency: 164.81 },
      '2': { name: 'G♯', frequency: 207.65 },
      '1': { name: 'c♯', frequency: 277.18 },
    },
  },

  drop_d: {
    name: 'Drop D',
    description: 'D A D G B e',
    shortName: 'D↓',
    notes: {
      '6': { name: 'D', frequency: 73.42 },
      '5': { name: 'A', frequency: 110.0 },
      '4': { name: 'D', frequency: 146.83 },
      '3': { name: 'G', frequency: 196.0 },
      '2': { name: 'B', frequency: 246.94 },
      '1': { name: 'e', frequency: 329.63 },
    },
  },

  drop_c: {
    name: 'Drop C',
    description: 'C G C F A D',
    shortName: 'C↓',
    notes: {
      '6': { name: 'C', frequency: 65.41 },
      '5': { name: 'G', frequency: 98.00 },
      '4': { name: 'C', frequency: 130.81 },
      '3': { name: 'F', frequency: 174.61 },
      '2': { name: 'A', frequency: 220.00 },
      '1': { name: 'D', frequency: 293.66 },
    },
  },

  open_g: {
    name: 'Open G',
    description: 'D G D G B D',
    shortName: 'G',
    notes: {
      '6': { name: 'D', frequency: 73.42 },
      '5': { name: 'G', frequency: 98.00 },
      '4': { name: 'D', frequency: 146.83 },
      '3': { name: 'G', frequency: 196.0 },
      '2': { name: 'B', frequency: 246.94 },
      '1': { name: 'D', frequency: 293.66 },
    },
  },
};
