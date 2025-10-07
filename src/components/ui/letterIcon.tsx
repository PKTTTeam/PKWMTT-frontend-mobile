import { View } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import { LetterIconProps } from '../../types/global';
import {
  LucideBookOpen,
  LucideFlaskConical,
  LucideHammer,
  LucideMonitor,
  LucideProjector,
  LucidePuzzle,
  LucideUsers,
} from 'lucide-react-native';
import { ReactElement } from 'react';

const iconMap: Record<string, ReactElement> = {
  S: <LucideUsers size={14} color="white" />,
  L: <LucideFlaskConical size={14} color="white" />,
  K: <LucideMonitor size={14} color="white" />,
  P: <LucideHammer size={14} color="white" />,
  Ć: <LucideBookOpen size={14} color={'white'} />,
  W: <LucideProjector size={14} color={'white'} />,
  I: <LucidePuzzle size={14} color={'white'} />,
};

const LetterIcon: React.FC<LetterIconProps> = ({ bgColor, letter }) => {
  return (
    <View style={[globalStyles.iconFixed, { backgroundColor: bgColor }]}>
      {iconMap[letter]}
    </View>
  );
};

export default LetterIcon;
