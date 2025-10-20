import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';

import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../styles/globalTheme/theme';
import type { SwitchTypes } from '../../types/uiTypes/SwitchTypes';

interface Props extends SwitchTypes {
  value: boolean;
  onChange: (newVal: boolean) => void;
  hasError?: boolean;
}

const createSwitchStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    contentContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 350,
      padding: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.Background,
    },
    containerStyle: {
      marginTop: 16,
      width: 106 / 2,
      height: 30,
      borderRadius: 25,
      padding: 5,
      paddingLeft: 1,
    },
    circleStyle: {
      width: 40 / 2,
      height: 40 / 2,
      borderRadius: 20 / 2,
    },
    label: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 12,
    },
  });
};

const Switch: React.FC<Props> = ({ label, value, onChange }) => {
  const theme = useTheme<Theme>();
  const styles = createSwitchStyles(theme);
  const { colors } = theme;

  return (
    <View style={styles.contentContainer}>
      <SwitchToggle
        switchOn={value}
        onPress={() => onChange(!value)}
        circleColorOff={colors.textSecondary}
        circleColorOn={colors.confirmAccent}
        backgroundColorOn={colors.switchOnBg}
        backgroundColorOff={colors.border}
        containerStyle={styles.containerStyle}
        circleStyle={styles.circleStyle}
      />
      <Text style={styles.label}>{label ?? 'name'}</Text>
    </View>
  );
};

export default React.memo(Switch);
