import { StyleSheet } from 'react-native';

const calculatorStyles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    // height: '80%', // j
    backgroundColor: '#1c1c1c',
  },
  overlayLabel: {color: 'white', fontSize: 16, paddingLeft: 15, paddingBottom: 5},
  text: {
    fontSize: 16,
    color: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '100%',
    backgroundColor: '#313131',
    // borderRadius: 50,
    paddingHorizontal: 15,
  },

  singleItem: {
    width: '33.33%',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  leftText: {
    textAlign: 'left',
  },
  centerText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  rightText: {
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  rootItemContainer: {
    // backgroundColor: '#b43838ff',

    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
    alignSelf: 'center',

    alignItems: 'center',
  },
  headerContainer: {
    // backgroundColor: '#181414',
    alignSelf: 'center',
    marginTop: 5,
    marginLeft: 15,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',

    paddingLeft: 15,
  },
  popUpMenu: {
    gap: 5,
    paddingVertical: 20,

    borderWidth: 1,
    borderColor: '#c2c2c2ff',

    backgroundColor: '#1b1b1bff',
    position: 'absolute',
    justifyContent: 'center',

    width: '80%',
    height: 'auto',
    borderRadius: 8,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 1, 
  },
  summaryContainer: {
    paddingLeft: 15,
    paddingRight: 15,

    display: 'flex',
    flexDirection: 'column',

    marginBottom: 20,
  },
  summarySpacer: {
    display: 'flex',
    flexDirection: 'row',
  },
  deleteButton: {
    // backgroundColor: '#e9e3e3ff',

    borderWidth: 1.2,
    borderColor: '#c9c9c9ff',

    borderRadius: 4,
    width: 17,
    height: 17,

    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    fontSize: 11,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    alignSelf: 'center',
    marginBottom: '2%',
    marginTop: '2%',
    width: '80%',
    height: 50,
    backgroundColor: '#1b1b1bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c2c2c2ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userInput: {
    backgroundColor: '#494749ff',

    color: 'white',


    paddingLeft: 10,
    alignSelf: 'center',

    borderRadius: 8,
    width: '90%',
  },
  noItemsInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsInfoText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#a0a0a0ff',
  },
  // -----------------------------

  addCourseMenuBtnText: {
    fontSize: 30,
    color: 'white',

  },
  addCourseMenuBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,

    backgroundColor: '#812ea1ff',

    display: 'flex',
    alignSelf: 'center',

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 20,
  },
});

export default calculatorStyles;
