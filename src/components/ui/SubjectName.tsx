import { Text, useWindowDimensions } from 'react-native';
import { SubjectNameProps } from '../../types/global';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../src/styles/globalTheme/theme';
import { createScheduleItemStyles } from '../../styles/ScheduleItemStyles';

const SubjectName: React.FC<SubjectNameProps> = ({ subject }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const theme = useTheme<Theme>();
  const styles = createScheduleItemStyles(theme, isLandscape);
  return <Text style={styles.subject}>{subject}</Text>;
};

export default SubjectName;
