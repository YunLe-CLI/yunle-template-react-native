import React, { ReactElement } from 'react'
// @ts-ignore
import { create } from 'dva-core'
import { Provider, connect } from 'react-redux'

export { connect }

declare global {
    namespace NodeJS {
        interface Global {
          ENVIRONMENT: string;
          dropDownAlertRef: any;
          registered: boolean
        }
    }
}

export default function(options: any) {
  const app = create(options)
  // HMR workaround
  if (!global.registered) options.models.forEach((model: any) => app.model(model))
  global.registered = true

  app.start()
  // eslint-disable-next-line no-underscore-dangle
  const store: any = app._store

  app.start = (container: ReactElement) => () => <Provider store={store}>{container}</Provider>
  app.getStore = () => store

  return app
}
