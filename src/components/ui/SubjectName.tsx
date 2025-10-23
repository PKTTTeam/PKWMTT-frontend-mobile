import { Text, StyleSheet } from 'react-native';
import { SubjectNameProps } from '../../types/global';
import globalStyles from '../../styles/globalStyles';

type Props = SubjectNameProps & { dimmed?: boolean };

const SubjectName: React.FC<Props> = ({ subject, dimmed }) => {
  return (
    <Text style={[globalStyles.subject, dimmed && styles.dimmed]}>{subject}</Text>
  );
};

export default SubjectName;

const styles = StyleSheet.create({
  dimmed: {
    color: '#9aa0b0',
  },
});
