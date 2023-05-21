import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { userReducer, cartReducer, categoriesReducer } from "./reducers";

const logger = createLogger();

const rootReducer = combineReducers({ userReducer, cartReducer, categoriesReducer })

const presistConfig = {
    key: 'root',
    storage, /* storage: storage, */
    blacklist: [userReducer]

}

const persistedReducer = persistReducer(presistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware, logger));

export const persistor = persistStore(store);