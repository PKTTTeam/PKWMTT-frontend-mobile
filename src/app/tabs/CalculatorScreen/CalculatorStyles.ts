import { StyleSheet } from 'react-native';

const calculatorStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#1c1c1c',

    gap: 10,
  },
  tile: {
    backgroundColor: '#1c1c1c',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1.5,
    borderColor: '#c2c2c2ff',

    gap: 3,

    height: 'auto',
    paddingVertical: 5,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  summaryRow: {
    marginLeft: 15,
    gap: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  tileTitle: {
    color: 'white',
    fontSize: 20,
  },
  tileHeader: {
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tileInputName: {
    marginLeft: 15,
    color: 'white',
    fontSize: 14,
  },
  button: {
    marginVertical: 6,

    alignSelf: 'center',
    width: '80%',
    height: 45,
    backgroundColor: '#e7e7e7ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000ff',
    fontSize: 16,
    fontWeight: '600',
  },
  userInputField: {
    borderWidth: 1,
    borderColor: '#c2c2c2ff',
    paddingHorizontal: 10,
    borderBlockColor: '#c2c2c2ff',
    borderRadius: 8,

    color: 'white',
    width: '90%',
    alignSelf: 'center',
  },
  noItemsInfoText: {
    marginLeft: 15,
    fontSize: 18,
    fontStyle: 'italic',
    color: 'white',
  },

  // =========================
  // =========================
  // =========================

  dropdownButton: {
    borderWidth: 1,
    borderColor: '#c2c2c2ff',
    paddingHorizontal: 10,
    borderBlockColor: '#c2c2c2ff',
    borderRadius: 8,

    width: '90%',
    height: 40,
    justifyContent: 'center',

    alignSelf: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: 'white',
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: '#444',

    paddingLeft: 5,
    paddingVertical: 5,

    marginTop: 41,
    marginLeft: 20,
    maxWidth: '20%',
    borderRadius: 8,

    zIndex: 100,
    width: '100%',
    height: 'auto',
  },
  dropdownOption: {
 

  },
  dropdownOptionText: {
    color: 'white',
  },

  // =========================
  // =========================
  // =========================
  courseItemText: {
    fontSize: 16,
    color: 'white',
  },
  courseItemContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '100%',
    backgroundColor: '#313131',
    // borderRadius: 50,
    paddingHorizontal: 15,
  },

  singleItem: {
    width: '33.33%',
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
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
    alignSelf: 'center',

    alignItems: 'center',
  },
  headerContainer: {
    alignSelf: 'center',
    marginTop: 5,
    marginLeft: 15,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',

    paddingLeft: 15,
  },
  bottomMenu: {
    backgroundColor: '#1b1b1bff',
    paddingTop: '2%',
  },
  summaryContainer: {
    // backgroundColor: '#208135ff',
    paddingLeft: 15,
    paddingRight: 15,

    display: 'flex',
    flexDirection: 'column',
  },
  summarySpacer: {
    display: 'flex',
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: '#e9e3e3ff',
    borderRadius: 50,
    width: 20,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },

  noItemsInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default calculatorStyles;
