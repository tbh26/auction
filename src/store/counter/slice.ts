import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  count: number;
};

// type Item = {
//   name: string;
//   descr: string;
//   bids: [number];
// };

// type Auction = {
//   stock: [Item];
// };

const initialState: State = {
  count: 0
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increase: (state) => {
      state.count = state.count + 2;
    },
    decrease: (state) => {
      state.count = state.count - 2;
    },
    reset: (state) => {
      return initialState;
    },
    change: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    }
  }
});

export const { increase, decrease, reset, change } = counterSlice.actions;

export default counterSlice.reducer;
