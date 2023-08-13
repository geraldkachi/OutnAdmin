import React, {createContext, useContext, useMemo, useState} from "react";
import {useDispatch, useSelector} from "../../components/rn-alpha";
import {actions, AppState} from "../reducers/app-reducer";
import * as cache from "../reducers/cache-reducer";
import Alert, {AlertColors} from "@/components/global/alert";
import {useRouter} from "next/router";
import {AlertProps, Module} from "@/types";
import SuccessModal from "@/components/global/success-modal";

interface Props extends AppState {
    setEmail:(payload:string)=>void
    setRegistered:(payload:boolean)=>void
    setUser:(payload:any)=>void
    setAuth:(payload:any)=>void
    setLogout:()=>Promise<void>
    setTimeout:()=>Promise<void>
    setColorMode:(payload:string)=>void
    setRedirectTo:(path:string)=>void
    Toast:(message:string, color?:AlertColors, seconds?:number)=>void
    toggleShowBalance:()=>void
    setModule:(module:Module)=>void
    showAlert:(props:AlertProps)=>void
}

const defaultValue:any = {};

const AppContext = createContext<Props>(defaultValue);
export const useApp=()=>useContext(AppContext);

const AppProvider: React.FC<any> = ({children}) => {
    const state = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const router = useRouter();
    const [toastAlert,setToastAlert] = useState<{key:any, message:string, color?:AlertColors, seconds:number}>();

    const alertInit = {
        title:"",
        text:"",
        show:false,
        btn: {
            text:"",
            href:"",
            onClick:()=>{}
        }
    }
    const [alert,setAlert] = useState<AlertProps>(alertInit);

    const Toast=(message:string, color?:AlertColors, seconds?:number)=>{
        const key = new Date().getTime();
        setToastAlert({key, message, color, seconds:seconds||5})
    }

    const showAlert=(props:AlertProps)=>{
        setAlert({...props, show:true })
    }

    const func = useMemo(() => ({
        setAuth:(payload:any)=>{
            dispatch(actions.setAuth(payload))
        },
        setUser:(payload:any)=>{
            dispatch(actions.setUser(payload))
        },
        setEmail:(payload:string)=>{
            dispatch(actions.setEmail(payload))
        },
        setRegistered:(payload:boolean)=>{
            dispatch(actions.setRegistered(payload))
        },
        setColorMode:(payload:any)=>{
            dispatch(actions.setSystemColor(false))
            dispatch(actions.setColorMode(payload))
        },
        toggleShowBalance:()=>{
            dispatch(actions.toggleShowBalance())
        },
        setTimeout: async ()=>{
            Toast("Session expired! kindly login","red")
        },
        setLogout: async ()=>{
            dispatch(actions.setLogout())
            dispatch(cache.actions.clear())
            router.push("/login").catch(()=>{})
        },
        setRedirectTo:(path:string)=>{
            dispatch(actions.setRedirectTo(path))
        },
        setModule:(path:Module)=>{
            dispatch(actions.setModule(path))
        }
    }),[]);

    return (
        <AppContext.Provider value={{...state, ...func, Toast, showAlert}}>
            <Alert alert={toastAlert}/>
            {children}
            <SuccessModal
                title={alert.title}
                text={alert.text}
                btn={{
                    text:alert.btn.text,
                    href:alert.btn.href,
                    onClick:()=>{
                        alert.btn.onClick?.()
                        if (alert.btn.closeOnClick === undefined || alert.btn.closeOnClick) {
                            setAlert((prevState)=>({...prevState, show:false}))
                        }
                    }
                }}
                modal={alert.show||false}
                setModal={()=>{}}
            />
        </AppContext.Provider>
    );
};

export default AppProvider;
