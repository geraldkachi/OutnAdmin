import React, {ReactElement, useRef} from 'react';
import Header from "@/components/layouts/header";
import SideBar from "@/components/layouts/side-bar";
import HtmlHead from "@/components/layouts/html-head";

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

type LayoutProps = {
	children?:React.ReactNode
	title?:string
	back?:boolean
}
const Layout: React.FC<LayoutProps> = (props) => {
    const {children,title, back} = props;
	const ref = useRef<any>();
	const onToggle=()=>ref.current.classList.toggle("hidden");

	return (
	    <div className={`w-full ${inter.className}`}>
		    <HtmlHead title={`${title?title+' - ':""}Out N About`}/>
		    <div className="flex relative w-full">
			    <SideBar ref={ref} onToggle={onToggle}/>
			    <div className="w-full bg-[#F1F7FE] min-h-screen">
				    <Header onToggle={onToggle} title={title} back={back}/>
				    <div className="w-full container max-w-6-5xl">
					    <div className="px-4 lg:px-8 w-full pt-5 lg:pt-0 pb-16">
						    {children}
					    </div>
				    </div>
			    </div>
		    </div>
	    </div>
    );
};

export default Layout;
