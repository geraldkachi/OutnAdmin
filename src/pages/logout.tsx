import React, {useState,useEffect} from 'react';
import {Preloader} from "@/components/rn-alpha";
import {useApp} from "@/store/contexts/app-context";
import {useRouter} from "next/router";

type LogoutProps = {}

const Logout: React.FC<LogoutProps> = (props) => {
    const {} = props;
	const {setLogout} = useApp();
	const router = useRouter();

	useEffect(()=>{
		setTimeout(()=>{
			setLogout().then(()=>{
				router.push("/login").catch(()=>{})
			})
		},1000)
	},[]);

    return (
		<>
			<Preloader loading/>
		</>
    );
};

export default Logout;
