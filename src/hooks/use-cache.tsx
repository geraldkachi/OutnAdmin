import React, {useMemo} from "react";
import {useDispatch} from "../components/rn-alpha";
import {actions} from "@/store/reducers/cache-reducer";
import {store} from "@/store";
import {Method} from "@/utils/service";

type Context = {
	key: string
	method: Method
	path: string
}
type Props = {
	setCache:(key:string, value:any)=>any
	getKey:(route:string, variables?:any)=>string
	getContext:(route:string, variables?:any)=>Context
	getData:(key:string)=>any
	getItem:(key:string, id:string)=>any
	update:(key:string, data:any)=>void
	updateValue:(key:string, arg:string,value:any)=>void
	updateValues:(key:string, values:any)=>void
	updateItem:(key:string, id:string,value:any)=>void
	deleteItem:(key:string, id:string)=>void
	prepend:(key:string, data:any)=>void
	append:(key:string, data:any)=>void
	updateOrPrepend:(key:string, data:any)=>void
	deleteCache:(key:string)=>void
};

const useCache=():Props=> {
	const dispatch = useDispatch();

	const getKey=(route:string,variables?:any)=>{
		const split = route.split(":/")
		const path = "/"+split?.[1].replace(/:\w+/g,(matched:any)=>{
			const spr = {...(variables||{})}
			const key = matched.replace(/\W/g,"");
			delete variables[key]
			return spr[key]
		})
		return path+JSON.stringify(variables||{})
	}

	const getContext = (route:string,variables?:any)=>{
		const split = route.split(":/")
		const method:any = split[0];
		const path = "/"+split?.[1].replace(/:\w+/g,(matched:any)=>{
			const spr = {...variables}
			const key = matched.replace(/\W/g,"");
			delete variables[key]
			return spr[key]
		})
		const key = path+JSON.stringify(variables||{})

		return {path, method, key}
	}

	const getData=(key:string)=>{
		return store.getState().cache[key];
	}

	const update = (key:string, value:any)=>{
		setCache(key, value)
	}

	const setCache=(key:string, value:any)=>{
		dispatch(actions.set({key, value}))
	}

	const deleteCache=(key:string)=>{
		dispatch(actions.remove(key))
	}

	const updateItem = (key:string, id:string, value:any)=>{
		const cache = store.getState().cache[key];
		if (Array.isArray(cache)){
			const spr = [...cache]
			const i = cache.findIndex((r:any)=>r._id === id);
			spr[i] = {...spr[i],...value};
			setCache(key,spr)
		}
	}

	/*const updateMany = (key:string, criteria:any, update:any)=>{
		const cache = store.getState().cache[key];
		if (Array.isArray(cache)){
			const
			setCache(key,spr)
		}
	}*/

	const getItem = (key:string, id:string)=>{
		const cache = store.getState().cache[key];
		return cache.filter((r:any)=>r._id === id)?.[0]
	}

	const updateValue = (key:string, arg:string, value:any)=>{
		const cache = store.getState().cache[key];
		if (!Array.isArray(cache)){
			setCache(key, {...cache,[arg]:value})
		}
	}

	const updateValues = (key:string, values:any)=>{
		const cache = store.getState().cache[key];
		if (!Array.isArray(cache)){
			setCache(key, {...cache,...values})
		}
	}

	const prepend = (key:string, data:any)=>{
		const cache = store.getState().cache[key];
		if (Array.isArray(cache)){
			setCache(key,[data].concat(cache))
		}
	}

	const updateOrPrepend = (key:string, data:any)=>{
		const cache = store.getState().cache[key];
		if (Array.isArray(cache)){
			const spr = [...cache]
			const i = cache.findIndex((r:any)=>r._id === data._id);
			if (i>-1){
				spr[i] = {...spr[i],...data};
				setCache(key,spr)
			}else {
				setCache(key,[data].concat(cache))
			}
		}
	}

	const append = (key:string, data:any)=>{
		const cache = store.getState().cache[key];
		if (Array.isArray(cache)){
			setCache(key,cache.concat([data]))
		}
	}

	const deleteItem = (key:string, id:string)=>{
		const cache = store.getState().cache[key];
		if (Array.isArray(cache)){
			setCache(key,cache.filter((r:any)=>r._id !== id))
		}
	}

	return {
		getItem,
		setCache,
		getKey,
		getContext,
		getData,
		update,
		updateValue,
		updateValues,
		updateItem,
		deleteItem,
		prepend,
		append,
		updateOrPrepend,
		deleteCache
	};
};



export default useCache;
