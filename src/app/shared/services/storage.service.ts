import { Injectable } from '@angular/core';
import SimpleCrypto from 'simple-crypto-js';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly crypto = new SimpleCrypto('Secret$Data');

  set<T>(key: string, value: T) {
    const data = JSON.stringify(value);
    const encrypted = this.crypto.encrypt(data);
    localStorage.setItem(key, encrypted);
  }

  get<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);
    if (!item) return undefined;

    try {
      const data = this.crypto.decrypt(item) as T;
      console.log(key, data);
      return data;
    } catch (e) {
			console.error(e);
      return undefined;
    }
  }
}
