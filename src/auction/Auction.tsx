import { useSelector } from 'react-redux';
import { selectAuction } from '../store/selectors';
import { AuctionItem, Bid, Category, DeleteBidPayload, generateId } from './index';
import { useAppDispatch } from '../store';
import { addAuctionItem, AuctionStoreProp, bidAdd, deleteBid, noMessage } from "../store/auction/slice"
import { useState } from 'react';

export function Auction() {
    const auction: AuctionItem[] = useSelector(selectAuction(AuctionStoreProp.Auction)) as AuctionItem[];
    const message: string = useSelector(selectAuction(AuctionStoreProp.Message)) as string;
    const dispatch = useAppDispatch();

    const addItemHandler = function () {
        const newId = generateId();
        console.info('add item with id: ', newId);
        const someItem = {id: newId, title: 'added item', description: `with some (random) id: ${newId}`, cat: Category.Other, bids: []};
        dispatch(addAuctionItem(someItem));
    }

    return (
        <section>
            <header>
                <h2>Auction.</h2>
                <div>
                {message === noMessage ? <span>No message...</span> : <b>{message}</b>}
                </div>
            </header>
            <hr />
            {auction.map( (item) => {
                return (<Item key={item.id}  item={item} />);
            })}
            <AuctionItemForm />
            <hr />
            <button onClick={addItemHandler}>add item</button>
        </section>
    );
}

export type AuctionItemProps = {
    item: AuctionItem
};

export function Item({item}: AuctionItemProps) {
    return (<section>
        <h4>{item.title}</h4>
        <div>
            <span>{item.description}</span> <span>{item.cat}</span>
        </div>
        {item.bids.map( (bid) => <BidItem key={bid.id} itemId={item.id} bid={bid} />)}
        <NewBidForm auctionItemId={item.id}/>
        <hr />
    </section>);
}

export type BidItemProps = {
    itemId: number;
    bid: Bid
};

export function BidItem({itemId, bid}: BidItemProps) {
    const dispatch = useAppDispatch();
    const delPayload: DeleteBidPayload = {itemId, bidId: bid.id};
    return (<p>
        Bid, name: {bid.name}, value: {bid.amount} <span> &nbsp; </span>
        <button onClick={() => dispatch(deleteBid(delPayload))}> X </button>
    </p>);
}

export type AuctionItemFormProps = {
    auctionItem: AuctionItem;
    auctionSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

// export const AuctionItemForm = ({auctionItem, auctionSubmit }: AuctionItemFormProps) => {
export const AuctionItemForm = () => {
    const dispatch = useAppDispatch();
    const newId = generateId();
    const initialFormValue: AuctionItem = {id: newId, title: 'new item', description: '...', cat: Category.Other, bids: [] };
    const [formItem, setFormItem] = useState(initialFormValue);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.debug('new item:',  formItem);
        dispatch(addAuctionItem(formItem));
        setFormItem(initialFormValue);
    }

    function updateItem(itemProp: string, newValue: any) {
        console.debug('update item;', newValue);
        const newItem = { ... formItem, [itemProp]: newValue};
        setFormItem(newItem);
    }

    return (
        <form onSubmit={submitHandler}>
            <label>
                <strong>id</strong>
                <input value={formItem.id} onChange={(e) => updateItem('id', e.target.value) } type='number' />
            </label>
            <label>
                <span>title : </span>
                <input value={formItem.title} onChange={(e) => updateItem('title', e.target.value) } type='text' />
            </label>
            <label>
                <span>description : </span>
                <input value={formItem.description} onChange={(e) => updateItem('description', e.target.value)} type='text' />
            </label>
            <button type='submit'>add</button>
        </form>
    );
}

export type NewBidFormProps = {
    auctionItemId: number;
};

export function NewBidForm ({auctionItemId}: NewBidFormProps) {
    const dispatch = useAppDispatch();
    const newId = generateId();
    const initialBidValue: Bid = {id: newId, name: 'name', amount: 222 };
    const [formItem, setFormItem] = useState(initialBidValue);

    function updateItem(itemProp: string, newValue: any) {
        console.debug('update item;', newValue);
        const newItem = { ... formItem, [itemProp]: newValue};
        setFormItem(newItem);
    }

    const bidSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.debug('new bid:',  formItem);
        dispatch(bidAdd({ itemId: auctionItemId, bid: formItem}));
        setFormItem(initialBidValue);
    }

    return(
        <form onSubmit={bidSubmitHandler}>
            <label>
                <span>name : </span>
                <input value={formItem.name} onChange={(e) => updateItem('name', e.target.value) } type='text' />
            </label>
            <label>
                <strong>value</strong>
                <input value={formItem.amount} onChange={(e) => updateItem('amount', e.target.value) } type='number' />
            </label>
            <button type='submit'>add bid</button>
        </form>
    );
}
