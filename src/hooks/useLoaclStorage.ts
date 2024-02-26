import {useState} from 'react';

const useLocalStorage = <T>(key: string, initialValue:T) => {
    const storedValue: T = JSON.parse(localStorage.getItem(key)!) || initialValue;

    const [value, setValue] = useState<T>(storedValue);

    const setStoredValue = (newValue: T) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    const removeStoredValue = () => {
        setValue(initialValue);
        localStorage.removeItem(key);
    };

    return {value, setStoredValue, removeStoredValue} as const;
};

export default useLocalStorage;
