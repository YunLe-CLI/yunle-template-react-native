import { AnyAction, Dispatch } from 'redux';
// import { createCompatNavigationProp } from '@react-navigation/compat';
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
export interface ConnectProps<T = {}> extends ConnectState {
  screenProps?: unknown;
  // navigation?: createCompatNavigationProp;
  dispatch: Dispatch<AnyAction>;
}