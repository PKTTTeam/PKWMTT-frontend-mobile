import { View, Text, StyleSheet } from 'react-native';

function OrganisationScreen() {
  return (
    <View style={styles.container}>
      <Text>Calendar Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrganisationScreen;
