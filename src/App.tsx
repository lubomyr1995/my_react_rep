import {FC, useState} from 'react';
import {usePrevious, useStorage, useToggle} from "./Hooks/CustomHooks.ts";

const App: FC = () => {
    // first using hook: useToggle
    const [value, change] = useToggle(true);

    // second using hook: usePrevious
    const [num, setNum] = useState(0);
    const prevNum = usePrevious<number>(num);

    function changeToValue(value: number = 1): void {
        setNum(prevValue => prevValue + value)
    }

    // third using hook: useStorage
    const [data, setData] = useStorage<number>(0);

    function increment() {
        setData(data + 1);
    }

    function decrement() {
        setData(data - 1);
    }

    return (
        <>
            <p><b>1 task</b></p>
            <h2>currentState: {value.toString()}</h2>
            <button onClick={() => change()}>Change boolean state</button>

            <hr/>
            <p><b>2 task</b></p>
            <div>
                <h3>currentNum: {num}</h3>
                <h3>prevNum: {prevNum !== undefined ? prevNum : 'Not changed yet'}</h3>
                <button onClick={() => changeToValue(5)}>change</button>
            </div>

            <hr/>
            <p><b>3 task</b></p>
            <div>
                <h3>Data: {data}</h3>
                <button onClick={increment}>Inc</button>
                <button onClick={decrement}>Dec</button>
            </div>
        </>
    );
};

export default App;
