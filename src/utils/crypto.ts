import aes from "crypto-js/aes";
import encUtf8 from "crypto-js/enc-utf8";

const passkey:string = "4:{!]Meq2&nX]4u(7GU!";

export const encrypt = (data:any, key:string=passkey) => {
    let encryptedString:any = aes.encrypt(JSON.stringify(data), key);
    encryptedString = encryptedString.toString();
    return encryptedString;
};

export const decrypt = (encryptedString:any, key:string=passkey) => {
    try {
        if (encryptedString){
            const decryptedString:any = aes.decrypt(encryptedString.toString(), key);
            return JSON.parse(decryptedString.toString(encUtf8));
        }else {
            return {}
        }
    } catch (error) {
        console.log(error);
    }
};
