import * as dbSettings from '../settings/settings';

const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbSettings.DB_NAME, dbSettings.ACTUAL_DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBRequest<IDBDatabase>).result;
            db.createObjectStore(dbSettings.OBJECT_STORE_NAME, { 
                keyPath: dbSettings.KEY_PATH_NAME,
            });
        }

        request.onsuccess = (event) => {
            const db = (event.target as IDBRequest<IDBDatabase>).result;
            resolve(db);
        }

        request.onerror = (event) => {
            reject(event);
        }
    })
}

export { openDB };