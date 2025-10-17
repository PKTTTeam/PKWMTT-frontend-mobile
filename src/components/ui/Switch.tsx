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
    <View style={SwitchStyles.row}>
      <Text style={SwitchStyles.label}>{label ?? 'Switch'}</Text>

      <SwitchToggle
        switchOn={value}
        onPress={() => onChange(!value)}
        containerStyle={{
          ...SwitchStyles.switchContainer,
          backgroundColor: value ? '#2c2d4f' : '#2a2a2a',
        }}
        circleStyle={{
          ...SwitchStyles.switchCircle,
          backgroundColor: value ? '#8d95fe' : '#b5b6c9',
          shadowColor: value ? '#8d95fe' : '#000',
        }}
        circleColorOff="#b5b6c9"
        circleColorOn="#8d95fe"
        backgroundColorOn="#2c2d4f"
        backgroundColorOff="#2a2a2a"
      />
    </View>
  );
};

export default Switch;
