import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { StackNavigationProp } from '@react-navigation/stack';

type WelcomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  const handleContinue = async () => {
    await AsyncStorage.setItem('hasSeenWelcome', 'true');
    navigation.replace('Tabs'); // Replace the welcome screen with the tab navigator
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to PKWMTT!</Text>
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

export default WelcomeScreen;
