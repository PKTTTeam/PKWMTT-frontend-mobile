import { StyleSheet } from 'react-native';

const calculatorStyles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    // height: '80%', // j
    backgroundColor: '#1c1c1c',
  },
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
  bottomMenu: {
    backgroundColor: '#1b1b1bff',
    paddingTop:'2%',
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
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    alignSelf: "center",
    marginBottom: '2%',
    marginTop: '2%',
    width: "80%",
    height: 50,
    backgroundColor: "#1b1b1bff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#c2c2c2ff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  userInput: {
    backgroundColor: '#494749ff',
    
    color: 'white',
    paddingLeft: 10,
    width: '90%',
    alignSelf: 'center',
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
});

export default calculatorStyles;
