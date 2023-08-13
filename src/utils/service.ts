import {decrypt, encrypt} from "@/utils/crypto";
import {Auth} from "@/types";

export type Method = 'POST'|'GET'|'PUT'|'DELETE'

async function http(path:string,method:Method, data:any, status?:boolean, auth?:Auth, text?:boolean) {

    let headers:any = {};
    if (auth?.user_id){
        headers = {
            "X-Clientid":auth.user_id,
            "X-Authid-Token":auth.session_token
        }
    }

    return new Promise((resolve, reject) =>{
        fetch(process.env.NEXT_PUBLIC_BASE_URL+path, {
            method:method||'GET',
            headers,
            body: data&&encrypt(data)
        })
            .then(async (response) => {
                const text = await response.text()
                const data = text?JSON.parse(decrypt(text)):null
                if (status) return { data, status:response.status }
                return data
            })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export default http;
