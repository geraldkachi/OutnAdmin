import React from 'react';
import HtmlHead from "@/components/layouts/html-head";
import {useRouter} from "next/router";
import { Inter } from 'next/font/google';
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ['latin'] })


type LayoutProps = {
	children: React.ReactNode
	title: string
}

const Layout: React.FC<LayoutProps> = (props) => {
    const {
		children,
	    title
	} = props;
	const router = useRouter();

    return (
	    <div className="min-h-screen flex-col-center overflow-y-auto relative" style={{background:"linear-gradient(170.9deg, #5e4ff1 -16.98%, #4f9df1 128.65%)"}}>
		    <HtmlHead title={title}/>
		    <div className="container max-w-lg p-2 py-10">
			    <div className="p-5 lg:p-10 bg rounded-xl">
				    <div className={inter.className}>
					    <div className="flex-center">
						    <Image src={"/images/logo.png"} className="rounded" width={70} height={67} alt={""} priority/>
					    </div>
					    {children}
				    </div>
			    </div>
		    </div>
	    </div>
    );
};

export default Layout;
