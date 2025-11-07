const palette = {
  white: '#FFFFFF',
  grayLightest: '#EDEDED',
  grayLight: '#E3E3E3',
  grayMedium: '#D9D9D9',
  grayDark: '#CECECE',
  grayDarkest: '#7C7C7C',

  oxidizedMetal: '#4A4A4A',
  black: '#000000',

  accent: '#eabe19',
  accentLight: '#eabe19',
};

export const theme = {
  colors: {
    backgroundDark: palette.grayMedium,
    backgroundLight: palette.grayLight,

    button: palette.grayLightest,
    buttonPressed: palette.grayDark,
    buttonDisabled: palette.grayDark,

    buttonPressedTop: palette.grayDarkest,
    buttonPressedBottom: palette.grayMedium,

    divider: palette.grayDarkest,
    dividerTop: palette.grayDarkest,
    dividerBottom: palette.grayMedium,

    trackGradientTop: palette.grayDarkest,
    trackGradientBottom: palette.grayMedium,

    textOnDark: palette.white,
    textOnLight: palette.grayDarkest,
    textSubtle: palette.grayDarkest,

    gaugeNeedle: palette.grayDarkest,
    gaugeNeedleTuned: palette.grayDark,
    gaugeCenterLine: palette.grayDarkest,

    shadowLight: palette.white,
    shadowDark: palette.grayDark,
    shadowAbsolute: palette.black,
  },
  rounding: {
    small: 10,
    medium: 20,
    large: 25,
    pill: 50,
  },
  spacing: {
    small: 5,
    medium: 10,
    large: 20,
  },
};
