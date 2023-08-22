import { openDB } from "../utils/db";

import * as dbSettings from '../settings/settings';

interface IAuthService {
    username: string;
    password: string;
}

class AuthService {
    registerUser = async (userData: IAuthService) => {
        try {
            const db = await openDB();
            const transaction = db.transaction(dbSettings.TRANSACTION_NAME, "readwrite");
            const store = transaction.objectStore(dbSettings.OBJECT_STORE_NAME);
            store.add(userData);
        } catch(error) {
            throw new Error(error);
        }
    }
}

export { AuthService };