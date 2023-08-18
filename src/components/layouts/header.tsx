import React, {useState,useEffect} from 'react';
import Svg from "@/components/global/svg";
import {arrowBack, menu} from "@/svg/icons";
import {chevronDown, person} from "@/utils/icons/icons";
import {useApp} from "@/store/contexts/app-context";
import {useRouter} from "next/router";
import {logout, profile} from "@/svg/menu";

type HeaderProps = {
	onToggle:()=>void
	title?:string
	back?:boolean
}

const Header: React.FC<HeaderProps> = (props) => {
    const {onToggle,title, back} = props;
	const {setLogout} = useApp();
	const router = useRouter();
	const [open,setOpen] = useState(false);
	const {auth:{user}} = useApp();

    return (
        <>
	        <header className="py-3 sticky top-0 z-1000 bg border-b mb-3 lg:mb-5">
		        <div className="container max-w-6-5xl flex-between px-4 lg:px-8 py-3">
			        <div className="flex-item gap-4">
				        {back?
					        <div className="flex-item gap-4" role={"button"} onClick={()=>router.back()}>
						        <Svg icon={arrowBack} className="w-5"/>
						        <p className="text">Back</p>
					        </div>:
					        <div role={"button"} className="lg:hidden" onClick={onToggle}>
						        <Svg icon={menu} className="w-7"/>
					        </div>
						}
				        <h1 className="font-bold">{title}</h1>
			        </div>

			        <div className="relative rounded-full">
				        <div
					        role={"button"}
					        className="flex-item rounded-full bg gap-3"
					        onClick={()=>{
						        setOpen(true)
					        }}
				        >
					        <div className="h-8 w-8 bg-primary flex-center rounded-full">
						        <Svg icon={person} className="w-4 text-white"/>
					        </div>
					        <div>
						        <p className="text-xs text font-medium">{user?.name}</p>
						        <p className="text-xs text-medium">Admin</p>
					        </div>
				        </div>

				        {open&&(
					        <div className="shadow-2xl w-40 absolute top-12 bg right-2 rounded">
						        <div
							        role={"button"}
							        className="py-4 px-5 flex-item gap-2 hover:bg-shade"
							        onClick={()=>{
								        router.push("/profile").catch(()=>{})
								        setOpen(false)
							        }}
						        >
							        <Svg icon={profile} className="w-4 text-medium"/>
							        <p className="text-base text">Profile</p>
						        </div>
						        <div
							        role={"button"}
							        className="py-4 px-5 flex-item gap-2 hover:bg-shade"
							        onClick={()=>{
								        router.push("/logout").catch(()=>{})
								        setOpen(false)
							        }}
						        >
							        <Svg icon={logout} className="w-4 text-medium"/>
							        <p className="text-base text">Logout</p>
						        </div>
					        </div>
				        )}
			        </div>
		        </div>
	        </header>
	        {open&&(
		        <div className="fixed inset-0 z-100" onClick={()=>setOpen(false)}/>
	        )}
        </>
    );
};

export default Header;
