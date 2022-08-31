
export enum Category {
    Books = 'Books',
    Games = 'games',
    Cars = 'cars',
    Bikes = 'bike',
    Other = 'other'
}

export type Bid = {
    id: number;
    name: string;
    amount: number;
}

export type AuctionItem = {
    id: number;
    title: string;
    description: string;
    cat: Category;
    bids: Bid[];
};

export type AddBidPayload = {
    itemId: number,
    bid: Bid
}

export type DeleteBidPayload = {
    itemId: number,
    bidId: number
}

export const SomeNextBids: Bid[] = [
    {id: 321, name: 'Peter', amount: 123},
    {id: 345, name: 'Hookie', amount: 321},
    {id: 666, name: 'Devil', amount: 666},
];

export const SomeOtherBids: Bid[] = [
    {id: 321, name: 'Foo', amount: 123},
    {id: 654, name: 'Bar', amount: 456},
];

export const SomeAuctionItems: AuctionItem[] = [
    {id: 1, title: 'first', description: 'foo bar', cat: Category.Other, bids: []},
    {id: 12, title: 'next', description: 'bla bla bla', cat: Category.Books, bids: SomeNextBids},
    {id: 123, title: 'some other', description: 'sparta', cat: Category.Bikes, bids: SomeOtherBids},
    {id: 1234, title: 'last', description: 'fiat 126', cat: Category.Cars, bids: SomeNextBids},
];


export function generateId(): number {
    const max = 123456789;
    return Math.floor(Math.random() * max);
}
