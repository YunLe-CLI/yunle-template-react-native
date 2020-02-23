import app from '@Global/models/app';
import { IModelState as appState } from '@Global/models/app';

export interface IAppModelState {
  app: appState,
}
export default function createModels(models: any[]) {
  return [].concat(app, models)
}