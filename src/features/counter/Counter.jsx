import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [incrementAmount, setIncrementAmount] = useState(0);

    const addValue = Number(incrementAmount) || 0;

    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    };

    return (
        <div>
            <p>{count}</p>

            <div>
                <button onClick={() => dispatch(increment())}>+</button>
            </div>

            <div>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>

            <div>
                <label>Add a specific amount:</label>
                <input
                    onChange={(e) => setIncrementAmount(e.target.value)}
                    type="number"
                    value={incrementAmount}
                />
            </div>

            <div>
                <button onClick={() => dispatch(incrementByAmount(addValue))}>
                    Add Amount
                </button>
            </div>

            <div>
                <button onClick={resetAll}>Reset</button>
            </div>
        </div>
    );
};

export default Counter;
