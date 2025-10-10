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

// 🔹 Fabryka stylów z integracją Restyle Theme
const createSwitchStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    contentContainer: {
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
    switchContainer: {
      width: 50,
      height: 30,
      borderRadius: 25,
      padding: 3,
      justifyContent: 'center',
    },
    switchCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
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
        containerStyle={styles.switchContainer}
        circleStyle={styles.switchCircle}
        circleColorOff={colors.textSecondary} // zamiast #b5b6c9
        circleColorOn={colors.confirmAccent} // zamiast #8c95ff
        backgroundColorOn={colors.Foreground} // zamiast #303247
        backgroundColorOff={colors.border} // zamiast #3c3c3c
      />
      <Text style={styles.label}>{label ?? 'name'}</Text>
    </View>
  );
};

export default React.memo(Switch);
