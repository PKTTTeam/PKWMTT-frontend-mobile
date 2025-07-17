import { Text } from 'react-native';
import { SubjectNameProps } from '../../types/global';
import globalStyles from '../../styles/globalStyles';

const SubjectName: React.FC<SubjectNameProps> = ({ subject }) => {
  return <Text style={globalStyles.text}>{subject}</Text>;
};

export default SubjectName;
