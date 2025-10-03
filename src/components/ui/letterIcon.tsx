import { View } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import { LetterIconProps } from '../../types/global';
import {
  LucideBookOpen,
  LucideFlaskConical,
  LucideHammer,
  LucideMonitor,
  LucideProjector,
  LucideUsers,
} from 'lucide-react-native';
import { ReactElement } from 'react';

const iconMap: Record<string, ReactElement> = {
  S: <LucideUsers size={16} color="white" />,
  L: <LucideFlaskConical size={16} color="white" />,
  K: <LucideMonitor size={16} color="white" />,
  P: <LucideHammer size={16} color="white" />,
  Ć: <LucideBookOpen size={16} color={'white'} />,
  W: <LucideProjector size={16} color={'white'} />,
};

const LetterIcon: React.FC<LetterIconProps> = ({ bgColor, letter }) => {
  return (
    <View style={[globalStyles.icon, { backgroundColor: bgColor }]}>
      {iconMap[letter]}
    </View>
  );
};

export default LetterIcon;
