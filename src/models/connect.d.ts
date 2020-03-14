import { AnyAction, Dispatch } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { GlobalModelState } from './global';
import { ThemeModelState } from './theme';

export { GlobalModelState };

export interface ConnectState {
  global: GlobalModelState;
  theme: ThemeModelState;
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> {
  screenProps?: unknown;
  navigation?: NavigationScreenProp<any,any>;
  dispatch: Dispatch<AnyAction>;
}