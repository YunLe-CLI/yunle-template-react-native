import app from './app';
import { IModelState as appState } from './app';

export interface IAppModelState {
  app: appState,
}
export default function createModels(models: any[]) {
  return [].concat(app, models)
}