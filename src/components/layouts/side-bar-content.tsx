import React from 'react';
import Svg from "@/components/global/svg";
import {useRouter} from "next/router";
import {
	disburse,
	home, issuers,
	payment,
	profile,
	request,
	settings, vendors,
} from "@/svg/menu";
import {logout} from "@/svg/icons";
import {useApp} from "@/store/contexts/app-context";
import {quick2} from "@/svg/quick";

type SideBarContentProps = {}

const SideBarContent: React.FC<SideBarContentProps> = (props) => {
    const {} = props;
	const router = useRouter();
	const {user} = useApp();

	const list = [
		{
			name:"Home",
			icon:home,
			path:"/",
			width:"w-5",
		},
		{
			name:"Events",
			icon:vendors,
			path:"/users",
			width:"w-5",
		},
		{
			name:"Users",
			icon:vendors,
			path:"/users",
			width:"w-5",
		},
		{
			name:"Categories",
			icon:vendors,
			path:"/users",
			width:"w-5",
		},
		{
			name:"Groups",
			icon:vendors,
			path:"/users",
			width:"w-5",
		},
	]

	return (
        <div className="">
	        <div className="flex flex-col gap-3">
		        {list.map((item,i)=>{
			        const active = router.pathname===item.path
			        return (
				        <div key={"menu"+i} role={"button"}
				             onClick={()=>router.push(item.path)}
				             className={`flex-item px-6 lg:px-9 py-5 ${active?"bg-[#E7F7FF] border-r-4":"bg"} hover:bg-medium-shade group border-secondary`}
				        >
					        <Svg className={`${active?"text-secondary":"text-medium"} group-hover:text-medium ${item.width||"w-4"}`} icon={item.icon}/>
					        <p className={`${active?"text-secondary":"text"} group-hover:text-medium ml-4 flex-1`}>{item.name}</p>
				        </div>
			        )
		        })}
	        </div>
        </div>
    );
};

export default SideBarContent;
