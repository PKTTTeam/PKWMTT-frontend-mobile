import { StyleSheet } from 'react-native';

export const colors = {
  // =========================
  // Background colors
  // =========================
  backgroundPrimary: '#191919', // główne tło aplikacji
  backgroundSecondary: '#232323', // tło inputów i standardowych przycisków
  backgroundItem: '#313131', // tło elementów listy
  backgroundPopup: '#191919', // tło popupów/modalów
  backgroundHeader: '#161415', // tło headera
  overlay: 'rgba(0, 0, 0, 0.5)', // tło overlay

  // =========================
  // Border colors
  // =========================
  borderDefault: '#3b3b3b', // standardowa obwódka
  borderLight: '#c2c2c2', // jasna obwódka np. przy przyciskach
  borderDanger: '#ff6467', // kolor błędu
  borderGray: '#6b6b6b', // szara obwódka np. summary
  cancelButtonBorder: '#3b3b3b', // border cancel button

  // =========================
  // Accent colors
  // =========================
  accentBlue: '#727dff', // przycisk dodawania kursu

  // =========================
  // Text colors
  // =========================
  textPrimary: 'white', // główny kolor tekstu
  textSecondary: '#a1a1a1', // szary tekst np. liczniki
  textError: '#ff6467', // czerwony tekst błędu

  // =========================
  // Button backgrounds
  // =========================
  confirmButtonBg: '#2e2e2e',
  cancelButtonBg: '#232323',
};

const calculatorStyles = StyleSheet.create({
  // =========================
  // Container
  // =========================
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: colors.backgroundPrimary,
  },

  // =========================
  // Labels & Text
  // =========================
  overlayLabel: {
    color: colors.textPrimary,
    fontSize: 16,
    paddingLeft: 15,
    paddingBottom: 5,
  },
  overlayLabelErr: {
    color: colors.textError,
    fontSize: 16,
    paddingLeft: 15,
    paddingBottom: 5,
  },
  countersText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  bottomMenu: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  grayLabel: {
    color: colors.textSecondary,
    fontSize: 16,
    paddingLeft: 15,
  },
  noItemsInfoText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: colors.textSecondary,
  },
  addCourseMenuBtnText: {
    fontSize: 35,
    color: colors.textPrimary,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  inputErrorFeed: {
    color: colors.borderDanger,
    fontSize: 14,
    paddingLeft: 15,
  },

  // =========================
  // Item containers
  // =========================
  itemContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '100%',
    paddingHorizontal: 15,
  },
  singleItem: { width: '33.33%' },
  leftText: { textAlign: 'left', textAlignVertical: 'center' },
  centerText: { textAlign: 'center', textAlignVertical: 'center' },
  rightText: { textAlign: 'right', textAlignVertical: 'center' },
  rootItemContainer: {
    backgroundColor: colors.backgroundItem,
    paddingLeft: 10,
    borderRadius: 8,
    height:'auto',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerRootItemContainer: {
    backgroundColor: colors.backgroundHeader,
    paddingLeft: 10,
    borderRadius: 8,

    height: 40,

    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '100%',
    paddingHorizontal: 10,
  },
  singleItemHeader: {
    width: '33.33%',
  },
  summaryContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: colors.borderGray,
    width: '95%',
    paddingVertical: 7,
    borderRadius: 8,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
  },
  summarySpacer: { display: 'flex', flexDirection: 'row' },

  // =========================
  // Buttons
  // =========================
  button: {
    alignSelf: 'center',
    marginBottom: '2%',
    marginTop: '2%',
    width: '80%',
    height: 50,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  cancelButton: {
    alignSelf: 'center',
    marginBottom: '2%',
    marginTop: '2%',
    width: '80%',
    height: 50,
    backgroundColor: colors.cancelButtonBg,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cancelButtonBorder,
  },
  confirmButton: {
    alignSelf: 'center',
    marginBottom: '2%',
    marginTop: '2%',
    width: '80%',
    height: 50,
    backgroundColor: colors.confirmButtonBg,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCourseMenuBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.accentBlue,
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  // =========================
  // Inputs
  // =========================
  userInput: {
    backgroundColor: colors.backgroundSecondary,
    color: colors.textPrimary,
    paddingLeft: 10,
    alignSelf: 'center',
    borderRadius: 8,
    width: '90%',
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  invalidUserInput: {
    backgroundColor: colors.backgroundSecondary,
    color: colors.textPrimary,
    paddingLeft: 10,
    alignSelf: 'center',
    borderRadius: 8,
    width: '90%',
    borderWidth: 1,
    borderColor: colors.borderDanger,
  },

  // =========================
  // Overlays & Popups
  // =========================
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlay,
    zIndex: 1,
  },
  popUpMenu: {
    gap: 5,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    backgroundColor: colors.backgroundPopup,
    position: 'absolute',
    justifyContent: 'center',
    width: '80%',
    height: 'auto',
    borderRadius: 8,
  },

  // =========================
  // Delete Button
  // =========================
  deleteButton: {
    borderWidth: 1.2,
    borderColor: colors.borderLight,
    borderRadius: 4,
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    fontSize: 11,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },

  // =========================
  // No items info
  // =========================
  noItemsInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default calculatorStyles;
