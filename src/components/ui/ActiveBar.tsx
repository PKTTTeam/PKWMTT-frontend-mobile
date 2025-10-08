import { View, StyleSheet } from 'react-native';
import { BAR_WIDTH, BAR_HEIGHT } from '../../constants/constants';
import { useSettingsStore } from '../../store/settingsStore';

interface ActiveBarProps {
  isActive: boolean;
}

const ActiveBar: React.FC<ActiveBarProps> = ({ isActive }) => {
const ThemeMode = useSettingsStore((state) => state.themeMode);

  return (
    // eslint-disable-next-line react/self-closing-comp
    <View
      style={ThemeMode==="dark" ? [
        ActiveBarStyles.bar,
        { backgroundColor: isActive ? '#8d95fe' : 'white' },
      ]
      : [
        ActiveBarStyles.bar,
        { backgroundColor: isActive ? '#8d95fe' : '#d1d5db' },
      ]}
    ></View>
  );
};

const ActiveBarStyles = StyleSheet.create({
  bar: {
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    borderRadius: BAR_WIDTH / 2,
    marginVertical: 4,
  },
});

export default ActiveBar;
