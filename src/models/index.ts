import global from '@/models/global';
import { IModelState as appState } from '@/models/global';

export interface IAppModelState {
  global: appState,
}
export default function createModels(models: any[]) {
  return [].concat(global, models)
}