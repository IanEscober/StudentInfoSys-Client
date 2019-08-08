import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  public store(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  public retreive<T>(key: string): T {
    const item = window.localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  }

  public remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
