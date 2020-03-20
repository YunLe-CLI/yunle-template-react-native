import { AnyAction, Dispatch } from 'redux';
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
  dispatch: Dispatch<AnyAction>;
}