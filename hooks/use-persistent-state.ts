import {useState} from "react";

export const usePersistentState = <T>(key:string, initialValue: T): [T, (value: T) => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            if (typeof window === "undefined") {
                return initialValue;
            }
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}