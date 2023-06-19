import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from "redux-persist";
import { all, call } from "redux-saga/effects";
import { categoriesSaga, UserSaga } from "./actions";
import { userReducer, cartReducer, categoriesReducer } from "./reducers";


function* rootSaga() {
    yield all([call(categoriesSaga), call(UserSaga)]);
}

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ userReducer, cartReducer, categoriesReducer })

const presistConfig = {
    key: 'root',
    storage, /* storage: storage, */
    whitelist: [cartReducer]

}

const persistedReducer = persistReducer(presistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);