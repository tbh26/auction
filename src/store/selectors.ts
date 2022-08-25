import { RootState } from ".";

export const selectCount = (reduxState: RootState) => reduxState.counter.count;
