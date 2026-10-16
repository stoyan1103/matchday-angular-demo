import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  read(key: string): unknown {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue === null ? null : JSON.parse(storedValue);
    } catch {
      console.warn(`Failed to read from localStorage for key: ${key}`);
      return null;
    }
  }

  write(key: string, value: unknown): boolean {
    try {
      const serializedValue = JSON.stringify(value);

      if (serializedValue === undefined) {
        console.warn(`Failed to serialize value for key: ${key}`);
        return false;
      }

      localStorage.setItem(key, serializedValue);
      return true;
    } catch {
      console.warn(`Failed to write to localStorage for key: ${key}`);
      return false;
    }
  }

  remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      console.warn(`Failed to remove from localStorage for key: ${key}`);
      return false;
    }
  }
}
