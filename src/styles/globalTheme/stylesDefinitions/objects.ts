import palette from "./basePalette";

const objects = {
  // text definitions - work in porgress
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
  // button definitions - work in porgress
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