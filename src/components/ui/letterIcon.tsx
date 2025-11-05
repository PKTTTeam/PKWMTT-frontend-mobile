import { View, useWindowDimensions } from 'react-native';
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
import { ICON_SIZE } from '../../constants/constants';

const LetterIcon: React.FC<LetterIconProps> = ({ bgColor, letter }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const iconSize = isLandscape ? 10 : 14;

  // ikonki muszą być tworzone *wewnątrz* komponentu, żeby korzystać z aktualnego iconSize
  const iconMap: Record<string, ReactElement> = {
    S: <LucideUsers size={iconSize} color="white" />,
    L: <LucideFlaskConical size={iconSize} color="white" />,
    K: <LucideMonitor size={iconSize} color="white" />,
    P: <LucideHammer size={iconSize} color="white" />,
    Ć: <LucideBookOpen size={iconSize} color="white" />,
    W: <LucideProjector size={iconSize} color="white" />,
    I: <LucidePuzzle size={iconSize} color="white" />,
  };

  return (
    <View
      style={[
        globalStyles.iconFixed,
        { backgroundColor: bgColor },
        isLandscape ? { width: ICON_SIZE / 1.2, height: ICON_SIZE / 1.2 } : {},
      ]}
    >
      {iconMap[letter]}
    </View>
  );
};

export default LetterIcon;
