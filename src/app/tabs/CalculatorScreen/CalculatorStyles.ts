import { StyleSheet } from 'react-native';

const calculatorStyles = StyleSheet.create({
  container: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#1c1c1c',
    gap: 10,
  },
  tile: {
    backgroundColor: '#232323', // slightly lighter than container
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1.5,
    borderColor: '#444', // darker border
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
    color: '#e0e0e0', // off-white
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
    color: '#bdbdbd', // softer gray
    fontSize: 14,
  },
  button: {
    marginVertical: 6,
    alignSelf: 'center',
    width: '80%',
    height: 45,
    backgroundColor: '#333', // dark gray button
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#e0e0e0', // off-white
    fontSize: 16,
    fontWeight: '600',
  },
  userInputField: {
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#444',
    paddingHorizontal: 10,
    borderRadius: 8,
    color: '#e0e0e0', // off-white
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#232323', // match tile
  },
  noItemsInfoText: {
    marginLeft: 15,
    fontSize: 18,
    fontStyle: 'italic',
    color: '#bdbdbd', // softer gray
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#444',
    paddingHorizontal: 10,
    borderRadius: 8,
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#232323',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: '#232323',
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
  dropdownOption: {},
  dropdownOptionText: {
    color: '#e0e0e0',
  },
  courseItemText: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  courseItemContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '100%',
    backgroundColor: '#232323',
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
    backgroundColor: '#232323',
    paddingTop: '2%',
  },
  summaryContainer: {
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
    backgroundColor: '#444',
    borderRadius: 50,
    width: 20,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#e0e0e0',
    fontWeight: 'bold',
  },
  noItemsInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default calculatorStyles;
