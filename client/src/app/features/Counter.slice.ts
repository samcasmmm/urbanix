import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type CounterState = {
  count: number;
  users: object;
};

const initialState: CounterState = {
  count: 0,
  users: {},
};

const incrementFn = (state: CounterState) => {
  state.count = state.count + 1;
};
const setUserFn = (state: CounterState, action: PayloadAction<object>) => {
  state.users = action.payload;
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incre: incrementFn,
    setUser: setUserFn,
  },
});

export const selectCount = (state: {counter: CounterState}) =>
  state.counter.count;
export const {incre, setUser} = counterSlice.actions;
export default counterSlice.reducer;
