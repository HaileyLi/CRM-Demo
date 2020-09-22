import { combineReducers } from 'redux';
import { userReducer, taskReducer, planReducer, customerReducer } from './reducer.js';
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
export default combineReducers({
    task: taskReducer,
    plan: planReducer,
    customer: customerReducer,
    user: userReducer,
    auth: authReducer,
    errors: errorReducer
})