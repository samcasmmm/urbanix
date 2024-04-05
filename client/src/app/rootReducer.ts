import {combineReducers} from '@reduxjs/toolkit';
import counterReducer from '../app/features/Counter.slice';

export const rootReducer = combineReducers({
  counter: counterReducer,
});
