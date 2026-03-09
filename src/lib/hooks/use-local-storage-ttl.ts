import { useState, useEffect } from 'react';

interface StorageItem<T> {
  value: T;
  expiry: number;
}

export function useLocalStorageTTL<T>(key: string, initialValue: T, ttlInDays: number = 1) {
  // Convert days to milliseconds
  const TTL = ttlInDays * 24 * 60 * 60 * 1000;

  // Get from local storage then parse
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const itemStr = window.localStorage.getItem(key);
      if (!itemStr) return initialValue;

      const item: StorageItem<T> = JSON.parse(itemStr);
      const now = new Date();

      // Check if item is expired
      if (now.getTime() > item.expiry) {
        window.localStorage.removeItem(key);
        return initialValue;
      }

      return item.value;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      const now = new Date();
      const item: StorageItem<T> = {
        value: valueToStore,
        expiry: now.getTime() + TTL,
      };

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(item));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue] as const;
}
