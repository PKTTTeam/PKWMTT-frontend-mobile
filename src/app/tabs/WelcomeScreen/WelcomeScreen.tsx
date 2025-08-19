import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeStyles from './WelcomeStyles.ts';
import GroupSelect from '../../../components/ui/GroupSelectDropdown.tsx';
import WelcomeButtonStyles from './WelcomeButtonStyles.ts';

import type { StackNavigationProp } from '@react-navigation/stack';

type WelcomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  const handleContinue = async () => {
    await AsyncStorage.setItem('hasSeenWelcome', 'true');
    navigation.replace('Tabs');
  };

  const [deanGroup, setDeanGroup] = useState<string | undefined>(undefined);

  useEffect(() => {

  },[deanGroup]);

  const welcomeData = [
    {
      key: 'groups',
      render: () => (
        <>
          <View style={WelcomeStyles.welceomeContainer}>
            <Text style={WelcomeStyles.welcomeText}>
              Witaj w aplikacji PKWMTT!
            </Text>
            <Text style={WelcomeStyles.welcomeText}>
              Wybierz swoje grupy studenckie:
            </Text>
            <View
              style={[
                WelcomeStyles.studentGroups,
                WelcomeStyles.elementsSpacing,
              ]}
            >
              <GroupSelect
                groupName="Dziekańska"
                onValueChange={setDeanGroup}
              />
              <GroupSelect groupName="Laboratoryjna" />
              <GroupSelect groupName="Komputerowa" />
            </View>
            <View
              style={[
                WelcomeStyles.studentGroups,
                WelcomeStyles.elementsSpacing,
              ]}
            >
              <GroupSelect groupName="Projektowa" />
              <GroupSelect groupName="Ćwiczeniowa" />
            </View>
            <View style={[WelcomeStyles.buttonContainer]}>
              <Button
                title="Przejdź dalej"
                onPress={handleContinue}
                color={WelcomeButtonStyles.buttonON.color}
                disabled={deanGroup === undefined}
              />
            </View>
          </View>
        </>
      ),
    },
  ];

  return (
    <View style={WelcomeStyles.bgContainer}>
      <FlatList
        contentContainerStyle={WelcomeStyles.container}
        data={welcomeData}
        renderItem={({ item }) => <View>{item.render()}</View>}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

export default WelcomeScreen;
