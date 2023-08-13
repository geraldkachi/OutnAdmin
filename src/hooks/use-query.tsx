import React, { useEffect, useCallback, useMemo } from "react";
import http from "../utils/service";
import {useApp} from "@/store/contexts/app-context";
import {useDispatch, useSelector} from "../components/rn-alpha";
import {actions} from "@/store/reducers/cache-reducer";
import * as network from "../store/reducers/thread-reducer";
import {store} from "@/store";
import {useRouter} from "next/router";

type Props = {
    data:any|any[]
    loading:boolean
    error:string|undefined
    key:string
    refetch:(variables?:any)=>void
    fetchMore:(variables?:any,concat?:'start'|'end'|'pagination', paginationKey?:string)=>Promise<any>
    update:(data:any)=>void
    updateValue:(arg:string,value:any)=>void
    updateValues:(values:any)=>void
    updateItem:(id:string,value:any, field?:string)=>void
    deleteItem:(id:string)=>void
    prepend:(data:any)=>void
    append:(data:any)=>void
};

type NetworkPolicy = 'network-and-cache'|'cache-only'|'network-only'|'cache-first'

type Args = {
    variables?:any
    networkPolicy?:NetworkPolicy
    init?:any
}

const useQuery=(route:string, args?:Args):Props=> {
    const {
        variables={},
        networkPolicy,
        init
    } = args||{};

    const {auth,Toast} = useApp();
    const router = useRouter();

    const app = useApp();

    const ctx = useMemo(()=>{
        const split = route.split(":/")
        const method:any = split[0];
        const path = "/"+split?.[1].replace(/:\w+/g,(matched:any)=>{
            const spr = { ...variables }
            const key = matched.replace(/\W/g,"");
            delete variables[key]
            return spr[key]
        })

        const policy = networkPolicy||"cache-first"
        const key = path+JSON.stringify(variables||{})

        return {path, method, policy, key}
    },[])

    const data = useSelector((state)=>state.cache[ctx.key]);
    const thread = useSelector((state)=>state.tread[ctx.key]);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(variables||{})
    }, []);

    useEffect(()=>{
        if (init){
            const data = store.getState().cache[ctx.key];
            if (init?.timestamp > (data?.timestamp||0)){
                dispatch(actions.init({key:ctx.key, value:init}))
            }
        }
    },[init?.timestamp]);

    const fetch=(variables:any)=>{
        switch (ctx.policy){
            case "cache-only":
                return;
            case "network-only":
                fetchHandler(variables).catch(()=>{})
                return;
            case "cache-first":
                if (!data){
                    fetchHandler(variables).catch(()=>{})
                }
                return;
            case "network-and-cache":
                fetchHandler(variables).catch(()=>{})
                setTimeout(()=>{
                    const thread = store.getState().tread[ctx.key]
                    if (thread?.loading){
                        console.log("still loading");
                        refetch({})
                    }
                },10 * 1000)
                return;
        }
    }

    const fetchHandler = async (variables:any, refetch?:boolean)=>{
        try {
            const thread = store.getState().tread[ctx.key];
            if (!thread || !thread?.loading || thread?.error || refetch){
                dispatch(network.actions.set({
                    key:ctx.key,
                    value: {
                        loading:true,
                        error:undefined
                    }
                }))

                const {path, method, key} = ctx;
                const res:any = await http(path,method||"GET", variables, true, auth)
                const error = res.status!==200?res.data?.description||"Oops! an error occurred":undefined
                dispatch(network.actions.set({
                    key:ctx.key,
                    value: {
                        loading:false,
                        error:error
                    }
                }))

                if (res.status === 200){
                    if (res.data){
                        dispatch(actions.set({key, value:res.data}))
                    }
                }
                else if([401,404].includes(res.status)) {
                    Toast("Session expired! kindly login","red")
                    router.push("/logout").catch(()=>{})
                }
            }
        }catch (e:any){
            const error = e.message||"Oops! an error occurred"
            dispatch(network.actions.set({
                key:ctx.key,
                value: {
                    loading:false,
                    error:error
                }
            }))
        }
    }

    const refetch =(args:any)=>{
        fetchHandler({...variables, ...(args||{}) }, true).catch(()=>{})
    }

    const fetchMore = async (args:any,concat?:'start'|'end'|'pagination', paginationKey?:string)=>{
        const {path, method, key} = ctx;
        const res:any = await http(path,method||"GET", { ...variables, ...(args||{}) }, true, auth)
        const error = res.status!==200?res.data?.error?.toString()||"Oops! an error occurred":undefined
        if (res.status === 200){
            if (concat==='start'){
                dispatch(actions.prepend({key, value:res.data}))
            }
            else if (concat==='end'){
                dispatch(actions.prepend({key, value:res.data}))
            }
            else if (concat==='pagination'){
                dispatch(actions.paginate({key, data:res.data, paginationKey:paginationKey||"data"}))
            }
            return {data:res.data}
        }
        else if(res.status === 401) {
            Toast("Session expired! kindly login","red")
            router.push("/logout").catch(()=>{})
            return {error}
        }
        return {error}
    }

    const update = useCallback((value:any)=>{
        const {key} = ctx;
        setCache(key, value)
    },[])

    const setCache=(key:string, value:any)=>{
        dispatch(actions.set({key, value}))
    }

    const updateItem = useCallback((id:string, value:any, field?:string)=>{
        const {key} = ctx;
        const cache = store.getState().cache[ctx.key];
        if (Array.isArray(cache)){
            const spr = [...cache]
            const i = cache.findIndex((r:any)=>r[field||"ID"] === id);
            spr[i] = {...spr[i],...value};
            setCache(key,spr)
        }
    },[])

    const updateValue = useCallback((arg:string, value:any)=>{
        const {key} = ctx;
        const cache = store.getState().cache[key];
        if (!Array.isArray(cache)){
            setCache(key, {...cache,[arg]:value})
        }
    },[])

    const updateValues = useCallback((values:any)=>{
        const {key} = ctx;
        const cache = store.getState().cache[key];
        if (!Array.isArray(cache)){
            setCache(key, {...cache,...values})
        }
    },[])

    const prepend = useCallback((data:any)=>{
        const {key} = ctx;
        const cache = store.getState().cache[key];
        if (Array.isArray(cache)){
            setCache(key,[data].concat(cache))
        }
    },[])

    const append = useCallback((data:any)=>{
        const {key} = ctx;
        const cache = store.getState().cache[key];
        if (Array.isArray(cache)){
            setCache(key,cache.concat([data]))
        }
    },[])

    const deleteItem = useCallback((id:string)=>{
        const {key} = ctx;
        const cache = store.getState().cache[key];
        if (Array.isArray(cache)){
            setCache(key,cache.filter((r:any)=>r.ID !== id))
        }
    },[])

    return {
        data:data || init,
        loading:thread?.loading,
        error:thread?.error,
        refetch,
        key:ctx.key,
        fetchMore,
        update,
        updateValue,
        updateValues,
        updateItem,
        deleteItem,
        prepend,
        append
    };
};



export default useQuery;
