import light from './light';
import dark from './dark';

export type ThemeType = {
  light: any;
  dark: any;
}
const theme: ThemeType = {
  light,
  dark,
}

export default theme;