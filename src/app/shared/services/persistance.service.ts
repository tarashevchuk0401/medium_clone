import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PersistanceService {
    set(key: string, data: unknown): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.log('Error saving to local storage', error);
        }
    }

    get(key: string): unknown{
        try{
           const localStorageItem = localStorage.getItem(key);
           return (localStorageItem)?JSON.stringify(localStorageItem): null
        } catch (error) {
            console.log('Error getting value from LS', error)
            return null
        }
    }
}
