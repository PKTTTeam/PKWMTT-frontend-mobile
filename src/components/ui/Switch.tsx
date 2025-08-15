import React from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import { Text, View } from 'react-native';

import SwitchStyles from '../../styles/uiStyles/SwitchStyles.ts';
import { SwitchTypes } from '../../types/uiTypes/SwitchTypes.ts';

interface Props extends SwitchTypes {
  value: boolean;
  onChange: (newVal: boolean) => void;
}

const Switch: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <View style={SwitchStyles.contentConainer}>
      <SwitchToggle
        switchOn={value}
        onPress={() => onChange(!value)}
        containerStyle={SwitchStyles.switchContainer}
        circleStyle={SwitchStyles.switchCircle}
        circleColorOff="#b5b6c9"
        circleColorOn="#8c95ff"
        backgroundColorOn="#303247"
        backgroundColorOff="#3c3c3c"
      />
      <Text style={SwitchStyles.text}>{label ?? 'name'}</Text>
    </View>
  );
};

export default Switch;
