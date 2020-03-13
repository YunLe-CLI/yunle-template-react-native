import { AnyAction, Dispatch } from 'redux';
import { NavigationState } from 'react-navigation';
import globalConnect from '@Global/models/connect';
import { UserModelState } from './user';
import { AuthModelState } from './auth';

export interface ConnectState extends globalConnect.ConnectState {
  user: UserModelState;
  auth: AuthModelState;
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends globalConnect.ConnectProps {
 
}