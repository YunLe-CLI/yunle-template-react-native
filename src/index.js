import React from 'react';
import dva from './utils/dva';
import Apollo from './utils/apollo';
import Router, { routerMiddleware, routerReducer } from './router';

import appModel from './models/app';


const dvaApp = dva({
    initialState: {},
    models: [appModel],
    extraReducers: { router: routerReducer },
    onAction: [routerMiddleware],
    onError(e) {
        console.log('onError', e)
    },
})

class App extends React.Component {
    render() {
        return (
            <Apollo>
                <Router />
            </Apollo>
        );
    }
}

export default dvaApp.start(<App />);