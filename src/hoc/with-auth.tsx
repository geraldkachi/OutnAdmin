import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useApp} from "@/store/contexts/app-context";
import Image from "next/image";

export const withAuth = (Page:any) => {
    return (props:any) => {
        const router = useRouter();
        const {setLogout, auth, setRedirectTo} = useApp();

        useEffect(() => {
            (async () => {
                if (!auth?.accessToken) {
                    await setLogout()
                    setRedirectTo(window.location.pathname)
                    await router.push("/login")
                }
            })()
        }, []);

        return auth?.accessToken?
            <Page {...props}/> :
            <div className="w-full h-screen flex-center">
                <Image src={"/images/icon.png"} className="rounded-md" width={60} height={60} alt={""} priority/>
            </div>
    };
};
