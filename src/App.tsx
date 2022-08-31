import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./store";
import { increase, decrease, reset, change } from "./store/counter/slice";
import { selectCount } from "./store/selectors";
import { Auction } from './auction/Auction';

function App() {
    const count = useSelector(selectCount);
    const dispatch = useAppDispatch();

    return (
        <div className="App">
            <p>Count: {count}</p>
            <div>
                <button onClick={() => dispatch(increase())}>+</button>
                <button onClick={() => dispatch(decrease())}>-</button>
                <button onClick={() => dispatch(reset())}>reset</button>
                <button onClick={() => dispatch(change(75))}>+75</button>
            </div>
            <hr/>
            <Auction/>
        </div>
    );
}

export default App;
