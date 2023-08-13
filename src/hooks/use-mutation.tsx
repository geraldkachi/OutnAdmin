import React, {useState, useEffect, useCallback} from 'react';
import http, { Method } from "../utils/service";
import { useApp } from "@/store/contexts/app-context";
import PATH from "../paths";
import useCache from './use-cache';
import {useRouter} from "next/router";

type Response = {
	error?:string
	data?:any
	status?:number
}

export type UseMutationProps = {
	loading:boolean,
	error?:string|string[]
	mutate:(variables:any)=>Promise<Response>
	data?:any
	query:(route:string,variables?:any,authToken?:string,method?:Method)=>Promise<Response>
}

type Option = {
	keyboard?:boolean
	text?:boolean
}

const useMutation = (route:string,option?:Option):UseMutationProps => {
	const [loading,setLoading] = useState(false);
	const [error,setError] = useState(undefined);
	const {auth, setTimeout, Toast} = useApp();
	const [data,setData] = useState<any>();
	const {setCache, getKey} = useCache()
	const router = useRouter();

	const mutate = useCallback(async (variables:any):Promise<Response>=>{
		try {
			const split = route.split(":/")
			const method:any = split[0];
			const path = "/"+split[1].replace(/:\w+/g,(matched:any)=>{
				const spr = { ...(variables||{})}
				const key = matched.replace(/\W/g,"");
				delete variables[key]
				return spr[key]
			})
			setLoading(true)
			const res:any = await http(path,method||"POST", variables,true, auth, option?.text)
			if ([200,201].includes(res.status)){
				const data = res.data;
				setData(data)
				if (route.includes(PATH.login) && res.data?.auth_idtoken){
					// setLoading(false)
				}else {
					setLoading(false)
				}
				return {data,status:res.status}
			}
			if (!route.includes(PATH.login)&&[401,404].includes(res.status)){
				Toast("Session expired! kindly login","red")
				router.push("/logout").catch(()=>{})
			}
			const error = res.data?.description||"Oops! and error occurred";
			setError(error)
			setLoading(false)
			return {error,status:res.status}
		}catch (e:any){
			setLoading(false)
			return {error:e.message||"Oops! and error occurred",status:500}
		}
	},[])

	const query =async (route:string,variables?:any,customAuth?:any)=>{
		try {
			setLoading(true)
			const split = route.split(":/")
			const method:any = split[0];
			const path = "/"+split[1].replace(/:\w+/g,(matched:any)=>{
				const spr = {...(variables||{})}
				const key = matched.replace(/\W/g,"");
				delete variables[key]
				return spr[key]
			})
			const res:any = await http(path,method||"GET", variables||{}, true,customAuth||auth, option?.text)
			const error = res.status!==200?res.data?.error||"Oops! an error occurred":undefined
			setLoading(false)
			if (res.status === 200){
				const key = getKey(route,variables)
				setCache(key,res.data)
				return {status:res.status, data:res.data}
			}
			if (!route.includes(PATH.login)&&[401,404].includes(res.status)){
				Toast("Session expired! kindly login","red")
				router.push("/logout").catch(()=>{})
				return {error, status:res.status}
			}
			return {error}
		}catch (e:any){
			setLoading(false)
			return {error:e?.message||"Oops! and error occurred",status:500}
		}
	};

    return {
		mutate,
	    loading,
	    error,
	    data,
	    query
	};
};

export default useMutation;
