import { AnyAction, Dispatch } from 'redux';
import { GlobalModelState } from './global';
import { NavigationState } from 'react-navigation';

export { GlobalModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
}


/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<NavigationState> {
  dispatch?: Dispatch<AnyAction>;
}