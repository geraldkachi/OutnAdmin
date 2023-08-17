import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useApp} from "@/store/contexts/app-context";
import Image from "next/image";

export const withoutAuth = (Page:any) => {
    return () => {
        const router = useRouter();
        const {auth,redirectTo} = useApp();

        useEffect(() => {
            (async () => {
                if (auth?.accessToken) {
                    await router.push(redirectTo||'/');
                }
            })()
        }, []);

        return !auth?.accessToken? <Page/>:
            <div className="w-full h-screen flex-center">
                <Image src={"/images/icon.png"} className="rounded-md" width={60} height={60} alt={""} priority/>
            </div>;
    };
};
