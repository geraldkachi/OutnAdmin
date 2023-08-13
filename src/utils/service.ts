import config from "../config";

type Auth = string

export type Method = 'POST'|'GET'|'PUT'|'DELETE'

async function http(path:string,method:Method, data:any, status?:boolean, auth?:Auth) {

    let headers:any = {};
    if (auth){
        headers = {
            Authorization:"Bearer "+auth
        }
    }
    method = method||'GET';
    let query = '';
    if (method==="GET"){
        for (const [i, key] of Object.keys(data).entries()) {
            query+= `${i===0?'?':'&'}${key}=${data[key]}`
        }
    }

    const url = config.baseUrl+path+query
    const init = {
        method,
        headers:{
            "Content-Type":"application/json",
            ...headers,
        },
        body: method==="GET"?undefined:data && JSON.stringify(data)
    }

    return new Promise((resolve, reject) => {
        fetch(url, init)
            .then(async (response) => {
                const data = await response.json()
                if (status) return {data,status:response.status}
                return data
            })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                resolve({data:{error:error?.message},status:500})
            });
    });
}

export default http;
