import {decrypt, encrypt} from "./crypto";

class Storage {

    setItem=(key:string, value:string)=> (localStorage.setItem(key, encrypt(value)));
    getItem=(key:string)=> {
        try {
            const value = localStorage.getItem(key);
            if (value) {
                return JSON.parse(decrypt(value))
            }
            return undefined
        } catch(e) {
        }
    }

    removeItem=(key:string)=> (
        localStorage.removeItem(key)
    );

    clear=(key:string)=> (
        localStorage.clear()
    )

}

export default new Storage()
