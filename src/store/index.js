import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../containers/App/reducer';
import rootSaga from '../containers/App/sagas';

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
	applyMiddleware(sagaMiddleware),
);
export default function configureStore(initialState) {
	const store = createStore(rootReducer, initialState, enhancer);
	sagaMiddleware.run(rootSaga);
	return store;
}
