import React, {useState,useEffect} from 'react';
import Image from "next/image";
import Link from "next/link";

type LogoProps = {}

const Logo: React.FC<LogoProps> = (props) => {
    const {} = props;
    return (
        <Link href={"/"}>
	        <Image src={"/images/logo.png"} alt={"logo"} width={120} height={40} priority/>
        </Link>
    );
};

export default Logo;
