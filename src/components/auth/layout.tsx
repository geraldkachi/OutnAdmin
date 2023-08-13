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

	const data = [
		{ label:"PRIVACY POLICY", path:"/privacy-policy" },
		{ label:"TERMS OF USE", path:"/terms" },
		{ label:"AML AND CFT POLICY", path:"/anti-laundering" },
		{ label:"CONTACT US", path:"/contact" },
		{ label:"FAQ", path:"/faq" },
	]

    return (
	    <div className="min-h-screen flex-col-center overflow-y-auto relative" style={{background:"linear-gradient(170.9deg, #00B7DD -16.98%, #083473 128.65%)"}}>
		    <HtmlHead title={title}/>
		    <div className="container max-w-lg p-2 py-10">
			    <div className="p-5 lg:p-10 bg rounded-xl">
				    <div className={inter.className}>
					    <div className="flex-center">
						    <Image src={"/images/logo.png"} width={147} height={67} alt={""} priority/>
					    </div>
					    {children}
				    </div>
			    </div>
		    </div>

		    <div className="mt-5">
			    <div className="text-light text-xxs md:text-xs py-2 md:py-4 px-2 flex-center flex-wrap gap-2">
				    {data.map((item,i)=>(
					    <div key={item.path+i} className="flex-item gap-2">
						    {!!i&&(
							    <div className="w-1 h-1 bg-light rounded-full"/>
						    )}
						    <Link key={"TH"+i} href={item.path}>
							    <p className="p-2">
								    {item.label}
							    </p>
						    </Link>
					    </div>
				    ))}
			    </div>
		    </div>

	    </div>
    );
};

export default Layout;
