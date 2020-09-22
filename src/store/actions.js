import {
    FETCH_TASK_DATA, SAVE_TASK_DATA, FETCH_USERS,
    FETCH_PLAN_DATA, SAVE_PLAN_DATA, FETCH_CUSTOMER_DATA, SAVE_CUSTOMER_DATA, SAVE_DATA
} from "./actionType"

export const doFetchUsers = (data) => {
    return {
        type: FETCH_USERS,
        payload: data
    }
}

export const doFetchTasks = (data) => {
    return {
        type: FETCH_TASK_DATA,
        payload: data
    }
}
export const doSaveTasks = (data) => {
    return {
        type: SAVE_TASK_DATA,
        payload: data
    }
}
export const doFetchPlans = (data) => {
    return {
        type: FETCH_PLAN_DATA,
        payload: data
    }
}
export const doSavePlans = (data) => {
    return {
        type: SAVE_PLAN_DATA,
        payload: data
    }
}
export const doFetchCustomers = (data) => {
    return {
        type: FETCH_CUSTOMER_DATA,
        payload: data
    }
}
export const doSaveCustomers = (data) => {
    return {
        type: SAVE_CUSTOMER_DATA,
        payload: data
    }
}


export const doSaveData = data => {
    return {
        type: SAVE_DATA,
        payload: data
    }
}