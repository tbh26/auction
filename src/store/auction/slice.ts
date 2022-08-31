import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddBidPayload, AuctionItem, Bid, DeleteBidPayload, SomeAuctionItems } from '../../auction';

export const noMessage = '';

export enum AuctionStoreProp {
  Auction = 'auction',
  Message = 'message'
}

type State = {
  [AuctionStoreProp.Auction]: AuctionItem[];
  [AuctionStoreProp.Message]: string;
};

const initialState: State = {
  auction: SomeAuctionItems,
  message: noMessage
};

export const auctionSlice = createSlice({
  name: "auction",
  initialState: initialState,
  reducers: {
    addAuctionItem: (state, action: PayloadAction<AuctionItem>) => {
      console.info("add (action) item, payload", action.payload );
      if (!state.auction.find( item => item.id === action.payload.id)) {
        state.auction.push(action.payload);
      } else {
        console.warn(`Auction item id already exist. (${action.payload.id})`)
      }
    },
    deleteBid: (state, action: PayloadAction<DeleteBidPayload>) => {
      console.info("delete bid, payload", action.payload );
      const { itemId, bidId} = action.payload;
      const theItem = state.auction.find( item => item.id === itemId);
      if (theItem) {
        theItem.bids = theItem.bids.filter( bid => bid.id !== bidId);
      }
    },
    bidAdd: function (state, action: PayloadAction<AddBidPayload>) {
      console.info("add bid, payload", action.payload );
      const theItem = state.auction.find( item => item.id === action.payload.itemId);
      if (theItem) {
        const maxBidValue = Math.max(...(theItem.bids.map(bid=> bid.amount))); // Math.max([1, 2, 3]);
        const newBid = action.payload.bid;
        if (newBid.amount > ( maxBidValue + 1) ) {
          theItem.bids.push(newBid);
        } else {
          console.warn(`bid to low, current max: ${maxBidValue}, new bid value: ${newBid}`);
          state.message = 'Bid too low.';
        }
      }
    }
  }
});

export const { addAuctionItem, deleteBid, bidAdd } = auctionSlice.actions;

export default auctionSlice.reducer;
