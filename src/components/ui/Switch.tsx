import React, { useState } from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import { Text, View } from 'react-native';

import SwitchStyles from '../../styles/uiStyles/SwitchStyles.ts';
import { SwitchTypes } from '../../types/uiTypes/SwitchTypes.ts';

const Switch: React.FC<SwitchTypes> = ({ label }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <View style={SwitchStyles.contentConainer}>
      <SwitchToggle
        switchOn={isSwitchOn}
        onPress={() => setIsSwitchOn(!isSwitchOn)}
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
