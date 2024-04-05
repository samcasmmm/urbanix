import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from '../app/rootReducer';
const Store = configureStore({
  reducer: rootReducer,
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
