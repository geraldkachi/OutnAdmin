import React, {ForwardedRef} from 'react';
import Logo from "@/components/layouts/logo";
import Svg from "@/components/global/svg";
import SideBarContent from "@/components/layouts/side-bar-content";
import {close} from "@/svg/icons";
import {useApp} from "@/store/contexts/app-context";

type SideBarProps = {
	ref:ForwardedRef<HTMLDivElement>
	onToggle:()=>void
}

const SideBar = React.forwardRef((props:SideBarProps,ref:any)=>{
	const {onToggle} = props;

	return (
		<>
			<div ref={ref} className="hidden fixed inset-0 border-r bg-modal z-2000">
				<aside className="w-64 bg-white h-full relative">
					<div className="absolute top-0 right-2 pt-2">
						<div onClick={onToggle} className="p-2 rounded-full bg-medium-shade">
							<Svg icon={close} className="w-5 text"/>
						</div>
					</div>
					<div className="px-2 pt-4 pb-2">
						<Logo/>
					</div>
					<SideBarContent/>
				</aside>
				<div className="h-full flex-1" onClick={onToggle}></div>
			</div>
			<aside className="hidden lg:block w-64 sticky top-0 h-screen">
				<div className="py-5 px-2 lg:px-5">
					<Logo/>
				</div>
				<div className="mt-2">
					<SideBarContent/>
				</div>
			</aside>
		</>
	);
});

export default SideBar;
