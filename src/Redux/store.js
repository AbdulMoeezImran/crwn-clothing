import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import {
  userReducer,
  cartReducer,
  categoriesReducer,
  fetchCategories,
} from './slice';

const logger = createLogger();

const rootReducer = combineReducers({
  userReducer,
  cartReducer,
  categoriesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([logger]),
});

store.dispatch(fetchCategories());
