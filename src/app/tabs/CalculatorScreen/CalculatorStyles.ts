import { StyleSheet } from 'react-native';

const calculatorStyles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    // height: '80%', // j
    backgroundColor: 'rgba(61, 12, 12, 1)ff',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  itemContainer: {
    display: 'flex',
    alignSelf: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#505050ff',

    flexDirection: 'row',
  },
  singleItem: {
    display: 'flex',
    width: '45%',
    borderColor: 'black',
    borderWidth: 1,
  },
  rootItemContainer: {
    backgroundColor: '#fbff00ff',
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
    marginLeft: 10,
    // backgroundColor: '#ff0000ff',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',

    paddingLeft: 15,
  },
  bottomMenu: {
    backgroundColor: '#2e3e57ff',
  },
  summaryContainer: {
    backgroundColor: '#208135ff',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  button: {
    backgroundColor: '#000000ff',
    borderRadius: 50,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userInput: {
    backgroundColor: '#494749ff',
  },
});

export default calculatorStyles;
