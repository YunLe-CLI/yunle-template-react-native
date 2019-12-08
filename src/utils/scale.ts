import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const scaleVertical = (size: number) => (height / guidelineBaseHeight) * size;
const scaleModerate = (size: number, factor: number = 0.5) => size + ((scale(size) - size) * factor);

export { scale, scaleVertical, scaleModerate };
