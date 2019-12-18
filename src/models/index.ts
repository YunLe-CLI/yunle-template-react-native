export { default as app } from './app';
import { IModelState as appState } from './app';
export { default as cache } from './cache';
import { IModelState as cacheState } from './cache';
export { default as auth } from './auth';
import { IModelState as authState } from './auth';
export { default as user } from './user';
import { IModelState as userState } from './user';
export { default as home } from './home';
import { IModelState as homeState } from './home';
export { default as courses } from './courses';
import { IModelState as coursesState } from './courses';

export interface IAppModelState {
  app: appState,
  cache: cacheState,
  auth: authState,
  user: userState,
  home: homeState,
  courses: coursesState,
}
