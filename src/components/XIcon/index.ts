// @ts-ignore
import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import { map } from './iconfont';

const iconSet = createIconSet(map, 'xsyfont-', 'iconfont.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;

