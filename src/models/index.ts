export { default as app } from './app';
import { IModelState as appState } from './app';
export { default as auth } from './auth';
import { IModelState as authState } from './auth';
export { default as user } from './user';
import { IModelState as userState } from './user';
export { default as home } from './home';
import { IModelState as homeState } from './home';

export interface IAppModelState {
  app: appState,
  auth: authState,
  user: userState,
  home: homeState,
}
