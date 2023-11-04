// store.js
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import chatReducer from "./reducer";
import rootSaga from './saga';



const sagaMiddleware = createSagaMiddleware();

const composedEnhancer = composeWithDevTools(
    // EXAMPLE: Add whatever middleware you actually want to use here
    applyMiddleware(sagaMiddleware)
    // other store enhancers if any
)

const store = createStore(chatReducer, composedEnhancer);
sagaMiddleware.run(rootSaga);

export default store;