import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const ICON_SIZE = (width + height) * 0.018;
export const ICON_RADIUS = ICON_SIZE / 2;
export const BAR_WIDTH = 6;
export const BAR_HEIGHT = height * 0.05;
