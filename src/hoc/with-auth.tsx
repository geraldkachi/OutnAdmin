import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useApp} from "@/store/contexts/app-context";
import Svg from "@/components/global/svg";
import Image from "next/image";

export const withAuth = (Page:any) => {
    return (props:any) => {
        const router = useRouter();
        const {setLogout, auth, setRedirectTo} = useApp();

        useEffect(() => {
            (async () => {
                if (!auth.user_id) {
                    await setLogout()
                    setRedirectTo(router.pathname)
                    await router.push("/login")
                }
            })()
        }, []);

        return auth.user_id?
            <Page {...props}/> :
            <div className="w-full h-screen flex-center">
                <Image src={"/images/icon.png"} width={60} height={60} alt={""} priority/>
            </div>
    };
};
