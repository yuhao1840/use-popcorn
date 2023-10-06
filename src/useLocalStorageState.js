import { useState, useEffect } from "react";

// custom hook
export function useLocalStorageState(initialState, key) {
    // this not good practice
    // React will call "localStorage.getItem("watched")" on each render and ignore the result
    // ======================================================================================
    //const [watched, setWatched] = useState(JSON.parse(localStorage.getItem("watched")));

    // instead, should provide a callback function for React
    // it is called only on initial render (lazy evaluation)
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialState;
    });

    useEffect(function () {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}