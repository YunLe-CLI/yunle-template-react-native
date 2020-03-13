export { default as auth } from './auth';
import { IModelState as authState } from './auth';
export { default as user } from './user';
import { IModelState as userState } from './user';
export { default as novel } from './novel';
import { IModelState as novelState } from './novel';

export interface IAppModelState {
  auth: authState,
  user: userState,
  novel: novelState,
}
