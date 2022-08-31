import { RootState } from ".";
import { AuctionStoreProp } from './auction/slice';

export const selectCount = (reduxState: RootState) => reduxState.counter.count;
export const    selectAuction = (auctionProp: AuctionStoreProp) => (reduxState: RootState) => reduxState.auction[auctionProp];
