import CryptoJS from "crypto-js";


const NEXT_PUBLIC_CRYPTO_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY||"";
const NEXT_PUBLIC_CRYPTO_IV = process.env.NEXT_PUBLIC_CRYPTO_IV||"";

const key = CryptoJS.enc.Utf8.parse(NEXT_PUBLIC_CRYPTO_KEY);
const iv  = CryptoJS.enc.Utf8.parse(NEXT_PUBLIC_CRYPTO_IV);

export const encrypt=(payload:any)=>{
    return CryptoJS.AES.encrypt(JSON.stringify(payload), key, {iv: iv, mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7}).toString()
}

export const decrypt=(response:string)=>{
    const ciphertext:any = {ciphertext:CryptoJS.enc.Base64.parse(response)}
    const decrypted_response = CryptoJS.AES.decrypt(ciphertext,key,{iv: iv});
    return decrypted_response.toString(CryptoJS.enc.Utf8);
}

