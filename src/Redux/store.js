import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from 'redux-logger';
import { userReducer, cartReducer, categoriesReducer } from "./reducers";

const logger = createLogger();

const rootReducer = combineReducers({ userReducer, cartReducer, categoriesReducer })

export const store = createStore(rootReducer, applyMiddleware(logger))