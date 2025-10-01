import palette from "./basePalette";

const objects = {
  // text definitions
  textVariants: {
    regularText: {
      fontSize: 16,
      color: palette.white,
    },
    labelText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: palette.white,
    },
  },
  // button definitions
  buttons: {
    primaryButton: {
      backgroundColor: palette.lightPurple,
      paddingVertical: 12,
    },
    secondaryButton: {
      backgroundColor: palette.darkGray2,
      paddingVertical: 12,
    },
    cancelButton: {
      backgroundColor: palette.red,
      paddingVertical: 12,
    },
  },
};

export default objects;