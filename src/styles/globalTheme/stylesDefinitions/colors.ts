const activityLegend = {
    lecture: "#e35c22",
    excercise: "#82d32e",
    laboratory: "#3abee5",
    computerLaboratory: "#cf2eee",
    project: "#d22e2e",
    seminar: "#aaaa14",
    other: "#6e6e6e",
}

 const baseColors = {
  // =========================
  // Background colors
  // =========================
  backgroundPrimary: '#191919',
  backgroundSecondary: '#232323',
  backgroundSelectItem: 'white',
  backgroundItem: '#313131',
  backgroundPopup: '#191919',
  backgroundHeader: '#161415',
  overlayBg: 'rgba(0,0,0,0.5)',

  // =========================
  // Border colors
  // =========================
  borderDefault: '#3b3b3b',
  borderLight: '#c2c2c2',
  borderError: '#ff6467',
  borderGray: '#6b6b6b',
  borderDark: '#444',          //  from otpBox
  borderStrongError: '#ff4444', //  from errorText/otpBoxError

  // =========================
  // Accent colors
  // =========================
  accentBlue: '#727dff',
  accentRed: '#a44648',
  accentBlueTransparent: '#727effb6',
  accentRedTransparent: '#a44648ea',

  // New accents from modal
  accentPurple: '#8d95fe',   // confirmButton + otpBoxFilled
  accentDisabled: '#555',    // disabled button

  // =========================
  // Text colors
  // =========================
  textPrimary: 'white',
  textSecondary: '#a1a1a1',
  textContrast: '#000000',
  textError: '#ff6467',
  textStrongError: '#ff4444', // modal error text
  textDisabled: '#999',       // disabled state
  textMutedWhite: '#ffffffce', // confirmButtonText
  textDark: '#222',           // cancelButtonText

  // =========================
  // Modal-specific backgrounds
  // =========================
  modalContainer: '#1e1f1f',   // container background
  modalOtpFilled: '#252525',   // otpBox filled background

  // =========================
  // Button backgrounds
  // =========================
  confirmButtonBg: '#2e2e2e',
  cancelButtonBg: '#232323',
  cancelButtonBorder: '#3b3b3b',

  buttonPurple: '#8d95fe',  // confirm modal button
  buttonWhite: '#f0f0f0',   // cancel modal button

  // =========================
  // Activity legend colors
  // =========================
  activityLegend: activityLegend,
};


export default { baseColors: baseColors };