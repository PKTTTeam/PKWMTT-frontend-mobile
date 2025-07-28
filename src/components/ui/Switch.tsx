import React, { useState } from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import {  StyleSheet, Text, View} from 'react-native';
import Styles from '../../styles/globalStyles.ts';

const Switch = (Props : {label: string}) => {

    const [isOn, off] = useState(false);

  return (

    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',gap: 8 }}>
      <SwitchToggle
      switchOn={isOn}
      onPress={() => off(!isOn)}
      containerStyle={styles.switchContainer}
      circleStyle={styles.switchCircle}
      circleColorOff="#b5b6c9"
      circleColorOn="#8c95ff"
      backgroundColorOn="#303247"
      backgroundColorOff="#3c3c3c"
      />
      <Text style={Styles.text}>{Props.label ?? "name"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {    
    width: 70,
    height: 30,
    borderRadius: 25,
    padding: 5,
  },
  switchCircle: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
});

export default Switch;
