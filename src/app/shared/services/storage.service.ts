import { Injectable } from '@angular/core';
import SimpleCrypto from 'simple-crypto-js';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly crypto = new SimpleCrypto('');

  set<T>(key: string, value: T) {
    const data = JSON.stringify(value);
    const encrypted = this.crypto.encrypt(data);
    localStorage.setItem(key, encrypted);
  }

  get<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);
    if (!item) return undefined;

    try {
      const data = this.crypto.decrypt(item) as string;
      const parsed = JSON.parse(data) as T;
      console.log(key, parsed);
      return parsed;
    } catch (e) {
			console.error(e);
      return undefined;
    }
  }
}
