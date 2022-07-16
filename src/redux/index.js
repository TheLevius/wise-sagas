import { createStore, applyMiddleware, combineReducers} from "redux";
import createSagaMiddleware from 'redux-saga';
import appReducer from './reducers';
import rootSaga from "./sagas";
import { composeWithDevTools } from "redux-devtools-extension";
import { createReduxHistoryContext } from "redux-first-history";

import { createBrowserHistory } from 'history';

const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const store = createStore(
    combineReducers({
        router: routerReducer,
        app: appReducer
    }),
    composeWithDevTools(
        applyMiddleware(routerMiddleware, sagaMiddleware),
    )
);
export const history = createReduxHistory(store);

sagaMiddleware.run(rootSaga);
export default store;