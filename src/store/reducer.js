import {
    FETCH_TASK_DATA, SAVE_TASK_DATA, FETCH_USERS,
    FETCH_PLAN_DATA, SAVE_PLAN_DATA, FETCH_CUSTOMER_DATA, SAVE_CUSTOMER_DATA
} from './actionType'

export const taskReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_TASK_DATA:
            return action.payload;
        case SAVE_TASK_DATA:
            return action.payload;
        default:
            return state;
    }
}

export const planReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PLAN_DATA:
            return action.payload;
        case SAVE_PLAN_DATA:
            return action.payload;
        default:
            return state;
    }
}

export const customerReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_DATA:
            return action.payload;
        case SAVE_CUSTOMER_DATA:
            return action.payload;
        default:
            return state;
    }
}

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return action.payload;
        default:
            return state;
    }
}

