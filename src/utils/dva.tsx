import React, { ReactElement } from 'react'
import { Model } from 'dva';
// @ts-ignore
import { create } from 'dva-core'
// @ts-ignore
import  createLoading  from "dva-loading";
import { Provider, connect } from 'react-redux'

export { connect }
// export interface IStore ex Store {

// }
export default function(options: any) {
  const app = create(options)
  app.use(createLoading({}))
  // HMR workaround
  if (!global.$dvaRegistered) options.models.forEach((model: Model) => app.model(model))
  global.$dvaRegistered = true

  app.start()
  const store: any = app._store
  global.dvaStore = app._store;
  app.start = (container: ReactElement) => () => <Provider store={store}>{container}</Provider>
  app.getStore = () => store

  return app
}
