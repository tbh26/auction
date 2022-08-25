import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/slice";
import { useDispatch } from "react-redux";
const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
