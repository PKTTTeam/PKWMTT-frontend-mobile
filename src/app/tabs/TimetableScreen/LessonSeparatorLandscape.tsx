import React from 'react';
import { View } from 'react-native';
import { createTimetableStyles } from './timetableStyles';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../styles/globalTheme/theme';

 const LessonSeparatorLandscape = () => {
    const theme = useTheme<Theme>();
    const styles = createTimetableStyles(theme);

    return <View style={styles.separator} />;
  };

  export default LessonSeparatorLandscape;