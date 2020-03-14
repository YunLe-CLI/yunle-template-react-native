import globalModel from '@/models/global';
import themeModel from '@/models/theme';

export default function createModels(models: any[]) {
  return [].concat(globalModel, themeModel, models)
}