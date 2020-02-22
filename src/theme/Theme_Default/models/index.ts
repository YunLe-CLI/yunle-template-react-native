export { default as auth } from './auth';
import { IModelState as authState } from './auth';
export { default as user } from './user';
import { IModelState as userState } from './user';

export interface IAppModelState {
  auth: authState,
  user: userState,
}
