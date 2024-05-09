// 1. useToggle - custom React hook that allows a component to toggle a value between true and false
// import { useState } from "react"

import {useEffect, useRef, useState} from "react";

function useToggle(defaultValue: boolean = true): [boolean, () => void] {
    const [value, setValue] = useState<boolean>(defaultValue);

    function changerValue(): void {
        setValue(prevValue => !prevValue)
    }

    return [value, changerValue]
}

// 2. usePrevious - hook that allows a component to keep track of the previous value of a variable
function usePrevious<T, >(value: T): T | undefined {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current
}

// 3. useStorage - hook that allows a component to store a value in the browser's LocalStorage
function useStorage<T>(data: T, key: string = 'data'): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : data;
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export {useToggle, usePrevious, useStorage}