import { applyMiddleware, createStore, compose } from 'redux';
import thunk from "redux-thunk";
import rootReducer from './rootReducer';
import logger from 'redux-logger';

const initialState = {};
const middleware = [thunk, logger];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
    )
)
export default store;