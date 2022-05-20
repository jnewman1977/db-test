import {Injectable} from '@angular/core';

interface IWindow {
  indexedDB: unknown;
  mozIndexedDB: unknown;
  webkitIndexedDB: unknown;
  IDBTransaction: unknown;
  webkitIDBTransaction: unknown;
  msIDBTransaction: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class JhaIndexedDbService {

  private readonly dbFactory: IDBFactory;
  public isInitialized = false;

  constructor() {
    this.dbFactory = JhaIndexedDbService.setupIndexedDb();
    if (!this.dbFactory) {
      console.error('IndexedDB not available');
      return;
    }
  }

  static setupIndexedDb(): IDBFactory {
    const database =
      (window as unknown as IWindow).indexedDB ||
      (window as unknown as IWindow).mozIndexedDB ||
      (window as unknown as IWindow).webkitIndexedDB;
    return database as IDBFactory;
  }

  // Adding a new dbStore requires bumping dbVer and utilizing the onUpgradeNeeded callback to add the new store(s).
  public async open(dbName: string, version: number, onUpgradeNeeded?: (database: IDBDatabase) => void): Promise<IDBDatabase | null> {
    if (!window) {
      console.error('No Window object available.');
      return null;
    }

    const factory = this.dbFactory as IDBFactory;
    if (!factory) {
      console.error('No Db Factory initialized.');
      return null;
    }

    return await new Promise(
      (resolve: (arg0: IDBDatabase) => void,
       reject: (arg0: DOMException | null) => void) => {

        const request = factory.open(dbName, Number(version));

        request.onsuccess = function () {
          resolve(request.result);
        };

        request.onupgradeneeded = function () {
          if (onUpgradeNeeded) {
            onUpgradeNeeded(request.result);
          }
          resolve(request.result);
        }

        request.onerror = function () {
          console.error(request.error);
          reject(request.error);
        }
      });
  }

  public async getObjectStoreTransaction(dbName: string, dbVer: number, storeName: string, mode: IDBTransactionMode): Promise<IDBObjectStore | null> {
    const db = await this.open(dbName, dbVer);
    if (!db) {
      return Promise.resolve(null);
    }
    const store = db.transaction(storeName, mode).objectStore(storeName);
    return Promise.resolve(store);
  }

  public async get<T>(dbName: string, dbVer: number, storeName: string, keyValue: IDBValidKey | IDBKeyRange): Promise<T | null> {
    const store = await this.getObjectStoreTransaction(dbName, dbVer, storeName, 'readonly');
    return new Promise((resolve, reject) => {
      if (!store) {
        // shouldn't get here because getting a non-existent store throws.
        return resolve(null);
      }
      const request = store.get(keyValue) as IDBRequest<T>;
      request.onsuccess = function () {
        return resolve(request.result);
      }
      request.onerror = function () {
        console.error(request.error);
        reject(request.error);
      }
    });
  }

  public async add<T>(dbName: string, dbVer: number, storeName: string, data: T): Promise<T | null> {
    const store = await this.getObjectStoreTransaction(dbName, dbVer, storeName, 'readwrite');
    return await new Promise((resolve, reject) => {
      if (!store) {
        return resolve(null);
      }
      const request = store.add(data);
      if (!request) {
        console.error('Add request failed');
        resolve(null);
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      request.onsuccess = async function () {
        const result = await self.get<T>(dbName, dbVer, storeName, request.result);
        resolve(result);
      };
      request.onerror = function () {
        resolve(null);
        return;
      }
    });
  }
}
