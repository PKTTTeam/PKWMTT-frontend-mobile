import { Theme } from '../../styles/globalTheme/theme';

export const tabNavigatorStyles = (theme: Theme) => {
  const colors = {
    mainBg: theme.colors.headerBg,
    tabBarInactiveTintColor: theme.colors.tabBarInactiveTintColor,
    tabBarActiveTintColor: theme.colors.tabBarActiveTintColor,
  };

  return colors;
};

export default tabNavigatorStyles;
